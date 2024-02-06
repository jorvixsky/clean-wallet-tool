"use client";

import { useEffect, useState } from "react";
import { BurnableToken } from "./Burn";
import { BalanceItem, ChainID } from "@covalenthq/client-sdk";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useAccount } from "wagmi";
import deployedContracts from "~~/contracts/deployedContracts";
import approveSpendingToken from "~~/utils/burning/approveSpendingToken";
import getTokens from "~~/utils/burning/getTokens";

interface TokenListProps {
  chain?: ChainID;
  onBurnableTokensChange: (burnableTokens: BurnableToken[]) => void;
}

export default function TokenList({ chain, onBurnableTokensChange }: TokenListProps) {
  const api = process.env.NEXT_PUBLIC_COVALENT_API_KEY;

  const { address } = useAccount();

  const [burningContract, setBurningContract] = useState<`0x${string}` | undefined>();
  const [tokens, setTokens] = useState<BalanceItem[]>([]);
  const [burnableTokens, setBurnableTokens] = useState<BurnableToken[]>([]);

  useEffect(() => {
    if (chain) setBurningContract(deployedContracts[chain as keyof typeof deployedContracts].Burner.address);
    if (!chain) setBurningContract(undefined);
    getTokens({ chain, address: address as `0x${string}` })
      .then(tokens => {
        setTokens(tokens as BalanceItem[]);
      })
      .catch(console.error);
  }, [chain, address]);

  useEffect(() => {
    onBurnableTokensChange(burnableTokens);
  }, [burnableTokens]);

  if (!api) return <p>API key not found</p>;
  if (!chain) return <p>Chain not found</p>;
  if (!address) return <ConnectButton />;

  return (
    <div className="overflow-x-auto">
      <table className="table w-full">
        <thead>
          <tr>
            <th>Name</th>
            <th>Contract</th>
            <th>Remove</th>
          </tr>
        </thead>
        <tbody>
          {tokens &&
            tokens
              .filter(token => Number(token.balance) > 0)
              .map(token => (
                <tr key={token.contract_address}>
                  <td>{token.contract_name || "Null"}</td>
                  <td>{token.contract_address}</td>
                  <td>
                    <input
                      type="checkbox"
                      className="checkbox"
                      onChange={e => {
                        if (e.target.checked) {
                          setBurnableTokens([
                            ...burnableTokens,
                            {
                              contract_address: token.contract_address as `0x${string}`,
                              amount: token.balance!, // If it is here, balance is always > 0
                            },
                          ]);
                          approveSpendingToken({
                            token: token.contract_address as `0x${string}`,
                            amount: token.balance!, // If it is here, balance is always > 0
                            spender: burningContract!, // Fix this (burning contract might not exist)
                          });
                        } else {
                          setBurnableTokens(burnableTokens.filter(t => t.contract_address !== token.contract_address));
                        }
                      }}
                    />
                  </td>
                </tr>
              ))}
        </tbody>
      </table>
    </div>
  );
}

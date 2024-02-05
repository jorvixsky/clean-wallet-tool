import { useEffect, useState } from "react";
import { parseAbi } from "viem";
import { useContractWrite, usePrepareContractWrite } from "wagmi";

export interface BurnableToken {
  contract_address: `0x${string}`;
  amount: bigint;
}

interface BurnProps {
  burnableTokens: BurnableToken[];
}

export default function Burn({ burnableTokens }: BurnProps) {
  const burner = "0x22b1380c4758C30B1569621aa73eb1237459CdeD";

  const [contracts, setContracts] = useState<`0x${string}`[]>([]);
  const [amounts, setAmounts] = useState<bigint[]>([]);

  useEffect(() => {
    if (burnableTokens.length) {
      setContracts(burnableTokens.map(token => token.contract_address));
      setAmounts(burnableTokens.map(token => token.amount));
    }
  }, [burnableTokens]);

  const { config } = usePrepareContractWrite({
    address: burner,
    abi: parseAbi(["function burnERC20Tokens(address[] calldata tokens, uint256[] calldata amounts)"]),
    functionName: "burnERC20Tokens",
    args: [contracts, amounts],
  });

  const { write: burnTokens } = useContractWrite(config);

  return (
    <button onClick={burnTokens} disabled={!burnableTokens}>
      Burn
    </button>
  );
}

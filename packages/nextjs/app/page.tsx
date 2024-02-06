"use client";

import { useEffect, useState } from "react";
import { ChainID } from "@covalenthq/client-sdk";
import type { NextPage } from "next";
import { useNetwork } from "wagmi";
import Burn, { BurnableToken } from "~~/components/Burn";
import TokenList from "~~/components/TokenList";
import deployedContracts from "~~/contracts/deployedContracts";

const Home: NextPage = () => {
  const { chain } = useNetwork();
  const [burnableTokens, setBurnableTokens] = useState<BurnableToken[]>([]);

  const [burningContract, setBurningContract] = useState<`0x${string}` | undefined>();

  useEffect(() => {
    if (chain) setBurningContract(deployedContracts[chain.id as keyof typeof deployedContracts].Burner.address);
    if (!chain) setBurningContract(undefined);
  }, [chain]);

  return (
    <>
      <div className="flex items-center flex-col flex-grow pt-10">
        <div className="px-5">
          <h1 className="text-center mb-8">
            <span className="block text-2xl mb-2">Welcome to</span>
            <span className="block text-4xl font-bold">Wallet Cleaner Tool</span>
          </h1>
          <div className="flex justify-center items-center gap-6 flex-col sm:flex-row">
            <Burn burnableTokens={burnableTokens} burnContract={burningContract} />
          </div>
        </div>

        <div className="flex-grow bg-base-300 w-full mt-16 px-8 py-12">
          <div className="flex justify-center items-center gap-12 flex-col sm:flex-row">
            <TokenList
              chain={chain?.id as ChainID}
              onBurnableTokensChange={setBurnableTokens}
              burningContract={burningContract}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;

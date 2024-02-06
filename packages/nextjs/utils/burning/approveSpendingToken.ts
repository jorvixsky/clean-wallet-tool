import { prepareWriteContract, writeContract } from "@wagmi/core";
import { parseAbi } from "viem";

interface ApproveProps {
  spender: `0x${string}`;
  amount: bigint;
  token: `0x${string}`;
}

export default async function approveSpendingToken({ spender, amount, token }: ApproveProps) {
  const { request } = await prepareWriteContract({
    address: token,
    abi: parseAbi(["function approve(address spender, uint256 amount) public returns (bool)"]),
    functionName: "approve",
    args: [spender, amount],
  });

  const { hash } = await writeContract(request);

  console.log(hash);
}

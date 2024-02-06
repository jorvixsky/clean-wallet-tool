import { ChainID, CovalentClient } from "@covalenthq/client-sdk";

interface GetTokensProps {
  chain: ChainID | undefined;
  address: `0x${string}` | undefined;
}

export default async function getTokens({ chain, address }: GetTokensProps) {
  const api = process.env.NEXT_PUBLIC_COVALENT_API_KEY;

  const client = new CovalentClient(api!);

  if (!chain || !address) return;
  try {
    const tokens = await client.BalanceService.getTokenBalancesForWalletAddress(chain, address);
    return tokens.data.items;
  } catch (error) {
    return error;
  }
}

# Clean Wallet Tool

If you are anything like me you probably hate having tons of SPAM/SCAM tokens within your wallet (or those you created while learning Solidity), so I created this tool to quickly get ride of them.

⚙️ Built using [Scaffold-ETH 2](https://scaffoldeth.io) - NextJS, RainbowKit, Hardhat, Wagmi, Viem, and Typescript.

## How to use?

1. Enter the live [website](https://clean-wallet-tool-nextjs.vercel.app/), login with the wallet and select the tokens you want to get rid of.
2. Sign the transaction. You will be authorising the burner contract to take your tokens.
3. Repeat for all the tokens you want to get rid of.
4. Click "Burn" and sign the transaction. All the tokens you selected will disappear from your wallet.
5. Enjoy a clean wallet! 😁

## How does it work?

The tokens you select get an approval to be transferred to a burn contract that keeps the tokens (as some ERC20 tokens cannot be sent to the zero address) so that they disappear from the token list on the chain explorers, so that you keep only what you want there.

To detect the tokens in your account, it uses [Covalent](https://www.covalenthq.com/). Please be aware that a free API is being used, so if tokens do not load the first time, try again.

## Compatible networks and tokens

Currently Clean Wallet Tool only works for ERC20 tokens in Gnosis, although you can deploy it by yourself in any other chain!

## Coming soon

- More chains
- More tokens (ERC721, ERC1155)
- Verified contract
- Better interface
- Suggestion of which tokens to remove (those that have already been identified as SPAM)
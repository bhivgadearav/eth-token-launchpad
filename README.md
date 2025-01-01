# ERC20 Token Launchpad

A React-based dApp that allows users to launch their own ERC20 tokens on Ethereum Mainnet or Sepolia testnet. Built with modern web3 technologies and a clean, user-friendly interface.

## Features

- Connect Ethereum wallet (MetaMask and other Web3 wallets)
- Switch between Ethereum Mainnet and Sepolia testnet
- Create custom ERC20 tokens with:
  - Custom token name
  - Custom token symbol
  - Configurable initial supply
- Automatic minting of initial supply to owner's wallet
- Additional token minting functionality to any wallet address
- Real-time network detection and switching
- Responsive UI with shadcn components

## Tech Stack

- React + Vite
- Wagmi (Ethereum interactions)
- Viem (Ethereum data fetching)
- TanStack Query (Data management)
- Tailwind CSS (Styling)
- shadcn/ui (UI components)
- Lucide React (Icons)

## Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- MetaMask or another Web3 wallet

## Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd token-launchpad
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the root directory and add your environment variables:
```env
VITE_ALCHEMY_ETH_API_KEY=your_alchemy_api_key
VITE_ALCHEMY_SEPOLIA_API_KEY=your_alchemy_api_key
```

4. Start the development server:
```bash
npm run dev
```

## Project Structure

```
src/
├── components/
│   ├── TokenLaunchpad.jsx
│   └── ui/
├── utils/
│   └── contracts.js
├── App.jsx
└── main.jsx
```

## Usage

1. Connect your Web3 wallet using the "Connect Wallet" button
2. Select your desired network (Ethereum Mainnet or Sepolia)
3. Fill in the token details:
   - Token Name (e.g., "My Token")
   - Token Symbol (e.g., "MTK")
   - Initial Supply (e.g., "1000000")
4. Click "Deploy Token" to launch your token
5. Once deployed, you can mint additional tokens to any address

## Smart Contract

The project uses a standard ERC20 implementation with additional minting capabilities. The contract includes:

- Standard ERC20 functionality
- Minting capability for token owner
- Basic security features
- Network agnostic deployment

## Security Considerations

- Always test your token on Sepolia testnet first
- Double-check all transaction parameters before confirming
- Keep your private keys secure
- Be cautious with initial supply and minting parameters

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- OpenZeppelin for ERC20 implementation
- Ethereum community for documentation and support
- shadcn/ui for beautiful React components
# 🍰 Cake Making Forging Dapp

A Web3 decentralized application that simulates a cake-making game using NFT forging mechanics. Players can combine different ingredients (NFTs) to create delicious cakes on the Ethereum blockchain.

## 🎮 Game Overview

This dapp allows users to:
- **Mint Ingredients**: Start with basic ingredients like flour, eggs, butter
- **Forge Cakes**: Combine ingredients to create different types of cakes
- **Collect NFTs**: Each ingredient and cake is a unique ERC1155 token
- **Trade**: Transfer and trade your cake NFTs with other players

## 🏗️ Project Structure

```
Cake-Making-Forging-Dapp/
├── contracts/                          # Smart contracts
│   ├── ERC1155Token.sol                # ERC1155 token contract
│   └── ForgingContract.sol             # Main forging logic
├── frontend-forging-dapp/              # Next.js frontend application
├── metadata-cake-making-dapp/          # NFT metadata files
├── images-cake-making-dapp/            # NFT images
└── README.md                           # This file
```

## 🎨 NFT Collection

### Ingredients (Tokens 0-2)
- **Token 0**: Flour - The base ingredient
- **Token 1**: [Ingredient Name]
- **Token 2**: [Ingredient Name]

### Cakes (Tokens 3-6)
- **Token 3**: Sponge Cake
- **Token 6**: Deluxe Cake
- More cake varieties available through forging

## 🛠️ Tech Stack

### Frontend
- **Next.js 14** - React framework
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **RainbowKit** - Wallet connection
- **Wagmi** - Ethereum React hooks
- **Ethers.js** - Ethereum interactions

### Blockchain
- **Solidity** - Smart contract language
- **ERC1155** - Multi-token standard
- **Sepolia Testnet** - Deployment network

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v16 or later)
- [Git](https://git-scm.com/)
- A Web3 wallet (e.g., [MetaMask](https://metamask.io/))
- Sepolia ETH for transactions

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/Cake-Making-Forging-Dapp.git
cd Cake-Making-Forging-Dapp
```

### 2. Install Dependencies

```bash
cd frontend-forging-dapp
npm install
```

### 3. Run the Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

## 📝 Smart Contracts

### Deployed Addresses (Sepolia Testnet)

- **ERC1155Token**: `0xB8f43056B93744e6b2A9F6331646D561A34F25A8`
- **ForgingContract**: `0x1AE6C646ED74B65af20f55b070eEdbd3229f77CB`

### Contract Functions

#### ERC1155Token.sol
- Standard ERC1155 functionality
- Minting capabilities
- Approval mechanisms

#### ForgingContract.sol
- Ingredient combination logic
- Cake forging mechanics
- Token burn and mint operations

## 🎯 How to Play

1. **Connect Wallet**: Use RainbowKit to connect your MetaMask wallet
2. **Get Ingredients**: Mint or acquire ingredient NFTs
3. **Forge Cakes**: Combine ingredients using the forging interface
4. **Collect**: Build your collection of unique cake NFTs

## 🔧 Development

### Build for Production

```bash
npm run build
```

### Lint Code

```bash
npm run lint
```

### Project Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
```

## 🌐 Deployment

The frontend can be deployed on platforms like:
- [Vercel](https://vercel.com/) (Recommended)
- [Netlify](https://netlify.com/)
- [GitHub Pages](https://pages.github.com/)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.


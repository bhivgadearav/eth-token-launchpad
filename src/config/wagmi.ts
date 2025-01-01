import { http, createConfig } from 'wagmi';
import { mainnet, sepolia } from 'wagmi/chains';
import { injected, metaMask } from 'wagmi/connectors';

export const config = createConfig({
    chains: [mainnet, sepolia],
    connectors: [
        injected(),
        metaMask()
    ],
    transports: {
        [mainnet.id]: http(import.meta.env.VITE_ALCHEMY_ETH_API_KEY),
        [sepolia.id]: http(import.meta.env.VITE_ALCHEMY_SEPOLIA_API_KEY),
    }
})
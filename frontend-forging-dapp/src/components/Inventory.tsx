import React, { useEffect, useState } from 'react';
import { useAccount } from 'wagmi';
import { ethers } from 'ethers';
import styles from '../styles/Home.module.css';
import ERC1155Token from 'abis/ERC1155Token.json';
import { CONTRACTS } from '../config/addresses.js';


const tokens = [
    { id: 0, name: 'Flour', image: 'images/0.jpeg' },
    { id: 1, name: 'Sugar', image: 'images/1.jpeg' },
    { id: 2, name: 'Egg', image: 'images/2.jpeg' },
    { id: 3, name: 'Sponge Cake', image: 'images/3.jpeg' },
    { id: 4, name: 'Custard Cake', image: 'images/4.jpeg' },
    { id: 5, name: 'Pancake', image: 'images/5.jpeg' },
    { id: 6, name: 'Deluxe Cake', image: 'images/6.jpeg' },
];

const Inventory = () => {
    const { address } = useAccount();

    const [balances, setBalances] = useState<Record<number, string>>({});

    useEffect(() => {
        let contract: ethers.Contract;
        let provider: ethers.BrowserProvider;
        let intervalId: NodeJS.Timeout;

        async function setupListeners() {
            if (!address) return;

            try {
                provider = new ethers.BrowserProvider(window.ethereum);
                contract = new ethers.Contract(
                    CONTRACTS.ERC1155Token,
                    ERC1155Token.abi,
                    provider
                );

                // Initial fetch
                try {
                    await fetchBalances();
                } catch (err) {
                    console.error("Failed to fetch balances during setup:", err);
                }


                // Set up event listeners
                const transferHandler = () => fetchBalances();

                contract.on("TransferSingle", transferHandler);
                contract.on("TransferBatch", transferHandler);

                // Fallback polling (optional)
                intervalId = setInterval(fetchBalances, 3000);
            } catch (error) {
                console.error("Error setting up listeners:", error);
            }
        }

        async function fetchBalances() {
            if (!address || !contract) return;

            try {
                const newBalances: Record<number, string> = {};
                await Promise.all(
                    tokens.map(async (token) => {
                        const balance = await contract.balanceOf(address, token.id);
                        newBalances[token.id] = balance.toString();
                    })
                );
                setBalances(newBalances);
            } catch (error) {
                console.error("Error fetching balances:", error);
            }
        }

        async function cleanup() {
            if (contract) {
                contract.removeAllListeners("TransferSingle");
                contract.removeAllListeners("TransferBatch");
            }
            if (intervalId) clearInterval(intervalId);
        }

        setupListeners();
        return () => {
            cleanup();
        };
    }, [address]);

    return (
        <div className={styles.inventory}>
            <div className={styles.tokenList}>
                {tokens.map((token) => (
                    <div key={token.id} className={styles.tokenItem}>

                        <img src={token.image} alt={token.name} className={styles.tokenImage} />
                        <span className={styles.tokenQuantity}>
                            {balances[token.id] !== undefined ? balances[token.id] : 0}
                        </span>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Inventory;

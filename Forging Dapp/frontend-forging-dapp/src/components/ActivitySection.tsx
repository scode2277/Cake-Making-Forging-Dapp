import React, { useState } from 'react';
import styles from '../styles/Home.module.css';
import { ethers } from 'ethers';
import ERC1155TokenAbi from 'abis/ERC1155Token.json';
import { CONTRACTS } from '../config/addresses.js';
import { Popover, PopoverContent, PopoverTrigger } from "../../components/ui/popover";
import { RadioGroup, RadioGroupItem } from "../../components/ui/radio-group";
import { Label } from "../../components/ui/label";


export interface ActivityItem {
    image: string;
    alt?: string;
    buttonLabel: string;
    functionName?: string;
    functionArgs?: any[];
    requirements?: string[];
}

export interface ContractDetails {
    address: string;
    abi: any;
}

export interface ActivitySectionProps {
    title: string;
    instruction: string;
    items: ActivityItem[];
    contractDetails: ContractDetails;
}

const ActivitySection: React.FC<ActivitySectionProps> = ({
    title,
    instruction,
    items,
    contractDetails,
}) => {

    const [radioValue, setRadioValue] = useState("");
    const [transactionStatus, setTransactionStatus] = useState<string>("");
    const [isPopoverOpen, setIsPopoverOpen] = useState(false);

    // Function to call the contract method
    const callContractFunction = async (item: ActivityItem, args: any[]) => {
        try {
            if (!window.ethereum) throw new Error('No Ethereum provider found');

            const provider = new ethers.BrowserProvider(window.ethereum);
            const signer = await provider.getSigner();
            const userAddress = await signer.getAddress();

            // Check if this is a function that requires token approval
            if (item.functionName === "burn" || item.functionName === "trade") {
                setTransactionStatus("Checking approval...");
                const tokenContract = new ethers.Contract(
                    CONTRACTS.ERC1155Token,
                    ERC1155TokenAbi.abi,
                    signer
                );

                const isApproved = await tokenContract.isApprovedForAll(
                    userAddress,
                    contractDetails.address
                );

                if (!isApproved) {
                    setTransactionStatus("Requesting approval...");
                    const tx = await tokenContract.setApprovalForAll(
                        contractDetails.address,
                        true
                    );
                    setTransactionStatus("Waiting for approval confirmation...");
                    await tx.wait();
                }
            }

            if (item.functionName === "burn") {
                // Check if the first argument is undefined or null.
                if (args.length === 0 || args[0] == null) {
                    // Prepend the user address to the arguments array.
                    args[0] = userAddress;
                }
            }

            const contract = new ethers.Contract(
                contractDetails.address,
                contractDetails.abi,
                signer
            );

            if (!contract[item.functionName!]) {
                throw new Error(`Function ${item.functionName} not found in contract`);
            }

            setTransactionStatus("Sending transaction...");
            const tx = await contract[item.functionName!](...args);
            setTransactionStatus(`Transaction pending... (${tx.hash.slice(0, 6)}...${tx.hash.slice(-4)})`);

            const receipt = await tx.wait();
            setTransactionStatus(`Transaction confirmed in block ${receipt.blockNumber}!`);
            
            // Clear the status after 5 seconds
            setTimeout(() => setTransactionStatus(""), 5000);

            return receipt;
        } catch (error) {
            console.error('Transaction failed:', error);
            setTransactionStatus(`Transaction failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
            setTimeout(() => setTransactionStatus(""), 5000);
            throw error;
        }
    };

    // For items that do NOT require extra input, call the function directly.
    const handleButtonClick = (item: ActivityItem) => {
        callContractFunction(item, item.functionArgs || []);
    };

    // Called when the user submits their radio selection inside the popover.
    const handlePopoverSubmit = async (item: ActivityItem) => {
       
        let tokenId: number;
        if (radioValue === "Flour") {
            tokenId = 0;
        } else if (radioValue === "Sugar") {
            tokenId = 1;
        } else if (radioValue === "Egg") {
            tokenId = 2;
        }

        // Replace any null placeholder in the functionArgs with the chosen tokenId.
        const args = (item.functionArgs || []).map(arg =>
            arg === null ? tokenId : arg
        ); 
        setIsPopoverOpen(false);
        await callContractFunction(item, args);
        // Reset radio selection if needed
        setRadioValue("");
    };

    return (
        <div className={styles.activitySection}>
            <h2 className={styles.activitySectionTitle}>{title}</h2>
            <p className={styles.activitySectionInstruction}>{instruction}</p>
            {transactionStatus && (
                <div className={styles.transactionStatus}>
                    {transactionStatus}
                </div>
            )}
            <div className={styles.activitySectionItemsContainer}>
                {items.map((item, index) => (
                    <div key={index} className={styles.activitySectionItem}>
                        <img
                            src={item.image}
                            alt={item.alt || 'Activity Image'}
                            className={styles.activitySectionImage}
                        />
                        {item.requirements && item.requirements.length > 0 && (
                            <>
                                <p className={styles.activitySectionNeeded}>Needed:</p>
                                <ul className={styles.activitySectionRequirements}>
                                    {item.requirements.map((req, reqIndex) => (
                                        <li key={reqIndex}>{req}</li>
                                    ))}
                                </ul>
                            </>
                        )}
                        {item.functionArgs?.some(arg => arg === null) ? (
                            // when item requires extra input, wrap the button in a Popover.
                            <Popover open={isPopoverOpen} onOpenChange={setIsPopoverOpen}>
                                <PopoverTrigger>
                                    <p className={styles.activitySectionButton}>
                                        {item.buttonLabel}
                                    </p>
                                </PopoverTrigger>
                                <PopoverContent>
                                    <div className={styles.popover}>
                                        <h3 className={styles.popoverTitle}>
                                            Which one of these do you want to trade?
                                        </h3>
                                        <RadioGroup
                                            defaultValue=""
                                            onValueChange={setRadioValue}
                                        >
                                            <div className={styles.popoverItem}>
                                                <RadioGroupItem value="Flour" id="Flour" />
                                                <Label htmlFor="Flour">Flour</Label>
                                            </div>
                                            <div className={styles.popoverItem}>
                                                <RadioGroupItem value="Sugar" id="Sugar" />
                                                <Label htmlFor="Sugar">Sugar</Label>
                                            </div>
                                            <div className={styles.popoverItem}>
                                                <RadioGroupItem value="Egg" id="Egg" />
                                                <Label htmlFor="Egg">Egg</Label>
                                            </div>
                                        </RadioGroup>
                                        <div className={styles.popoverButtons}>
                                            <button
                                                onClick={() => handlePopoverSubmit(item)}
                                                className={styles.popoverButton}
                                            >
                                                Trade
                                            </button>

                                        </div>
                                    </div>
                                </PopoverContent>
                            </Popover>
                        ) : (
                            // If no extra input is needed, simply render a button.
                            <button
                                onClick={() => handleButtonClick(item)}
                                className={styles.activitySectionButton}
                            >
                                {item.buttonLabel}
                            </button>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ActivitySection;

import ForgingContract from 'abis/ForgingContract.json'
import { ContractDetails, ActivityItem } from '../components/ActivitySection';
import {CONTRACTS} from '../config/addresses';

export const makeCakeContractDetails: ContractDetails = {
  
  address: CONTRACTS.ForgingContract,
  abi: ForgingContract.abi,
};

export const makeCakeActivityItems: ActivityItem[] = [
  {
    image: 'images/3.jpeg',
    alt: 'Make Sponge Cake',
    buttonLabel: 'Make Sponge Cake',
    functionName: 'forge',
    functionArgs: [3], 
    requirements: [
      '1 Flour',
      '1 Sugar'
    ],
  },
  {
    image: 'images/4.jpeg',
    alt: 'Make Custard Cake',
    buttonLabel: 'Make Custard Cake',
    functionName: 'forge',
    functionArgs: [4],
    requirements: [
      '1 Sugar',
      '1 Egg',
    ],
  },
  {
    image: 'images/5.jpeg',
    alt: 'Make Pancakes',
    buttonLabel: 'Make Pancakes',
    functionName: 'forge',
    functionArgs: [5],
    requirements: [
      '1 Flour',
      '1 Egg'
    ],
  },
  {
    image: 'images/6.jpeg',
    alt: 'Make Deluxe Cake',
    buttonLabel: 'Make Deluxe Cake',
    functionName: 'forge',
    functionArgs: [6],
    requirements: [
      '1 Flour',
      '1 Sugar',
      '1 Egg'
    ],
  },
  
];
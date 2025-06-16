import ERC1155Token from 'abis/ERC1155Token.json'
import { ContractDetails, ActivityItem } from '../components/ActivitySection';
import {CONTRACTS} from '../config/addresses.js';

export const eatCakeContractDetails: ContractDetails = {
  
  address: CONTRACTS.ERC1155Token,
  abi: ERC1155Token.abi,
};

export const eatCakeActivityItems: ActivityItem[] = [
  {
    image: 'images/3.jpeg',
    alt: 'Eat Sponge Cake',
    buttonLabel: 'Eat Sponge Cake',
    functionName: 'trade',
    functionArgs: [3],
    requirements: [],
  },
  {
    image: 'images/4.jpeg',
    alt: 'Eat Custard Cake',
    buttonLabel: 'Eat Custard Cake',
    functionName: 'trade',
    functionArgs: [4],
    requirements: [ ],
  },
  {
    image: 'images/5.jpeg',
    alt: 'Eat Pancakes',
    buttonLabel: 'Eat Pancakes',
    functionName: 'trade',
    functionArgs: [5],
    requirements: [ ],
  },
  {
    image: 'images/6.jpeg',
    alt: 'Eat Deluxe Cake',
    buttonLabel: 'Eat Deluxe Cake',
    functionName: 'trade',
    functionArgs: [6],
    requirements: [ ],
  },
  
];
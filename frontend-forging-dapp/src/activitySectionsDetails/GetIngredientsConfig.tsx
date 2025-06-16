import ERC1155Token from 'abis/ERC1155Token.json'
import { ContractDetails, ActivityItem } from '../components/ActivitySection';
import {CONTRACTS} from '../config/addresses.js';


export const getIngredientsContractDetails: ContractDetails = {
  
  address: CONTRACTS.ERC1155Token,
  abi: ERC1155Token.abi,
};

export const getIngredientsActivityItems: ActivityItem[] = [
  {
    image: 'images/0.jpeg',
    alt: 'Get Flour',
    buttonLabel: 'Buy flour',
    functionName: 'mint',
    functionArgs: [0],
  },
  {
    image: 'images/1.jpeg',
    alt: 'Get Sugar',
    buttonLabel: 'Buy sugar',
    functionName: 'mint',
    functionArgs: [1],
  },
  {
    image: 'images/2.jpeg',
    alt: 'Get Eggs',
    buttonLabel: 'Buy eggs',
    functionName: 'mint',
    functionArgs: [2],
  },
  
];
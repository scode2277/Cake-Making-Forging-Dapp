import ForgingContract from 'abis/ForgingContract.json'
import { ContractDetails, ActivityItem } from '../components/ActivitySection';
import {CONTRACTS} from '../config/addresses';

export const shopContractDetails: ContractDetails = {
  
  address: CONTRACTS.ForgingContract,
  abi: ForgingContract.abi,
};

export const shopActivityItems: ActivityItem[] = [
  {
    image: 'images/0.jpeg',
    alt: 'Trade For Flour',
    buttonLabel: 'Trade For Flour',
    functionName: 'trade',
    functionArgs: [null,0], 
    requirements: [],
  },
  {
    image: 'images/1.jpeg', 
    alt: 'Trade for Sugar',
    buttonLabel: 'Trade for Sugar',
    functionName: 'trade',
    functionArgs: [null,1],
    requirements: [],
  },
  {
    image: 'images/2.jpeg',
    alt: 'Trade for eggs',
    buttonLabel: 'Trade For Eggs',
    functionName: 'trade',
    functionArgs: [null,2],
    requirements: [],
  },
  
];
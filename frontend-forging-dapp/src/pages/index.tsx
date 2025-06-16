import type { NextPage } from 'next';
import Head from 'next/head';
import styles from '../styles/Home.module.css';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import Inventory from '../components/Inventory';
import ActivitySection from '../components/ActivitySection';
import { getIngredientsContractDetails, getIngredientsActivityItems } from '../activitySectionsDetails/GetIngredientsConfig';
import { makeCakeContractDetails, makeCakeActivityItems } from '../activitySectionsDetails/MakeCakeConfig';
import { shopContractDetails, shopActivityItems } from '../activitySectionsDetails/ShopConfig';
import { eatCakeActivityItems, eatCakeContractDetails } from '../activitySectionsDetails/EatCakeConfig';


const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <Head>
        <style>
          @import url('https://fonts.googleapis.com/css2?family=Coiny&display=swap');

        </style>
        <title>Cake maker dapp</title>

        <link rel="icon" href="/images/logo.png" type="image/png" />
      </Head>

      <main className={styles.main}>
        <div className={styles.layoutContainer}>
          <div className={styles.topContainer}>
            <div className={styles.inventoryWrapper}>
              <Inventory />
            </div>
            <div className={styles.connectButtonWrapper}>
              <ConnectButton />
            </div>
          </div>


          <div className={styles.contentWrapper}>
            <h1 className={styles.title}>Craving something sweet?</h1>
            <h3 className={styles.description}>You’ve come to the right place.</h3>
            <p className={styles.openseaLink}>Look at your cakes or ingredients <a href="https://testnets.opensea.io/collection/unidentified-contract-8573381f-af1e-4693-ba4a-bafa" target="_blank"
              rel="noopener noreferrer">on Opensea</a></p>
            <div className={styles.grid}>
              <ActivitySection
                title="Get ingredients"
                instruction="Buy the ingredients that you need"
                items={getIngredientsActivityItems}
                contractDetails={getIngredientsContractDetails}
              />
              <ActivitySection
                title="Make cake"
                instruction="Make your cake!"
                items={makeCakeActivityItems}
                contractDetails={makeCakeContractDetails}
              />
              <ActivitySection
                title="Shop"
                instruction="Trade tokens to get ingredients!"
                items={shopActivityItems}
                contractDetails={shopContractDetails}
              />
              <ActivitySection
                title="Eat Cake"
                instruction="Eat your cake"
                items={eatCakeActivityItems}
                contractDetails={eatCakeContractDetails}
              />
            </div>
          </div>
        </div>
      </main>

      <footer className={styles.footer}>
        <p>
          Made with ❤️ by Sara 🌈
        </p>
      </footer>
    </div>
  );
};

export default Home;

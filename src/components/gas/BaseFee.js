import { Alchemy, Network, Utils } from 'alchemy-sdk';
import { useEffect, useState } from 'react';

// Refer to the README doc for more information about using API
// keys in client-side code. You should never do this in production
// level code.
const settings = {
  apiKey: process.env.REACT_APP_ALCHEMY_API_KEY,
  network: Network.ETH_MAINNET,
};


// In this week's lessons we used ethers.js. Here we are using the
// Alchemy SDK is an umbrella library with several different packages.
//
// You can read more about the packages here:
//   https://docs.alchemy.com/reference/alchemy-sdk-api-surface-overview#api-surface
const alchemy = new Alchemy(settings);

function BaseFee() {
  const [baseFee, setBaseFee] = useState(0);

  useEffect(() => {
    async function getBaseFee() {
      setBaseFee((await alchemy.core.getFeeData()).lastBaseFeePerGas);
    }

    getBaseFee();
  }, []);

  return <div className="BaseFee">Base Fee: {Number(Utils.formatUnits(baseFee, "gwei")).toFixed(2) + " Gwei"}<br /><br /></div>;
}

export default BaseFee;
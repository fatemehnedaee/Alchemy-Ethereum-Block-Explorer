import { Alchemy, Network, Utils } from 'alchemy-sdk';
import { useEffect, useState } from 'react';
// import BaseFee from './gas/baseFee';

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

function GasPrice() {
  const [gasPrice, setGasPrice] = useState(0);

  useEffect(() => {
    async function getGasPrice() {
      const baseFee = (await alchemy.core.getFeeData()).lastBaseFeePerGas;
      const priorityFee = (await alchemy.core.getFeeData()).maxPriorityFeePerGas;

      setGasPrice(Number(baseFee) + Number(priorityFee));
    }

    getGasPrice();
  }, []);

  return <div className="GasPrice"><br />Gas Price: {Number(Utils.formatUnits(gasPrice, "gwei")).toFixed(2) + " Gwei"}<br /><br /></div>;
}

export default GasPrice;
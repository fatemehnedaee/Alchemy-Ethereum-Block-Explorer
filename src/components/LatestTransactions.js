import { Alchemy, Network } from 'alchemy-sdk';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'

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

function LatestTransactions() {
  const [latestTransactions, setLatestTransactions] = useState(0);

  useEffect(() => {
    async function getLatestTransactions() {
      const latestBlock = await alchemy.core.getBlock("latest");
      let transactions = [];
      let tx = await alchemy.core.getBlockWithTransactions(latestBlock.hash);
      const timeStamp = Date.now();
      for(let i = latestBlock.transactions.length - 1; i > latestBlock.transactions.length - 5; i--) {
        if(tx.transactions[i].hash === latestBlock.transactions[i]) {
          transactions.push({
              transactionHash: tx.transactions[i].hash,
              timeStamp: timeStamp / 1000 - latestBlock.timestamp,
              from: tx.transactions[i].from,
              to: tx.transactions[i].to,
          });
        }
      }
      
      setLatestTransactions(transactions);
    }

    getLatestTransactions();
  }, []);

  return <div className="LatestTransactions"><br />Latest Transactions: {latestTransactions.length > 0 ? 
    <ul>
        {latestTransactions.map((item) => {
            return <li key={item.transactionHash}>
                Transaction hash: <Link to={`hash/${item.transactionHash}`}>{item.transactionHash}</Link> &nbsp; | &nbsp; {item.timeStamp.toFixed()} secs ago <br /><br />
                &nbsp; &nbsp;From: <Link to={`address/${item.from}`}>{item.from}</Link> &nbsp; | &nbsp; To: <Link to={`address/${item.to}`}>{item.to}</Link><br /><br />
              </li>
        })}
    </ul>
    : 'Loading..'}</div>;
}

export default LatestTransactions;
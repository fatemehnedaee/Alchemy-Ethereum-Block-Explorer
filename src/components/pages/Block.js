import { Alchemy, Network, Utils } from 'alchemy-sdk';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';

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

function BlockInfo() {
  const [blockInfo, setBlockInfo] = useState({
    time: 0,
    txCount: 0,
    gasUsed: 0,
    gasLimit: 0,
    baseFee: 0,
  });

  let { id } = useParams();


  useEffect(() => {
    async function getBlockInfo() {
      
      const timeStamp = Date.now();
      const block = await alchemy.core.getBlock(Number(id));

      const time = (timeStamp / 1000 - block.timestamp).toFixed();

      const txCount = block.transactions.length;

      const gasUsed = Number(block.gasUsed);

      const gasLimit = Number(block.gasLimit);

      const baseFee = Utils.formatUnits((block.baseFeePerGas).toString(), "ether");

      setBlockInfo({
        time: time,
        txCount: txCount,
        gasUsed: gasUsed,
        gasLimit: gasLimit,
        baseFee: baseFee,
      });
    }

    getBlockInfo();
  }, []);

  return <div className="Block">Block Number: {id}<br /><br />
    Timestamp: {blockInfo.time + " secs ago"}<br /><br />
    Transactions: <Link to={`/txs/${id}`}>{blockInfo.txCount} transactions</Link> &nbsp; in this block<br /><br />
    Gas Used: {blockInfo.gasUsed.toLocaleString('en-US', 3)} ({(((blockInfo.gasUsed) / 30000000) * 100).toFixed(2)}%)<br /><br />
    Gas Limit: {(blockInfo.gasLimit).toLocaleString('en-US', 3)}<br /><br />
    Base Fee Per Gas: {blockInfo.baseFee} ETH ({(blockInfo.baseFee * 1000000000)} Gwei)<br /><br />
  </div>;
}

export default BlockInfo;
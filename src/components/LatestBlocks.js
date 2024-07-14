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

function LatestBlocks() {
  const [latestBlocks, setLatestBlocks] = useState(0);

  useEffect(() => {
    async function getLatestBlocks() {
      const lasteBblockNumber = await alchemy.core.getBlockNumber();
      let blocks = [];
      let block = {};
      const timeStamp = Date.now();
      for(let i = lasteBblockNumber; i > lasteBblockNumber - 4; i--) {
        block = await alchemy.core.getBlock(i);
        blocks.push({
            blockNumber: i,
            timeStamp: timeStamp / 1000 - block.timestamp});
      }
      setLatestBlocks(blocks);
    }

    getLatestBlocks();
  }, []);

  return <div className="LatestBlocks"><br />Latest Blocks: {latestBlocks.length > 0 ?
    <ul>
        {latestBlocks.map((item) => {
            return <li key={item.blockNumber}>Block number: <Link to={`block/${item.blockNumber}`}>{item.blockNumber}</Link>  &nbsp; | &nbsp; {item.timeStamp.toFixed()} secs ago<br /><br /></li>
        })}
    </ul>
    : 'Loading..'}</div>;
}

export default LatestBlocks;
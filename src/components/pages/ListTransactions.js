import { Alchemy, Network } from 'alchemy-sdk';
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

function ListTransactions() {
  const [listTransactions, setListTransactions] = useState([]);

  let { id } = useParams();

  useEffect(() => {
    async function getListTransactions() {

      const getBlock = await alchemy.core.getBlock(Number(id));
      
      setListTransactions(getBlock.transactions);
    }

    getListTransactions();
  }, []);

  return <div className="ListTransactions">For Block: {id}<br /><br />
    List of Transactions:<br /><br />
    <ul>
        {listTransactions.map((item, i) => {
            return <li key={i}>Transaction Hash: <Link to={`/hash/${item}`}>{item}</Link><br /><br /></li>
        })}
    </ul>
  </div>;
}

export default ListTransactions;
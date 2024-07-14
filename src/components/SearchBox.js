import { Alchemy, Network } from 'alchemy-sdk';
import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';

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

function SearchBox() {
  const [searchBox, setSearchBox] = useState();

  // useEffect(() => {
  //   // async function getSearchBox() {
  //   //   setSearchBox(await alchemy.core.getSearchBox());
  //   // }

  //   // getSearchBox();
  // }, []);

  const history = useHistory();

  function onChange(e) {
    setSearchBox(e.target.value);
  }

  function handleSubmit() {
    if(searchBox.length == 66) {
      history.push(`/hash/${searchBox}`, { replace: true })
    }else if(searchBox.length == 42) {
      history.push(`/address/${searchBox}`, { replace: true })
    }else {
      history.push(`/block/${searchBox}`, { replace: true })
    }
  }


  return <div className="SearchBox"><br /><form onSubmit={handleSubmit}>
    <label>The Ethereum Blockchain Explorer: </label>
    <input type="text" placeholder='Search by Address / Txn Hash / Block Number' size="70" onChange={onChange} />
    <input type="submit" value="Search" onChange={() => onChange("")} />
</form><br /> <br />
</div>;
}

export default SearchBox;
// import { Alchemy, Network } from 'alchemy-sdk';
import GasPrice from './components/gas/GasPrice';
import BaseFee from './components/gas/BaseFee';
import PriorityFee from './components/gas/PriorityFee';
import LatestBlocks from './components/LatestBlocks';
import LatestTransactions from './components/LatestTransactions';
import Address from './components/pages/Address';
import Block from './components/pages/Block';
import Transaction from './components/pages/Transaction';
import ListTransactions from './components/pages/ListTransactions';

import './App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import SearchBox from './components/SearchBox';

// Refer to the README doc for more information about using API
// keys in client-side code. You should never do this in production
// level code.
// const settings = {
//   apiKey: process.env.REACT_APP_ALCHEMY_API_KEY,
//   network: Network.ETH_MAINNET,
// };


// In this week's lessons we used ethers.js. Here we are using the
// Alchemy SDK is an umbrella library with several different packages.
//
// You can read more about the packages here:
//   https://docs.alchemy.com/reference/alchemy-sdk-api-surface-overview#api-surface
// const alchemy = new Alchemy(settings);

function App() {
  return <div>
    <BrowserRouter>
      <Switch>
        <Route exact path="/">
          <SearchBox/>
          <GasPrice/>
          <BaseFee/> 
          <PriorityFee/>
          <LatestBlocks/>
          <LatestTransactions/>
        </Route>
        <Route path="/address/:id">
          <SearchBox/>
          <Address/>
        </Route>
        <Route path="/block/:id">
          <SearchBox/>
          <Block/>
        </Route>
        <Route path="/hash/:id">
          <SearchBox/>
          <Transaction/>
        </Route>
        <Route path="/txs/:id">
          <SearchBox/>
          <ListTransactions/>
        </Route>
      </Switch>
    </BrowserRouter>
  </div>;
}

export default App;

import { Alchemy, Network, Utils } from 'alchemy-sdk';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { ethers } from "ethers";

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

function AccountInfo() {
  const [accountInfo, setAccountInfo] = useState({
    ens: "",
    ethBalance: 0,
    countTx: 0,
    tokenCount: 0,
    usdtBalance: 0,
    usdcBalance:0,
  });

  let { id } = useParams();

  useEffect(() => {
    async function getAddress() {

      const provider = new ethers.JsonRpcProvider("https://eth-mainnet.g.alchemy.com/v2/nFy6hBgf0eiuiYM9C2qIJIL8fUvsBKEn");
      const ens = await provider.lookupAddress(id.toString());

      const balance = await alchemy.core.getBalance(id, "latest");
      const ethBalance = Utils.formatUnits(balance.toString(), "ether");
        
      const countTx = await alchemy.core.getTransactionCount(id);

      const getTokenBalance = await alchemy.core.getTokenBalances(id);
      let tokenBalances = getTokenBalance.tokenBalances;

      const tokenCount = tokenBalances.length;

      const usdtAddress = "0xdac17f958d2ee523a2206206994597c13d831ec7";
      let usdtBalance = 0;
      for (let i = 0; i < tokenCount; i++) {
        if(tokenBalances[i].contractAddress === usdtAddress) {
            usdtBalance = Number(tokenBalances[i].tokenBalance) / 1000000;
        }
      }

      const usdcAddress = "0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48";
      let usdcBalance = 0;
      for (let i = 0; i < tokenCount; i++) {
        if(tokenBalances[i].contractAddress === usdcAddress) {
            usdcBalance = Number(tokenBalances[i].tokenBalance) / 1000000;
        }
        
    }

      setAccountInfo({
        ens: ens,
        ethBalance: ethBalance,
        countTx: countTx,
        tokenCount: tokenCount,
        usdtBalance: usdtBalance,
        usdcBalance: usdcBalance,
      });
    }

    getAddress();
  }, []);

  return <div className="Address"> <br /> Address: {id} <br /><br />
    ENS: {accountInfo.ens == null ? "This address has not ENS!" : accountInfo.ens}<br /><br />
    ETH Balance: {accountInfo.ethBalance + " ETH"}<br /><br />
    Total of Sent Transactions: {accountInfo.countTx}<br /><br />
    Token Holding: {accountInfo.tokenCount + " Tokens"} 
      <ul>
        <li>{accountInfo.usdtBalance != 0 ? accountInfo.usdtBalance + " USDT" : "There is no USDT!"}</li><br />
        <li>{accountInfo.usdcBalance != 0 ? accountInfo.usdcBalance + " USDC" : "There is no USDC!"}</li>
      </ul>
  </div>;
}

export default AccountInfo;
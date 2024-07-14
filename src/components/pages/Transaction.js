import { Alchemy, Network, Utils } from 'alchemy-sdk';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { ethers } from "ethers";
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

function TransactionInfo() {
  const [transactionInfo, setTransactionInfo] = useState({
    status: 0,
    blockNumber:0,
    from: 0,
    fromEns: 0,
    to:0,
    toEns: 0,
    value:0,
    transactionFee: 0,
    gasPrice:0,
});

  let { id } = useParams();

  useEffect(() => {
    async function getTransactionInfo() {

      const getTxReceipt = await alchemy.core.getTransactionReceipt(id);
      const status = getTxReceipt.status;

      const getTX = await alchemy.transact.getTransaction(id);

      const blockNumber = getTX.blockNumber;

      const from = getTX.from;
      const provider = new ethers.JsonRpcProvider("https://eth-mainnet.g.alchemy.com/v2/nFy6hBgf0eiuiYM9C2qIJIL8fUvsBKEn");
      const fromEns = await provider.lookupAddress(from.toString());

      const to = getTX.to;
      const toEns = await provider.lookupAddress(to.toString());

      const value = Utils.formatUnits((Number(getTX.value)).toString(), "ether");

      const gasUsed = Number(getTX.gasLimit);
      const transactionFee = Utils.formatUnits((Number(getTX.gasPrice) * gasUsed).toString(), "ether");

      const gasPrice = Utils.formatUnits((getTX.gasPrice).toString(), "gwei");
      
      setTransactionInfo({
        status: status,
        blockNumber: blockNumber,
        from: from,
        fromEns: fromEns,
        to: to,
        toEns: toEns,
        value: value,
        transactionFee: transactionFee,
        gasPrice: gasPrice,
      });
    }

    getTransactionInfo();
  }, []);

  return <div className="Transaction">Transaction Hash: {id}<br /><br />
    Status: {transactionInfo.status == 1 ? "success" : "fail"}<br /><br />
    Block: <Link to={`/block/${transactionInfo.blockNumber}`}>{transactionInfo.blockNumber}</Link><br /><br />
    From: <Link to={`/address/${transactionInfo.from}`}>{transactionInfo.fromEns == null ? transactionInfo.from : transactionInfo.fromEns}</Link><br /><br />
    To: <Link to={`/address/${transactionInfo.to}`}>{transactionInfo.toEns == null ? transactionInfo.to : transactionInfo.toEns}</Link><br /><br />
    Value: {transactionInfo.value} ETH<br /><br />
    Transaction Fee: {transactionInfo.transactionFee} ETH<br /><br />
    Gas Price: {transactionInfo.gasPrice} Gwei ({(transactionInfo.gasPrice / 1000000000)} ETH)
  </div>;
}

export default TransactionInfo;
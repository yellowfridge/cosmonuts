import { Button, Popup } from 'semantic-ui-react';
import { useState, useEffect } from 'react';
import detectEthereumProvider from '@metamask/detect-provider';
import Web3 from 'web3';
import CosmoNuts from '../ethereum/build_manual/CosmoNuts_abi.json';

export default function Mint(props) {

  const [load, setLoad] = useState(false);
  const [userAddress, setUserAddress] = useState('');
  const [isConnected, setIsConnected] = useState(false);
  const [helperMessage, setHelperMessage] = useState('');

  async function getInitialStates() {
    let address;
    let connection;
    let message;
    const provider = await detectEthereumProvider();
    if (provider.selectedAddress === null) {
      address = 'None';
      connection = false;
      message = 'Need to connect to MetaMask.'
    } else {
      address = provider.selectedAddress;
      connection = true;
      message = 'If you stick around after clicking, you will get confirmation on transaction.'

    }
    setUserAddress(address);
    setIsConnected(connection);
    setHelperMessage(message);
  }

  useEffect(() => {
    getInitialStates();
  });

  const mintClicked = async () => {
    setLoad(true);
    const provider = await detectEthereumProvider();
    let web3;
    web3 = new Web3(provider);
    var cosmonuts = new web3.eth.Contract(
      CosmoNuts,
      '0xb97C6312F412b58cCfac2c0E63609df0c2599CAa' // Need to set this in one place
    );

    const isSaleActive = await cosmonuts.methods.saleIsActive().call();
    console.log('IS SALE ON?', isSaleActive);

    const nutPrice = await cosmonuts.methods.nutPrice().call();
    console.log("Nut Price", nutPrice, 'type', typeof nutPrice);

    var numOfTokens = '1';
    const mintedNut = await cosmonuts.methods.mintNut(numOfTokens).send({
      from: provider.selectedAddress,
      value: nutPrice
    }).on('transactionHash', function(hash) {
      console.log("Transaction Hash:", hash);
    }).on('receipt', function(receipt) {
      console.log("Receipt", receipt);
    }).on('error', function(error, receipt) {
      console.log("Error:", error);
      console.log("Receipt", receipt);
    });

    setLoad(false);

    // Reloading the page to grab all new props after your mint
    window.location.reload(true);
  }

  return (
    <Popup
      content={helperMessage}
      trigger = {
        <div>
          <Button
            inverted
            style = {{
              backgroundColor: 'purple'
            }}
            content='MINT'
            primary
            onClick={mintClicked}
            loading={load}
            disabled={!isConnected}
          />
        </div>
      }
    />
  )

}

//Old Code
/*
<div>
  <Popup
    content={helperMessage}
    trigger = {
      <div>
        <Button
          inverted
          style = {{
            backgroundColor: 'purple'
          }}
          content='MINT'
          primary
          onClick={mintClicked}
          loading={load}
          disabled={!isConnected}
        />
      </div>
    }
  />
</div>
*/

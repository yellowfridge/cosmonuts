import { Button, Popup } from 'semantic-ui-react';
import Head from 'next/head';
import Header from './header';
import { Router } from '../routes';
import { useState, useEffect } from 'react';
import detectEthereumProvider from '@metamask/detect-provider';
import CosmoNuts from '../ethereum/build_manual/CosmoNuts_abi.json';
import Web3 from 'web3';

export default function Connect(props) {

  const [load, setLoad] = useState(false);
  const [content, setContent] = useState('Connect');
  const [userAddress, setUserAddress] = useState('');
  const [isConnected, setIsConnected] = useState(false);
  const [helperMessage, setHelperMessage] = useState('');
  const [numNuts, setNumNuts] = useState(0);
  const [hasNuts, setHasNuts] = useState(false);
  const [firstNutId, setFirstNutId] = useState(''); // Not yet complete
  // Need to work on this where the first nut info is sent to user page
  // Instead of first nut on userpage, it should be figured out here

  async function getInitialStates() {
    let address;
    let connection;
    let message;
    let currentPath = Router.pathname;
    const provider = await detectEthereumProvider();
    if (provider.selectedAddress === null) { // If it can not find a provider
      if (currentPath.includes('/users')) { // If in users already, push to index
        Router.push('/'); // Still takes a bit time as userpage loads
        // NEED to find a better way to restrict access to this page
      }

      address = 'None';
      connection = false;
      message = 'Make sure to have MetaMask installed.'
    } else {
      address = provider.selectedAddress;
      connection = true;
      message = 'Navigate to MetaMask plugin to disable manually and refresh page.'
      setContent('Already Connected');
    }
    setUserAddress(address);
    setIsConnected(connection);
    setHelperMessage(message);
  }

  useEffect(() => {
    getInitialStates();
  }, []); // Putting the empty array makes it fire only once

  const checkNuts = async (account) => {
    console.log("Nut checking ...");
    const web3 = new Web3(window.ethereum);
    // THIS ADDRESS BELOW NEEDS TO BE BECOME DYNAMIC
    var cosmoNuts = new web3.eth.Contract(CosmoNuts, '0xb97C6312F412b58cCfac2c0E63609df0c2599CAa');

    // *** ERROR *** THIS DOESNT WORK -- THERE IS NO ADDRESS FROM ABOVE
    // if using process.env.COSMONUTS_ADDRESS
    await cosmoNuts.methods.balanceOf(account).call().then((numNuts) => {
      if (numNuts > 0) {
        console.log("You've got nuts, son!");
        setHasNuts(true);
        setNumNuts(numNuts);
      } else {
        console.log("Connected, but no nuts found.")
      }

    });
  }

  const connectClicked = async () => {
    setLoad(true);
    try {
      // Will attempt to get accounts and prompt user if not available
      await ethereum.request({ method: 'eth_requestAccounts' }).then((accounts) => {
        console.log("Connected Account", accounts[0]);
        checkNuts(accounts[0]);

      });
    } catch (err) {
      console.log(err);
    }

    setLoad(false);
  }

  // Need to send over a new web3 and cosmonuts instance to userpage
  // Will use this data to determine is user has nuts and can naviage to userpage
  // Also should grab the users first nut to render in userpage when needed
  //  This will eliminate the findFirst garbage in userpage

  return (
    <div>
      <Popup
        content={helperMessage}
        trigger = {
          <div>
            <Button
              inverted
              content={content}
              icon="add circle"
              primary
              onClick={connectClicked}
              loading={load}
              disabled={isConnected}
            />
          </div>
        }
      />
    </div>
  )

}

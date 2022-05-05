import { Button, Popup } from 'semantic-ui-react';
import Head from 'next/head';
import Header from './header';
import { Router } from '../routes';
import { useState, useEffect } from 'react';
import detectEthereumProvider from '@metamask/detect-provider';

export default function Connect(props) {

  const [load, setLoad] = useState(false);
  const [content, setContent] = useState('Connect');
  const [userAddress, setUserAddress] = useState('');
  const [isConnected, setIsConnected] = useState(false);
  const [helperMessage, setHelperMessage] = useState('');

  async function getInitialStates() {
    let address;
    let connection;
    let message;
    let currentPath = Router.pathname;
    const provider = await detectEthereumProvider();
    if (provider.selectedAddress === null) { // If it can not find a provider
      if (currentPath.includes('/users')) { // If in users already, push to index
        Router.push('/'); // Still takes a bit time as userpage loads
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

  const connectClicked = async () => {
    setLoad(true);
    try {
      // Will attempt to get accounts and prompt user if not available
      await ethereum.request({ method: 'eth_requestAccounts' });
    } catch (err) {
      console.log(err);
    }

    window.location.reload(true); // Documentation suggests a refresh
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

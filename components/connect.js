import { Button, Popup } from 'semantic-ui-react';
import Head from 'next/head';
import Header from './header';
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
    const provider = await detectEthereumProvider();
    if (provider.selectedAddress === null) {
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
  });

  const connectClicked = async () => {
    setLoad(true);
    try {
      await ethereum.request({ method: 'eth_requestAccounts' });
    } catch (err) {
      console.log(err);
    }
    window.location.reload(true); // Documnetation suggests a refresh
  }

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

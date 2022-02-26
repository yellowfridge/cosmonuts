import { Container, Button } from 'semantic-ui-react';
import Head from 'next/head';
import Header from './header';
import { useState, useEffect } from 'react';
import { useWeb3React } from '@web3-react/core'
import { injected } from '../ethereum/components/wallet/connectors';

export default function Login(props) {
  const { active, activate, deactivate } = useWeb3React();

  const [activeStatus, setActiveStatus] = useState(props.isWalletConnected);

  useEffect(() => {
    const setActive = () => {
      setActiveStatus(active);
    }
    setActive();
  }, [])

  const walletClicked = async () => {
    try {
      await activate(injected);
      setActiveStatus(true);
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div>
      <Button
        content="Connect Wallet"
        icon="add circle"
        primary
        onClick={walletClicked}
      />
    </div>
  )

}

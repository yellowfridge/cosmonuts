import { useState, useEffect } from 'react';
import { useWeb3React } from '@web3-react/core'
import { injected } from '../ethereum/components/wallet/connectors';
import { Button } from 'semantic-ui-react';

export default function Web3Connector(props) {
  const { active, account, library, connector, activate, deactivate } = useWeb3React()

  const [activeStatus, setActiveStatus] = useState(props.isWalletConnected);
  const [connectWalletClick, setConnectWalletClick] = useState(props.connectWalletClick);

  /*
  async function connect() {
    try {
      await activate(injected)
      localStorage.setItem('isWalletConnected', true)
    } catch (ex) {
      console.log(ex)
    }
  }

  async function disconnect() {
    try {
      deactivate()
      localStorage.setItem('isWalletConnected', false)
    } catch (ex) {
      console.log(ex)
    }
  }
  */

  useEffect(() => {
    const setActive = () => {
      setActiveStatus(active);
    }
    setActive();

    /*
    const connectWalletOnPageLoad = async () => {
      if (localStorage?.getItem('isWalletConnected') === 'true') {
        try {
          await activate(injected)
          localStorage.setItem('isWalletConnected', true)
        } catch (ex) {
          console.log(ex)
        }
      }
    }
    connectWalletOnPageLoad();
    */

  }, [])

  const walletClicked = async () => {
    try {
      await activate(injected);
      setActiveStatus(true);
    } catch (err) {
      console.log(err);
    }
    setConnectWalletClick(false);
  }

  return (
    <div>
      <Button
        floated="left"
        content="CONNECT WALLET FUNCTION"
        icon="add circle"
        primary
        onClick={walletClicked}
      />
    </div>
  )

}

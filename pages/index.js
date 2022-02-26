import React, { Component } from 'react';
import { Button, List } from 'semantic-ui-react';
import Layout from '../components/layout';
//import { checkConnection, enableUser } from '../ethereum/web3';
//import activate from '../ethereum/web3';
import getProvider from '../ethereum/provider';
import detectEthereumProvider from '@metamask/detect-provider';
//import ConnectWallet from './connect-wallet';
import Web3Connector from './web3connector';

class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      provider: null,
      currentAccount: null,
      isUserConnected: false,
      errorMessage: null,
      isWalletConnected: null,
      connectWalletClick: false
    };

    this.connectUser = this.connectUser.bind(this);
  }

  async componentDidMount() {
    const provider = await detectEthereumProvider();
    this.setState({ provider: provider });

  }

  /*
  connectUser() {
    //web3 = checkConnection();
    //const userAccount = enableUser();
    //web3, userAccount = activate();
    //this.setState({currentAccount: userAccount});
    //let provider = getProvider();
    //this.setState({provider: provider});
    //if (this.state.provider !== window.ethereum) {
    //  console.error("Provider is not window.ethereum");
    //} else {
    //  console.log("Successfully have provider.");
    //}
    console.log(this.state.provider);
  }
  */

  connectUser() {
    console.log("CLICKED THE BIG BLUE CONNECT BUTTON");
  }

  createNFT() {
    console.log("MINT ME THAT MONEY");
  }

  render() {
    return (
      <Layout>
        <div>
          <Web3Connector/>
          <List divided relaxed>
          <List.Item>
            <Button
              floated="left"
              content="Connect Wallet"
              icon="add circle"
              primary
              onClick={this.walletClicked}
              disabled={this.state.isUserConnected}
            />
          </List.Item>
          <List.Item>
            <Button
              floated="left"
              content="Create Unique NFT"
              icon="add circle"
              primary
              onClick={this.createNFT}
            />
          </List.Item>
          </List>
        </div>
      </Layout>
    );
  }
}

export default Main

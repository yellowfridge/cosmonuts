import React, { Component } from 'react';
import { Button, List, Divider, Header } from 'semantic-ui-react';
import Layout from '../components/layout';
import getProvider from '../ethereum/provider';
import detectEthereumProvider from '@metamask/detect-provider';
import ConnectionIPFS from './ipfsConnection';

class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isUserConnected: null,
      currentAccount: null
    };

    //this.connectUser = this.connectUser.bind(this);
  }

  async componentDidMount() {
    const provider = await detectEthereumProvider();
    //this.setState({ provider: provider });

    (() => {
      if (provider.selectedAddress === null) {
        this.setState({
          currentAccount: '',
          isUserConnected: 'No'
        });
      } else {
        this.setState({
          currentAccount: provider.selectedAddress,
          isUserConnected: 'Yes'
        });
      }
    })();

    /*
    (() => {
      if (provider.isMetaMask) {
        this.setState({ isMetaMaskInstalled: 'Yes' });
      } else {
        this.setState({ isMetaMaskInstalled: 'No' });
      }
    })();
    */

    /*
    (async () => {
      try {
        await provider.request({ method: 'eth_requestAccounts' });
      } catch (err) {
        console.log(err);
      }
    })()
    */

    console.log("Provider", provider);
    console.log("END OF COMPONENT DID MOUNT");

  }

  /*
  componentDidUpdate(prevProps, prevState) {
    const checkAccountChanges = () => {
      if (prevState.currentAccount !== this.state.currentAccount) {
        this.setState({
          currentAccount: this.state.currentAccount
        })
      }

      if (prevState.isUserConnected !== this.state.isUserConnected) {
        this.setState({
          isUserConnected: this.state.isUserConnected
        })
      }
    }

  }
  /*

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

  render() {
    //console.log("PROVIDER RENDER", this.state.provider);

    return (
      <Layout>
        <div>
          <List divided relaxed>
            <List.Item>
              <h3>Let's get cracking. Showing all the data we are pulling below.</h3>
            </List.Item>
            <List.Item>
              <h4>
                <p>Is User Connected? {this.state.isUserConnected}</p>
                <p>User Account Number: {this.state.currentAccount}</p>
              </h4>
            </List.Item>
            <Divider horizontal>
              <Header as='h4'>
                IPFS Functionality
              </Header>
            </Divider>
            <ConnectionIPFS />
            <Divider horizontal>
              <Header as='h4'>
                QR Code Functionality
              </Header>
            </Divider>
          </List>
        </div>
      </Layout>
    );
  }
}

export default Main

import React, { Component } from 'react';
import { Button, List, Divider, Header, Container } from 'semantic-ui-react';
import Layout from '../components/layout';
import detectEthereumProvider from '@metamask/detect-provider';
import ImageGenerator from './imagegenerator';
import QRCode from 'react-qr-code';
import Mint from './mint';
import Web3 from 'web3';
import web3_inf from '../ethereum/web3_inf';
import CosmoNuts from '../ethereum/build_manual/CosmoNuts_abi.json';

// Latest deployed CosmoNuts address: 0x66023f6da39cbffd7ad4f287ad4f8b44e0725167
// https://ropsten.etherscan.io/tx/0xe207cdcc1a558b06f5790d409c222eb5fa1652f22a7a820c41a235b3b3a7094e
// Deployed on Ropsten(3) network

class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isUserConnected: null,
      currentAccount: null,
      isSaleActive: null
    };

    //this.connectUser = this.connectUser.bind(this);
  }

  handleAccountChange(id) {
    this.setState({ currentAccount: id })
  }

  async componentDidMount() {
    var provider = await detectEthereumProvider();
    //console.log("Provider", provider);

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

    console.log("END OF COMPONENT DID MOUNT");

  }

  render() {

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
            <Container textAlign='center'>
              <Mint />
            </Container>
            <Divider horizontal>
              <Header as='h4'>
                IPFS Functionality
              </Header>
            </Divider>
            <ImageGenerator />
          </List>
        </div>
      </Layout>
    );
  }
}

export default Main

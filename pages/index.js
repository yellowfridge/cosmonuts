import React, { Component } from 'react';
import { Button, List, Divider, Header, Container } from 'semantic-ui-react';
import Layout from '../components/layout';
import detectEthereumProvider from '@metamask/detect-provider';
import ImageGenerator from './imagegenerator';
import QRCode from 'react-qr-code';
import Mint from './mint';

class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isUserConnected: null,
      currentAccount: null,
      qrCodeValue: 'https://www.youtube.com/watch?v=DLzxrzFCyOs'
    };

    //this.connectUser = this.connectUser.bind(this);
  }

  async componentDidMount() {
    const provider = await detectEthereumProvider();

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

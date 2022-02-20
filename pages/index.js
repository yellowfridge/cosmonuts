import React, { Component } from 'react';
import { Button, List } from 'semantic-ui-react';
import Layout from '../components/layout';
import defaultAccount from '../ethereum/default_account';
import enableUser from '../ethereum/user_account';

class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentAcct: defaultAccount,
      isUserConnected: false,
      errorMessage: ''
    };

    // ?? This binding is necessary to make 'this' work in the callback
    this.connectUser = this.connectUser.bind(this);
  }

  connectUser() {
    const userAccount = enableUser()
    this.setState({currentAcct: userAccount});
  }

  createNFT() {
    console.log("MINT ME THAT MONEY");
  }

  render() {
    return (
      <Layout>
        <div>
          <h1>CREATE YOUR OWN UNIQUE NFT</h1>
          <List divided relaxed>
          <List.Item>
            <Button
              floated="left"
              content="Connect Ethereum Account"
              icon="add circle"
              primary
              onClick={this.connectUser}
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

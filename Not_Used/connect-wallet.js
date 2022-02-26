import React, { Component, useEffect, useState } from 'react';
import { Button } from 'semantic-ui-react';
//import ReactDOM from 'react-dom';

import { useWeb3React } from "@web3-react/core";
import { injected } from "../ethereum/components/wallet/connectors";
//import { activate } from "./web3-react";

/*
const web3React = () => {
  console.log(useWeb3React());
  useState(useWeb3React());
}
console.log(web3React);
*/

//const web3React = () => {
//  const {activate, deativate} = useWeb3React();
//}

/*
const Web3React = () => {
  const { activate, deactivate } = useWeb3React();

  async function connect() {
    try {
      await activate(injected);
      localStorage.setItem('isWalletConnected', true)
    } catch (ex) {
      console.log(ex);
    }
  }

  async function disconnect() {
    try {
      deactivate();
      localStorage.setItem('isWalletConnected', false)
    } catch (ex) {
      console.log(ex);
    }
  }
}
*/

class ConnectWallet extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isWalletConnected: null,
      account: null
    }

  }

  //useEffect?
  /*
  async connect() {
    try {
      await activate(injected);
      this.setState({ isWalletConnected: true });
    } catch (ex) {
      console.log(ex);
    }
  }

  async disconnect() {
    try {
      deactivate();
      this.setState({ isWalletConnected: false });
    } catch (ex) {
      console.log(ex);
    }
  }
  */

  render() {
    return (
      <div>
        <Button
          floated="left"
          content="Connect Wallet"
          icon="add circle"
          primary
          onClick={Web3React}
        />
      </div>
    )
  }

}

export default ConnectWallet

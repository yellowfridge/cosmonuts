import React, { Component } from 'react';
import { Button, List, Divider, Container, Grid } from 'semantic-ui-react';
import Layout from '../components/layout';
//import detectEthereumProvider from '@metamask/detect-provider';
//import ImageGenerator from './imagegenerator';
import QRCode from 'react-qr-code';
import Mint from './mint';
//import Web3 from 'web3';
import CosmoNuts from '../ethereum/build_manual/CosmoNuts_abi.json';
import Image from 'next/image';
import { Parallax, ParallaxLayer } from '@react-spring/parallax';
import Galaxy from './galaxy';
import colorfulnebula1 from '../public/images/colorfulnebula12.gif';
import parseImage from '../components/helpers/parseimage';
import nut from '../metadata/nut0.json';
//import web3_inf from '../ethereum/web3_inf';
//import cosmonuts from '../ethereum/cosmonuts';
import provider from '../ethereum/provider';
//import { getWeb3Library } from './_app';
//import Web3ReactProvider from './_app';

// Latest deployed CosmoNuts address: 0x66023f6da39cbffd7ad4f287ad4f8b44e0725167
// https://ropsten.etherscan.io/tx/0xe207cdcc1a558b06f5790d409c222eb5fa1652f22a7a820c41a235b3b3a7094e
// Deployed on Ropsten(3) network

class Main extends Component {
  constructor(props) {
    super(props);
    console.log("IN: Main Component of Index");

    provider.then((provider) => {
      console.log("Provider Address in index", provider.selectedAddress);
    });

    if (provider.selectedAddress === null) {
      this.state = {
        currentAccount: '',
        isUserConnected: 'No'
      };
    } else {
      this.state = {
        currentAccount: provider.selectedAddress,
        isUserConnected: 'Yes'
      };
    }

    this.state = {
      //isUserConnected: null,
      //currentAccount: null,
      isSaleActive: 'Not Known',
      totalSupply: 'Not Known',
      backgroundSource: null,
      selectedNut: '0',
      embeddedImgSrc: nut.embedded_image
    };

    this.interpretImage = this.interpretImage.bind(this);
  }

  //static async getInitialProps(props) {
    //console.log("IN: Initial Props of Index");
    //const test = "1"
    //const web3 = <Web3ReactProvider getWeb3Library={provider} />
    //const web3 = this.getWeb3Library(provider);
    //console.log("Web3 in intial props", web3);


    //return { web3 }
  //}

  async componentDidMount() {
    //document.body.style.backgroundImage = `url(${darkblack_img.src})`;
    //var starfield = <Starfield />;
    //console.log("Starfield", starfield);
    //document.body.style.backgroundSize = 'cover';
    //console.log("web3", this.props.web3);

    //var provider = await detectEthereumProvider();

    console.log("web3 component did mount",web3);

    /*
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
    */

    //this.interpretImage();

  }

  interpretImage() {
    var nutImg = document.getElementById('nutImg');
    var parsedImage = parseImage(nutImg);

    this.setState({
      embeddedImgSrc: parsedImage
    });
  }

  render() {

    //console.log("Background Image:", darkblack_img.src);

    return (
      <Parallax pages={3}>

        <ParallaxLayer
          sticky={{ start: 0, end: 3 }}
          style={{
            height: 'auto'
          }}
        >
          <Layout />
        </ParallaxLayer>

        <ParallaxLayer
          offset={0.7}
          speed={.1}
          style={{
            display: 'flex',
            justifyContent: 'center'
          }}
        >
          <Mint />
        </ParallaxLayer>

        <ParallaxLayer offset={1} speed={3} style={{
          backgroundColor: '#ff6d6d'
        }}
        >
          <div style={{
            marginLeft: '10px'
          }}>
            <h4>
              <p>In a nutshell, CosmoNuts are pictures with embedded attributes.</p>
              <p>See current Nuts now or upload your own picture to investigate.</p>
            </h4>

            <Grid columns={2}>
              <Grid.Column>
                <img id='nutImg' src='https://ipfs.io/ipfs/QmPChG9e5hguv2pYffPPYfAjpdgVR5M2h68anbXi3afGtV' width='631' height='631' />
              </Grid.Column>

              <Grid.Column>
                <img id='embeddedNutImg' src={this.state.embeddedImgSrc} width="631" height="631" />
              </Grid.Column>
            </Grid>
          </div>

          <div style={{
            display: 'flex',
            justifyContent: 'center',
            marginTop: '20px'
          }}>
            <Button
              content='Interpret Embedded Image'
              onClick={this.interpretImage}
            />
          </div>
        </ParallaxLayer>

        <ParallaxLayer offset={2} speed={1} style={{
          backgroundImage: `url(${colorfulnebula1.src})`,
          backgroundSize: 'cover',
          opacity: 0.3
        }}
        />

        <ParallaxLayer
          offset={2}
          speed={1}
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            color: 'purple',
          }}>
          <List divided relaxed>
            <List.Item>
              <h3>Let's get cracking. Showing all the data we are pulling below.</h3>
            </List.Item>
            <List.Item>
              <h4>
                <p>Is User Connected? {this.state.isUserConnected}</p>
                <p>User Account Number: {this.state.currentAccount}</p>
                <p>Is Sale Active: {this.state.isSaleActive}</p>
                <p>Supply Status: {this.state.totalSupply}</p>
              </h4>
            </List.Item>

          </List>
        </ParallaxLayer>
      </Parallax>

    );
  }
}

export default Main

//Original IPFS for Bored Ape Example
// Source for nutImg src='https://ipfs.io/ipfs/QmTHcV6mGxHGeeXCnYtV129eRiR8Exni4sT8dDikBWBgzY'

//<div style={{ background: '#778fde' }}>

/*
To include a background image for a div tag
<div style={{
  backgroundImage: `url(${darkblack_img.src})`,
  backgroundSize: 'cover'
}}>
*/

/*
To set as background color
<style>{'body { background-color: black; }'}</style>
*/

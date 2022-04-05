import React, { Component } from 'react';
import { Button, List, Divider, Header, Container } from 'semantic-ui-react';
import Layout from '../components/layout';
import detectEthereumProvider from '@metamask/detect-provider';
import ImageGenerator from './imagegenerator';
import QRCode from 'react-qr-code';
import Mint from './mint';
import Web3 from 'web3';
import CosmoNuts from '../ethereum/build_manual/CosmoNuts_abi.json';
import Image from 'next/image';
import darkblack_img from '../public/images/darkblack_flatring.jpg';
import galaxy_img from '../public/images/galaxy_center.jpg';
import { Parallax, ParallaxLayer } from '@react-spring/parallax';
import Galaxy from './galaxy';
import sharp_nebula1 from '../public/images/sharp_nebula1.gif';

// Latest deployed CosmoNuts address: 0x66023f6da39cbffd7ad4f287ad4f8b44e0725167
// https://ropsten.etherscan.io/tx/0xe207cdcc1a558b06f5790d409c222eb5fa1652f22a7a820c41a235b3b3a7094e
// Deployed on Ropsten(3) network

class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isUserConnected: null,
      currentAccount: null,
      isSaleActive: 'Not Known',
      totalSupply: 'Not Known',
      backgroundSource: null
    };

  }

  async componentDidMount() {
    //document.body.style.backgroundImage = `url(${darkblack_img.src})`;
    //var starfield = <Starfield />;
    //console.log("Starfield", starfield);

    //document.body.style.backgroundSize = 'cover';

    var provider = await detectEthereumProvider();

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

  }

  render() {

    //console.log("Background Image:", darkblack_img.src);

    return (
      <div>

        <Parallax pages={3}>

          <ParallaxLayer
            sticky={{ start: 0, end: 3 }}
          >
            <Layout />
          </ParallaxLayer>

          <ParallaxLayer
            offset={0}
            speed={2}
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center'
            }}
          >
            <Mint />
          </ParallaxLayer>

          <ParallaxLayer offset={0.5} style={{
            opacity: 0.2
          }}>
            <img
              alt="nebula1"
              src={sharp_nebula1.src}
            />
          </ParallaxLayer>

          <ParallaxLayer offset={1} speed={3}>
            <Galaxy />
          </ParallaxLayer>

          <ParallaxLayer offset={2} speed={2} style={{
            backgroundImage: `url(${sharp_nebula1.src})`,
            backgroundSize: 'cover',
            opacity: 0.2
          }}
          />

          <ParallaxLayer
            offset={1}
            speed={1}
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              color: 'white',
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
      </div>

    );
  }
}

export default Main

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

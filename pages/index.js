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
//import cosmonuts from '../ethereum/cosmonuts';
//import provider from '../ethereum/provider';
import cosmos from '../metadata/cosmonuts.json';
import { getInitialNutData } from '../components/helpers/apiRequests';

// Latest deployed CosmoNuts address: 0xb97C6312F412b58cCfac2c0E63609df0c2599CAa
// Deployed on Ropsten(3) network

class Main extends Component {
  constructor(props) {
    super(props);
    console.log("IN: Main Component of Index");
    //console.log("Testing Variable -- isActive cosmonuts", this.props.isActive);

    const isSaleActive = () => {
      if (this.props.isActive) {
        return 'Yes';
      } else {
        return 'No';
      }
    }

    this.state = {
      isUserConnected: null,
      currentAccount: null,
      isSaleActive: (() => { return isSaleActive() })(),
      totalSupply: 'Not Known',
      backgroundSource: null,
      selectedNut: '0',
      embeddedImgSrc: nut.embedded_image
    };

    this.interpretImage = this.interpretImage.bind(this);
  }

  static async getInitialProps(props) {
    console.log("IN: Initial Props of Index");
    const baseURL = "https//ipfs/ipns/";

    getInitialNutData().then((nutData) => {
      return nutData;
    }).catch((err) => {
      new Error('Error in getting nuts ...', err);
    });
    const nutData = await getInitialNutData();

    const cosmoCID = nutData.cosmoCID;
    const cosmoMetaPath = baseURL + cosmoCID;
    console.log("Cosmo Meta Path", cosmoMetaPath);

    return {
      cosmoCID: cosmoCID,
      cosmosMetaPath: cosmoMetaPath,
      cosmoCID: cosmos.cosmonuts.ipnsCID,
      cosmoContractAddress: cosmos.cosmonuts.contract_address,
      cosmoOwnerAddress: cosmos.cosmonuts.owner_address,
      cosmoNuts: cosmos.nuts,
      isActive: nutData.isActive,
      totalSupply: nutData.totalSupply,
      maxNuts: nutData.maxNuts,
      nutPrice: nutData.nutPrice,
      maxNutPurchase: nutData.maxNutPurchase,
      revealTimeStamp: nutData.revealTimeStamp,
    }
  }

  async componentDidMount() {
    //document.body.style.backgroundImage = `url(${darkblack_img.src})`;
    //var starfield = <Starfield />;
    //console.log("Starfield", starfield);
    //document.body.style.backgroundSize = 'cover';
    //console.log("web3", this.props.web3);

    (() => {
      if (ethereum.selectedAddress === null) {
        this.setState({
          currentAccount: 'Not Known',
          isUserConnected: 'No'
        });
      } else {
        this.setState({
          currentAccount: ethereum.selectedAddress,
          isUserConnected: 'Yes'
        });
      }
    })();

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
          offset={0.2}
          speed={.3}
        >
          <Container>
            <Grid columns={2} style={{
              width: '600px'
            }}>
              <Grid.Column>
                <h3>Am I able to mint my nuts?</h3>
              </Grid.Column>

              <Grid.Column>
                <h3>{this.state.isSaleActive}</h3>
              </Grid.Column>
            </Grid>
          </Container>
        </ParallaxLayer>

        <ParallaxLayer
          offset={0.35}
          speed={.5}
          style={{
            display: 'flex',
            marginLeft: '50%'
          }}
        >
          <Container>
            <Grid textAlign='center' columns={3} style={{
              width: '500px'
            }}>
              <Grid.Column>
                <Grid.Row>
                  <h3>Total Minted</h3>
                </Grid.Row>

                <Grid.Row>
                  <h3>{this.props.totalSupply}</h3>
                </Grid.Row>
              </Grid.Column>

              <Grid.Column verticalAlign='middle' style={{
                width: '50px'
              }}>
                <h1>/</h1>
              </Grid.Column>

              <Grid.Column>
                <Grid.Row>
                  <h3>Total Available</h3>
                </Grid.Row>

                <Grid.Row>
                  <h3>{this.props.maxNuts}</h3>
                </Grid.Row>
              </Grid.Column>
            </Grid>
          </Container>
        </ParallaxLayer>

        <ParallaxLayer
          offset={0.55}
          speed={.7}
          style={{
            display: 'flex',
            marginLeft: '10%'
          }}
        >
        <Container>
          <Grid columns={2} style={{
            width: '500px'
          }}>
            <Grid.Column>
              <h3>How much for a nut?</h3>
            </Grid.Column>

            <Grid.Column>
              <h3>{this.props.nutPrice / 1000000000000000000} eth</h3>
            </Grid.Column>
          </Grid>
        </Container>
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

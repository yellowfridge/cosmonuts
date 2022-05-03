import React, { Component } from 'react';
import Layout from '../../components/layout';
//import ImageGenerator from '../imagegenerator';
import QRCode from 'react-qr-code';
import { Parallax, ParallaxLayer } from '@react-spring/parallax';
import { Container, Form, Button, Grid , Dropdown} from 'semantic-ui-react';
import embedImage from '../../components/helpers/embedimage';
import { svgAsPngUri } from 'save-svg-as-png';
import * as IPFS from 'ipfs-core';
import nut from '../../metadata/nut0.json';
import Web3 from 'web3';
import CosmoNuts from '../../ethereum/build_manual/CosmoNuts_abi.json';
import { getSecret, getVerification } from '../../components/helpers/apiRequests';
import addToIPFS from '../../components/helpers/addtoIPFS';
import detectEthereumProvider from '@metamask/detect-provider';
import bs58 from 'bs58';
import EthCrypto from 'eth-crypto';
import getJSONData from '../../components/helpers/getjsondata';
import provider from '../../ethereum/provider';
import cosmos from '../../metadata/cosmonuts.json';

class Userpage extends Component {
  constructor(props) {
    super(props);
    //console.log("Cosmos JSON", this.props.cosmos); // JSON file with all relevant information for CosmoNuts
    console.log("In Userpage");
    //provider.then((res) => {
    //  console.log("Provider in Userpage Constructor", res);
    //});

    this.state = {
      cosmosPath: 'https://ipfs.io/ipns/QmX7r9BfGdoav8QSi163to1RWJiaeABBLS8QjvmeSURLNH',
      nutsHeld: 0,
      nuts: [],
      ownedNuts: [],
      selectedNut: '',
      openMessage: nut.open_message.value,
      openMsgSrc: 'blank',
      openMsgCid: '',
      publicMessage: nut.public_message.value,
      publicMsgSrc: 'blank',
      publicMsgCid: '',
      groupMessage: 'Current group message ...',
      secretMessage: 'Current secret message ...',
      secretKey: 'Should be ecnreypted key ...',
      finalImgSrc: nut.image,
      finalImgSig: '',
      imgVerification: '',
      ddPlaceholder: 'No known nuts',
      ddLoad: true
    };

    this.ddPlaceholderSet = this.ddPlaceholderSet.bind(this);
    this.handleOpenMessage = this.handleOpenMessage.bind(this);
    this.handlePublicMessage = this.handlePublicMessage.bind(this);
    this.handleGroupMessage = this.handleGroupMessage.bind(this);
    this.handleSecretMessage = this.handleSecretMessage.bind(this);
    this.handleDropdownChange = this.handleDropdownChange.bind(this);
    this.generateImage = this.generateImage.bind(this);
    this.openImgSrc = this.openImgSrc.bind(this);
    this.getBytes32FromIPFSHash = this.getBytes32FromIPFSHash.bind(this);
    this.add_0x = this.add_0x.bind(this);

  }

  // This is grabbing the address from the URL
  // accessed with this.props.address
  static async getInitialProps(props) {
    console.log("In getInitialProps of UserPage");

    const { address } = props.query; // Grabbing the address in the URL (user account)

    const baseURL = cosmos.cosmonuts.baseURL; // https://ipfs.io/
    const storageKey = cosmos.cosmonuts.storage_key; // ipns
    const nutsCID = cosmos.nuts; // Contains JSON array data of ipnsCIDs of each nut

    return { address, baseURL, storageKey, nutsCID };
  }

  componentDidMount(props) {
    console.log("Props test", this.props.nutsCID);
    var imgURL = this.openImgSrc(this.state.openMessage);
    this.setState({
      openMsgSrc: imgURL
    });

    const web3 = new Web3(window.ethereum);
    var cosmoNuts = new web3.eth.Contract(CosmoNuts, '0x66023f6da39cbffd7ad4f287ad4f8b44e0725167');

    var ownedNuts = []; // Builds an array to be used for dropdown items

    // Getting total nuts owned and nut ids of each nut
    let nuts = [];
    let nutObjects = [];
    let firstNut;

    const findFirst = async (n, nut) => {
      if (n === 0) {
        return nut
      } else {
        return 'Nut first'
      }
    }

    var getNuts = async () => {
      await cosmoNuts.methods.balanceOf(this.props.address).call().then((numOfNuts) => {
        this.setState({
          nutsHeld: numOfNuts,
          ddPlaceholder: 'Loading Nuts'
        });
        for (let n = 0; n < numOfNuts; n++) {
          (async () => {
            await cosmoNuts.methods.tokenOfOwnerByIndex(this.props.address, n).call().then(async (nut) => {
              nuts[n] = nut; // nut is in string form
              var nutId = parseInt(nut); // convert string to number type
              var nut_cid = this.props.nutsCID[nutId].ipnsCID;
              var nutURL = (this.props.baseURL + this.props.storageKey + "/" + nut_cid);
              var nutInfo = await getJSONData(nutURL).catch((error) => {
                console.log("Could not retrieve data on nut id:", nutId);
              });
              console.log("Nut Info", nutInfo);

              let nutObject = {
                key: nut,
                text: nut,
                value: nut,
                image: { avatar: false } // Later put image and enable small picture
              }
              nutObjects[n] = nutObject;

              (async () => {
                await findFirst(n, nut).then((nut1) => {
                  if (nut1 !== 'Nut first') {
                    this.setState({ selectedNut: nut1 }); // this could be an issue
                    this.ddPlaceholderSet(nut1);
                  }
                });
              })();

            });
          })();
        }
      });
    };


    (async () => {
      await getNuts().then(() => {
        this.setState({
          ownedNuts: nutObjects,
          nuts: nuts,
        });
      });

      this.setState({ ddLoad: false });
    })();

  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.openMessage !== this.state.openMessage) {
      var imgURL = this.openImgSrc(this.state.openMessage);
      this.setState({
        openMsgSrc: imgURL
      });
    }

  }

  openImgSrc(msg) {
    var openMsgCanvas = document.createElement('canvas');
    var openMsgCtx = openMsgCanvas.getContext('2d');
    openMsgCanvas.width = '256';
    openMsgCanvas.height = '256';

    openMsgCtx.fillText(msg, 10, 10);

    var imgURL = openMsgCanvas.toDataURL();

    return imgURL;
  }

  ddPlaceholderSet(firstNut) {
    this.setState({
      ddPlaceholder: firstNut
    });
  }

  handleDropdownChange(event) {
    this.setState({
      selectedNut: event.target.innerText // Fro dropdowns, it is under innerText (as opposed to .value)
    });
  }

  handleOpenMessage(event) {
    this.setState({
      openMessage: event.target.value
    });
  }

  handlePublicMessage(event) {
    this.setState({
      publicMessage: event.target.value
    });
  }

  handleGroupMessage(event) {
    this.setState({
      groupMessage: event.target.value
    });
  }

  handleSecretMessage(event) {
    this.setState({
      secretMessage: event.target.value
    });
  }

  getBytes32FromIPFSHash(ipfsCID) {
    let hex = bs58.decode(ipfsCID).slice(2).toString('hex');
    return this.add_0x(hex);
  }

  add_0x(hex) {
    return "0x" + hex;
  }

  async generateImage() {
    const Hash = require('ipfs-only-hash'); // Used to cread CID paths that are equivalent to those created by IPFS

    var openMsgImg = document.getElementById('openMsgImg') // Grabs open message as image element
    var byteStringOpenMsgImg = Buffer.from(openMsgImg.src.split(',')[1], 'base64'); // Convert image to bytes for IPFS format
    console.log("Open Msg Bytes", byteStringOpenMsgImg);
    var openMsg_cid = await Hash.of(byteStringOpenMsgImg); // Open message CID path
    console.log("Open Msg CID", openMsg_cid);

    var publicMsgQR = document.getElementById('publicMsgQR'); // Grab public QR message as SVG element
    var publicMsgUri = await svgAsPngUri(publicMsgQR); // Convert SVG to URI string, data:image/png;base64,...
    var publicQRImg = document.getElementById('publicQRImg') // Grab hidden image element next to QR code
    publicQRImg.setAttribute("src", publicMsgUri); // Setting image source code to URI, creates a working element

    var byteStringPubQR = Buffer.from(publicMsgUri.split(',')[1], 'base64'); // Converting URI to buffer data (needed to directly show image on IPFS)
    var publicQR_cid = await Hash.of(byteStringPubQR); // Public QR image CID path
    console.log("Public QR CID", publicQR_cid);

    var nutImg = document.getElementById('nutImg'); // Grab main original image element
    var finalImgURL = await embedImage(nutImg, publicQRImg); // Creating the combined image
    this.setState({ finalImgSrc: finalImgURL }); // Creates a working image element

    // This is the format to be uploaded to IPFS to display image on load of IPFS URL
    var byteStringFinalImg = Buffer.from(finalImgURL.split(',')[1], 'base64');
    console.log("Bytes Final Img IPFS", byteStringFinalImg);
    const finalImg_cid = await Hash.of(byteStringFinalImg); // Final image CID path
    console.log("Final Img CID", finalImg_cid, typeof finalImg_cid);
    const finalImg_hash =  EthCrypto.hash.keccak256(finalImg_cid); // Create a hash as it would be done on the ethereum blockchain
    console.log("Eth Hash", finalImg_hash);
    var bytesFinalImg = this.getBytes32FromIPFSHash(finalImg_cid); // Format to save image in for IPFS
    console.log("Bytes Emb Img Eth", bytesFinalImg);

    getSecret(finalImg_hash).then((secret) => {
      console.log("Signed Hash:", secret.signedImage);
      getVerification(finalImg_hash, secret.signedImage).then((verification) => {
        console.log("Verification", verification.verification);
        this.setState({
          finalImgHash: secret.signedImage,
          imgVerification: 'Verified'
        });

        if (verification.verification) { // a final check - checking if IPFS CID matches signed CID

          addToIPFS(byteStringOpenMsgImg, byteStringPubQR, byteStringFinalImg).then((paths) => { // components/helpers/
            this.setState({
              openMsgCid: paths.openImg_cid.path, // Image of the open message in bytes
              publicMsgCid: paths.qrImg_cid.path, // Image of the public QR code in bytes
              finalImgCid: paths.finalImg_cid.path // Image of the consolidatedNFT in bytes
            });
          });

          // Change token location on the selected nut, siganture is private key signed with final image CID
          //changeTokenURI(this.state.selectedNut, this.state.finalImgCid, this.state.finalImgSig).then((receipt) => {
          //  console.log("Success!");
          //});
        }
      });
    });

    const changeTokenURI = async (selectedNut, newTokenURI) => {
      const web3 = new Web3(window.ethereum);
      const cosmoNuts = new web3.eth.Contract(CosmoNuts, '0x66023f6da39cbffd7ad4f287ad4f8b44e0725167');
      await cosmoNuts.methods.jumpUniverse(selectedNut, newTokenURI).send({
        from: this.props.address
      }).on('transactionHash', (transactionHash) => {
        console.log("Transaction Hash:", transactionHash);
      }).on('receipt', (receipt) => {
        console.log("Receipt", receipt);
      });
    }

    //window.location.reload(true); // The last item should be refreshing the page and loading from the top
  }

  render() {

    return (

      <Parallax pages={4}
      >

        <ParallaxLayer
          sticky={{ start: 0, end: 4 }}
          style={{
            height: 'auto'
          }}
        >
          <Layout />
        </ParallaxLayer>

        <ParallaxLayer
          offset={0.15}
          speed={.5}
          style={{
            zIndex: '1'
          }}
        >
          <div style={{
            marginLeft: '10%',
          }}>
            <Grid columns={2} textAlign='left'>
              <Grid.Column style={{
                marginTop: '8px',
                width: '170px'
              }}>
                <h4>Select your nut ---></h4>
              </Grid.Column>

              <Grid.Column>
                <Dropdown
                  placeholder={this.state.ddPlaceholder}
                  fluid
                  selection
                  loading={this.state.ddLoad}
                  options={this.state.ownedNuts}
                  defaultValue={this.state.selectedNut}
                  onChange={this.handleDropdownChange}
                  style={{
                    width: '200px',
                    height: 'auto'
                  }}
                />
              </Grid.Column>
            </Grid>
          </div>
        </ParallaxLayer>

        <ParallaxLayer
          offset={0.2}
          speed={-1.01}
          style={{
            display: 'flex',
            justifyContent: 'left'
          }}>
          <div style={{
            marginLeft: '10%'
          }}>
            <img id='nutImg' src='https://ipfs.io/ipfs/QmTHcV6mGxHGeeXCnYtV129eRiR8Exni4sT8dDikBWBgzY' width="631" height="631"/>
          </div>
        </ParallaxLayer>

        <ParallaxLayer
          offset={0.3}
          speed={1}
          style={{
            display: 'flex',
            justifyContent: 'right'
          }}>
          <div style={{
            marginRight: '10%'
          }}>
            <img id='finalImg' src={this.state.finalImgSrc} width="631" height="631" />
          </div>
        </ParallaxLayer>

        <ParallaxLayer
          offset={1}
          speed={2}
          style={{
            display: 'flex',
            justifyContent: 'flex-end',
            height: 'auto'
          }}
          >
            <div style={{
              marginRight: '10%'
            }}>
              <p style={{color: 'black'}}>
                Change Open Message
              </p>

              <Grid columns={2}>
                <Grid.Column>
                  <Form>
                    <Form.TextArea
                      placeholder={this.state.openMessage}
                      onChange={this.handleOpenMessage}
                      rows={13}
                    />
                  </Form>
                </Grid.Column>

                <Grid.Column>
                  <img id='openMsgImg' src={this.state.openMsgSrc} width="256" height="256" />
                </Grid.Column>
              </Grid>
            </div>
        </ParallaxLayer>

        <ParallaxLayer
          offset={1.8}
          speed={1}
          style={{
            display: 'flex',
            justifyContent: 'flex-end',
            height: 'auto'
          }}
          >
            <div style={{
              marginRight: '10%'
            }}>
              <p style={{color: 'black'}}>
                Change Public Message
              </p>

              <Grid columns={2}>
                <Grid.Column>
                  <Form>
                    <Form.TextArea
                      placeholder={this.state.publicMessage}
                      onChange={this.handlePublicMessage}
                      rows={13}
                    />
                  </Form>
                </Grid.Column>

                <Grid.Column>
                  <QRCode id='publicMsgQR' value={this.state.publicMessage} />
                  <img id='publicQRImg'src={this.state.publicMsgSrc} width='256' height='256' hidden />
                </Grid.Column>
              </Grid>

            </div>
        </ParallaxLayer>

        <ParallaxLayer
          offset={2}
          speed={2}
          style={{
            display: 'flex',
            justifyContent: 'flex-end',
            height: 'auto'
          }}
        >
          <div style={{
            marginRight: '10%'
          }}>
            <p style={{color: 'black'}}>
              Change Group Message
            </p>

            <Grid columns={2}>
              <Grid.Column>
              <Form>
                <Form.TextArea
                  placeholder='Should it display current group message?'
                  onChange={this.handleGroupMessage}
                  rows={13}
                />
              </Form>
              </Grid.Column>

              <Grid.Column>
                <QRCode value={this.state.groupMessage} />
              </Grid.Column>
            </Grid>

          </div>
        </ParallaxLayer>

        <ParallaxLayer
          offset={2.8}
          speed={1}
          style={{
            display: 'flex',
            justifyContent: 'flex-end',
            height: 'auto'
          }}
        >
          <div style={{
            marginRight: '10%'
          }}>
            <p style={{color: 'black'}}>
              Change Private Message
            </p>

            <Grid columns={2}>
              <Grid.Column>
              <Form>
                <Form.Field>
                  <input placeholder='Secret Keyphrase' />
                </Form.Field>

                <Form.TextArea
                  placeholder='Should it display current private message?'
                  onChange={this.handleSecretMessage}
                  rows={10}
                />
              </Form>
              </Grid.Column>

              <Grid.Column>
                <QRCode value={this.state.secretMessage} />
              </Grid.Column>
            </Grid>

          </div>
        </ParallaxLayer>

        <ParallaxLayer
          offset={3.9}
          style={{
            display: 'flex',
            justifyContent: 'flex-end',
            height: 'auto'
          }}
        >
          <div style={{
            marginRight: '10%'
          }}>

            <p>Testing: {this.state.selectedNut}</p>
            <Button
              content='***FALL DOWN THE HOLE***'
              onClick={this.generateImage}
            />

          </div>
        </ParallaxLayer>

      </Parallax>

    );
  }
}

export default Userpage

/*
//Old code
<Layout>
  <div>
    <h1>User Page --> where they will embed messages</h1>
    <ImageGenerator />
  </div>
</Layout>

// Old form code (without semantic)
sticky={{ start: 0, end: 3 }}
style={{
  height: 'auto'
}}
*/

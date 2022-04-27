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

class Userpage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      nutsHeld: 0,
      nuts: [],
      ownedNuts: [],
      openMessage: nut.open_message.value,
      openMsgSrc: 'blank',
      publicMessage: nut.public_message.value,
      publicMsgSrc: 'blank',
      publicMsgCid: '',
      groupMessage: 'Current group message ...',
      secretMessage: 'Current secret message ...',
      secretKey: 'Should be ecnreypted key ...',
      embeddedImgSrc: nut.embedded_image,
      embeddedImgSig: '',
      imgVerification: ''
    };

    this.handleOpenMessage = this.handleOpenMessage.bind(this);
    this.handlePublicMessage = this.handlePublicMessage.bind(this);
    this.handleGroupMessage = this.handleGroupMessage.bind(this);
    this.handleSecretMessage = this.handleSecretMessage.bind(this);
    this.generateImage = this.generateImage.bind(this);
    this.openImgSrc = this.openImgSrc.bind(this);
  }

  // This is grabbing the address from the URL
  // accessed with this.props.address
  static async getInitialProps(props) {
    const { address } = props.query;

    return { address };
  }

  componentDidMount(props) {
    var imgURL = this.openImgSrc(this.state.openMessage);
    this.setState({
      openMsgSrc: imgURL
    });

    const web3 = new Web3(window.ethereum);
    var cosmoNuts = new web3.eth.Contract(CosmoNuts, '0x66023f6da39cbffd7ad4f287ad4f8b44e0725167');

    var ownedNuts = []; // Builds an array to be used for dropdown items

    // Getting total nuts owned and nut ids of each nut
    //  The way it is written works but order may not always be same e.g. [0,3,1,2] fix?
    (async () => {
      await cosmoNuts.methods.balanceOf(this.props.address).call().then((numOfNuts) => {
        this.setState({nutsHeld: numOfNuts});
        for (let n = 0; n < numOfNuts; n++) {
          (async () => {
            await cosmoNuts.methods.tokenOfOwnerByIndex(this.props.address, n).call().then((nut) => {
              this.setState({ nuts: [...this.state.nuts, nut] });
              let object = {
                key: nut,
                text: nut,
                value: nut,
                image: { avatar: false } // Later put image and enable small picture
              }
              this.setState({ ownedNuts: [...this.state.ownedNuts, object] });
            });
          })();
        }
      });
    })();

  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.openMessage !== this.state.openMessage) {
      var imgURL = this.openImgSrc(this.state.openMessage);
      this.setState({
        openMsgSrc: imgURL
      })
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

  handleOpenMessage(event) {
    this.setState({
      openMessage: event.target.value
    })
  }

  handlePublicMessage(event) {
    this.setState({
      publicMessage: event.target.value
    })
  }

  handleGroupMessage(event) {
    this.setState({
      groupMessage: event.target.value
    })
  }

  handleSecretMessage(event) {
    this.setState({
      secretMessage: event.target.value
    })
  }

  async generateImage() {
    var publicMsgQR = document.getElementById('publicMsgQR'); // Grab public message as SVG element
    var publicMsgUri = await svgAsPngUri(publicMsgQR); // Convert SVG to URI string, data:image/png;base64,...

    var publicQRImg = document.getElementById('publicQRImg') // Grab hidden image element next to QR code
    publicQRImg.setAttribute("src", publicMsgUri); // Setting image source code to URI, creates a working element

    var byteStringPubQR = Buffer.from(publicMsgUri.split(',')[1], 'base64'); // Converting URI to buffer data (needed to directly show image on IPFS)

    var nutImg = document.getElementById('nutImg'); // Grab main original image element

    var embeddedImgURL = await embedImage(nutImg, publicQRImg); // Creating the combined image

    this.setState({
      embeddedImgSrc: embeddedImgURL
    }); // Creates a working image element

    // This is the format to be uploaded to IPFS to display image on load of IPFS URL
    var byteStringEmbeddedImg = Buffer.from(embeddedImgURL.split(',')[1], 'base64');

    const Hash = require('ipfs-only-hash');
    const hash = await Hash.of(byteStringEmbeddedImg); // Create hash function that would be equivalent to one created by IPFS
    console.log("Hash", hash);

    addToIPFS(byteStringPubQR, byteStringEmbeddedImg).then((res) => {
      this.setState({
        publicMsgCid: res.img1_cid.path,
        embeddedImgCid: res.img2_cid.path
      });
    });

    const changeToken = async (selectedNut, newTokenURI) => {
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

    getSecret(hash).then((res) => {
      console.log("Signed Hash:", res.signedImage);
      getVerification(hash, res.signedImage).then((verification) => {
        console.log("Verification", verification.verification);
        this.setState({
          embeddedImgHash: res.signedImage,
          imgVerification: 'Verified'
        });

        if (verification.verification) { // a final check - checking if IPFS CID matches signed CID
          // Needs to be changed to new function when built
          // Takes in the selected nut, the new image, and eventually secret
          console.log("Selected Nut:" ); // Need to work on this, which nut is selected
          changeToken('1', hash).then((receipt) => {
            console.log("Success!");
          });
        }
      });
    });

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
            <Dropdown
              placeholder='Select your nut'
              fluid
              selection
              options={this.state.ownedNuts}
              style={{
                width: '200px',
                height: 'auto'
              }}
            />
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
            <p style={{color: 'black'}}>
              Current Embedded Image
            </p>
            <img id='embeddedImg' src={this.state.embeddedImgSrc} width="631" height="631" />
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

            <p>Testing: {this.state.imgVerification}</p>
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

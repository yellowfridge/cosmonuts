import React, { Component } from 'react';
import Layout from '../../components/layout';
//import ImageGenerator from '../imagegenerator';
import QRCode from 'react-qr-code';
import { Parallax, ParallaxLayer } from '@react-spring/parallax';
import { Container, Form, Button, Grid, Dropdown, Popup} from 'semantic-ui-react';
import embedImage from '../../components/helpers/embedimage';
import parseImage from '../../components/helpers/parseimage';
import { svgAsPngUri } from 'save-svg-as-png';
import * as IPFS from 'ipfs-core';
import nut from '../../metadata/nut0.json';
import Web3 from 'web3';
import CosmoNuts from '../../ethereum/build_manual/CosmoNuts_abi.json';
import { getSecret, getVerification, getMetadataJSON, publishToIPNS } from '../../components/helpers/apiRequests';
import bs58 from 'bs58';
import EthCrypto from 'eth-crypto';
import getJSONData from '../../components/helpers/getjsondata';
import cosmos from '../../metadata/cosmonuts.json';
import combineImages from '../../components/helpers/combineimages';

class Userpage extends Component {
  constructor(props) {
    super(props);
    //console.log("Cosmos JSON", this.props.cosmos); // JSON file with all relevant information for CosmoNuts
    console.log("In Userpage");

    //Original Image -- to be deleted later -- testing purposes only
    //'https://ipfs.io/ipfs/QmTHcV6mGxHGeeXCnYtV129eRiR8Exni4sT8dDikBWBgzY'

    this.state = {
      cosmosPath: 'https://ipfs.io/ipns/QmX7r9BfGdoav8QSi163to1RWJiaeABBLS8QjvmeSURLNH',
      nutsHeld: 0,
      nuts: [],
      ownedNuts: [],
      ownedNutsInfo: [],
      selectedNut: '',
      selectedNutId: '',
      selectedNutURL: 'https://ipfs.io/ipfs/QmTHcV6mGxHGeeXCnYtV129eRiR8Exni4sT8dDikBWBgzY',
      selectedNutInfo: '',
      selectedNutCID: '',
      openMessage: nut.open_message.value,
      openMsgSrc: 'blank',
      openMsgCID: '',
      publicMessage: nut.public_message.value,
      publicMsgSrc: 'blank',
      publicMsgCID: '',
      groupMessage: 'Current group message ...',
      secretMessage: 'Current secret message ...',
      secretKey: 'Should be ecnreypted key ...',
      combinedImgSrc: '',
      embeddedImgSrc: '',
      finalImgSrc: nut.image,
      finalImgSig: '',
      imgVerification: '',
      ddPlaceholder: 'No known nuts',
      metadataCID: '',
      buttonLoad: false
    };

    this.ddPlaceholderSet = this.ddPlaceholderSet.bind(this);
    this.setFirstNut = this.setFirstNut.bind(this);
    this.addToIPFS = this.addToIPFS.bind(this);
    this.handleOpenMessage = this.handleOpenMessage.bind(this);
    this.handlePublicMessage = this.handlePublicMessage.bind(this);
    this.handleGroupMessage = this.handleGroupMessage.bind(this);
    this.handleSecretMessage = this.handleSecretMessage.bind(this);
    this.handleDropdownChange = this.handleDropdownChange.bind(this);
    this.generateImage = this.generateImage.bind(this);
    this.openImgSrc = this.openImgSrc.bind(this);
    this.getBytes32FromIPFSHash = this.getBytes32FromIPFSHash.bind(this);
    this.add_0x = this.add_0x.bind(this);
    this.buildParsedImage = this.buildParsedImage.bind(this);

  }

  static async getInitialProps(props) {
    console.log("In getInitialProps of UserPage");

    const { address } = props.query; // Grabbing the address in the URL (user account)

    // Does not work when coming from index page
    //const cosmoNutsAddress = process.env.COSMONUTS_ADDRESS;
    //console.log("CosmoNuts Smart Contract Address: ", cosmoNutsAddress);

    const baseURL = cosmos.cosmonuts.baseURL; // https://ipfs.io/
    const storageKey = cosmos.cosmonuts.storage_key; // ipns
    const nutsCID = cosmos.nuts; // Contains JSON array data of ipnsCIDs of each nut

    return { address, baseURL, storageKey, nutsCID };
  }

  componentDidMount(props) {
    console.log("Props test in component did mount", this.state.selectedNutInfo);

    //Creates a url of the written message converted to a picture
    var imgURL = this.openImgSrc(this.state.openMessage);
    this.setState({
      openMsgSrc: imgURL
    });

    const web3 = new Web3(window.ethereum); // Create a new instance of web3 with the embedded metamask provider
    var cosmoNuts = new web3.eth.Contract(CosmoNuts, '0xb97C6312F412b58cCfac2c0E63609df0c2599CAa');

    var ownedNuts = []; // Builds an array to be used for dropdown items

    // Getting total nuts owned and nut ids of each nut
    let nuts = [];
    let nutObjects = [];
    let firstNut;
    let nutsInfo = [];

    // Function to find the first nut
    const findFirst = async (n, nut) => {
      if (n === 0) {
        return nut
      } else {
        return 'Nut first'
      }
    }

    // Get all the nut info
    var getNuts = async () => {
      // First get the total number of nuts owned by this account
      await cosmoNuts.methods.balanceOf(this.props.address).call().then((numOfNuts) => {
        this.setState({
          nutsHeld: numOfNuts,
          ddPlaceholder: 'Loading nuts . . .'
        });
        // Go through each one and grab the relevant information
        for (let n = 0; n < numOfNuts; n++) {
          (async () => {
            await cosmoNuts.methods.tokenOfOwnerByIndex(this.props.address, n).call().then(async (nut) => {
              nuts[n] = nut; // nut is in string form
              var nutId = parseInt(nut); // convert string to number type
              var nut_cid = this.props.nutsCID[nutId].ipnsCID;
              var nutURL = (this.props.baseURL + this.props.storageKey + "/" + nut_cid);
              var nutInfo = await getJSONData(nutURL).catch((error) => {
                console.log("Could nut retrieve data on nut id:", nutId);
              });

              // This is to blank out if it can't find main image
              const checkImgURL = () => {
                try {
                  return nutInfo.image;
                } catch {
                  return '';
                }
              }
              var nutImgURL = checkImgURL();

              let nutObject = {
                key: nut,
                text: 'Nut ' + nut,
                value: nut,
                image: { avatar: true, src: nutImgURL} // Enables a small picture next to dropdown
              }
              nutObjects[n] = nutObject;

              // This is to blank out if it can't find embedded image
              const checkEmbeddedImgURL = () => {
                try {
                  return nutInfo.embedded_image;
                } catch {
                  return '';
                }
              }
              var nutEmbeddedImgURL = checkEmbeddedImgURL();

              let onNutInfo = {
                id: nut,
                info: nutInfo,
                image: nutImgURL,
                embeddedImage: nutEmbeddedImgURL,
                openMsg: nutInfo.open_message.value,
                openMsgImg: nutInfo.open_message.image,
                publicMsg: nutInfo.public_message.value,
                publicMsgImg: nutInfo.public_message.image
              }
              nutsInfo[n] = onNutInfo;

              (async () => {
                await findFirst(n, nut).then((nut1) => {
                  if (nut1 !== 'Nut first') {
                    this.setFirstNut(n, nut1, nutImgURL, nutEmbeddedImgURL, nutInfo, nut_cid); // this could be an issue

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
          ownedNutsInfo: nutsInfo
        });
      });

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
    openMsgCanvas.width = '230'; // Likely should not hardcode these
    openMsgCanvas.height = '230'; // Likely should not hardcode these

    openMsgCtx.font = "bold 16px Arial";
    openMsgCtx.fillText(msg, 10, 20);

    var imgURL = openMsgCanvas.toDataURL();

    return imgURL;
  }

  async addToIPFS(openImg, qrImg, finalImg, embeddedImg, nutMetadata) {
    console.log("Adding to IPFS...");
    console.log("Please wait as this part can take a while.");

    const ipfs = await IPFS.create();

    const openImg_cid = await ipfs.add(openImg);
    const qrImg_cid = await ipfs.add(qrImg);
    const finalImg_cid = await ipfs.add(finalImg);
    const embeddedImg_cid = await ipfs.add(embeddedImg);

    const metadata_str = JSON.stringify(nutMetadata);
    const nutMetadata_cid = await ipfs.add(metadata_str);

    return { openImg_cid, qrImg_cid, finalImg_cid, embeddedImg_cid, nutMetadata_cid }
  }

  setFirstNut(nutId, nutText, nutImgURL, embeddedImgURL, nutInfo, nut_cid) {
    this.setState({
      selectedNutId: nutId,
      selectedNut: nutText,
      selectedNutURL: nutImgURL,
      embeddedImgSrc: embeddedImgURL,
      selectedNutInfo: JSON.stringify(nutInfo),
      selectedNutCID: nut_cid
    });
  }

  ddPlaceholderSet(firstNut) {
    this.setState({
      ddPlaceholder: 'Nut ' + firstNut
    });
  }

  handleDropdownChange(event) {
    var ddText = event.target.innerText; // For dropdowns, it is under innerText (as opposed to .value)
    var ddTextArray = ddText.split(" "); // Creating an array split by spaces in the string
    var nutId = ddTextArray[ddTextArray.length - 1]; // Grabbing the last element in the array
    var nut_cid = this.props.nutsCID[nutId].ipnsCID; // Grabbing the IPNS CID of the nut

    var ownedNuts = this.state.ownedNuts;
    var nutImgURL = ownedNuts[nutId].image.src;

    var embeddedImgURL = this.state.ownedNutsInfo[nutId].embeddedImage;
    var openMsg = this.state.ownedNutsInfo[nutId].openMsg;
    var openMsgImg = this.state.ownedNutsInfo[nutId].openMsgImg;
    var publicMsg = this.state.ownedNutsInfo[nutId].publicMsg;
    var publicMsgImg = this.state.ownedNutsInfo[nutId].publicMsgImg;
    var nutInfo = this.state.ownedNutsInfo[nutId].info;

    this.setState({
      selectedNutId: nutId,
      selectedNutCID: nut_cid,
      selectedNut: ddText,
      selectedNutURL: nutImgURL,
      selectedNutInfo: JSON.stringify(nutInfo),
      embeddedImgSrc: embeddedImgURL,
      openMessage: openMsg,
      openMsgSrc: openMsgImg,
      publicMessage: publicMsg,
      publicMsgSrc: publicMsgImg
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

  buildParsedImage(imgToParse) {
    //console.log("Image to Parse", imgToParse);
    var parsedImage = parseImage(imgToParse).then((uri) => {
      //console.log("Parsed Image in Build in then", uri);
      this.setState({
        embeddedImgSrc: uri
      });

      return uri
    });

    return parsedImage;
  }

  async generateImage() {
    this.setState({ buttonLoad: true }); // Set loading on button to true

    const Hash = require('ipfs-only-hash'); // Used to cread CID paths that are equivalent to those created by IPFS

    var openMsgImg = document.getElementById('openMsgImg') // Grabs open message as image element
    var byteStringOpenMsgImg = Buffer.from(openMsgImg.src.split(',')[1], 'base64'); // Convert image to bytes for IPFS format
    //console.log("Open Msg Bytes", byteStringOpenMsgImg);
    var openMsg_cid = await Hash.of(byteStringOpenMsgImg); // Open message CID path
    //console.log("Open Msg CID", openMsg_cid);

    var publicMsgQR = document.getElementById('publicMsgQR'); // Grab public QR message as SVG element
    var publicMsgUri = await svgAsPngUri(publicMsgQR); // Convert SVG to URI string, data:image/png;base64,...
    var publicQRImg = document.getElementById('publicQRImg') // Grab hidden image element next to QR code
    publicQRImg.setAttribute("src", publicMsgUri); // Setting image source code to URI, creates a working element

    var byteStringPubQR = Buffer.from(publicMsgUri.split(',')[1], 'base64'); // Converting URI to buffer data (needed to directly show image on IPFS)
    var publicQR_cid = await Hash.of(byteStringPubQR); // Public QR image CID path
    //console.log("Public QR CID", publicQR_cid);

    var nutImg = document.getElementById('nutImg'); // Grab main original image element
    var finalImg = document.getElementById('finalImg'); // Grab the final image element

    // Right now the final image contains only the public QR Code
    // Need to think what else and how to embed
    // ** WORKING ON COMBINING IMAGES
    var combinedImg = document.getElementById('combinedImg'); // Grab the combined image element
    var combinedImgURI = combineImages(openMsgImg, publicQRImg).then((uri) => {
      this.setState({ combinedImgSrc: uri });
      combinedImg.setAttribute('src', uri);
    });
    //console.log("Combined Img URI", combinedImgURI);

    //var finalImgURI = await embedImage(nutImg, publicQRImg); // Creating the combined image [original with just qrcode]
    var finalImgURI = await embedImage(nutImg, combinedImg); // Creating the combined image

    // Final Img URI TYPE: data:image/png;base64, iVBOR......
    finalImg.setAttribute('src', finalImgURI);
    this.setState({ finalImgSrc: finalImgURI });

    var parsedImgURI = await this.buildParsedImage(finalImg);
    // Parsed Imf URI TYPE: data:image/png;base64,iVBORw0......

    // This is the format to be uploaded to IPFS to display image on load of IPFS URL
    var byteStringFinalImg = Buffer.from(finalImgURI.split(',')[1], 'base64');
    //console.log("Bytes Final Img IPFS", byteStringFinalImg);
    const finalImg_cid = await Hash.of(byteStringFinalImg); // Final image CID path
    console.log("Final Img CID", finalImg_cid, typeof finalImg_cid);
    const finalImg_hash =  EthCrypto.hash.keccak256(finalImg_cid); // Create a hash as it would be done on the ethereum blockchain
    console.log("Final Img Hash", finalImg_hash);
    var bytesFinalImg = this.getBytes32FromIPFSHash(finalImg_cid); // Format to save image in for IPFS
    //console.log("Bytes Emb Img Eth", bytesFinalImg);

    var byteStringEmbeddedImg = Buffer.from(parsedImgURI.split(',')[1], 'base64');
    var embeddedImg_cid = await Hash.of(byteStringEmbeddedImg);

    // Generating nut metadata section
    var oldMetaInfo = JSON.parse(this.state.selectedNutInfo);
    var newNutMeta = await getMetadataJSON(
      oldMetaInfo, this.state.openMessage, openMsg_cid,
      this.state.publicMessage, publicQR_cid, finalImg_cid, embeddedImg_cid
    );
    console.log("New Nut Metadata", newNutMeta.data, typeof newNutMeta.data);

    var newNutMetadata_cid = await Hash.of(JSON.stringify(newNutMeta.data));
    console.log("New Nut Metadata CID path", newNutMetadata_cid);

    getSecret(finalImg_hash).then((secret) => {
      console.log("Signed Hash:", secret.signedImage);
      getVerification(finalImg_hash, secret.signedImage).then((verification) => {
        console.log("Verification", verification.verification);
        this.setState({
          finalImgSig: secret.signedImage,
          imgVerification: 'Verified'
        });

        //// - Put block out code here if needed - TEMPORARY - WORKING SECTION - JUST NOT TO SAVE IPFS - SAVING TIME
        if (verification.verification) { // a final check - checking if IPFS CID matches signed CID

          this.addToIPFS(byteStringOpenMsgImg, byteStringPubQR, byteStringFinalImg, byteStringEmbeddedImg, newNutMeta.data).then((cids) => {
            console.log("CIDS", cids);
            this.setState({
              openMsgCID: cids.openImg_cid.path,
              publicMsgCID: cids.qrImg_cid.path,
              finalImgCID: cids.finalImg_cid.path,
              embeddedImgCID: cids.embeddedImg_cid.path,
              metadataCID: cids.nutMetadata_cid.path
            });

            // These are the keys for the IPNS links
            // nut0, nut1, nut2, ...
            let nutKey = "nut" + this.state.selectedNutId

            // Publish the IPFS CID to the above IPNS identified key
            console.log("Publishing to IPNS ...");
            console.log("Please wait as this part can take a while.");
            // What happens when it is slow and can't upload??
            // Need an average timeout and maybe ask user to try again?
            publishToIPNS(nutKey, cids.nutMetadata_cid.path).then((cid) => {
              //console.log("Nut Metadata IPNS", cid.nutIPNS);
              //console.log("Set Nut Metadata IPNS", this.state.selectedNutCID);

              // Checking to see if returned IPNS CID matches the CID on Metadata
              if (this.state.selectedNutCID === cid.nutIPNS) {
                console.log("Successfully published to correct IPNS CID!");

                // Sending info to Ethereum to be verified on blockchain
                // Change token location on the selected nut
                changeTokenURI(this.state.selectedNutId, finalImg_hash, this.state.finalImgSig).then(() => {
                  console.log("Success!");
                  this.setState({ buttonLoad: false }); // Set loading on button to false - task is complete
                }).catch((error) => {
                  console.log("Error: Was not able to change token URI on blockchain.", error);
                });

                //After changing token URI - it likely makes sense to refresh the page - maybe?
                // Blcked out for now during R&D
                //window.location.reload(true); // The last item should be refreshing the page and loading from the top

              } else {
                console.log("Error: Does not match recorded IPNS CID.");
                console.log("-----LOG NOTES-----");
                console.log("Nut CID Key:", nutKey);
                console.log("Selected Nut IPNS CID:", this.state.selectedNutCID);
                console.log("Received IPNS CID:", cid.nutIPNS);

                this.setState({ buttonLoad: false }); // Reset button - process did not work
              }

            });
          });
        }
        /// Put block out code here to stop IPFS feature
      });
    });

    // Function to change token URI on the ethereum blockchain
    const changeTokenURI = async (selectedNut, newTokenURI, signature) => {
      const web3 = new Web3(window.ethereum);
      const cosmoNuts = new web3.eth.Contract(CosmoNuts, '0xb97C6312F412b58cCfac2c0E63609df0c2599CAa');
      await cosmoNuts.methods.changeTokenURI(selectedNut, newTokenURI, signature).send({
        from: this.props.address
      }).on('transactionHash', (transactionHash) => {
        console.log("Transaction Hash:", transactionHash);
      }).on('receipt', (receipt) => {
        console.log("Receipt", receipt);
      });
    }

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
          <h3>Testing items here: -- -- </h3>
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
            <img id='nutImg' src={this.state.selectedNutURL} width="631" height="631"/>
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
                  <img id='openMsgImg' src={this.state.openMsgSrc} />
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
                  <img id='publicQRImg'src={this.state.publicMsgSrc} hidden/>
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

            <p>Testing: {this.state.metadataCID}</p>
            <img id='combinedImg' src={this.state.combinedImgSrc} width="570" height="300" hidden />
            <img id='finalImg' src={this.state.finalImgSrc} width="631" height="631" hidden/>

            <Popup
              content='Please wait to fully complete process!  App will only ask for payment when all systems are go.'
              trigger={
                <Button
                  content='***FALL DOWN THE HOLE***'
                  onClick={this.generateImage}
                  loading={this.state.buttonLoad}
                />
              }
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

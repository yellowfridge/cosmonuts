import React, { Component } from 'react';
import Layout from '../../components/layout';
//import ImageGenerator from '../imagegenerator';
import QRCode from 'react-qr-code';
import { Parallax, ParallaxLayer } from '@react-spring/parallax';
import { Container, Form, Button, Grid } from 'semantic-ui-react';
import Starfield from '../starfield';
import embedImage from '../../components/helpers/embedimage';
import { svgAsPngUri } from 'save-svg-as-png';
import * as IPFS from 'ipfs-core';
import nut from '../../metadata/nut0.json';

class Userpage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      openMessage: nut.open_message.value,
      openMsgSrc: 'blank',
      publicMessage: nut.public_message.value,
      publicMsgSrc: 'blank',
      publicMsgCid: '',
      groupMessage: 'Current group message ...',
      secretMessage: 'Current secret message ...',
      secretKey: 'Should be ecnreypted key ...',
      embeddedImgSrc: nut.embedded_image,
      embeddedImgCid: ''
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

  componentDidMount() {
    var imgURL = this.openImgSrc(this.state.openMessage);
    this.setState({
      openMsgSrc: imgURL
    });

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
    var publicMsgQR = document.getElementById('publicMsgQR'); // Grab public message in SVG
    console.log("Public MSG QR:", publicMsgQR);
    var publicMsgUri = await svgAsPngUri(publicMsgQR); // Convert SVG to URI
    console.log("Public MSG URI", publicMsgUri, "type of", typeof publicMsgUri);

    var publicQRImg = document.getElementById('publicQRImg') // Hidden image file next to QR code
    publicQRImg.setAttribute("src", publicMsgUri); // Setting image source code to URI
    console.log("publicQRImg", publicQRImg);

    var byteStringPubQR = Buffer.from(publicMsgUri.split(',')[1], 'base64'); // Converting URI to buffer data (needed to directly show image on IPFS)

    var nutImg = document.getElementById('nutImg'); // Grab main original image
    console.log("Nut Img:", nutImg);

    var embeddedImgURL = await embedImage(nutImg, publicQRImg); // Creating the combined image

    //var embeddedImg = document.getElementById('embeddedImg');
    /*
    embeddedImg.onload = () => {
      var canvas = document.createElement('canvas');
      var ctx = canvas.getContext('2d');
      canvas.width = '631';
      canvas.height = '631';
      ctx.drawImage(embeddedImg, 0, 0);
    }
    */
    //embeddedImg.setAttribute("src", embeddedImgURL);

    this.setState({
      embeddedImgSrc: embeddedImgURL
    });

    console.log("Embedded Img:", embeddedImg, "Type:", typeof embeddedImg);
    var byteStringEmbeddedImg = Buffer.from(embeddedImgURL.split(',')[1], 'base64');

    // Saving items to IPFS
    const ipfs = await IPFS.create();
    const pubQRIPFS = await ipfs.add(byteStringPubQR);
    const embeddedImgIPFS = await ipfs.add(byteStringEmbeddedImg);
    console.log("Embedded Img IPFS", embeddedImgIPFS);

    this.setState({
        publicMsgCid: pubQRIPFS.path,
        embeddedImgCid: embeddedImgIPFS.path
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
          offset={0.1}
          speed={-1.01}
          style={{
            display: 'flex',
            justifyContent: 'left'
          }}>
          <div style={{
            marginLeft: '10%'
          }}>
            <p style={{color: 'black'}}>
              Current Selected Avatar
            </p>
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

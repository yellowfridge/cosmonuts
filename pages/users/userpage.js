import React, { Component } from 'react';
import Layout from '../../components/layout';
//import ImageGenerator from '../imagegenerator';
import QRCode from 'react-qr-code';
import { Parallax, ParallaxLayer } from '@react-spring/parallax';
import Image from 'next/image';
import eminemApe from '../../public/images/eminem_boredApe.png';
import { Container, Form, Button, Grid } from 'semantic-ui-react';
import Starfield from '../starfield';
import embedImage from '../../components/helpers/embedimage';
import { svgAsPngUri } from 'save-svg-as-png';
import * as IPFS from 'ipfs-core';
import { fromString } from 'uint8arrays/from-string'

class Userpage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      openMessage: 'Current open message ...',
      openMsgSrc: 'blank',
      publicMessage: 'Current public message ...',
      publicMsgSrc: 'blank',
      publicMsgCid: '',
      groupMessage: 'Current group message ...',
      secretMessage: 'Current secret message ...',
      secretKey: 'Should be ecnreypted key ...',
      embeddedImgSrc: 'blank'
    };

    this.handleOpenMessage = this.handleOpenMessage.bind(this);
    this.handlePublicMessage = this.handlePublicMessage.bind(this);
    this.handleGroupMessage = this.handleGroupMessage.bind(this);
    this.handleSecretMessage = this.handleSecretMessage.bind(this);
    this.generateImage = this.generateImage.bind(this);
    this.openImgSrc = this.openImgSrc.bind(this);
  }

  componentDidMount() {
    var imgURL = this.openImgSrc(this.state.openMessage);
    this.setState({
      openMsgSrc: imgURL
    })

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
    var publicMsgQR = document.getElementById('publicMsgQR');
    var publicMsgUri = await svgAsPngUri(publicMsgQR);

    var nutImg = document.getElementById('nutImg');

    var publicQRImg = document.getElementById('publicQRImg')
    publicQRImg.setAttribute("src", publicMsgUri);

    var embeddedImage = embedImage(nutImg, publicQRImg);

    console.log("QR Img:", publicQRImg.outerHTML);

    //const ipfs = await IPFS.create();
    //const data = fromString(publicQRImg.src, 'base64');
    //console.log("data", data);

    //const { cid } = await ipfs.add(data);
    //console.log("CID", cid);

    this.setState({
      embeddedImgSrc: embeddedImage
    });
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
            <img id='nutImg' src='https://ipfs.io/ipfs/QmTHcV6mGxHGeeXCnYtV129eRiR8Exni4sT8dDikBWBgzY' />
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
            <img id='embeddedImg' src={this.state.embeddedImgSrc} width="550" height="550" />
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
                      placeholder='Should it display current open message?'
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
                      placeholder='Should it display current public message?'
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

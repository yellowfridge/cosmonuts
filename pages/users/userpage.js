import React, { Component } from 'react';
import Layout from '../../components/layout';
import ImageGenerator from '../imagegenerator';
import QRCode from 'react-qr-code';
import { Parallax, ParallaxLayer } from '@react-spring/parallax';
import Image from 'next/image';
import eminemApe from '../../public/images/eminem_boredApe.png';
import { Container, Form, Button, Grid } from 'semantic-ui-react';
import Starfield from '../starfield';

class Userpage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      openMessage: 'Current open message ...',
      publicMessage: 'Current public message ...',
      groupMessage: 'Current group message ...',
      secretMessage: 'Current secret message ...',
      secretKey: 'Should be ecnreypted key (?)'
    };

    this.handleOpenMessage = this.handleOpenMessage.bind(this);
    this.handlePublicMessage = this.handlePublicMessage.bind(this);
    this.handleGroupMessage = this.handleGroupMessage.bind(this);
    this.handleSecretMessage = this.handleSecretMessage.bind(this);
    this.jumpInitiated = this.jumpInitiated.bind(this);
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

  jumpInitiated(event) {
    console.log("FALLING DOWN BOOP BEEP BOOP")
    console.log("Open Message: ", this.state.openMessage);
    console.log("Public Message: ", this.state.publicMessage);
    console.log("Group Message: ", this.state.groupMessage);
    console.log("Secret Message: ", this.state.secretMessage);
  }

  render() {
    return (

      <Parallax pages={3}
      >

        <ParallaxLayer
          sticky={{ start: 0, end: 2 }}
          style={{
            height: 'auto'
          }}
        >
          <Layout />
        </ParallaxLayer>

        <ParallaxLayer
          offset={0.1}
          speed={-1.1}
          style={{
            display: 'flex',
            justifyContent: 'left'
          }}>
          <div style={{
            marginLeft: '10%'
          }}>
            <p style={{color: 'yellow'}}>
              Current Selected Avatar
            </p>
            <Image
              src={eminemApe} width="550" height="550" id="selectedAvatar"
            />
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
            <p style={{color: 'yellow'}}>
              Current Embedded Image
            </p>
            <img src='blank' width="550" height="550" />
          </div>
        </ParallaxLayer>

        <ParallaxLayer
          offset={1}
          speed={2.2}
          style={{
            display: 'flex',
            justifyContent: 'flex-end',
            height: 'auto'
          }}
          >
            <div style={{
              marginRight: '10%'
            }}>
              <p style={{color: 'yellow'}}>
                Change Open Message
              </p>

              <Form>
                <Form.TextArea
                  placeholder='Should it display current open message?'
                  onChange={this.handleOpenMessage}
                />
              </Form>

            </div>
        </ParallaxLayer>

        <ParallaxLayer
          offset={1.3}
          speed={1.8}
          style={{
            display: 'flex',
            justifyContent: 'flex-end',
            height: 'auto'
          }}
          >
            <div style={{
              marginRight: '10%'
            }}>
              <p style={{color: 'yellow'}}>
                Change Public Message
              </p>

              <Form>
                <Form.TextArea
                  placeholder='Should it display current public message?'
                  onChange={this.handlePublicMessage}
                />
              </Form>

            </div>
        </ParallaxLayer>

        <ParallaxLayer
          offset={1.6}
          speed={1.3}
          style={{
            display: 'flex',
            justifyContent: 'flex-end',
            height: 'auto'
          }}
        >
          <div style={{
            marginRight: '10%'
          }}>
            <p style={{color: 'yellow'}}>
              Change Group Message
            </p>

            <Form>
              <Form.TextArea
                placeholder='Should it display current group message?'
                onChange={this.handleGroupMessage}
              />
            </Form>

          </div>
        </ParallaxLayer>

        <ParallaxLayer
          offset={1.9}
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
            <p style={{color: 'yellow'}}>
              Change Private Message
            </p>

            <Form>
              <Form.TextArea
                placeholder='Should it display current private message?'
                onChange={this.handleSecretMessage}
              />
            </Form>

          </div>
        </ParallaxLayer>

        <ParallaxLayer
          offset={2.9}
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
              onClick={this.jumpInitiated}
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

import React, { Component } from 'react';
import Layout from '../../components/layout';
import ImageGenerator from '../imagegenerator';
import QRCode from 'react-qr-code';
import { Parallax, ParallaxLayer } from '@react-spring/parallax';
import Image from 'next/image';
import eminemApe from '../../public/images/eminem_boredApe.png';
import { Container, Form } from 'semantic-ui-react';

class Userpage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      parallaxRef: '',
      value: ''
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({
      value: event.target.value
    });
  }

  handleSubmit(event) {
    console.log('Submit Button Pressed');
  }

  render() {
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
          offset={0.1}
          speed={-0.5}
          style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'flex-start'
          }}>
          <div style={{
            marginLeft: '10%'
          }}>
            <p style={{color: 'white'}}>
              Current Selected Avatar
            </p>
            <Image
              src={eminemApe} width="550" height="550" id="selectedAvatar"
            />
          </div>
        </ParallaxLayer>

        <ParallaxLayer
          offset={0.2}
          speed={2}
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-end'
          }}>
          <div style={{
            marginRight: '10%'
          }}>
            <p style={{color: 'white'}}>
              Current Embedded Image
            </p>
            <img src='blank' width="550" height="550" />
          </div>
        </ParallaxLayer>

        <ParallaxLayer
          offset={0.7}
          speed={1}
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-end'
          }}>
          <div style={{
            marginRight: '10%'
          }}>
            <p style={{color: 'white'}}>
              Change Public Message
            </p>

            <Form>
              <Form.TextArea
                placeholder='Should it display current public message?'
              />
            </Form>

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

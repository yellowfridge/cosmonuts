import React, { Component } from 'react';
import Layout from '../components/layout';
import { Parallax, ParallaxLayer } from '@react-spring/parallax';
import { Container } from 'semantic-ui-react';


class LearnNuts extends Component {

  render() {
    return (

      <Parallax pages={1}
      >

        <ParallaxLayer
          sticky={{ start: 0, end: 1 }}
          style={{
            height: 'auto'
          }}
        >
          <Layout />
        </ParallaxLayer>

        <ParallaxLayer
          offset={0.2}
        >
          <Container>
            <h3>Who created these nuts?</h3>
            <h3>Where did these nuts come from?</h3>
            <h3>How many of these nuts are there</h3>
            <h3>How much does it cost to get a nut?</h3>
          </Container>
        </ParallaxLayer>

      </Parallax>

    );
  }

}

export default LearnNuts

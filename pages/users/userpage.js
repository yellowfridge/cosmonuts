import React, { Component } from 'react';
import Layout from '../../components/layout';
import ImageGenerator from '../imagegenerator';
import QRCode from 'react-qr-code';

class Userpage extends Component {
  render() {
    return (
      <Layout>
        <div>
          <h1>User Page --> where they will embed messages</h1>
          <ImageGenerator />
        </div>
      </Layout>
    );
  }
}

export default Userpage

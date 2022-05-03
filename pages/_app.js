import React from 'react';
import Web3 from 'web3';
//import detectEthereumProvider from '@metamask/detect-provider';
//import './semantic.min.css';

function getWeb3Library(provider) {
  return new Web3(provider)
}

export default function MyApp({ Component, pageProps }) {
  // Only uncomment this method if you have blocking data requirements for
  // every single page in your application. This disables the ability to
  // perform automatic static optimization, causing every page in your app to
  // be server-side rendered.

  return (
    <Component {...pageProps} />
  )

}

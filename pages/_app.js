import React from 'react';
import Web3 from 'web3';
import { Web3ReactProvider } from '@web3-react/core';
//import detectEthereumProvider from '@metamask/detect-provider';
//import './semantic.min.css';

function getWeb3Library(provider) {
  return new Web3(provider)
}

export default function MyApp({ Component, pageProps }) {

  console.log("My App _app file");

  /*
  const Web3React = () => {
    const [hasMounted, setHasMounted] = React.useState(false);
    React.useEffect(() => {
      setHasMounted(true)
    }, []);

    const {activate, deactivate} = useWeb3React();
    //return activate, deactivate
  }
  */

  //const {activate, deactivate} = useWeb3React();


  return (
    <Web3ReactProvider getWeb3Library={getWeb3Library}>
      <Component {...pageProps} />
    </Web3ReactProvider>
  )

}

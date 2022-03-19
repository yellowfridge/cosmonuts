import React from 'react';
import Web3 from 'web3';
import { Web3ReactProvider} from '@web3-react/core';
import detectEthereumProvider from '@metamask/detect-provider';
//import './semantic.min.css';

function getLibrary(provider) {
  return new Web3(provider)
}

function MyApp({ Component, pageProps }) {

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
    <Web3ReactProvider getLibrary={getLibrary}>
      <Component {...pageProps} />
    </Web3ReactProvider>
  )
}

export default MyApp

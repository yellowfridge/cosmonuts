import React from "react";
import { Menu, Label, Icon, Popup } from 'semantic-ui-react';
import { Link, Router } from '../routes';
import Connect from './connect';
import Userpage from '../pages/users/userpage';
import { useState, useEffect } from 'react';
import cosmonutshelmet from './cosmonutshelmet.png';
//import detectEthereumProvider from '@metamask/detect-provider';

export default () => {

  const [userAddress, setUserAddress] = useState('');
  const [route, setRoute] = useState('/');
  const [buttonImgMsg, setButtonImgMsg] = useState(''); // Not used yet
  // Needs to come from connect when enabled or disabled = similar to Connect

  useEffect(() => {
    // You're doing this same thing twice - consider grabbing as props from parent
    (async () => {
      let address;
      //const provider = await detectEthereumProvider();
      if (ethereum.selectedAddress === null) {
        address = 'None';
      } else {
        address = ethereum.selectedAddress;
      }
      setUserAddress(address);
      if (address == 'None') {
        setRoute('/');
      } else {
        setRoute(`/users/${userAddress}`);
      }
    })();
  });

  return (
    <Menu
      secondary
      style={{ marginTop: '10px', marginLeft: '10px' }}
    >

      <Link route="/">
        <a>
          <Menu.Item >
            <img src={cosmonutshelmet.src} style={{
              width: '100px',
              height: 'auto'
            }} />
          </Menu.Item>
        </a>
      </Link>

      <Menu.Menu position='left'>
        <Link route={route}>
          <a className='item' >
            <Menu.Item>
              <Label basic circular
                content='Change Embedded Image'
                color = 'blue'
                size = 'large'
              />
            </Menu.Item>
          </a>
        </Link>

        <Link route={'/learnmore'}>
          <a className='item' >
            <Menu.Item>
              <Label basic circular
                content='Learn More About These Nuts'
                color = 'blue'
                size = 'large'
              />
            </Menu.Item>
          </a>
        </Link>
      </Menu.Menu>

      <Menu.Menu position='right' icon='labeled'>
        <Menu.Item>
          <Connect />
        </Menu.Item>
      </Menu.Menu>
    </Menu>
  )
}

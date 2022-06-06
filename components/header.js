import React from "react";
import { Menu, Label, Icon, Popup } from 'semantic-ui-react';
import { Link, Router } from '../routes';
import Connect from './connect';
import Userpage from '../pages/users/userpage';
import { useState, useEffect } from 'react';
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
    <Menu style={{ marginTop: '10px' }} secondary icon = 'labeled'>
      <Link route="/">
        <a className="item">
          <Menu.Item name='home'>
            <Icon name='bitcoin' />
              Cosmo Nuts
          </Menu.Item>
        </a>
      </Link>

      <Menu.Menu position='left'>
        <Link route={route}>
          <a className="item">
            <Menu.Item name='changeEmbeddedImageLink'>
              <Label basic circular
                content='Change Embedded Image'
                color = 'blue'
                size = 'large'
              />
            </Menu.Item>
          </a>
        </Link>

        <Menu.Item name='learnNuts'>
          <Label basic circular
            content='Learn More About These Nuts'
            color = 'blue'
            size = 'large'
          />
        </Menu.Item>
      </Menu.Menu>

      <Menu.Menu position='right' icon='labeled'>
        <Menu.Item name='connect'>
          <Connect />
        </Menu.Item>
      </Menu.Menu>
    </Menu>
  )
}

import React from "react";
import { Menu, Button, Icon, Popup } from 'semantic-ui-react';
import { Link } from '../routes';
import Connect from './connect';
import Userpage from '../pages/users/userpage';
import { useState, useEffect } from 'react';
import detectEthereumProvider from '@metamask/detect-provider';

export default () => {

  const [userAddress, setUserAddress] = useState('');
  const [route, setRoute] = useState('/');

  useEffect(() => {
    // You're doing this same thing twice - consider grabbing as props from parent
    (async () => {
      let address;
      const provider = await detectEthereumProvider();
      if (provider.selectedAddress === null) {
        address = 'None';
      } else {
        address = provider.selectedAddress;
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
        <Menu.Item name='userpagelink'>
          <Link route={route}>
            <a>
              Jump to another Universe ----->
            </a>
          </Link>
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

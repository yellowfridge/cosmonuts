import React from "react";
import { Menu, Button, Icon } from 'semantic-ui-react';
import { Link } from '../routes';
import Connect from './connect';

export default () => {
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

      <Menu.Menu position='right' icon='labeled'>
        <Menu.Item name='connect'>
          <Connect />
        </Menu.Item>
      </Menu.Menu>
    </Menu>
  )
}

/*
// Do not have to work on this yet, need to have users first
work on initial set-up / plan - begin process
<Menu.Menu position="right" icon='labeled'>
  <Link route="/login">
    <a className="item">
      <Menu.Item name ='create'>
        <Icon name='add' />
        Connect Wallet
      </Menu.Item>
    </a>
  </Link>
</Menu.Menu>
*/

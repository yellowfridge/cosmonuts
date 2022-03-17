import { Button, Popup } from 'semantic-ui-react';
import { useState } from 'react';
import detectEthereumProvider from '@metamask/detect-provider';

export default function Mint(props) {

  return (
    <div>
      <Button
        content='MINT'
        primary
      />
    </div>
  )
}

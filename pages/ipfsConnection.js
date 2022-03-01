import { useState } from 'react';
import { Button, Input, Divider } from 'semantic-ui-react';
import * as IPFS from 'ipfs-core';

export default function ConnectionIPFS(props) {

  const [message, setMessage] = useState('');
  const [ipfsCID, setIpfsCID] = useState('This is where unique CID will be shown...');

  const addtoIPFSClicked = async () => {
    console.log('IN HERE BOI');
    console.log("Message", message);
    const ipfs = await IPFS.create();
    const { cid } = await ipfs.add(message);
    console.log("ipfs", ipfs)
    console.log("cid", cid.toString());
    setIpfsCID(cid);
  }

  function handleChange(event) {
    setMessage(event.target.value);
  }

  function copyToClipboard(event) {
    navigator.clipboard.writeText(event.toString());
  }

  function handleCIDChange(event) {
    setIpfsCID(event.target.value);
  }

  return (
    <div>
    <Input
      action={{
        content: 'Add to IPFS',
        onClick: () => addtoIPFSClicked(),
        color: 'teal'
      }}
      placeholder='Place text to be saved to IPFS...'
      style={{width: '600px'}}
      onChange={handleChange}
      value={message}
    />
    <Divider hidden />
    <Input
      disabled
      action={{
        content: 'Copy',
        color: 'teal',
        onClick: () => copyToClipboard(ipfsCID),
      }}
      placeholder=''
      style={{width: '600px'}}
      onChange={handleCIDChange}
      value={ipfsCID}
    />
    </div>
  )
}

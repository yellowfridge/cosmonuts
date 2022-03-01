import { Button } from 'semantic-ui-react';
import Head from 'next/head';
import Header from './header';
import { useState } from 'react';

export default function Connect(props) {

  const [load, setLoad] = useState(false);
  const [content, setContent] = useState('Connect');

  const connectClicked = async () => {
    setLoad(true);
    try {
      await ethereum.request({ method: 'eth_requestAccounts' });
    } catch (err) {
      console.log(err);
    }
    window.location.reload(true);
  }

  return (
    <div>
      <Button
        content={content}
        icon="add circle"
        primary
        onClick={connectClicked}
        disabled={load}
      />
    </div>
  )

}

import { Button } from 'semantic-ui-react';
import Head from 'next/head';
import Header from './header';
import { useState, useEffect } from 'react';

export default function Connect(props) {

  const [load, setLoad] = useState(false);
  const [content, setContent] = useState('Connect');

  useEffect(() => {
    function handleButtonChange() {
      console.log("In Button Change Area")
    }
  });

  const connectClicked = async () => {
    setLoad(true);
    try {
      await ethereum.request({ method: 'eth_requestAccounts' });
    } catch (err) {
      console.log(err);
    }
    window.location.reload(true); // Not a good way to probably update user connected and account number in index
  }

  function handleChange(event) {
    console.log("Event", event);
  }


  return (
    <div>
      <Button
        content={content}
        icon="add circle"
        primary
        onClick={connectClicked}
        onChange={handleChange}
        disabled={load}
      />
    </div>
  )

}

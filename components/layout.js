import React from 'react';
import { Container } from 'semantic-ui-react';
import Head from 'next/head';
import Header from './header';
import darkblack_img from '../public/images/darkblack_flatring.jpg';

export default (props) => {
  return (
    <div>
      <Head>
        <link
          rel="stylesheet"
          href="//cdnjs.cloudflare.com/ajax/libs/semantic-ui/2.2.12/semantic.min.css"
        />
      </Head>

      <Header />
      {props.children}

    </div>
  )
}

// Include <Starfield> above headed if need background

/*
// Placed in <Head> tag
<link
  rel="stylesheet"
  href="//cdnjs.cloudflare.com/ajax/libs/semantic-ui/2.2.12/semantic.min.css"
/>
*/

/*
// Inserted above - but given <body> cannot appear as a child of <div>
<body
  style = {{
    background: '#778fde'
  }}
/>
*/

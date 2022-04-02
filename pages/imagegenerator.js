import { useState, useEffect } from 'react';
import { Button, Input, Divider, Header, Grid, Container } from 'semantic-ui-react';
import * as IPFS from 'ipfs-core';
import QRCode from 'react-qr-code';
import testImage from '../public/images/eminem_boredApe.png';
import Image from 'next/image';
import { svgAsPngUri } from 'save-svg-as-png';

export default function ImageGenerator(props) {

  const [message, setMessage] = useState('');
  const [ipfsCID, setIpfsCID] = useState('This is where unique CID will be shown...');
  const [imgSrc, setImgSrc] = useState('');
  const [newImgSrc, setNewImgSrc] = useState('');
  const [qrImgSrc, setQRimgSrc] = useState('');

  const addtoIPFSClicked = async () => {
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

  // ImageManipulation Section
  var embedImage = function (image, embedImage) {
    //console.log('gonna embed', embedImage, 'in', image);
    var sWidth = image.width;
    //console.log("sWdith", sWidth);
    var sHeight = image.height;
    //console.log("sHeight", sHeight);

    var tmp = document.createElement('canvas');
    var tmpContext = tmp.getContext('2d');
    tmp.width = sWidth;
    tmp.height = sHeight;

    tmpContext.drawImage(image, 0, 0);

    var embed = document.createElement('canvas');
    var embedContext = embed.getContext('2d');
    embed.width = embedImage.width;
    embed.height = embedImage.height;

    embedContext.drawImage(embedImage, 0, 0);

    var embedData = embedContext.getImageData(0, 0, embed.width, embed.height);
    var origData = tmpContext.getImageData(0, 0, embed.width, embed.height);

    var blackCount = 0;
    var whiteCount = 0;
    var count = 0;

    for (var x = 0; x < embedData.width; x++) {
      for (var y = 0; y < embedData.height; y++) {
        var idx = (x + y * embedData.width) * 4;

        // The RGB values
        var r = embedData.data[idx + 0];
        var g = embedData.data[idx + 1];
        var b = embedData.data[idx + 2];

        // The original RGB values
        var or = origData.data[idx + 0];
        var og = origData.data[idx + 1];
        var ob = origData.data[idx + 2];

        var isBlack = (r<=50) && (g<=50) && (b<=50);
        if (isBlack) {
          blackCount++;
        } else {
          whiteCount++;
        }

        var isOdd = ((or+og+ob)%2);
        var pixel = [or, og, ob];
        var fixedPixel = fixPixel(pixel, isBlack);

        embedData.data[idx + 0] = fixedPixel[0];
        embedData.data[idx + 1] = fixedPixel[1];
        embedData.data[idx + 2] = fixedPixel[2];
      }
    }
    tmpContext.putImageData(embedData, 0, 0);

    return tmp.toDataURL();
  }

  var fixPixel = function (pixel, needOdd) {
    var r = pixel[0];
    var g = pixel[1];
    var b = pixel[2];

    // see if odd already
    var isOdd = !((r+g+b) % 2);

    if ((needOdd && !isOdd) || (!needOdd && isOdd)) {
      if (r <= g && r <= b) {
        if (r==0) {
          r++;
        } else {
          r--;
        }
      } else if (g <= r && g <= b) {
        if (g == 0) {
          g++;
        } else {
          g--;
        }
      } else if (b <= r && b <= g) {
        if (b == 0) {
          b++;
        } else {
          b--;
        }
      }
    }
    return [r, g, b]
  }

  var parseImage = function (image) {
    var sWidth = image.width;
    var sHeight = image.height;

    var tmp = document.createElement('canvas');
    var tmpContext = tmp.getContext('2d');
    tmp.width = sWidth;
    tmp.height = sHeight;

    tmpContext.drawImage(image, 0, 0);

    var imageData = tmpContext.getImageData(0, 0, tmp.width, tmp.height);
    for (var x = 0; x < tmp.width; x++) {
      for (var y = 0; y < tmp.height; y++) {
        var idx = (x + y * tmp.width) * 4;

        // The RGB values
        var r = imageData.data[idx + 0];
        var g = imageData.data[idx + 1];
        var b = imageData.data[idx + 2];

        var isOdd = !!((r+g+b) % 2);

        imageData.data[idx + 0] = isOdd ? 255 : 0;
        imageData.data[idx + 1] = isOdd ? 255 : 0;
        imageData.data[idx + 2] = isOdd ? 255 : 0;
      }
    }
    tmpContext.putImageData(imageData, 0, 0);

    return tmp.toDataURL()
  }

  async function generateImage() {
    // Grab first image - which is our avatar
    var avatarImg = document.getElementById('avatar');
    //console.log("Avatar Img", avatarImg, "Type Of", typeof avatarImg);
    var qrCodeImage = document.getElementById('qrCodeImage');

    var qrSvg = document.getElementById('svgQR');
    //console.log("QR Code SVG", qrSvg, "type", typeof qrSvg);
    /*
    // Getting sizes for svg - no longer needed
    var bBox = svgQR.getBBox();
    var qrWidth = bBox.width;
    var qrHeight = bBox.height;
    */

    var qrPNGuri = await svgAsPngUri(qrSvg);
    //console.log("QR PNG Uri:", qrPNGuri);
    await setQRimgSrc(qrPNGuri);

    var embeddedImage = embedImage(avatarImg, qrCodeImage);
    setImgSrc(embeddedImage);
  }

  function interpretImage() {
    var embeddedImage = document.getElementById('newImage');
    var parsedImage = parseImage(embeddedImage) // data:image/png;base64, {base64} (typeof = string)
    setNewImgSrc(parsedImage);
  }

  return (
    <div>
    <Divider horizontal>
      <Header as='h4'>
        IPFS Functionality
      </Header>
    </Divider>
    <Input
      action={{
        content: 'Add to IPFS',
        onClick: () => addtoIPFSClicked(),
        color: 'teal'
      }}
      placeholder='Place text to be saved to IPFS...'
      style={{width: '900px'}}
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
      style={{width: '900px'}}
      onChange={handleCIDChange}
      value={ipfsCID}
    />
    <Divider horizontal>
      <Header as='h4'>
        QR Code Generator
      </Header>
    </Divider>
    <Grid textAlign='center' columns={2} padded>
      <Grid.Column>
        <h4>Public Message</h4>
        <QRCode value={message} id='svgQR'/>
        <img
          src={qrImgSrc} id='qrCodeImage' width="256" height="256" hidden
        />
      </Grid.Column>
      <Grid.Column>
        <h4>Encrypted Message</h4>
      </Grid.Column>
    </Grid>
    <Divider horizontal>
      <Header as='h4'>
        Image Generator
      </Header>
    </Divider>
    <Container textAlign='center'>
      <Button
        content='Generate Embedded Image'
        icon='add circle'
        primary
        onClick={generateImage}
      />
    </Container>
    <Grid textAlign='center' columns={2} padded>
      <Grid.Column>
        <h4>Original Image</h4>
        <Image
          src={testImage} alt="ogImage" width="550" height="550" id='avatar'
        />
      </Grid.Column>
      <Grid.Column>
        <h4>Image with Embedded Attributes</h4>
        <img
          src={imgSrc} id='newImage'
        />
      </Grid.Column>
    </Grid>
    <Divider horizontal>
      <Header as='h4'>
        Interpret Image
      </Header>
    </Divider>
    <Container textAlign='center'>
      <Button
        content='Interpret Embedded Image'
        icon='add circle'
        primary
        onClick={interpretImage}
      />
    </Container>
    <Grid textAlign='center' columns={2} padded>
      <Grid.Column>
        <h4>Embedded Image</h4>
        <img
          src={imgSrc}
        />
      </Grid.Column>
      <Grid.Column>
        <h4>Scanned Image</h4>
        <img
          src={newImgSrc}
        />
      </Grid.Column>
    </Grid>
    </div>
  )
}

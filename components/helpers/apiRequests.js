const getSecret = async (hash) => {
  const secret = await fetch('/api/secret', {
    method: 'post',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      imgHash: hash
    })
  });
  const signedImage = await secret.json();
  return signedImage;
}

const getVerification = async (hash, signedHash) => {
  const res = await fetch('/api/verification', {
    method: 'post',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      imgHash: hash,
      signedHash: signedHash
    })
  });
  const verification = await res.json();
  return verification;
}

const getInitialNutData = async () => {
  // Need to create a dynamic server (possible with $ syntax)
  // This is the only one that has this issue (maybe client-server connection issue)
  const res = await fetch ('http://localhost:3000/api/getinitialnutdata', {
    method: 'post',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }
  });
  const nutData = await res.json();
  return nutData;
}

const getMetadataJSON = async (oldNut, openMsg, openMsgCID, qrMsg, qrMsgCID, finalImgCID) => {
  const res = await fetch('/api/newnutmetadata', {
    method: 'post',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      oldNut: oldNut,
      openMsg: openMsg,
      openMsgCID: openMsgCID,
      qrMsg: qrMsg,
      qrMsgCID: qrMsgCID,
      finalImgCID: finalImgCID
    })
  });
  const metadata = await res.json();
  return metadata;
}

const publishToIPNS = async (nutMeta_cid) => {
  const res = await fetch('/api/publishtoipns', {
    method: 'post',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      nutMeta_cid: nutMeta_cid
    })
  });
  const nutIPNS = await res.json();
  return nutIPNS;
}

export { getSecret, getVerification, getInitialNutData, getMetadataJSON, publishToIPNS }

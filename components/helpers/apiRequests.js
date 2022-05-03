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
  const res = await fetch ('http://localhost:3000/api/initialnutdata', {
    method: 'post',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }
  });
  const isActive = await res.json();
  return isActive;
}

export { getSecret, getVerification, getInitialNutData }

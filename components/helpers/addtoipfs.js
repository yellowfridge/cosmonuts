export default async function addToIPFS(openImg, qrImg, finalImg, nutMetadata) {
  console.log("Adding to IPFS ...");

  const ipfs = await IPFS.create();

  const openImg_cid = await ipfs.add(openImg);
  //console.log("Open Image CID:", openImg_cid);
  const qrImg_cid = await ipfs.add(qrImg);
  //console.log("QR Img CID:", qrImg_cid);
  const finalImg_cid = await ipfs.add(finalImg);
  //console.log("Consolidated Image CID:", finalImg_cid);

  const metadata_str = JSON.stringify(nutMetadata);
  const nutMetadata_cid = await ipfs.add(metadata_str);
  //console.log("Nut Metadata CID:", nutMetadata_cid);

  return { openImg_cid, qrImg_cid, finalImg_cid, nutMetadata_cid }
}

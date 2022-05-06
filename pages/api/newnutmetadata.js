export default function getMetadataJSON(req, res) {
  console.log("In Generating Nut Meta Data");

  let baseURL = "https://ipfs.io/ipfs";

  //console.log("First Request", req.body.oldNut);
  //let transNutData = JSON.parse(req.body.oldNut);
  let transNutData = req.body.oldNut;
  let newOpenMsg = req.body.openMsg;
  let newOpenMsgCID = req.body.openMsgCID;
  let newQRMsg = req.body.qrMsg;
  let newQRMsgCID = req.body.qrMsgCID;

  transNutData.open_message.value = newOpenMsg;
  transNutData.open_message.image = baseURL + newOpenMsgCID;
  transNutData.public_message.value = newQRMsg;
  transNutData.public_message.image = baseURL + newQRMsgCID;

  let transNutData_str = JSON.stringify(transNutData);

  res.status(200).json({ data: transNutData });
}

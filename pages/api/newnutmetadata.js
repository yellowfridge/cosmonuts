var fs = require('fs');
//var path = require('path');

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
  let finalImgCID = req.body.finalImgCID;

  /*/// Maybethe way to block out is by saving as json file?
  let nutId = transNutData.id;
  let fileName = "Nut" + nutId + ".json";
  let dir = 'metadata';
  let filePath = path.join(dir, fileName);
  console.log("File Path", filePath);

  //fs.writeFileSync(filePath, transNutData)
  */ /// Block out code end

  transNutData.open_message.value = newOpenMsg;
  transNutData.open_message.image = baseURL + newOpenMsgCID;
  transNutData.public_message.value = newQRMsg;
  transNutData.public_message.image = baseURL + newQRMsgCID;
  transNutData.image = baseURL + finalImgCID;

  let transNutData_str = JSON.stringify(transNutData);

  res.status(200).json({ data: transNutData });
}

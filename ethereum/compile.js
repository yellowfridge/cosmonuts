// NOT WORKING - Directory issue with finding and defining paths
// For now getting ABI after publishing on REMIX manually

const path = require('path');
const fse = require('fs-extra');
const solc = require('solc');

const buildPath = path.resolve(__dirname, 'build');
fse.removeSync(buildPath);

const contractPath = path.resolve(__dirname, 'contracts')
const fileNames = fse.readdirSync(contractPath);

//const source = fse.readFileSync(contractPath, 'utf8');

const compilerInput = {
  language: 'Solidity',
  sources: fileNames.reduce((input, fileName) => {
    const filePath = path.resolve(contractPath, fileName);
    const source = fse.readFileSync(filePath, "utf8");
    return {...input, [fileName]: {content: source}};
  }, {}),
  settings: {
    outputSelection: {
      '*': {
        '*': ['*']
      }
    }
  }
};

const compiled = JSON.parse(solc.compile(JSON.stringify(compilerInput)));

fse.ensureDirSync(buildPath);

/*
for (let contract in output) {
  fse.outputJsonSync(
    path.resolve(buildPath, contract.replace(':', '') + '.json'),
    output[contract]
  );
}
*/

fileNames.map((fileName) => {
  const contracts = Object.keys(compiled.contracts[fileName]);
  contracts.map((contract) => {
    fs.outputJsonSync(
      path.resolve(buildPath, contract + ".json"),
      compiled.contracts[fileName][contract]
    );
  });
});

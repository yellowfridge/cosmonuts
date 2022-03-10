const path = require('path');
const fse = require('fs-extra');
const solc = require('solc');

const buildPath = path.resolve(__dirname, 'build');
fse.removeSync(buildPath);

const contractPath = path.resolve(__dirname, 'contracts', 'CosmoNuts.sol')
const source = fse.readFileSync(contractPath, 'utf8');
var input = {
  language: 'Solidity',
  sources: {
    'CosmoNuts.sol' : {
      content: source
    }
  },
  settings: {
    outputSelection: {
      '*': {
        '*': ['*']
      }
    }
  }
};

var output = JSON.parse(solc.compile(JSON.stringify(input)));

fse.ensureDirSync(buildPath);

for (let contract in output) {
  fse.outputJsonSync(
    path.resolve(buildPath, contract.replace(':', '') + '.json'),
    output[contract]
  );
}

const Web3 = require("web3");
const createContract = require("truffle-contract");
const identityArtifact = require("./truffle/build/contracts/Identity.json");

let web3;
if (typeof web3 !== "undefined") {
  web3 = new Web3(web3.currentProvider);
} else {
  // set the provider you want from Web3.providers
  web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
}

const identityContract = createContract(identityArtifact);
identityContract.setProvider(web3.currentProvider);

const sender = web3.eth.accounts[4];
console.log(sender);

module.exports = { web3, identityContract };

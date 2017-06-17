const express = require("express");
const Web3 = require("web3");
const identityABI = require("./identityABI");

const app = express();
const IdentityAddress = "0x104af23142d0be240bcf2d09b797fa781190fb09";

if (typeof web3 !== "undefined") {
  web3 = new Web3(web3.currentProvider);
} else {
  // set the provider you want from Web3.providers
  web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
}
const IdentityContract = web3.eth.contract(identityABI).at(IdentityAddress);

const defaultAccount = web3.eth.accounts[3];

IdentityContract.removeUser.estimateGas(
  "0xd5bef0a7a5eccace5650416d75b0435c9c79d292",
  { from: defaultAccount },
  function(err, result) {
    if (err) {
      throw err;
    } else {
      var myGasNum = result;
      IdentityContract.removeUser.sendTransaction(
        "0xd5bef0a7a5eccace5650416d75b0435c9c79d292",
        { from: defaultAccount, gas: myGasNum },
        function(err, result) {
          if (err) {
            throw err;
          } else {
            console.log("GuestBook signed! TXID : " + result);
          }
        }
      );
    }
  }
);

console.log(IdentityContract.getUserAddressList());

console.log(
  IdentityContract.getUser("0xd5bef0a7a5eccace5650416d75b0435c9c79d292")
);

app.get("/", function(req, res) {});

app.listen(3000, function() {
  console.log("Example app listening on port 3000!");
});

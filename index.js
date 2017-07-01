const express = require("express");
const Web3 = require("web3");
const identityABI = require("./identityABI");

const app = express();
const IdentityAddress = "0x95881d99ed06488e085ce5ed46677a35fdae9a25";
//getAbi
// Identity.deployed().then(function(i){return JSON.stringify(i.abi)})

if (typeof web3 !== "undefined") {
  web3 = new Web3(web3.currentProvider);
} else {
  // set the provider you want from Web3.providers
  web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
}
const IdentityContract = web3.eth.contract(identityABI).at(IdentityAddress);

const defaultAccount = web3.eth.accounts[3];

const userName = web3.fromAscii("Pierpaolo");
const userEmail = web3.fromAscii("dop@pia.pp");

const toAscii = hex => web3.toAscii(hex).replace(/(?:\u0000)+$/, "");
const convertUser = user => ({
  userName: toAscii(user[0]),
  userEmail: toAscii(user[1])
});
const convertUserList = userList => userList.map(user => convertUser(user));

IdentityContract.createUser.estimateGas(
  userName,
  userEmail,
  { from: defaultAccount },
  function(err, result) {
    if (err) {
      throw err;
    } else {
      var myGasNum = result;
      IdentityContract.createUser.sendTransaction(
        userName,
        userEmail,
        { from: defaultAccount, gas: myGasNum },
        function(err, result) {
          if (err) {
            throw err;
          } else {
            const user = IdentityContract.getUser(defaultAccount);
            const userList = IdentityContract.getUsers();
            console.log(convertUser(user));
            console.log(convertUserList(userList));
          }
        }
      );
    }
  }
);

// const express = require("express");
const Web3 = require("web3");
const createContract = require("truffle-contract");

// const app = express();
let web3;
if (typeof web3 !== "undefined") {
  web3 = new Web3(web3.currentProvider);
} else {
  // set the provider you want from Web3.providers
  web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
}

const identityArtifact = require("./truffle/build/contracts/Identity.json");
const identityContract = createContract(identityArtifact);
identityContract.setProvider(web3.currentProvider);

const userName = web3.fromAscii("Pierpaolo");
const userEmail = web3.fromAscii("dop@pia.pp");
const payload = { userName, userEmail };
const sender = web3.eth.accounts[1];

const toAscii = hex => web3.toAscii(hex).replace(/(?:\u0000)+$/, "");
const convertUser = user => ({
  userName: toAscii(user[0]),
  userEmail: toAscii(user[1])
});
const convertUserList = userList => userList.map(user => convertUser(user));

const createUser = ({ contract, sender, payload: { userName, userEmail } }) => {
  let instance;
  return contract
    .deployed()
    .then(i => {
      instance = i;
      return instance.createUser.estimateGas(userName, userEmail, {
        from: sender
      });
    })
    .then(gasEstimate =>
      instance.createUser.sendTransaction(userName, userEmail, {
        from: sender,
        gas: gasEstimate
      })
    )
    .then(() => instance.getUser(sender))
    .then(user => console.log(convertUser(user)))
    .catch(err => console.log(err));
};

const asyncCreateUser = async ({
  contract,
  sender,
  payload: { userName, userEmail }
}) => {
  try {
    const instance = await contract.deployed();
    const gasEstimate = await instance.createUser.estimateGas(
      userName,
      userEmail,
      {
        from: sender
      }
    );
    await instance.createUser.sendTransaction(userName, userEmail, {
      from: sender,
      gas: gasEstimate
    });
    const user = await instance.getUser(sender);
    console.log(convertUser(user));
    return convertUser(user);
  } catch (err) {
    console.log(err);
  }
};

asyncCreateUser({ contract: identityContract, sender, payload });

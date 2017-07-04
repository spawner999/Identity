const web3 = require("../web3.init.js").web3;

const fromAscii = string => web3.fromAscii(string);

const toAscii = hex => web3.toAscii(hex).replace(/(?:\u0000)+$/, "");

const convertUser = user => ({
  userName: toAscii(user[0]),
  userEmail: toAscii(user[1])
});

const convertUserList = userList => userList.map(user => convertUser(user));

module.exports = { fromAscii, toAscii, convertUser, convertUserList };

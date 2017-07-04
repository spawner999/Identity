const utils = require("./utils");

const getUser = async ({ contract, userAddress }) => {
  try {
    const instance = await contract.deployed();
    const user = await instance.getUser(userAddress);
    return utils.convertUser(user);
  } catch (err) {
    console.log(err);
    throw err;
  }
};

const getUsers = async ({ contract }) => {
  try {
    const instance = await contract.deployed();
    const userList = await instance.getUsers();
    return utils.convertUserList(userList);
  } catch (err) {
    console.log(err);
    throw err;
  }
};

module.exports = { getUser, getUsers };

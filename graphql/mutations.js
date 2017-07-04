const utils = require("./utils");

const createUser = async ({
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
    return utils.convertUser(user);
  } catch (err) {
    console.log(err);
    throw err;
  }
};

module.exports = createUser;

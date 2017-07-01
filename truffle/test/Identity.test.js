var Identity = artifacts.require("./Identity.sol");

contract("Identity", function(accounts) {
  it("userMap should be empty", function() {
    return Identity.deployed()
      .then(function(instance) {
        return instance.getUsers.call(accounts[0]);
      })
      .then(function(userMap) {
        assert.equal(userMap.length, 0);
      });
  });
  it("userAddressList should be empty", function() {
    return Identity.deployed()
      .then(function(instance) {
        return instance.getUserAddressList.call(accounts[0]);
      })
      .then(function(userAddressList) {
        assert.equal(userAddressList.length, 0);
      });
  });
});

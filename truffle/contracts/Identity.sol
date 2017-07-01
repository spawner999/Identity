pragma solidity ^0.4.11;

contract Identity {
  function Identity() payable {
    contractOwner = msg.sender;
  }

  address contractOwner;
  address[] userAddressList;
  mapping ( address => User ) userMap;

  struct User {
    bytes32 userId;
    bytes32 userEmail;
  }

  function userExists(address userAddress) constant returns (bool success) {
    return userMap[userAddress].userId > 0;
  }

  function isValidHandle(bytes32 userId) constant returns (bool success) {
    return userId > 0;
  }

  function getUserAddressList() constant returns (address[]){
    return userAddressList;
  }

  function getUser(address userAddress) constant returns (bytes32[2]) {
    return [userMap[userAddress].userId, userMap[userAddress].userEmail];
  }

  function getUsers() constant returns (bytes32[2][]) {
    bytes32[2][] memory users = new bytes32[2][](userAddressList.length);
    for(uint i=0; i < userAddressList.length; i ++) {
      users[i][0] = userMap[userAddressList[i]].userId;
      users[i][1] = userMap[userAddressList[i]].userEmail;
    }
    return users;
  }

  function createUser(bytes32 userId, bytes32 userEmail)  returns (bool success) {
    address userAddress = msg.sender;
    if(!userExists(userAddress) && isValidHandle(userId)) {
      userMap[userAddress].userId = userId;
      userMap[userAddress].userEmail = userEmail;
      userAddressList.push(userAddress);
      return true;
    }
    return false;
  }

  function removeUser() returns (bool success) {
    address userAddress = msg.sender;
    if(userExists(userAddress)) {
      delete userMap[userAddress];
      return true;
    }
    return false;
  }
}

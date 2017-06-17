pragma solidity ^0.4.11;

contract Identity {
  function Identity() payable {
    contractOwner = msg.sender;
  }

  address contractOwner;
  mapping ( address => User ) Users;
  address[] userAddressList;


  struct User {
    string userId;
    string userEmail;
  }

  modifier isOwner() {
    if(msg.sender != contractOwner) {
      throw;
    }
    _; //this is replaced by the function body
  }

  function userExists(address userAddress) returns (bool success) {
    return bytes(Users[userAddress].userId).length != 0;
  }

  function isValidHandle(string userId) returns (bool success) {
    return bytes(userId).length != 0;
  }

  function createUser(string userId, string userEmail)  returns (bool success) {
    address userAddress = msg.sender;
    if(!userExists(userAddress) && isValidHandle(userId)) {
      Users[userAddress].userId = userId;
      Users[userAddress].userEmail = userEmail;
      userAddressList.push(userAddress);
      return true;
    }
    return false;
  }

  function removeUser(address userAddress) isOwner returns (bool success) {
    if(userExists(userAddress)) {
      delete Users[userAddress];
      return true;
    }
    return false;
  }

  function getUserAddressList() isOwner constant returns (address[]){
    return userAddressList;
  }

  function getUser(address userAddress) isOwner constant returns (string, string) {
    return (Users[userAddress].userId, Users[userAddress].userEmail);
  }
}

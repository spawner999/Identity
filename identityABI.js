const ABI = [
  {
    constant: true,
    inputs: [],
    name: "getUsers",
    outputs: [{ name: "", type: "bytes32[2][]" }],
    payable: false,
    type: "function"
  },
  {
    constant: true,
    inputs: [{ name: "userAddress", type: "address" }],
    name: "userExists",
    outputs: [{ name: "success", type: "bool" }],
    payable: false,
    type: "function"
  },
  {
    constant: true,
    inputs: [],
    name: "getUserAddressList",
    outputs: [{ name: "", type: "address[]" }],
    payable: false,
    type: "function"
  },
  {
    constant: true,
    inputs: [{ name: "userId", type: "bytes32" }],
    name: "isValidHandle",
    outputs: [{ name: "success", type: "bool" }],
    payable: false,
    type: "function"
  },
  {
    constant: true,
    inputs: [{ name: "userAddress", type: "address" }],
    name: "getUser",
    outputs: [{ name: "", type: "bytes32[2]" }],
    payable: false,
    type: "function"
  },
  {
    constant: false,
    inputs: [
      { name: "userId", type: "bytes32" },
      { name: "userEmail", type: "bytes32" }
    ],
    name: "createUser",
    outputs: [{ name: "success", type: "bool" }],
    payable: false,
    type: "function"
  },
  {
    constant: false,
    inputs: [],
    name: "removeUser",
    outputs: [{ name: "success", type: "bool" }],
    payable: false,
    type: "function"
  },
  { inputs: [], payable: true, type: "constructor" }
];
module.exports = ABI;

const ABI = [
  {
    constant: false,
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
    constant: false,
    inputs: [{ name: "userId", type: "string" }],
    name: "isValidHandle",
    outputs: [{ name: "success", type: "bool" }],
    payable: false,
    type: "function"
  },
  {
    constant: true,
    inputs: [{ name: "userAddress", type: "address" }],
    name: "getUser",
    outputs: [{ name: "", type: "string" }, { name: "", type: "string" }],
    payable: false,
    type: "function"
  },
  {
    constant: false,
    inputs: [
      { name: "userId", type: "string" },
      { name: "userEmail", type: "string" }
    ],
    name: "createUser",
    outputs: [{ name: "success", type: "bool" }],
    payable: false,
    type: "function"
  },
  {
    constant: false,
    inputs: [{ name: "userAddress", type: "address" }],
    name: "removeUser",
    outputs: [{ name: "success", type: "bool" }],
    payable: false,
    type: "function"
  },
  { inputs: [], payable: true, type: "constructor" }
];

module.exports = ABI;

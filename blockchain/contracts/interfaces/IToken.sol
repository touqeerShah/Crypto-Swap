// SPDX-License-Identifier: MIT

pragma solidity ^0.8.17;

interface IToken {
    //Events
    event Clam(address indexed userAddress, uint256 indexed tokenId);
    event Mint(address indexed userAddress, uint256 indexed tokenId);
    event Withdraw(uint256 indexed amount);

    function claim() external;

    function mint(uint256) external payable;

    function withdraw() external;
}

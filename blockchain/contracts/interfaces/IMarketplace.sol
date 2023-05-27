// SPDX-License-Identifier: MIT

pragma solidity ^0.8.17;

interface IMarketplace {
    //Events
    event Purchase(address indexed userAddress, uint256 indexed tokenId);

    function getPrice() external returns (uint256);

    function purchase(uint256) external payable;

    function available(uint256) external returns (bool);
}

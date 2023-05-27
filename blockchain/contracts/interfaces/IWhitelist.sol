// SPDX-License-Identifier: MIT

pragma solidity ^0.8.17;

interface IWhitelist {
    //Events
    event SuccessfullyWhitelist(address indexed userAddress);

    function addAddressToWhitelist() external;

    function whitelistedAddresses(address) external view returns (bool);
}

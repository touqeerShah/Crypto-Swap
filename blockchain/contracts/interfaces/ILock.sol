// SPDX-License-Identifier: MIT

pragma solidity ^0.8.17;

interface ILock {
    //Events

    event Withdrawal(uint amount, uint when);

    function withdraw() external;
}

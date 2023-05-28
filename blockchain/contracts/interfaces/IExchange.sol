// SPDX-License-Identifier: MIT

pragma solidity ^0.8.17;

interface ITKExchange {
    //Events
    event AddLiquidity(address indexed userAddress, uint256 indexed liquidity);
    event RemoveLiquidity(
        address indexed userAddress,
        uint256 indexed ethAmount,
        uint256 indexed tkDevTokenAmount
    );
    event EthToTKDevToken(address indexed userAddress, uint256 indexed tokensBought);
    event TkDevTokenToEth(address indexed userAddress, uint256 indexed tokensBought);

    function addLiquidity(uint) external payable returns (uint);

    function removeLiquidity(uint) external returns (uint, uint);

    function ethToTKDevToken(uint) external payable;

    function tkDevTokenToEth(uint, uint) external;
}

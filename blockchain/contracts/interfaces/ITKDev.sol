// SPDX-License-Identifier: MIT

pragma solidity ^0.8.17;

interface ITKDev {
    //Events
    event StartPresale(uint256 indexed presaleEnded);
    event PresaleMint(address indexed userAddress, uint256 indexed tokenId);
    event Mint(address indexed userAddress, uint256 indexed tokenId);
    event SetPaused();
    event Withdraw(uint256 indexed amount);

    function startPresale() external;

    function presaleMint() external payable;

    function mint() external payable;

    function setPaused(bool) external;

    function withdraw() external;

    function tokenOfOwnerByIndex(
        address owner,
        uint256 index
    ) external view returns (uint256 tokenId);

    /**
     * @dev Returns the number of tokens in ``owner``'s account.
     */
    function balanceOf(address owner) external view returns (uint256 balance);
}

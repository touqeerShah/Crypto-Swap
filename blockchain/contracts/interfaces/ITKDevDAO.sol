// SPDX-License-Identifier: MIT

pragma solidity ^0.8.17;
import "./../libraries/HelperTKDAO.sol";

interface ITKDevDAO {
    //Events
    event CreateProposal(address indexed creator, uint256 indexed proposalId, uint256 tokenId);
    event VoteOnProposal(address indexed voter, Vote vote, uint256 indexed proposalId);
    event ExecuteProposal(address indexed executor, bool executed, uint256 indexed proposalId);
    event WithdrawEther(uint256 indexed amount);

    function executeProposal(uint256) external;

    function createProposal(uint256) external returns (uint256);

    function voteOnProposal(uint256, Vote) external;

    function withdrawEther() external;
}

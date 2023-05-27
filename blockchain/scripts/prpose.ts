import { ethers, network } from "hardhat";
import { moveBlock } from "../utils/move-block"
import * as fs from "fs";
import { NEW_STORE_VALUE, FUNC, PROPOSAL_DESCRIPTION, proposalsFile, VOTING_DELAY, developmentChains } from "../helper-hardhat-config"
async function propose(args: number[], functionCall: string, desctiption: string) {
  const governor = await ethers.getContract("GovernorContract");
  const box = await ethers.getContract("Box");
  const encodeFunctionCall = box.interface.encodeFunctionData(
    functionCall, args
  )
  console.log(`proposal ${functionCall} on Box ${box.address} : argument -> ${args}`);
  console.log(`proposal Desciption ${desctiption}`);
  console.log("encodeFunctionCall", encodeFunctionCall);

  const proposeTx = await governor.propose(
    [box.address],
    [0],
    [encodeFunctionCall],
    desctiption
  )
  const proposeRes = await proposeTx.wait(1);

  if (developmentChains.includes(network.name)) {
    await moveBlock(VOTING_DELAY + 1)
  }
  console.log("proposeRes ==> ", proposeRes.blockNumber)

  const proposalId = proposeRes.events[0].args.proposalId
  console.log(`Proposed with proposal ID:\n  ${proposalId}`)

  const proposalState = await governor.state(proposalId)
  const proposalSnapShot = await governor.proposalSnapshot(proposalId)
  const proposalDeadline = await governor.proposalDeadline(proposalId)
  // save the proposalId
  storeProposalId(proposalId);

  // The state of the proposal. 1 is not passed. 0 is passed.
  console.log(`Current Proposal State: ${proposalState}`)
  // What block # the proposal was snapshot
  console.log(`Current Proposal Snapshot: ${proposalSnapShot}`)
  // The block number the proposal voting expires
  console.log(`Current Proposal Deadline: ${proposalDeadline}`)
}


function storeProposalId(proposalId: any) {
  const chainId = network.config.chainId!.toString();
  let proposals: any;

  if (fs.existsSync(proposalsFile)) {
    proposals = JSON.parse(fs.readFileSync(proposalsFile, "utf8"));
    console.log(Object.keys(proposals).length);

    if (Object.keys(proposals).length == 0) {
      proposals = {};
      proposals[chainId] = [];
    }
  } else {
    proposals = {};
    proposals[chainId] = [];
  }
  console.log("proposals", proposals);

  proposals[chainId].push(proposalId.toString());
  fs.writeFileSync(proposalsFile, JSON.stringify(proposals), "utf8");
}
// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
propose([NEW_STORE_VALUE], FUNC, PROPOSAL_DESCRIPTION).catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

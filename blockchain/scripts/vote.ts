import { ethers, network } from "hardhat";
import { moveBlock } from "../utils/move-block"
import * as fs from "fs";

import { proposalsFile, VOTING_PERIOD, developmentChains } from "../helper-hardhat-config"
async function main() {
  let proposals = JSON.parse(fs.readFileSync(proposalsFile, "utf8"))
  let proposalId = proposals[network.config.chainId!].at(-1)
  console.log("proposalId", proposalId);

  // 0 = Against, 1 = For, 2 = Abstain for this example
  let voteWay = 1;
  let reason = "I was good change";
  await vote(proposalId, voteWay, reason)


}
async function vote(proposalId: string, voteWay: number, reason: string) {
  console.log("Voting...")
  const governor = await ethers.getContract("GovernorContract");
  const voteTx = await governor.castVoteWithReason(proposalId, voteWay, reason)
  const voteTxReceipt = await voteTx.wait(1)
  console.log(voteTxReceipt.events[0].args.reason)
  const proposalState = await governor.state(proposalId)
  console.log(`Current Proposal State: ${proposalState}`)
  if (developmentChains.includes(network.name)) {
    await moveBlock(VOTING_PERIOD + 1)
  }
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

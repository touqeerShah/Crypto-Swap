import { BigNumber } from "ethers";
import { artifacts, ethers } from "hardhat";
import { contractAddressFile } from "../helper-hardhat-config"
import * as fs from "fs";
import { Whitelist } from "../typechain-types"

export async function getWhitelist(): Promise<Whitelist> {
  let contractAddress = JSON.parse(fs.readFileSync(contractAddressFile, "utf8"))
  let whitelist = await ethers.getContractAt("Whitelist", contractAddress["Whitelist"]);
  return whitelist;
}

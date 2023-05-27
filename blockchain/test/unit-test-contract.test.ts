import { assert, expect } from "chai";
import { BigNumber, Signer } from "ethers";
import { ethers } from "hardhat";
import { Whitelist } from "../typechain-types";


import { getWhitelist } from "../instructions"


describe("FigurePrintOracle", async function () {
  let deployer: Signer;
  let deployer2: Signer
  let deployer3: Signer
  let deployer4: Signer
  let deployer5: Signer
  let deployer6: Signer //0x0308b55f7bACa0324Ba6Ff06b22Af1B4e5d71a74
  let deployer7: Signer //0x0308b55f7bACa0324Ba6Ff06b22Af1B4e5d71a74

  let whitelist: Whitelist;

  before(async () => {
    [deployer, deployer2, deployer3, deployer4, deployer5, deployer6, deployer7] = await ethers.getSigners(); // could also do with getNamedAccounts
    whitelist = await getWhitelist();

  });

  describe("figurePrint Oracle Test", async function () {
    it("test calldata", async function () {
      let address: string = await deployer.getAddress();
      console.log("address", address);

      // await userIdentityNFT.connect(deployer).transferFrom(address, address, 1)
      await expect(whitelist.connect(deployer).addAddressToWhitelist())
        .to.emit(whitelist, "SuccessfullyWhitelist")
    });

  });

});

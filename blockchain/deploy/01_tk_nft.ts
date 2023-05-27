import { HardhatRuntimeEnvironment } from "hardhat/types"
import { DeployFunction } from "hardhat-deploy/types"
import verify from "../instructions/verify-code"
import { networkConfig, developmentChains, contractAddressFile } from "../helper-hardhat-config"
import { ethers } from "hardhat"
import { IPFS_SIMPLE } from "../helper-hardhat-config"
import { storeAddress } from "../utils/storeContractAddress"
import * as fs from "fs";

const deployTKDevs: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
    let { network, deployments, getNamedAccounts } = hre
    let { deploy, log } = deployments
    let { deployer } = await getNamedAccounts();
    let contractAddress = JSON.parse(fs.readFileSync(contractAddressFile, "utf8"))

    log("Deploying Orcale Url Provider Contract .... ", IPFS_SIMPLE)
    const TKDevs = await deploy("TKDevs", {
        from: deployer,
        args: [IPFS_SIMPLE, contractAddress["Whitelist"]],
        log: true,
        // we need to wait if on a live network so we can verify properly
        waitConfirmations: networkConfig[network.name].blockConfirmations || 1,

    })

    await storeAddress(TKDevs.address, "TKDevs", contractAddressFile)
    // let orcaleUr = await ethers.getContractAt("TKDevs_Proxy", "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512");
    // let proxyBox = await ethers.getContractAt("TKDevs", orcaleUr.address)// let url = await orcaleUr.getURL()
    // // console.log("url => ", await proxyBox.g÷tURL());
    // console.log("orcaleUr", proxyBox.address);

    log(`TKDevs at ${TKDevs.address}`)
    if (!developmentChains.includes(network.name) && process.env.ETHERSCANAPIKEY) {
        await verify(TKDevs.address, [IPFS_SIMPLE, contractAddress["Whitelist"]])
    }

}

export default deployTKDevs
deployTKDevs.tags = ["all", "nft"];
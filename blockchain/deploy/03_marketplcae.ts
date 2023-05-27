import { HardhatRuntimeEnvironment } from "hardhat/types"
import { DeployFunction } from "hardhat-deploy/types"
import verify from "../instructions/verify-code"
import { networkConfig, developmentChains, contractAddressFile } from "../helper-hardhat-config"
import { storeAddress } from "../utils/storeContractAddress"
import * as fs from "fs";

const deployTKDevs: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
    let { network, deployments, getNamedAccounts } = hre
    let { deploy, log } = deployments
    let { deployer } = await getNamedAccounts();
    let contractAddress = JSON.parse(fs.readFileSync(contractAddressFile, "utf8"))

    log("Deploying Token Url Provider Contract .... ")
    const TKNFTMarketplace = await deploy("TKNFTMarketplace", {
        from: deployer,
        args: [],
        log: true,
        // we need to wait if on a live network so we can verify properly
        waitConfirmations: networkConfig[network.name].blockConfirmations || 1,

    })

    await storeAddress(TKNFTMarketplace.address, "TKNFTMarketplace", contractAddressFile)


    log(`TKNFTMarketplace at ${TKNFTMarketplace.address}`)
    if (!developmentChains.includes(network.name) && process.env.ETHERSCANAPIKEY) {
        await verify(TKNFTMarketplace.address, [])
    }

}

export default deployTKDevs
deployTKDevs.tags = ["all", "marketplace"];
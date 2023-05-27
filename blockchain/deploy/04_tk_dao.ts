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

    log("Deploying Token Url Provider Contract .... ", contractAddress["TKDevs"])
    const TKDevsDAO = await deploy("TKDevsDAO", {
        from: deployer,
        args: [contractAddress["TKNFTMarketplace"], contractAddress["TKDevs"]],
        log: true,
        // we need to wait if on a live network so we can verify properly
        waitConfirmations: networkConfig[network.name].blockConfirmations || 1,

    })

    await storeAddress(TKDevsDAO.address, "TKDevsDAO", contractAddressFile)


    log(`TKDevsDAO at ${TKDevsDAO.address}`)
    if (!developmentChains.includes(network.name) && process.env.ETHERSCANAPIKEY) {
        await verify(TKDevsDAO.address, [contractAddress["TKNFTMarketplace"], contractAddress["TKDevs"]])
    }

}

export default deployTKDevs
deployTKDevs.tags = ["all", "dao"];
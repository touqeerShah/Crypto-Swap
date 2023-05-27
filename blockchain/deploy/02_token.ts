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
    const TKToken = await deploy("TKToken", {
        from: deployer,
        args: [contractAddress["TKDevs"]],
        log: true,
        // we need to wait if on a live network so we can verify properly
        waitConfirmations: networkConfig[network.name].blockConfirmations || 1,

    })

    await storeAddress(TKToken.address, "TKToken", contractAddressFile)


    log(`TKToken at ${TKToken.address}`)
    if (!developmentChains.includes(network.name) && process.env.ETHERSCANAPIKEY) {
        await verify(TKToken.address, [contractAddress["TKDevs"]])
    }

}

export default deployTKDevs
deployTKDevs.tags = ["all", "token"];
import { HardhatRuntimeEnvironment } from "hardhat/types"
import { DeployFunction } from "hardhat-deploy/types"
import verify from "../instructions/verify-code"
import { networkConfig, developmentChains, contractAddressFile } from "../helper-hardhat-config"
import { storeAddress } from "../utils/storeContractAddress"
import * as fs from "fs";

const deployTKExchange: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
    let { network, deployments, getNamedAccounts } = hre
    let { deploy, log } = deployments
    let { deployer } = await getNamedAccounts();
    let contractAddress = JSON.parse(fs.readFileSync(contractAddressFile, "utf8"))

    log("Deploying Token Url Provider Contract .... ", contractAddress["TKDevs"])
    const TKExchange = await deploy("TKExchange", {
        from: deployer,
        args: [contractAddress["TKToken"]],
        log: true,
        // we need to wait if on a live network so we can verify properly
        waitConfirmations: networkConfig[network.name].blockConfirmations || 1,

    })

    await storeAddress(TKExchange.address, "TKExchange", contractAddressFile)


    log(`TKExchange at ${TKExchange.address}`)
    if (!developmentChains.includes(network.name) && process.env.ETHERSCANAPIKEY) {
        await verify(TKExchange.address, [contractAddress["TKToken"]])
    }

}

export default deployTKExchange
deployTKExchange.tags = ["all", "exchange"];
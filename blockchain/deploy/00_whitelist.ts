import { HardhatRuntimeEnvironment } from "hardhat/types"
import { DeployFunction } from "hardhat-deploy/types"
import verify from "../instructions/verify-code"
import { networkConfig, developmentChains, contractAddressFile } from "../helper-hardhat-config"
import { ethers } from "hardhat"
import { MAX_WHITELIST_ADDRESS } from "../helper-hardhat-config"
import { storeAddress } from "../utils/storeContractAddress"

const deployWhitelist: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
    let { network, deployments, getNamedAccounts } = hre
    let { deploy, log } = deployments
    let { deployer } = await getNamedAccounts();
    log("Deploying Orcale Url Provider Contract .... ", MAX_WHITELIST_ADDRESS)
    const Whitelist = await deploy("Whitelist", {
        from: deployer,
        args: [MAX_WHITELIST_ADDRESS],
        log: true,
        // we need to wait if on a live network so we can verify properly
        waitConfirmations: networkConfig[network.name].blockConfirmations || 1,

    })

    await storeAddress(Whitelist.address, "Whitelist", contractAddressFile)
    // let orcaleUr = await ethers.getContractAt("Whitelist_Proxy", "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512");
    // let proxyBox = await ethers.getContractAt("Whitelist", orcaleUr.address)// let url = await orcaleUr.getURL()
    // // console.log("url => ", await proxyBox.g÷tURL());
    // console.log("orcaleUr", proxyBox.address);

    log(`Whitelist at ${Whitelist.address}`)
    if (!developmentChains.includes(network.name) && process.env.ETHERSCANAPIKEY) {
        await verify(Whitelist.address, [MAX_WHITELIST_ADDRESS])
    }

}

export default deployWhitelist
deployWhitelist.tags = ["all", "white"];
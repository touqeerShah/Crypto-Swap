import { ethers, network } from "hardhat";


export async function moveTime(time: number) {
    console.log("Moving Time ... ");

    var res = await network.provider.send("evm_increaseTime", [time])

    console.log("moveTime res= ", res);


}
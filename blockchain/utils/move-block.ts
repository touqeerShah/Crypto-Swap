import { ethers, network } from "hardhat";


export async function moveBlock(numberBlock: number) {
    console.log("Moving Block ... ");

    for (let index = 0; index < numberBlock; index++) {
        var res = await network.provider.request({
            method: "evm_mine",
            params: []
        })
        console.log(" block res= ", res);

    }

}
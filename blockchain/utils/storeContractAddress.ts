import * as fs from "fs";
export function storeAddress(address: string, contractName: string, filePath: string) {
    let contractAddress: any;

    if (fs.existsSync(filePath)) {
        contractAddress = JSON.parse(fs.readFileSync(filePath, "utf8"));
        console.log(Object.keys(contractAddress).length);

        if (Object.keys(contractAddress).length == 0) {
            contractAddress = {};
            contractAddress[contractName] = {};
        }
    } else {
        contractAddress = {};
        contractAddress[contractName] = {};
    }

    contractAddress[contractName] = address.toString();
    fs.writeFileSync(filePath, JSON.stringify(contractAddress), "utf8");
}
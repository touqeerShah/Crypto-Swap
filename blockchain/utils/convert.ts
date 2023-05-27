
import web3 from "web3"

export function getStringToBytes(stringData: string) {
    // console.log("stringData ... ", stringData)
    let bytesData: string = web3.utils.padRight(web3.utils.fromAscii(stringData), 34)
    // console.log("bytesData ", bytesData)
    return bytesData;
}



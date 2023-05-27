import "@nomicfoundation/hardhat-toolbox";
import "@typechain/hardhat";
import "hardhat-gas-reporter";
import "solidity-coverage";
import "hardhat-gas-reporter"
import "dotenv/config"
import "solidity-coverage"
import "hardhat-deploy"
import { HardhatUserConfig } from "hardhat/config"
import { chainIds } from "./config/constants";
import { NetworkUserConfig } from "hardhat/types";
var {
  PROVIDER_REN_URL,
  INFURA_API_KEY,
  ETHERSCANAPIKEY,
  PRIVATE_KEY_0,
  COINMARKETCAP_API_KEY,

} = process.env
const PRIVATE_KEY = process.env.PRIVATE_KEY || "privatKey"
let MUMBAI_RPC_URI = process.env.MUMBAI_RPC_URI || ""
const config: HardhatUserConfig = {
  defaultNetwork: "hardhat",
  networks: {
    hardhat: {
      chainId: 31337,
      allowUnlimitedContractSize: true
    },
    mumbai: {
      url: MUMBAI_RPC_URI,
      chainId: 80001,
      accounts: [`${PRIVATE_KEY_0}`],
      gas: 10000000,
      blockGasLimit: 100000000,
    },
    localhost: {
      chainId: 31337,
      allowUnlimitedContractSize: true
    },
    goerli: getChainConfig("goerli"),

    sepolia: getChainConfig("sepolia"),
  },
  solidity: {
    compilers: [
      {
        version: "0.8.9",
      },
      {
        version: "0.8.17",
      }, {
        version: "0.6.6",
      }, {
        version: "0.4.24",
      },
    ],
    settings: {
      optimizer: {
        enabled: true,
        runs: 200,
      },
    },
  },
  etherscan: {
    apiKey: ETHERSCANAPIKEY,
  },
  gasReporter: {
    enabled: true,
    currency: "USD",
    outputFile: "gas-report.txt",
    noColors: true,
    coinmarketcap: COINMARKETCAP_API_KEY,
  },
  namedAccounts: {
    deployer: {
      default: 0,
      1: 0,
    }, deployer2: {
      default: 1,
      2: 1,
    },
  },
  mocha: {
    timeout: 300000, // 200 seconds max for running tests
  },
}


export default config;
function getChainConfig(network: keyof typeof chainIds): NetworkUserConfig {
  let accounts: string[] = [];
  for (let i = 0; i < 10; i++) {
    const privateKey: string | undefined = process.env["PRIVATE_KEY_" + i.toString()];
    if (privateKey) {
      accounts.push(privateKey);
    }
  }
  const url: string = "https://" + network + ".infura.io/v3/" + INFURA_API_KEY;
  console.log("url", url);
  // https://goerli.infura.io/v3/eb19eeafefff4d9eb07ed30adcad89a1

  return {
    accounts,
    chainId: chainIds[network],
    url,
    gas: 10000000,
    blockGasLimit: 100000000,
  };
}
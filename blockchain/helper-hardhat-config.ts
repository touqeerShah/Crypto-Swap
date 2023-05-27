
export interface networkConfigItem {
    ethUsdPriceFeed?: string
    blockConfirmations?: number
    linkToken?: string
    oricle?: string | ""
}

export interface networkConfigInfo {
    [key: string]: networkConfigItem
}

export const networkConfig: networkConfigInfo = {
    localhost: {},
    hardhat: {},
    mumbai: {
        blockConfirmations: 5,
        linkToken: "0x326C977E6efc84E512bB9C30f76E30c160eD06FB",
        oricle: "0x022EEA14A6010167ca026B32576D6686dD7e85d2",
    },
    goerli: {
        blockConfirmations: 5,
        linkToken: "0x326C977E6efc84E512bB9C30f76E30c160eD06FB",
        oricle: "0xCC79157eb46F5624204f47AB42b3906cAA40eaB7",
    }, sepolia: {
        blockConfirmations: 11155111,
        linkToken: "0x779877A7B0D9E8603169DdbD7836e478b4624789",
        oricle: "0x6090149792dAAeE9D1D568c9f9a6F6B46AA29eFD",
    },
}


export const developmentChains = ["hardhat", "localhost"]
export const proposalsFile = "proposals.json"
export const contractAddressFile = "config/contractAddress.json"

// Governor Values
export const QUORUM_PERCENTAGE = 4 // Need 4% of voters to pass
export const MIN_DELAY = 3600 // 1 hour - after a vote passes, you have 1 hour before you can enact
// export const VOTING_PERIOD = 45818 // 1 week - how long the vote lasts. This is pretty long even for local tests
export const MAX_WHITELIST_ADDRESS = 10 // blocks
export const VOTING_DELAY = 1 // 1 Block - How many blocks till a proposal vote becomes active
export const ADDRESS_ZERO = "0x0000000000000000000000000000000000000000"

export const NEW_STORE_VALUE = 77
export const FUNC = "setUrl"
export const PROPOSAL_DESCRIPTION = "Proposal #1 Update Orcale endpint!"
export const ORCALE_URL_PROVIDER = process.env.OrcaleUrlProvider || "";
export const ORCALE_URL_PROVIDER2 = "https://user-id/explorer/";

export const JOB_ID = "7d80a6386ef543a3abb52817f6707e3b"
export const SIGNING_DOMAIN_NAME = "User-Identity"
export const SIGNING_DOMAIN_VERSION = "1"
export const NFT_NAME = "User-Identity"
export const NFT_SYMBOL = "786"

export const DS_SIGNING_DOMAIN_NAME = "Doc-Sign"
export const DS_SIGNING_DOMAIN_VERSION = "1"
export const DS_NFT_NAME = "Doc-Sign"
export const DS_NFT_SYMBOL = "DS_786"
export const IPFS_SIMPLE = process.env.IPFS_SIMPLE || ""
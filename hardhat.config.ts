import * as dotenv from "dotenv";
dotenv.config(); // Load plain text .env variables

import { HardhatUserConfig, extendEnvironment } from "hardhat/config";
import { createProvider } from "hardhat/internal/core/providers/construction";
import "@nomicfoundation/hardhat-toolbox";
import './tasks/configuration'; // Ensure you import the task here
import "./tasks/fund";  // Import the custom task



// Fetch environment variables
const PRIVATE_KEY = process.env.PRIVATE_KEY;
const ETHEREUM_SEPOLIA_RPC_URL = process.env.ETHEREUM_SEPOLIA_RPC_URL;
const OPTIMISM_SEPOLIA_RPC_URL = process.env.OPTIMISM_SEPOLIA_RPC_URL;
const ARBITRUM_SEPOLIA_RPC_URL = process.env.ARBITRUM_SEPOLIA_RPC_URL;
const AVALANCHE_FUJI_RPC_URL = process.env.AVALANCHE_FUJI_RPC_URL;
const POLYGON_AMOY_RPC_URL = process.env.POLYGON_AMOY_RPC_URL;
const BNB_CHAIN_TESTNET_RPC_URL = process.env.BNB_CHAIN_TESTNET_RPC_URL;
const BASE_SEPOLIA_RPC_URL = process.env.BASE_SEPOLIA_RPC_URL;
const KROMA_SEPOLIA_RPC_URL = process.env.KROMA_SEPOLIA_RPC_URL;
const WEMIX_TESTNET_RPC_URL = process.env.WEMIX_TESTNET_RPC_URL;
const GNOSIS_CHIADO_RPC_URL = process.env.GNOSIS_CHIADO_RPC_URL;
const CELO_ALFAJORES_RPC_URL = process.env.CELO_ALFAJORES_RPC_URL;

// Ensure all essential environment variables are defined
if (!PRIVATE_KEY) {
  throw new Error("Please set your PRIVATE_KEY in the .env file");
}
if (!ETHEREUM_SEPOLIA_RPC_URL) {
  throw new Error("Please set your ETHEREUM_SEPOLIA_RPC_URL in the .env file");
}

// Extend environment for dynamic network switching (optional)
declare module "hardhat/types/runtime" {
  export interface HardhatRuntimeEnvironment {
    changeNetwork: Function;
  }
}

extendEnvironment(async (hre) => {
  hre.changeNetwork = async function changeNetwork(newNetwork: string) {
    if (!hre.config.networks[newNetwork]) {
      throw new Error(`Network ${newNetwork} is not configured.`);
    }
    console.log(`Switching to network: ${newNetwork}`);
    hre.network.name = newNetwork;
    hre.network.config = hre.config.networks[newNetwork];
    hre.ethers.provider = new hre.ethers.providers.JsonRpcProvider(hre.network.config.url);
    hre.network.provider = await createProvider(hre.config, newNetwork);
    console.log(`Switched to network: ${newNetwork}`);
  };
});

// Hardhat configuration with multiple networks
const config: HardhatUserConfig = {
  solidity: "0.8.19",
  defaultNetwork: 'ethereumSepolia',
  networks: {
    hardhat: {
      chainId: 31337,
    },
    ethereumSepolia: {
      url: ETHEREUM_SEPOLIA_RPC_URL,
      accounts: PRIVATE_KEY ? [PRIVATE_KEY] : [],
      chainId: 11155111,
    },
    optimismSepolia: {
      url: OPTIMISM_SEPOLIA_RPC_URL,
      accounts: PRIVATE_KEY ? [PRIVATE_KEY] : [],
      chainId: 11155420,
    },
    arbitrumSepolia: {
      url: ARBITRUM_SEPOLIA_RPC_URL,
      accounts: PRIVATE_KEY ? [PRIVATE_KEY] : [],
      chainId: 421613,
    },
    avalancheFuji: {
      url: AVALANCHE_FUJI_RPC_URL,
      accounts: PRIVATE_KEY ? [PRIVATE_KEY] : [],
      chainId: 43113,
    },
    polygonAmoy: {
      url: POLYGON_AMOY_RPC_URL,
      accounts: PRIVATE_KEY ? [PRIVATE_KEY] : [],
      chainId: 80001,
    },
    bnbChainTestnet: {
      url: BNB_CHAIN_TESTNET_RPC_URL,
      accounts: PRIVATE_KEY ? [PRIVATE_KEY] : [],
      chainId: 97,
    },
    baseSepolia: {
      url: BASE_SEPOLIA_RPC_URL,
      accounts: PRIVATE_KEY ? [PRIVATE_KEY] : [],
      chainId: 84531,
    },
    kromaSepolia: {
      url: KROMA_SEPOLIA_RPC_URL,
      accounts: PRIVATE_KEY ? [PRIVATE_KEY] : [],
      chainId: 2357,
    },
    wemixTestnet: {
      url: WEMIX_TESTNET_RPC_URL,
      accounts: PRIVATE_KEY ? [PRIVATE_KEY] : [],
      chainId: 1111,
    },
    gnosisChiado: {
      url: GNOSIS_CHIADO_RPC_URL,
      accounts: PRIVATE_KEY ? [PRIVATE_KEY] : [],
      chainId: 10200,
    },
    celoAlfajores: {
      url: CELO_ALFAJORES_RPC_URL,
      accounts: PRIVATE_KEY ? [PRIVATE_KEY] : [],
      chainId: 44787,
    },
  },
};

export default config;

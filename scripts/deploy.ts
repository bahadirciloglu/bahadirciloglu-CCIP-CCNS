import { ethers } from "hardhat";
import * as dotenv from "dotenv";

dotenv.config();

async function main() {
  const [deployer] = await ethers.getSigners();
  console.log("Deploying contracts with the account:", deployer.address);

  // Example chain ID for Ethereum Sepolia
  const chainId = process.env.CHAIN_ID || 11155111;

  try {
    // 1. Deploy CCIPLocalSimulator
    const CCIPLocalSimulator = await ethers.getContractFactory("CCIPLocalSimulator");
    const ccipLocalSimulator = await CCIPLocalSimulator.deploy();
    await ccipLocalSimulator.deployed();
    console.log("CCIPLocalSimulator deployed to:", ccipLocalSimulator.address);

    // 2. Get the Router address by calling the configuration() function
    const routerAddress = await ccipLocalSimulator.configuration();
    console.log("Router Address:", routerAddress);

    // 3. Deploy CrossChainNameServiceRegister
    const CrossChainNameServiceRegister = await ethers.getContractFactory("CrossChainNameServiceRegister");
    const crossChainNameServiceRegister = await CrossChainNameServiceRegister.deploy(routerAddress);
    await crossChainNameServiceRegister.deployed();
    console.log("CrossChainNameServiceRegister deployed to:", crossChainNameServiceRegister.address);

    // 4. Deploy CrossChainNameServiceReceiver
    const CrossChainNameServiceReceiver = await ethers.getContractFactory("CrossChainNameServiceReceiver");
    const crossChainNameServiceReceiver = await CrossChainNameServiceReceiver.deploy(routerAddress);
    await crossChainNameServiceReceiver.deployed();
    console.log("CrossChainNameServiceReceiver deployed to:", crossChainNameServiceReceiver.address);

    // 5. Deploy CrossChainNameServiceLookup
    const CrossChainNameServiceLookup = await ethers.getContractFactory("CrossChainNameServiceLookup");
    const crossChainNameServiceLookup = await CrossChainNameServiceLookup.deploy();
    await crossChainNameServiceLookup.deployed();
    console.log("CrossChainNameServiceLookup deployed to:", crossChainNameServiceLookup.address);

    // 6. Enable chain for each service (on both Register and Receiver contracts)
    const enableRegisterTx = await crossChainNameServiceRegister.enableChain(chainId);
    await enableRegisterTx.wait();
    console.log(`Chain ${chainId} enabled for CrossChainNameServiceRegister`);

    const enableReceiverTx = await crossChainNameServiceReceiver.enableChain(chainId);
    await enableReceiverTx.wait();
    console.log(`Chain ${chainId} enabled for CrossChainNameServiceReceiver`);

    // 7. Set the service addresses for both source (Register) and receiver (Receiver)
    const setRegisterTx = await crossChainNameServiceLookup.setCrossChainNameServiceAddress(chainId, crossChainNameServiceRegister.address);
    await setRegisterTx.wait();
    console.log(`CrossChainNameServiceRegister address set for chain ${chainId}`);

    const setReceiverTx = await crossChainNameServiceLookup.setCrossChainNameServiceAddress(chainId, crossChainNameServiceReceiver.address);
    await setReceiverTx.wait();
    console.log(`CrossChainNameServiceReceiver address set for chain ${chainId}`);

    console.log("Deployment and configuration completed successfully.");
  } catch (error) {
    console.error("Error during deployment and configuration:", error);
  }
}

main().catch((error) => {
  console.error("Error during script execution:", error);
  process.exitCode = 1;
});

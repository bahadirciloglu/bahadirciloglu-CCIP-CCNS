import { task } from "hardhat/config";

task("get-router", "Gets the Router contract address")
  .addParam("contract", "The address of the deployed CCIPLocalSimulator contract")
  .setAction(async (taskArgs, hre) => {
    const CCIPLocalSimulator = await hre.ethers.getContractFactory("CCIPLocalSimulator");
    
    // Attach to the deployed contract using the provided address
    const ccipSimulator = await CCIPLocalSimulator.attach(taskArgs.contract);
    
    // Call the configuration function to get the Router address
    const routerAddress = await ccipSimulator.configuration();
    
    console.log(`Router contract address: ${routerAddress}`);
  });

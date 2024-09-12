import { ethers } from "hardhat";

async function main() {
  // Get the contract factory for CCIPLocalSimulator
  const CCIPLocalSimulator = await ethers.getContractFactory("CCIPLocalSimulator");
  
  // Deploy the contract
  const ccipLocalSimulator = await CCIPLocalSimulator.deploy();
  await ccipLocalSimulator.deployed();

  console.log("CCIPLocalSimulator deployed to:", ccipLocalSimulator.address);

  // Get the Router address by calling the configuration() function
  const routerAddress = await ccipLocalSimulator.configuration();
  console.log("Router Address:", routerAddress);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

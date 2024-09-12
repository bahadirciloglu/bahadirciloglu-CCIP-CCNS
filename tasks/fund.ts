import { task } from "hardhat/config";

task("fund", "Funds an account with a specified amount of ETH")
  .addParam("to", "The address to send ETH to")
  .addParam("amount", "The amount of ETH to send in wei")
  .setAction(async (taskArgs, hre) => {
    const { to, amount } = taskArgs;

    const [deployer] = await hre.ethers.getSigners();

    console.log(`Funding address ${to} with ${amount} wei from account: ${deployer.address}`);

    const tx = await deployer.sendTransaction({
      to: to,
      value: hre.ethers.BigNumber.from(amount),
    });

    await tx.wait();

    console.log(`Transaction hash: ${tx.hash}`);
  });

export {};

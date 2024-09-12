import { ethers } from "hardhat";

async function main() {
  const [deployer] = await ethers.getSigners();
  console.log("Calling the register() function with the account:", deployer.address);

  // Daha önce dağıtılan CrossChainNameServiceRegister sözleşmesinin adresi
  const ccnsRegisterAddress = "0x094Df95b449ddB51e837Ec38A64Af35027C0677e"; // Gerçek adresi buraya ekleyin

  // CrossChainNameServiceRegister sözleşmesine bağlanın
  const CrossChainNameServiceRegister = await ethers.getContractFactory("CrossChainNameServiceRegister");
  const ccnsRegister = CrossChainNameServiceRegister.attach(ccnsRegisterAddress);

  // "alice.ccns" ile register() fonksiyonunu çağırın
  const aliceName = "alice.ccns";

  const tx = await ccnsRegister.register(aliceName);  // Yalnızca ismi sağlayın
  await tx.wait();  // İşlemin onaylanmasını bekleyin

  console.log(`Registered name ${aliceName}`);
}

main().catch((error) => {
  console.error("Error during registration:", error);
  process.exitCode = 1;
});

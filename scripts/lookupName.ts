import { ethers } from "hardhat";

async function main() {
  const [deployer] = await ethers.getSigners();
  console.log("Looking up the registered name with the account:", deployer.address);

  // CrossChainNameServiceLookup sözleşmesinin adresi
  const ccnsLookupAddress = "0x094Df95b449ddB51e837Ec38A64Af35027C0677e"; // Gerçek adresi buraya ekleyin

  // CrossChainNameServiceLookup sözleşmesine bağlanın
  const CrossChainNameServiceLookup = await ethers.getContractFactory("CrossChainNameServiceLookup");
  const ccnsLookup = CrossChainNameServiceLookup.attach(ccnsLookupAddress);

  // "alice.ccns" için kaydedilen adresi alın
  const aliceName = "alice.ccns";
  
  // lookup fonksiyonunu çağırıyoruz
  const aliceAddress = await ccnsLookup.lookup(aliceName);

  console.log(`Address for ${aliceName} is ${aliceAddress}`);

  const aliceEOA = "0x094Df95b449ddB51e837Ec38A64Af35027C0677e";  // Alice'in EOA adresini buraya ekleyin

  if (aliceAddress.toLowerCase() === aliceEOA.toLowerCase()) {
    console.log("The address for 'alice.ccns' matches Alice's EOA address.");
  } else {
    console.log("The address for 'alice.ccns' does not match Alice's EOA address.");
  }
}

main().catch((error) => {
  console.error("Error during lookup:", error);
  process.exitCode = 1;
});

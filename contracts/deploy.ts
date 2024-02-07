import { ethers } from "hardhat";

async function main() {

  const Registry = await ethers.getContractFactory("DoctorRegistry");
  const PatientStore = await ethers.getContractFactory("PatientStore");

  const registry = await Registry.deploy()
  const store = await PatientStore.deploy("Rakesh", 23, registry.address);

}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

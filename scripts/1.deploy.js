// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.
const { ethers} = require("hardhat");

async function main() {
  console.log("prepare deployment......\n");

  const Richest = await ethers.getContractFactory("RichestWallets");
  let [deployer] = await ethers.getSigners();
  // Deploy the contract
  console.log("Deploying the contract...");
  let Richest_deployed = await Richest.deploy(deployer.address);
  //wait for the contract to be mined
  await Richest_deployed.deployed();
  console.log(
    `\tRichest contract deployed to address-- ${Richest_deployed.address}`
  );
   console.log(`\tDeployed by ${deployer.address}`);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

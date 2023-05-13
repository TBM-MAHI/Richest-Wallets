const { ethers } = require("hardhat");

async function main() {
  const { chainId } = await ethers.provider.getNetwork();
  console.log("Running on blockchain chainId " + chainId);
  //fetch accouns from wallet-unlocked
  const [deployerAccount, user1, user2, user3, user4, user5] =
    await ethers.getSigners();

  const users = [
    {
      name: "John",
      email: "john@example.com",
      signer: user1,
    },
    {
      name: "Mary",
      email: "mary@example.com",
      signer: user2,
    },
    {
      name: "Tom",
      email: "tom@example.com",
      signer: user3,
    },
    {
      name: "Alice",
      email: "alice@example.com",
      signer: user4,
    },
    {
      name: "Bob",
      email: "bob@example.com",
      signer: user5,
    },
  ];

  const Richest_con = await ethers.getContractAt(
    "RichestWallets",
    "0x5FbDB2315678afecb367f032d93F642f64180aa3"
  );

  let transaction, res;

  console.log(await Richest_con.deployer());
  //REGISTER USERS

  for (let i = 0; i < users.length; i++) {
    const { name, email, signer } = users[i];
    try {
      transaction = await Richest_con.connect(signer).registerUser(name, email);
      res = await transaction.wait();
      let event = res.events[0].args;
      //let { walletAddress, name, email } = event;
      console.log(`User ${i + 1} registered successfully`);
      console.log(`\t Emitted event data ${event}`);
    } catch (error) {
      let { reason } = error;
      console.log(reason.slice(reason.indexOf(" '")));
    }
  }
  //UPDATE PROFILE
  transaction = await Richest_con.connect(user2).updateUserInfo(
    "marty macfly",
    "marty@future.com"
  );
  res = await transaction.wait();
  let event = res.events[0].args;
  let { walletAddress, name, email } = event;
  console.log(`User2 ${user2.address} updated successfully`);
  console.log(`\t Emitted event data ${walletAddress} ${name}  ${email}`);

  //TOTAL USERS
  let total = await Richest_con.getTotalNumberUsers();
  console.log(`Total users \n\t ${total}`);
  console.log(`Total users \n\t ${typeof total }`);
  
  
  // GET TOP THREE
  try {
    transaction = await Richest_con.getTopThreeUser();
    res = await transaction.wait();
    let eventsArr = res.events;
    let topThreeUserArray = eventsArr.map((el) => {
      let { walletAddress, name, balance } = el.args;
      return {
        walletAddress,
        name,
        balance: ethers.utils.formatEther(balance),
      };
    });
    console.log(topThreeUserArray);
  } catch (error) {
    console.log(error);
  }
  //
}
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

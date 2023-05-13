// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.8.2 <0.9.0;

contract RichestWallets {
    struct User {
        string name;
        string email;
        address walletAddress;
        uint256 balance;
    }
    event UserRegister(
        address indexed walletAddress,
        string name,
        string email
    );

    event updateUser(
        address indexed walletAddress, 
        string name, 
        string email
    );
    event topThreeUsers(address indexed walletAddress, string name, uint balance);
    //ethereum address mapping to specific Users
    mapping(address => User) public Users;
    address public deployer;
    address[]  userAdresses;

    constructor(address _deployer){
        deployer=_deployer;
        
   }
    modifier requireValidation(string memory name, string memory email) {
        require(
            bytes(name).length > 0 && bytes(email).length > 0,
            "name and email required"
        );
        _;
    }

    function registerUser(string memory name, string memory email)
        public
        requireValidation(name, email)
    {
        require(
            Users[msg.sender].walletAddress == address(0),
            "Wallet Address already Exisits"
        );
        Users[msg.sender] = User(name, email, msg.sender, 0);
        userAdresses.push(msg.sender);
        setUserBalance();
        emit UserRegister(msg.sender, name, email);
    }

    function updateUserInfo(string memory _name, string memory _email)
        public
        requireValidation(_name, _email)
    {
        require(
            Users[msg.sender].walletAddress != address(0),
            "Wallet Address Not Registered!"
        );
        Users[msg.sender].name = _name;
        Users[msg.sender].email = _email;

        emit updateUser(msg.sender, _name, _email);
    }

    function setUserBalance() internal {
        require(
            Users[msg.sender].walletAddress != address(0),
            "Wallet Address Not Registered"
        );
        uint256 currentBlance = address(msg.sender).balance;
        Users[msg.sender].balance = currentBlance;
    }

    function getTopThreeUser() public   {
        require(userAdresses.length >= 3, "Not enough users to get top three");
        address[3] memory topThreeAddress;
        uint256[] memory Userbalances = new uint256[](userAdresses.length);

        for (uint256 i = 0; i < userAdresses.length; i++) {
            Userbalances[i] = Users[userAdresses[i]].balance;
        }
        for (uint256 i = 0; i < 3; i++) {
            uint256 maxIndex = 0;
            uint256 maxBalance = 0;

            for (uint256 j = 0; j < Userbalances.length; j++) {
                if (Userbalances[j] > maxBalance) {
                    maxBalance = Userbalances[j];
                    maxIndex = j;
                }
            }
            topThreeAddress[i] = userAdresses[maxIndex];
            Userbalances[maxIndex] = 0;
        }
        getTopUsersData(topThreeAddress);
    }
    function getTopUsersData(address[3] memory _topThreeAddress) internal {
        for (uint256 i = 0; i < 3; i++) {
            User storage u = Users[_topThreeAddress[i]];
         emit topThreeUsers(u.walletAddress , u.name, u.balance);
        }
    }
    function getTotalNumberUsers() public view returns(uint) {
        uint total = userAdresses.length;
       return total;
    }
}

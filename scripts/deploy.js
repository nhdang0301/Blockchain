// scripts/deploy.js
const { ethers } = require("hardhat");
async function main() {
    // Lấy Factory của hợp đồng
    const MyToken = await ethers.getContractFactory("MyToken");

    // Triển khai hợp đồng
    const myToken = await MyToken.deploy();

    // Đợi cho đến khi hợp đồng được triển khai
    await myToken.deployed();

    // In ra địa chỉ của hợp đồng đã triển khai
    console.log("MyToken deployed to:", myToken.address);

    // Lấy danh sách các signers
    const [owner] = await ethers.getSigners();

    // In ra số dư của chủ sở hữu (signer đầu tiên)
    const ownerBalance = await myToken.balanceOf(owner.address);
    console.log("Owner balance:", ownerBalance.toString());
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });

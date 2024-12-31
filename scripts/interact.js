// Import ethers từ Hardhat
const { ethers } = require("hardhat");

async function main() {
    // Địa chỉ hợp đồng đã triển khai (thay bằng địa chỉ thực tế nếu khác)
    const contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";

    // Lấy Factory của hợp đồng
    const MyToken = await ethers.getContractFactory("MyToken");

    // Kết nối với hợp đồng đã triển khai
    const myToken = await MyToken.attach(contractAddress);

    // Lấy danh sách các signers từ Hardhat
    const [account0] = await ethers.getSigners();

    // Kiểm tra tổng cung
    const totalSupply = await myToken.totalSupply();
    console.log("Total Supply:", ethers.utils.formatUnits(totalSupply, 18), "MTK");

    // Kiểm tra số dư của Account #0
    const balance0 = await myToken.balanceOf(account0.address);
    console.log("Balance of Account #0:", ethers.utils.formatUnits(balance0, 18), "MTK");

    // Đặt cọc 100 MTK từ Account #0
    const amountToStake = ethers.utils.parseUnits("100", 18); // 18 decimal như ERC20 tiêu chuẩn
    const stakeTx = await myToken.connect(account0).stake(amountToStake);
    await stakeTx.wait();
    console.log(`Staked ${ethers.utils.formatUnits(amountToStake, 18)} MTK from Account #0`);

    // Kiểm tra số dư sau khi đặt cọc
    const balance0AfterStake = await myToken.balanceOf(account0.address);
    console.log("Balance of Account #0 after staking:", ethers.utils.formatUnits(balance0AfterStake, 18), "MTK");

    const stakedAmount = await myToken.stakingBalances(account0.address);
    console.log("Staked Amount of Account #0:", ethers.utils.formatUnits(stakedAmount, 18), "MTK");

    // Rút cọc và nhận phần thưởng
    const unstakeTx = await myToken.connect(account0).unstake();
    await unstakeTx.wait();
    console.log(`Unstaked from Account #0 and received rewards.`);

    // Kiểm tra số dư sau khi rút cọc
    const balance0AfterUnstake = await myToken.balanceOf(account0.address);
    console.log("Balance of Account #0 after unstaking:", ethers.utils.formatUnits(balance0AfterUnstake, 18), "MTK");

    const stakedAmountAfterUnstake = await myToken.stakingBalances(account0.address);
    console.log("Staked Amount of Account #0 after unstaking:", ethers.utils.formatUnits(stakedAmountAfterUnstake, 18), "MTK");
}

// Thực thi hàm main và xử lý lỗi
main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error("Error:", error);
        process.exit(1);
    });

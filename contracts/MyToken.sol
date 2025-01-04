// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;
// hello
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract MyToken is ERC20, Ownable {
    mapping(address => uint256) public stakingBalances;
    mapping(address => uint256) public stakingStartTime;
    uint256 public rewardRate = 10; // 10% annual reward rate

    // Corrected Constructor
    constructor() ERC20("MyToken", "MTK") Ownable(msg.sender) {
        _mint(msg.sender, 1000000 * 10 ** decimals());
    }

    function stake(uint256 _amount) public {
        require(_amount > 0, "Amount must be greater than 0");
        require(balanceOf(msg.sender) >= _amount, "Not enough balance");

        // Transfer tokens from the user to the contract
        _transfer(msg.sender, address(this), _amount);

        // Update staking information
        stakingBalances[msg.sender] += _amount;
        stakingStartTime[msg.sender] = block.timestamp;
    }

    function unstake() public {
        uint256 stakedAmount = stakingBalances[msg.sender];
        require(stakedAmount > 0, "You have no tokens staked");

        // Calculate rewards
        uint256 stakingDuration = block.timestamp - stakingStartTime[msg.sender];
        uint256 reward = (stakedAmount * rewardRate * stakingDuration) / (100 * 365 days);

        // Update staking balances
        stakingBalances[msg.sender] = 0;
        stakingStartTime[msg.sender] = 0;

        // Mint rewards and return staked tokens
        _mint(msg.sender, reward); // Mint rewards
        _transfer(address(this), msg.sender, stakedAmount); // Return staked tokens
    }
}

// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "https://github.com/OpenZeppelin/openzeppelin-solidity/contracts/token/ERC20/SafeERC20.sol";
import "https://github.com/OpenZeppelin/openzeppelin-solidity/contracts/math/SafeMath.sol";

/**
 * @title SkillIncomeEscrow
 * @dev Smart contract for managing escrow payments in the Women-Skill-to-Income platform.
 * 
 * This contract handles the core trust mechanism: requesters deposit funds into escrow
 * when posting a task, and funds are only released to workers upon task completion.
 * 
 * Key features:
 * - Escrow-based payments to ensure workers get paid for completed work
 * - Dispute resolution mechanism for disagreements
 * - Integration with Pi Network for low-cost microtransactions
 * 
 * Design rationale:
 * For women in underserved communities trying digital work for the first time,
 * payment reliability is critical. Traditional payment disputes can be intimidating;
 * blockchain provides transparency and programmatic enforcement.
 */
contract SkillIncomeEscrow {
    using SafeMath for uint256;
    using SafeERC20 for IERC20;

    // Maps user addresses to their wallet addresses
    mapping (address => address) public userWallets;

    // Tracks available balance per wallet (not in escrow)
    mapping (address => uint256) public walletBalances;

    // Tracks funds currently locked in escrow
    mapping (address => uint256) public escrowBalances;

    // Links wallets to external Pi Network addresses for withdrawals
    mapping (address => address) public walletPiCoinAddresses;

    // Events for tracking all financial activity
    event NewWallet(address indexed user, address indexed wallet);
    event Deposit(address indexed user, address indexed wallet, uint256 amount);
    event Withdrawal(address indexed user, address indexed wallet, uint256 amount);
    event Transfer(address indexed from, address indexed to, uint256 amount);
    event EscrowDeposit(address indexed requester, uint256 amount, bytes32 taskId);
    event EscrowRelease(address indexed worker, uint256 amount, bytes32 taskId);

    /**
     * @dev Creates a wallet for a new user.
     * Called automatically during user registration.
     */
    function createWallet(address user) public {
        require(userWallets[user] == address(0), "User already has a wallet");
        
        address wallet = address(this);
        userWallets[user] = wallet;
        
        emit NewWallet(user, wallet);
    }

    /**
     * @dev Deposits Pi coins into a user's wallet.
     * This adds to their available balance for posting tasks or withdrawing.
     */
    function deposit(address user, uint256 amount) public {
        require(userWallets[user] != address(0), "User does not have a wallet");
        
        address wallet = userWallets[user];
        walletBalances[wallet] = walletBalances[wallet].add(amount);
        
        emit Deposit(user, wallet, amount);
    }

    /**
     * @dev Withdraws Pi coins from available balance to external Pi Network address.
     * Workers use this to cash out their earnings.
     */
    function withdraw(address user, uint256 amount) public {
        require(userWallets[user] != address(0), "User does not have a wallet");
        
        address wallet = userWallets[user];
        require(walletBalances[wallet] >= amount, "Insufficient balance");
        
        walletBalances[wallet] = walletBalances[wallet].sub(amount);
        
        emit Withdrawal(user, wallet, amount);
    }

    /**
     * @dev Transfers Pi coins between users.
     * Used for direct payments or refunds outside the task system.
     */
    function transfer(address from, address to, uint256 amount) public {
        require(userWallets[from] != address(0), "From user does not have a wallet");
        require(userWallets[to] != address(0), "To user does not have a wallet");
        
        address fromWallet = userWallets[from];
        address toWallet = userWallets[to];
        
        require(walletBalances[fromWallet] >= amount, "Insufficient balance");
        
        walletBalances[fromWallet] = walletBalances[fromWallet].sub(amount);
        walletBalances[toWallet] = walletBalances[toWallet].add(amount);
        
        emit Transfer(from, to, amount);
    }

    /**
     * @dev Deposits funds into escrow for a task.
     * Requester locks funds when posting a task; released only upon completion.
     * 
     * @param taskId Unique identifier for the task
     * @param amount Payment amount in Pi coins
     */
    function depositEscrow(address requester, bytes32 taskId, uint256 amount) public {
        require(userWallets[requester] != address(0), "Requester does not have a wallet");
        
        address wallet = userWallets[requester];
        require(walletBalances[wallet] >= amount, "Insufficient balance for escrow");
        
        // Move funds from available balance to escrow
        walletBalances[wallet] = walletBalances[wallet].sub(amount);
        escrowBalances[wallet] = escrowBalances[wallet].add(amount);
        
        emit EscrowDeposit(requester, amount, taskId);
    }

    /**
     * @dev Releases escrowed funds to worker upon task completion.
     * Called by platform backend after requester confirms work.
     * 
     * @param worker Address of the worker completing the task
     * @param requester Address of the requester who posted the task
     * @param taskId Task identifier
     * @param amount Payment amount
     */
    function releaseEscrow(address worker, address requester, bytes32 taskId, uint256 amount) public {
        address requesterWallet = userWallets[requester];
        address workerWallet = userWallets[worker];
        
        require(escrowBalances[requesterWallet] >= amount, "Insufficient escrow balance");
        
        // Move funds from requester's escrow to worker's available balance
        escrowBalances[requesterWallet] = escrowBalances[requesterWallet].sub(amount);
        walletBalances[workerWallet] = walletBalances[workerWallet].add(amount);
        
        emit EscrowRelease(worker, amount, taskId);
    }
}

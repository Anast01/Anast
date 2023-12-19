// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.8.2 <0.9.0;

/**
 * @title GuessNumberGame
 * @dev Simple guessing game with reward
 * @custom:dev-run-script ./scripts/deploy_with_ethers.ts
 */
contract GuessNumberGame {

    uint256 private secretNumber;
    address private owner;
    uint256 private rewardAmount = 50000000000000; // 0.05 XTZ in wei
    mapping(address => uint256) private lastGuessTimestamp;
    uint256 private guessCooldown = 1 days; // Cooldown of 1 day

    event NumberGuessed(address indexed player, uint256 guessedNumber, bool isCorrect);

    /**
     * @dev Constructor to set the owner and initialize the secret number.
     */
    constructor() {
        owner = msg.sender;
        generateSecretNumber();
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "Only owner can call this function");
        _;
    }

    /**
     * @dev Generate a random secret number between 0 and 10.
     */
    function generateSecretNumber() private {
        /**bytes32 blockHash = blockhash(block.number - 1);*/
        secretNumber = uint256(keccak256(abi.encodePacked("", block.timestamp))) % 11;
    }

    /**
     * @dev Store a new secret number, only callable by the owner.
     * @param newSecretNumber The new secret number to set.
     */
    function setSecretNumber(uint256 newSecretNumber) public onlyOwner {
        require(newSecretNumber >= 0 && newSecretNumber <= 10, "Number must be between 0 and 10");
        secretNumber = newSecretNumber;
    }

    /**
     * @dev Guess the secret number and get a reward if correct.
     * @param guessedNumber The number guessed by the player.
     */
    function guessNumber(uint256 guessedNumber) public payable {
        require(guessedNumber >= 0 && guessedNumber <= 10, "Number must be between 0 and 10");
        require(lastGuessTimestamp[msg.sender] + guessCooldown < block.timestamp, "Cooldown period not over");

        if (guessedNumber == secretNumber) {
            // Correct guess, reward the player
            payable(msg.sender).transfer(rewardAmount);
            emit NumberGuessed(msg.sender, guessedNumber, true);
        } else {
            emit NumberGuessed(msg.sender, guessedNumber, false);
        }

        // Update the last guess timestamp for the player
        lastGuessTimestamp[msg.sender] = block.timestamp;

        // Generate a new secret number for the next round
        generateSecretNumber();
    }

    /**
     * @dev Get the current reward amount.
     * @return The reward amount in wei.
     */
    function getRewardAmount() public view returns (uint256) {
        return rewardAmount;
    }

    /**
     * @dev Get the remaining cooldown time for the caller's address.
     * @return The remaining cooldown time in seconds.
     */
    function getRemainingCooldown() public view returns (uint256) {
        uint256 cooldownEnd = lastGuessTimestamp[msg.sender] + guessCooldown;
        if (cooldownEnd > block.timestamp) {
            return cooldownEnd - block.timestamp;
        } else {
            return 0;
        }
    }
}

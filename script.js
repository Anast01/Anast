document.addEventListener('DOMContentLoaded', async function () {
    // Connect to a web3 provider (e.g., MetaMask)
    if (window.ethereum) {
        window.web3 = new Web3(window.ethereum);
        try {
            // Request account access if needed
            await window.ethereum.enable();
        } catch (error) {
            console.error("User denied account access");
        }
    } else if (window.web3) {
        window.web3 = new Web3(window.web3.currentProvider);
    } else {
        console.error("No web3 provider detected");
    }
});

async function guessNumber() {
    const guessInput = document.getElementById("guessInput");
    const resultText = document.getElementById("result");
    const cooldownText = document.getElementById("cooldown");

    const guessedNumber = parseInt(guessInput.value);
    if (isNaN(guessedNumber) || guessedNumber < 0 || guessedNumber > 10) {
        resultText.innerText = "Please enter a number between 0 and 10.";
        return;
    }

    const contractAddress = "0x30f2aa04321169F5F3F54290811c5C4f71c19E74";
    const contractAbi = [
        // Your contract ABI (interface)
        // ...
    ];

    const contract = new window.web3.eth.Contract(contractAbi, contractAddress);

    try {
        // Replace "yourFunction" with the actual function in your Solidity contract
        const result = await contract.methods.yourFunction(guessedNumber).send({ from: window.web3.eth.defaultAccount });
        resultText.innerText = result;
        cooldownText.innerText = "Cooldown: Calculated from blockchain timestamp";
    } catch (error) {
        console.error("Error:", error);
        resultText.innerText = "An error occurred. Please check the console for details.";
    }
}

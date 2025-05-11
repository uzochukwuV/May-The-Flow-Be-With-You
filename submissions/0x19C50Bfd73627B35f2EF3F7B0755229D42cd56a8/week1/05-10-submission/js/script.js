const contractAddress = '0xd0D5191e4F1B9E6cefEb2a32848fBCaE5D3BB28e'; // Replace with your deployed contract address
const abi =[
		{
			"inputs": [
				{
					"internalType": "address",
					"name": "_randomnessGenerator",
					"type": "address"
				}
			],
			"stateMutability": "nonpayable",
			"type": "constructor"
		},
		{
			"inputs": [
				{
					"internalType": "uint256",
					"name": "id",
					"type": "uint256"
				}
			],
			"name": "ChallengeNotAccepted",
			"type": "error"
		},
		{
			"inputs": [],
			"name": "NoPLayerToCallenge",
			"type": "error"
		},
		{
			"inputs": [
				{
					"internalType": "address",
					"name": "sender",
					"type": "address"
				}
			],
			"name": "NotAPlayerInMatch",
			"type": "error"
		},
		{
			"inputs": [],
			"name": "NotEnoughAmount",
			"type": "error"
		},
		{
			"anonymous": false,
			"inputs": [
				{
					"indexed": false,
					"internalType": "uint64",
					"name": "matchId",
					"type": "uint64"
				}
			],
			"name": "ChallengeAccepted",
			"type": "event"
		},
		{
			"anonymous": false,
			"inputs": [
				{
					"indexed": false,
					"internalType": "uint64",
					"name": "matchId",
					"type": "uint64"
				}
			],
			"name": "ChallengeDeclined",
			"type": "event"
		},
		{
			"anonymous": false,
			"inputs": [
				{
					"indexed": false,
					"internalType": "address",
					"name": "playerOne",
					"type": "address"
				},
				{
					"indexed": false,
					"internalType": "address",
					"name": "playerTwo",
					"type": "address"
				},
				{
					"indexed": false,
					"internalType": "uint256",
					"name": "staked",
					"type": "uint256"
				},
				{
					"indexed": false,
					"internalType": "uint64",
					"name": "matchId",
					"type": "uint64"
				}
			],
			"name": "ChallengeEvent",
			"type": "event"
		},
		{
			"anonymous": false,
			"inputs": [
				{
					"indexed": false,
					"internalType": "uint8",
					"name": "winner",
					"type": "uint8"
				},
				{
					"indexed": false,
					"internalType": "uint256",
					"name": "gameId",
					"type": "uint256"
				},
				{
					"indexed": false,
					"internalType": "uint256",
					"name": "staked",
					"type": "uint256"
				}
			],
			"name": "WarEnded",
			"type": "event"
		},
		{
			"inputs": [
				{
					"internalType": "uint64",
					"name": "matchId",
					"type": "uint64"
				}
			],
			"name": "acceptChallenge",
			"outputs": [],
			"stateMutability": "payable",
			"type": "function"
		},
		{
			"inputs": [
				{
					"internalType": "uint8",
					"name": "numOfStrikes",
					"type": "uint8"
				},
				{
					"internalType": "address",
					"name": "player",
					"type": "address"
				},
				{
					"internalType": "bool",
					"name": "random",
					"type": "bool"
				},
				{
					"internalType": "uint256",
					"name": "staked",
					"type": "uint256"
				}
			],
			"name": "challenge",
			"outputs": [],
			"stateMutability": "payable",
			"type": "function"
		},
		{
			"inputs": [
				{
					"internalType": "address",
					"name": "_nft",
					"type": "address"
				},
				{
					"internalType": "bool",
					"name": "spin",
					"type": "bool"
				}
			],
			"name": "createPlayer",
			"outputs": [],
			"stateMutability": "nonpayable",
			"type": "function"
		},
		{
			"inputs": [
				{
					"internalType": "uint64",
					"name": "matchId",
					"type": "uint64"
				}
			],
			"name": "declineChallenge",
			"outputs": [],
			"stateMutability": "payable",
			"type": "function"
		},
		{
			"inputs": [
				{
					"internalType": "uint64",
					"name": "",
					"type": "uint64"
				}
			],
			"name": "gameMatches",
			"outputs": [
				{
					"internalType": "address",
					"name": "playerOne",
					"type": "address"
				},
				{
					"internalType": "address",
					"name": "playerTwo",
					"type": "address"
				},
				{
					"internalType": "bytes32",
					"name": "matchHash",
					"type": "bytes32"
				},
				{
					"internalType": "uint256",
					"name": "staked",
					"type": "uint256"
				},
				{
					"internalType": "bool",
					"name": "isAccepted",
					"type": "bool"
				},
				{
					"internalType": "uint8",
					"name": "maxNumOfStrikes",
					"type": "uint8"
				},
				{
					"internalType": "bool",
					"name": "isPlayed",
					"type": "bool"
				},
				{
					"internalType": "uint8",
					"name": "winner",
					"type": "uint8"
				},
				{
					"internalType": "uint256",
					"name": "matchTimeStamp",
					"type": "uint256"
				}
			],
			"stateMutability": "view",
			"type": "function"
		},
		{
			"inputs": [
				{
					"internalType": "uint64",
					"name": "min",
					"type": "uint64"
				},
				{
					"internalType": "uint64",
					"name": "max",
					"type": "uint64"
				}
			],
			"name": "generateRandomNumber",
			"outputs": [
				{
					"internalType": "uint64",
					"name": "",
					"type": "uint64"
				}
			],
			"stateMutability": "nonpayable",
			"type": "function"
		},
		{
			"inputs": [
				{
					"internalType": "uint256",
					"name": "",
					"type": "uint256"
				}
			],
			"name": "matchList",
			"outputs": [
				{
					"internalType": "uint64",
					"name": "",
					"type": "uint64"
				}
			],
			"stateMutability": "view",
			"type": "function"
		},
		{
			"inputs": [
				{
					"internalType": "address",
					"name": "",
					"type": "address"
				}
			],
			"name": "players",
			"outputs": [
				{
					"internalType": "enum BexGame.Rank",
					"name": "rank",
					"type": "uint8"
				},
				{
					"internalType": "uint64",
					"name": "energy",
					"type": "uint64"
				},
				{
					"internalType": "uint64",
					"name": "minDestructivePower",
					"type": "uint64"
				},
				{
					"internalType": "uint64",
					"name": "maxDestructivePower",
					"type": "uint64"
				},
				{
					"internalType": "uint256",
					"name": "lastMatchTime",
					"type": "uint256"
				},
				{
					"internalType": "address",
					"name": "playerAddress",
					"type": "address"
				},
				{
					"internalType": "address",
					"name": "playerPropsNFT",
					"type": "address"
				},
				{
					"internalType": "uint256",
					"name": "balance",
					"type": "uint256"
				},
				{
					"internalType": "uint64",
					"name": "numOfWins",
					"type": "uint64"
				},
				{
					"internalType": "uint64",
					"name": "numOfLosses",
					"type": "uint64"
				}
			],
			"stateMutability": "view",
			"type": "function"
		},
		{
			"inputs": [
				{
					"internalType": "uint256",
					"name": "",
					"type": "uint256"
				}
			],
			"name": "playersList",
			"outputs": [
				{
					"internalType": "address",
					"name": "",
					"type": "address"
				}
			],
			"stateMutability": "view",
			"type": "function"
		},
		{
			"inputs": [],
			"name": "randomChallenger",
			"outputs": [
				{
					"internalType": "address",
					"name": "",
					"type": "address"
				}
			],
			"stateMutability": "nonpayable",
			"type": "function"
		},
		{
			"inputs": [],
			"name": "randomnessGenerator",
			"outputs": [
				{
					"internalType": "address",
					"name": "",
					"type": "address"
				}
			],
			"stateMutability": "view",
			"type": "function"
		},
		{
			"inputs": [
				{
					"internalType": "uint64",
					"name": "matchId",
					"type": "uint64"
				}
			],
			"name": "war",
			"outputs": [],
			"stateMutability": "nonpayable",
			"type": "function"
		}
	];

let provider;
let signer;
let contract;

const connectWalletButton = document.getElementById('connect-wallet');
const accountAddressDisplay = document.getElementById('account-address');
const networkNameDisplay = document.getElementById('network-name');
const createPlayerButton = document.getElementById('create-player-btn');
const createPlayerSpinButton = document.getElementById('create-player-spin-btn');
const challengeButton = document.getElementById('challenge-btn');
const acceptChallengeButton = document.getElementById('accept-challenge-btn');
const declineChallengeButton = document.getElementById('decline-challenge-btn');
const warButton = document.getElementById('war-btn');
const notificationList = document.getElementById('notification-list');

async function connectWallet() {
    alert("hello")
    console.log(ethers)
    if (true) {
        try {
            console.log(window.ethereum)
            await window.ethereum.request({ method: 'eth_requestAccounts' });
            provider = new ethers.BrowserProvider(window.ethereum);
            signer = await provider.getSigner();
            const account = await signer.getAddress();
            const network = await provider.getNetwork();

            accountAddressDisplay.textContent = `Account: <span class="math-inline">\{account\.substring\(0, 6\)\}\.\.\.</span>{account.slice(-4)}`;
            networkNameDisplay.textContent = `Network: ${network.name}`;
            connectWalletButton.disabled = true;
            contract = new ethers.Contract(contractAddress, abi, signer);
            addNotification('Wallet connected!');
        } catch (error) {
            console.error('Could not connect wallet:', error);
            addNotification('Failed to connect wallet.');
        }
    } else {
        addNotification('MetaMask or another Ethereum provider is not installed.');
    }
}

function addNotification(message) {
    const listItem = document.createElement('li');
    listItem.textContent = message;
    notificationList.prepend(listItem); 1  // Add to the top
}


async function createPlayer(spin) {
    if (!contract) {
        addNotification('Connect your wallet first.');
        return;
    }
    try {
        console.log(contract.createPlayer)
        const tx = await contract.createPlayer('0xd0D5191e4F1B9E6cefEb2a32848fBCaE5D3BB28e', spin); // Replace with actual NFT address if needed
        addNotification(`Creating player(spinning: ${spin})... (Transaction hash: ${tx.hash.substring(0, 10)}...)`);
        await tx.wait();
        addNotification('Player created successfully!');
    } catch (error) {
        console.error('Error creating player:', error);
        addNotification('Failed to create player.');
    }
}

async function challengePlayer() {
    if (!contract) {
        addNotification('Connect your wallet first.');
        return;
    }
    const numStrikes = document.getElementById('num-strikes').value;
    const opponentAddress = document.getElementById('opponent-address').value;
    const stakeAmount = document.getElementById('stake-amount').value;
    const randomOpponent = opponentAddress === '';
    const stakeInWei = ethers.parseEther(stakeAmount);

    try {
        const tx = await contract.challenge(numStrikes, opponentAddress, randomOpponent, stakeInWei, { value: stakeInWei });
        addNotification(`Challenging player... (Transaction hash: ${tx.hash.substring(0, 10)}...)`);
        await tx.wait();
        addNotification('Challenge initiated!');
    } catch (error) {
        console.error('Error challenging player:', error);
        addNotification('Failed to initiate challenge.');
    }
}

async function acceptChallenge() {
    if (!contract) {
        addNotification('Connect your wallet first.');
        return;
    }
    const matchId = document.getElementById('accept-match-id').value;
    const stakeAmount = document.getElementById('accept-stake-amount').value;
    const stakeInWei = ethers.parseEther(stakeAmount);

    try {
        const tx = await contract.acceptChallenge(matchId, { value: stakeInWei });
        addNotification(`Accepting challenge ${matchId}... (Transaction hash: ${tx.hash.substring(0, 10)}...)`);
        await tx.wait();
        addNotification(`Challenge ${matchId} accepted!`);
    } catch (error) {
        console.error('Error accepting challenge:', error);
        addNotification(`Failed to accept challenge ${matchId}.`);
    }
}

async function declineChallenge() {
    if (!contract) {
        addNotification('Connect your wallet first.');
        return;
    }
    const matchId = document.getElementById('decline-match-id').value;

    try {
        const tx = await contract.declineChallenge(matchId);
        addNotification(`Declining challenge ${matchId}... (Transaction hash: ${tx.hash.substring(0, 10)}...)`);
        await tx.wait();
        addNotification(`Challenge ${matchId} declined.`);
    } catch (error) {
        console.error('Error declining challenge:', error);
        addNotification(`Failed to decline challenge ${matchId}.`);
    }
}

async function startWar() {
    if (!contract) {
        addNotification('Connect your wallet first.');
        return;
    }
    const matchId = document.getElementById('war-match-id').value;

    try {
        const tx = await contract.war(matchId);
        addNotification(`Starting war for match ${matchId}... (Transaction hash: ${tx.hash.substring(0, 10)}...)`);
        await tx.wait();
        addNotification(`War for match ${matchId} initiated!`);
    } catch (error) {
        console.error('Error starting war:', error);
        addNotification(`Failed to start war for match ${matchId}.`);
    }
}

// Event Listeners
connectWalletButton.addEventListener('click', connectWallet);
createPlayerButton.addEventListener('click', () => createPlayer(false));
createPlayerSpinButton.addEventListener('click', () => createPlayer(true));
challengeButton.addEventListener('click', challengePlayer);
acceptChallengeButton.addEventListener('click', acceptChallenge);
declineChallengeButton.addEventListener('click', declineChallenge);
warButton.addEventListener('click', startWar);

// Listen for contract events
async function setupEventListeners() {
    if (contract) {
        contract.on("ChallengeEvent", (playerOne, playerTwo, staked, matchId) => {
            addNotification(`New Challenge: ${playerOne.substring(0, 6)}...challenged ${playerTwo.substring(0, 6)}... for ${ethers.formatEther(staked)} Ether(Match ID: ${matchId})`);
        });

        contract.on("ChallengeAccepted", (matchId) => {
            addNotification(`Challenge ${matchId} has been accepted!`);
        });

        contract.on("WarEnded", (winner, gameId, staked) => {
            addNotification(`War for Match ${gameId} ended. Winner: Player ${winner}. Staked: ${ethers.formatEther(staked)} Ether.`);
        });
    }
}

window.addEventListener('load', async () => {
    if (window.ethereum) {
        // If wallet is already connected, try to initialize
        provider = new ethers.BrowserProvider(window.ethereum);
        try {
            signer = await provider.getSigner();
            const account = await signer.getAddress();
            const network = await provider.getNetwork();

            accountAddressDisplay.textContent = `Account: ${account.substring(0, 6)}...${account.slice(-4)}`;
            networkNameDisplay.textContent = `Network: ${network.name}`;
            connectWalletButton.disabled = true;
            contract = new ethers.Contract(contractAddress, abi, signer);
            setupEventListeners();
            addNotification('Wallet already connected.');
        } catch (error) {
            console.error('Error initializing with existing connection:', error);
        }
    }
});

setupEventListeners();


// ... (previous JavaScript code) ...

const fetchPlayersButton = document.getElementById('fetch-players-btn');
const playerListUL = document.getElementById('player-list');

async function fetchAllPlayers() {
    if (!contract) {
        addNotification('Connect your wallet first.');
        return;
    }
    playerListUL.innerHTML = ''; // Clear the current list
    addNotification('Fetching player list...');
    try {
        const players = await contract.playersList(0);
        if (players && players.length > 0) {
            players.forEach(playerAddress => {
                const listItem = document.createElement('li');
                listItem.textContent = playerAddress;
                playerListUL.appendChild(listItem);
            });
            addNotification(`Found ${players.length} players.`);
        } else {
            addNotification('No players found yet.');
        }
    } catch (error) {
        console.error('Error fetching players:', error);
        addNotification('Failed to fetch player list.');
    }
}

// Event Listener for the new button
fetchPlayersButton.addEventListener('click', fetchAllPlayers);

// ... (rest of your JavaScript code) ...
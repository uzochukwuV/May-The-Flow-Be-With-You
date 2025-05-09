// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import {RandomnessGenerator} from "contracts/RandomnessGenerator.sol";

contract BexGame {
    // BexGame is a decentralized simulated game , where players ranks, bet, challenge
    // and destroy enemies powered by Flow and as you
    // play MAY THE FLOW BE WITH YOU!!!

    // randomness
    address public immutable randomnessGenerator;

    // players
    enum Rank {
        SSS,
        SS,
        S,
        A,
        B,
        C,
        D,
        E,
        F
    }

    struct Player {
        Rank rank; // 1-5 star rating
        uint64 energy; // for challenge
        uint64 minDestructivePower;
        uint64 maxDestructivePower; //1-3
        uint256 lastMatchTime; // time of the last match (for challenge)
        address playerAddress; // for challenge
        address playerPropsNFT;
        address[] badges;
        uint64[] matches;
        uint256 balance;
        uint64 numOfWins;
        uint64 numOfLosses;
    }
    // 2m 3.5
    struct Result {
        uint64 playerOneStrikePoints;
        uint64 playerTwoStrikePoints;
        uint64 playerOneEnergyRemaining;
        uint64 playerTwoEnergyRemaining;
    }

    struct Match {
        address playerOne; // index 0
        address playerTwo; //index 1
        bytes32 matchHash;
        uint256 staked;
        bool isAccepted;
        uint8 maxNumOfStrikes;
        Result[] results;
        bool isPlayed;
        uint8 winner; // whplayerOne as 1 or 2
        uint256 matchTimeStamp; // the timestamp of when the game was playde
    }

    // uint8 public matchCount;
    mapping(uint64 => Match) public gameMatches; // match count : matches indexed by the match id
    mapping(address => Player) public players; // player address : player data indexed by the player address

    uint64[] public matchList;
    address[] public playersList;

    error ChallengeNotAccepted(uint256 id);
    error NotAPlayerInMatch(address sender);

    event WarEnded(uint8 winner, uint256 gameId, uint256 staked);

    constructor(address _randomnessGenerator) {
        randomnessGenerator = _randomnessGenerator;
    }

    // first test
    function generateRandomNumber(uint64 min, uint64 max)
        public
        returns (uint64)
    {
        return
            RandomnessGenerator(randomnessGenerator).getRandomNumber(min, max);
    }

    function war(uint64 matchId) external {
        Match storage fight = gameMatches[matchId];
        Player storage playerOne = players[fight.playerOne];
        Player storage playerTwo = players[fight.playerTwo];

        if (
            msg.sender != playerOne.playerAddress ||
            msg.sender != playerTwo.playerAddress
        ) {
            revert NotAPlayerInMatch(msg.sender);
        }
        if (fight.isAccepted == false) {
            revert ChallengeNotAccepted(matchId);
        }

        fight.matchTimeStamp = block.timestamp;

        uint8 matchEnd = 0;

        for (uint8 i = 0; i < fight.maxNumOfStrikes; i++) {
            uint64 playerOneStrikePoints = generateRandomNumber(
                uint64(playerOne.minDestructivePower),
                uint64(playerOne.maxDestructivePower)
            );
            uint64 playerTwoStrikePoints = generateRandomNumber(
                uint64(playerTwo.minDestructivePower),
                uint64(playerTwo.maxDestructivePower)
            );

            if (i == 0) {
                uint64 p1 = playerTwoStrikePoints > playerOne.energy
                    ? 0
                    : playerOne.energy - playerTwoStrikePoints;
                uint64 p2 = playerOneStrikePoints > playerTwo.energy
                    ? 0
                    : playerTwo.energy - playerOneStrikePoints;
                fight.results.push(
                    Result(playerOneStrikePoints, playerTwoStrikePoints, p1, p2)
                );

                if (p1 == 0 || p2 == 0) {
                    matchEnd = i + 1;
                    break;
                }
            } else {
                // get remianing energy
                Result memory newResult = _performStrike(
                    fight.results[fight.results.length - 1],
                    playerOne.minDestructivePower,
                    playerOne.maxDestructivePower,
                    playerTwo.minDestructivePower,
                    playerTwo.maxDestructivePower
                );
                // issue when both are draw to be done
                fight.results.push(newResult);

                if (
                    newResult.playerOneEnergyRemaining == 0 ||
                    newResult.playerTwoEnergyRemaining == 0
                ) {
                    matchEnd = i;
                    break;
                }
            }
        }
        uint x = fight
            .results[fight.results.length - 1]
            .playerOneEnergyRemaining;

        uint y = fight
            .results[fight.results.length - 1]
            .playerTwoEnergyRemaining;

        // checking which players energy is the highest
        fight.winner = y > x
            ? 2
            : 1;
        fight.isPlayed = true;
        
        // update player stats
        _updatePlayerStats(playerOne, fight.winner, matchId);
        _updatePlayerStats(playerTwo, fight.winner, matchId);

        emit WarEnded(fight.winner, matchId, fight.staked);
    }

    function _performStrike(
        Result storage lastResult,
        uint64 playerOneMin,
        uint64 playerOneMax,
        uint64 playerTwoMin,
        uint64 playerTwoMax
    ) internal returns (Result memory) {
        uint64 p1Energy = lastResult.playerOneEnergyRemaining;
        uint64 p2Energy = lastResult.playerTwoEnergyRemaining;

        uint64 playerOneStrikePoints = generateRandomNumber(
            playerOneMin,
            playerOneMax
        );
        uint64 playerTwoStrikePoints = generateRandomNumber(
            playerTwoMin,
            playerTwoMax
        );

        uint64 p1 = playerTwoStrikePoints > p1Energy
            ? 0
            : p1Energy - playerTwoStrikePoints;
        uint64 p2 = playerOneStrikePoints > p2Energy
            ? 0
            : p2Energy - playerOneStrikePoints;

        return Result(playerOneStrikePoints, playerTwoStrikePoints, p1, p2);
    }

    function _updatePlayerStats(Player storage player, uint8 winner, uint64 matchId) internal {
        player.lastMatchTime = block.timestamp;
        player.numOfLosses = winner == 2
            ? player.numOfLosses + 1
            : player.numOfLosses;
        player.numOfWins = winner == 1
            ? player.numOfWins + 1
            : player.numOfWins;
        player.matches.push(matchId);
    }


    // create player
    function createPlayer(address _nft, bool spin) external {
        Player storage _player = players[msg.sender];
        _player.playerAddress = msg.sender;
        _player.energy = 1000;
        _player.maxDestructivePower = 250;
        _player.minDestructivePower = 100;
        _player.playerPropsNFT = _nft;

        if(spin){
            _player.energy = generateRandomNumber(uint64(500), uint64(2000));
            _player.minDestructivePower =generateRandomNumber(uint64(50), uint64(175));
            _player.maxDestructivePower =generateRandomNumber(uint64(180), uint64(350));
        }

        playersList.push(msg.sender);
    }

    event ChallengeEvent(address playerOne ,address playerTwo, uint256 staked, uint64 matchId );
    error NotEnoughAmount();
    error NoPLayerToCallenge();
    event ChallengeAccepted(uint64 matchId);

    function challenge(uint8 numOfStrikes, address player, bool random, uint256 staked) external payable {
        if (msg.value <  staked){
            revert NotEnoughAmount();
        }
        uint64 matchId = uint64(matchList.length);
        Match storage _fight = gameMatches[matchId];


        _fight.maxNumOfStrikes = numOfStrikes;
        _fight.playerOne = msg.sender;
        _fight.playerTwo = random ? randomChallenger() :  player;
        _fight.staked = staked;
        _fight.isAccepted = false;
        matchList.push(matchId);

        emit ChallengeEvent(_fight.playerOne, _fight.playerTwo, _fight.staked, matchId);
        
    }

    function randomChallenger() public  returns (address) {
        if(playersList.length <= 0){
            revert NoPLayerToCallenge();
        }
        uint64 randomNumber =  generateRandomNumber(0, uint64(playersList.length-1));
        
        return playersList[randomNumber];
    }



    function acceptChallenge(uint64 matchId) external payable  {
         Match storage _fight = gameMatches[matchId];
         if(_fight.playerTwo != msg.sender){
            revert NoPLayerToCallenge();
         }

         if (msg.value <  _fight.staked){
            revert NotEnoughAmount();
        }

        _fight.isAccepted = true;
        emit ChallengeAccepted(matchId);
    }

    function declineChallenge(uint64 matchId) external payable  {
         Match storage _fight = gameMatches[matchId];
         if(_fight.playerTwo != msg.sender){
            revert NoPLayerToCallenge();
         }

        _fight.isAccepted = false;
        payable(_fight.playerOne).transfer(_fight.staked);
        emit ChallengeAccepted(matchId);
    }
  
}

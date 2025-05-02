// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "../../0504-my-submission/src/RandomnessGenerator.sol";

/**
 * @title GenerativeArt
 * @dev A contract that uses Flow's VRF beacon to create generative art
 */
contract GenerativeArt {
    // Reference to the randomness generator
    RandomnessGenerator public randomnessGenerator;
    
    // Structure to represent an art piece
    struct ArtPiece {
        uint256 id;
        uint64 seed;
        address creator;
        uint256 timestamp;
        uint64 backgroundColor;
        uint64[] shapeColors;
        uint8[] shapeTypes; // 0: circle, 1: square, 2: triangle
        uint16[] positions; // array of x,y coordinates (packed as pairs)
        uint8[] sizes;
    }
    
    // Events
    event ArtPieceCreated(uint256 id, address creator, uint64 seed);
    
    // Storage for created art pieces
    mapping(uint256 => ArtPiece) public artPieces;
    uint256 public totalPieces;
    
    // Mapping from owner to their art pieces
    mapping(address => uint256[]) public creatorPieces;
    
    // Error definitions
    error InvalidShapeCount();
    
    /**
     * @dev Constructor sets the randomness generator address
     * @param _randomnessGenerator Address of the randomness generator contract
     */
    constructor(address _randomnessGenerator) {
        randomnessGenerator = RandomnessGenerator(_randomnessGenerator);
        totalPieces = 0;
    }
    
    /**
     * @dev Generate a new art piece using the Flow VRF beacon
     * @param numShapes The number of shapes to include in the art piece
     * @return id The ID of the newly created art piece
     */
    function generateArt(uint8 numShapes) public returns (uint256) {
        if (numShapes == 0 || numShapes > 50) {
            revert InvalidShapeCount();
        }
        
        // Get secure randomness for our seed using Flow's VRF
        uint64 seed = randomnessGenerator.getRandomNumber(1, type(uint64).max);
        
        // Create a new art piece
        uint256 artId = totalPieces++;
        ArtPiece storage newArt = artPieces[artId];
        
        // Set basic properties
        newArt.id = artId;
        newArt.seed = seed;
        newArt.creator = msg.sender;
        newArt.timestamp = block.timestamp;
        
        // Generate background color (RGB format - 24-bit color)
        newArt.backgroundColor = randomnessGenerator.getRandomNumber(0, 16777215); // 2^24-1 for RGB
        
        // Create arrays for shapes
        newArt.shapeColors = new uint64[](numShapes);
        newArt.shapeTypes = new uint8[](numShapes);
        newArt.positions = new uint16[](numShapes * 2); // x,y pairs
        newArt.sizes = new uint8[](numShapes);
        
        // Generate shapes based on secure randomness
        for (uint8 i = 0; i < numShapes; i++) {
            // Set shape properties using secure randomness
            newArt.shapeColors[i] = randomnessGenerator.getRandomNumber(0, 16777215); // RGB color
            newArt.shapeTypes[i] = uint8(randomnessGenerator.getRandomNumber(0, 2)); // 0-2 for different shapes
            
            // Set position (x,y coordinates in a 1000x1000 canvas)
            newArt.positions[i*2] = uint16(randomnessGenerator.getRandomNumber(0, 999)); // x position
            newArt.positions[i*2+1] = uint16(randomnessGenerator.getRandomNumber(0, 999)); // y position
            
            // Set size (5-100)
            newArt.sizes[i] = uint8(randomnessGenerator.getRandomNumber(5, 100));
        }
        
        // Add to creator's collection
        creatorPieces[msg.sender].push(artId);
        
        // Emit event
        emit ArtPieceCreated(artId, msg.sender, seed);
        
        return artId;
    }
    
    /**
     * @dev Get details of an art piece
     * @param artId The ID of the art piece
     * @return A tuple with all art piece data
     */
    function getArtPieceDetails(uint256 artId) public view returns (
        uint256 id,
        uint64 seed,
        address creator,
        uint256 timestamp,
        uint64 backgroundColor,
        uint64[] memory shapeColors,
        uint8[] memory shapeTypes,
        uint16[] memory positions,
        uint8[] memory sizes
    ) {
        require(artId < totalPieces, "Art piece does not exist");
        
        ArtPiece storage art = artPieces[artId];
        return (
            art.id,
            art.seed,
            art.creator,
            art.timestamp,
            art.backgroundColor,
            art.shapeColors,
            art.shapeTypes,
            art.positions,
            art.sizes
        );
    }
    
    /**
     * @dev Get all art pieces created by an address
     * @param creator The address to query
     * @return An array of art piece IDs created by the address
     */
    function getArtPiecesByCreator(address creator) public view returns (uint256[] memory) {
        return creatorPieces[creator];
    }
} 
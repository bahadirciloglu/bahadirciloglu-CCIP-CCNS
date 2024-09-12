// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract CCIPLocalSimulator {

    // Simulated router address
    address private router;

    // Constructor to set the router address
    constructor() {
        // For testing purposes, we set the router address as the deployer (or any fixed address)
        router = msg.sender; // Just a placeholder for simulation. You can modify this.
    }

    // Simulate the configuration function to return the router address
    function configuration() external view returns (address) {
        return router;
    }

    // Simulate other potential functionalities if needed (e.g., handling messages, etc.)
    // This is optional based on what other contracts might interact with.
    
    // Example function to set a new router address (optional for testing)
    function setRouter(address newRouter) external {
        router = newRouter;
    }
}

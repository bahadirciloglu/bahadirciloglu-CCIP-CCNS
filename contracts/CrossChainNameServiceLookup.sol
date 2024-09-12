// SPDX-License-Identifier: MIT
pragma solidity 0.8.19;

import {OwnerIsCreator} from "@chainlink/contracts-ccip/src/v0.8/shared/access/OwnerIsCreator.sol";

/**
 * THIS IS AN EXAMPLE CONTRACT THAT USES HARDCODED VALUES FOR CLARITY.
 * THIS IS AN EXAMPLE CONTRACT THAT USES UN-AUDITED CODE.
 * DO NOT USE THIS CODE IN PRODUCTION.
 */
contract CrossChainNameServiceLookup is OwnerIsCreator {
    // Mapping to store the name-address associations
    mapping(string => address) public nameToAddress;

    address internal s_crossChainNameService;

    event Registered(string indexed _name, address indexed _address);

    error Unauthorized();
    error AlreadyTaken();

    // Modifier to ensure that only the CrossChainNameService contract can call certain functions
    modifier onlyCrossChainNameService() {
        if (msg.sender != s_crossChainNameService) revert Unauthorized();
        _;
    }

    /**
     * @notice Sets the address of the Cross Chain Name Service entity
     * This entity is either CrossChainNameServiceRegister or CrossChainNameServiceReceiver contract,
     * depends on the chain this lookup contract lives
     * @param crossChainNameService - address of the Cross Chain Name Service entity - Register or Receiver
     * @dev Only Owner can call
     */
    function setCrossChainNameServiceAddress(
        address crossChainNameService
    ) external onlyOwner {
        s_crossChainNameService = crossChainNameService;
    }

    /**
     * @notice Registers a name with an associated address
     * @param _name The name to register
     * @param _address The address associated with the name
     * @dev Only the CrossChainNameService contract can call
     */
    function register(
        string memory _name,
        address _address
    ) external onlyCrossChainNameService {
        if (nameToAddress[_name] != address(0)) revert AlreadyTaken(); // Ensure the name is not already taken

        nameToAddress[_name] = _address;
        emit Registered(_name, _address); // Emit an event when the name is registered
    }

    /**
     * @notice Looks up the address associated with a name
     * @param _name The name to look up
     * @return The address associated with the name
     */
    function lookup(string memory _name) external view returns (address) {
        return nameToAddress[_name];
    }
}

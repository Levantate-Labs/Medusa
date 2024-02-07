// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;


interface IPatientStore {

    event PrescriptionAdded(
        bytes32 indexed prescriptionId,
        address indexed doctor,
        bytes[] indexed data,
        bytes[] signature
    );
    
    function name() external returns(string memory);
    function ID() external returns(uint256);

    function addPrescription(
        bytes32 prescriptionID, 
        bytes[] memory data
    ) external;
    
}
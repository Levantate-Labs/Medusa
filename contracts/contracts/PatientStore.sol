// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "./interfaces/IPatientStore.sol";
import "./interfaces/IDoctorRegistry.sol";

contract PatientStore is IPatientStore {
    

    string private _name;
    uint256 private _ID;
    address private _registry;

    mapping(bytes32 => bytes[]) private _prescriptions;

    constructor(
        string memory name_,
        uint256 id_,
        address registry_
    ) {
        _name = name_;
        _ID = id_;
        _registry = registry_;
    }
    

    function name() external view returns(string memory) {
        return _name;
    }

    function ID() external view returns(uint256) {
        return _ID;
    }

    function prescription(bytes32 prescriptionID) external view returns(bytes[] memory) {
        return _prescriptions[prescriptionID];
    }

    function addPrescription(
        bytes32 prescriptionID, 
        bytes[] memory data   
    ) external {
        require(IDoctorRegistry(_registry).isDoctor(msg.sender), "ERR: NOT DOCTOR");
        _prescriptions[prescriptionID] = data;
    }

}
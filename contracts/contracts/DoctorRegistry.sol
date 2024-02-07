// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract DoctorRegistry {

    mapping(address => bool) private _doctors;

    function isDoctor(address doctor) external view returns(bool) {
        return _doctors[doctor];
    }

    function addDoctor(address doctor) external {
        _doctors[doctor] = true;
    }
}
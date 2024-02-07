// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;


interface IDoctorRegistry {
    function isDoctor(address doctor) external view returns(bool);

    function addDoctor(address doctor) external;
}
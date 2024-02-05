// SPDX-License-Identifier: MIT
pragma solidity 0.8.23;
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract TestToken is ERC20 {
    constructor() ERC20("TEST TOKEN", "TST") {
        _mint(0xfaB71618C291D0363B5c6A4a5784cB829Deb4A38, 1000000000000000000000000);
    }
}
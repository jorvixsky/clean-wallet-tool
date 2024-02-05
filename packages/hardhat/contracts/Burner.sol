// SPDX-License-Identifier: MIT
pragma solidity 0.8.23;
import { IERC20 } from "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract Burner {

    function burnERC20Token(address token, uint256 amount) public {
        // Burn tokens
        IERC20(token).transferFrom(msg.sender, address(0), amount);
    }

    function burnERC20Tokens(address[] calldata tokens, uint256[] calldata amounts) public {
        // Burn tokens
        for (uint256 i = 0; i < tokens.length; i++) {
            // Burn tokens
            burnERC20Token(tokens[i], amounts[i]);
        }
    }
}
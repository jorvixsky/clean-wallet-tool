// SPDX-License-Identifier: MIT
pragma solidity 0.8.23;
import { IERC20 } from "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract Burner {

    function burnERC20Token(address _sender, address _token, uint256 _amount) public {
        // Burn tokens
        IERC20(_token).transferFrom(_sender, address(this), _amount);
    }

    function burnERC20Tokens(address[] calldata _tokens, uint256[] calldata _amounts) public {
        // Burn tokens
        for (uint256 i = 0; i < _tokens.length; i++) {
            // Burn tokens
            burnERC20Token(msg.sender, _tokens[i], _amounts[i]);
        }
    }
}
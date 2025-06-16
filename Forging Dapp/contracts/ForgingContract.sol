// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC1155/IERC1155.sol";
import "@openzeppelin/contracts/token/ERC1155/utils/ERC1155Holder.sol";

// Custom errors
error InvalidTokenToForge();
error InvalidTokenToTrade();
error InvalidTradeToken();
error InsufficientBalance();

interface InterfaceERC1155 is IERC1155 {
    function burn(address account, uint256 tokenId) external;

    function mintByForgingContract(address to, uint256 tokenId) external;

    function balanceOf(address account, uint256 id) external view returns (uint256);
}

contract ForgingContract is ERC1155Holder {
    InterfaceERC1155 public immutable ERC1155_TOKEN;


    event TradeWithReward(address trader, uint256 tradeId, uint256 wantedId);
    event TradeNoReward(address trader, uint256 tradeId);

    constructor(address _ERC1155_TOKEN) {
        ERC1155_TOKEN = InterfaceERC1155(_ERC1155_TOKEN);
    }

    function forge(uint256 tokenId) external {
        if (tokenId < 3 || tokenId > 6) revert InvalidTokenToForge();

        address user = msg.sender;

        if (tokenId == 3) {
            ERC1155_TOKEN.burn(user, 0);
            ERC1155_TOKEN.burn(user, 1);
        } else if (tokenId == 4) {
            ERC1155_TOKEN.burn(user, 1);
            ERC1155_TOKEN.burn(user, 2);
        } else if (tokenId == 5) {
            ERC1155_TOKEN.burn(user, 0);
            ERC1155_TOKEN.burn(user, 2);
        } else if (tokenId == 6) {
            ERC1155_TOKEN.burn(user, 0);
            ERC1155_TOKEN.burn(user, 1);
            ERC1155_TOKEN.burn(user, 2);
        }

        ERC1155_TOKEN.mintByForgingContract(msg.sender, tokenId);
    }

    function trade(uint256 tradeId, uint256 wantedId) external {
        if (tradeId > 2) revert InvalidTokenToTrade();
        if (wantedId > 2) revert InvalidTradeToken();
        if (ERC1155_TOKEN.balanceOf(msg.sender, tradeId) < 1) revert InsufficientBalance();

        uint256 contractBalance = ERC1155_TOKEN.balanceOf(address(this), wantedId);

        ERC1155_TOKEN.safeTransferFrom(msg.sender, address(this), tradeId, 1, "");

        if (contractBalance >= 1) {
            ERC1155_TOKEN.safeTransferFrom(address(this), msg.sender, wantedId, 1, "");
        } else {
            ERC1155_TOKEN.mintByForgingContract(msg.sender, wantedId);
        }

        emit TradeWithReward(msg.sender, tradeId, wantedId);
    }

    function trade(uint256 tradeId) external {
        if (tradeId < 3 || tradeId > 6) revert InvalidTokenToTrade();
        if (ERC1155_TOKEN.balanceOf(msg.sender, tradeId) < 1) revert InsufficientBalance();

        ERC1155_TOKEN.safeTransferFrom(msg.sender, address(this), tradeId, 1, "");

        emit TradeNoReward(msg.sender, tradeId);
    }
}

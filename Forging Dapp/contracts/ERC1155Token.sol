// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Strings.sol";

// Custom errors
error CooldownNotPassed();
error NotForgingContract();
error InvalidTokenId();
error NotAuthorized();
error InsufficientBalance();
error InvalidBurnTokenId();
error InvalidForgeTokenId();

contract ERC1155Token is ERC1155, Ownable {
    using Strings for uint256;

    uint256 public constant COOLDOWN = 60;
    mapping(address => uint256) public lastMintTime;

    uint256 public constant FLOUR = 0;
    uint256 public constant SUGAR = 1;
    uint256 public constant EGG = 2;
    uint256 public constant SPONGE_CAKE = 3; //0,1
    uint256 public constant CUSTARD_CAKE = 4; //1,2
    uint256 public constant PANCAKE = 5; //0,2
    uint256 public constant DELUXE_CAKE = 6; //0,1,2

    event Mint(address indexed user, uint256 indexed tokenId);
    event Burn(address indexed user, uint256 indexed tokenId, uint256 amount);
    event MintByForging(address indexed user, uint256 indexed tokenId);

    address public forgingContract;

    string private constant BASE_URI =
     "https://bafybeibzjyu533tgbnoqxlgo5hv4xpdrwenp6uqvq3tmbr324zu37flnmu.ipfs.dweb.link/";

    constructor() ERC1155(BASE_URI) Ownable(msg.sender) {}

    modifier cooldownPassed() {
        if (block.timestamp < lastMintTime[msg.sender] + COOLDOWN) revert CooldownNotPassed();
        _;
    }

    modifier onlyForgingContract() {
        if (msg.sender != forgingContract) revert NotForgingContract();
        _;
    }

    function setForgingContract(address _forgingContract) external onlyOwner {
        forgingContract = _forgingContract;
    }

    function uri(uint256 _id) public pure override returns (string memory) {
        return string(abi.encodePacked(BASE_URI, _id.toString()));
    }

    function mint(uint256 tokenId) external cooldownPassed {
        if (tokenId != FLOUR && tokenId != SUGAR && tokenId != EGG) revert InvalidTokenId();
        lastMintTime[msg.sender] = block.timestamp;
        _mint(msg.sender, tokenId, 1, "");

        emit Mint(msg.sender, tokenId);
    }

    function burn(address account, uint256 tokenId) external {
        if (msg.sender != account && !isApprovedForAll(account, msg.sender)) revert NotAuthorized();
        if (tokenId > 2) revert InvalidBurnTokenId();
        if (balanceOf(account, tokenId) < 1) revert InsufficientBalance();

        _burn(account, tokenId, 1);
        emit Burn(account, tokenId, 1);
    }

    function mintByForgingContract(address to, uint256 tokenId) external onlyForgingContract {
        if (tokenId > 6) revert InvalidForgeTokenId();
        _mint(to, tokenId, 1, "");
        emit MintByForging(to, tokenId);
    }
}

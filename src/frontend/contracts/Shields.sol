pragma solidity 0.5.16;

contract Shields {
    address public manager;
    address payable[] public shields;

    constructor() public {
        manager = msg.sender;
    }

    function newShield(address payable _shieldAddress) public {
        shields.push(_shieldAddress);
    }

    function getShields() public view returns (address payable[] memory) {
        return shields;
    }

    function deleteShield(uint256 _shieldIndex) public {
        require(msg.sender == manager, 'You are not authorized');
        delete shields[_shieldIndex];
    }
}

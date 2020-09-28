pragma solidity 0.6.0;

import '@chainlink/contracts/src/v0.6/ChainlinkClient.sol';
import '@chainlink/contracts/src/v0.6/vendor/Ownable.sol';

/**
 * @title Insurance contract implementing EIP 3142
 */
contract ShieldFlight is ChainlinkClient, Ownable {
    bytes32 private constant JOB_ID = '4ce9b71a1ac94abcad1ff9198e760b8c';
    address private constant ORACLE = 0x7AFe1118Ea78C1eae84ca8feE5C65Bc76CcF879e;
    string private constant GET_TARGET_STATUS_URL = 'https://api.flightstats.com';
    int256 compensationPercentage = 1000;

    struct Insurance {
        string targetId;
        address payable insuree;
        uint256 premium;
    }

    struct Liquidity {
        address payable provider;
        uint256 amount;
    }

    Insurance[] public insurances;
    Liquidity[] public liquidities;
    bytes32 jobId;
    uint256 payment;

    // constructor(
    //     address _link,
    //     address _oracle,
    //     bytes32 _jobId
    // ) public {
    //     if (_link == address(0)) {
    //         setPublicChainlinkToken();
    //         setChainlinkOracle(ORACLE);
    //         jobId = JOB_ID;
    //         payment = 1 * LINK;
    //     } else {
    //         setChainlinkToken(_link);
    //         setChainlinkOracle(_oracle);
    //         jobId = _jobId;
    //         payment = 1;
    //     }
    // }

    function buyInsurance(string memory _targetId) public payable {
        require(msg.value >= 0, 'Please enter a proper premium');
        insurances.push(Insurance(_targetId, msg.sender, msg.value));
    }

    function provideLiquidity() public payable {
        require(msg.value >= 0, 'Please enter a proper amount');
        liquidities.push(Liquidity(msg.sender, msg.value));
    }

    function getYieldReward() public {
        // todo
    }

    function checkStatus(string memory _targetId) public returns (bytes32 requestId) {
        string memory _url = string(abi.encodePacked(GET_TARGET_STATUS_URL, '?target=', _targetId));

        requestId = createRequestTo(_url, 'status', this.compensate.selector);
    }

    function compensate(bytes32 _requestId, uint256 _score) public recordChainlinkFulfillment(_requestId) {}

    function createRequestTo(
        string memory _url,
        string memory _path,
        bytes4 _callbackFn
    ) private returns (bytes32 requestId) {
        Chainlink.Request memory req = buildChainlinkRequest(jobId, address(this), _callbackFn);
        req.add('url', _url);
        req.add('path', _path);
        requestId = sendChainlinkRequest(req, payment);
    }
}

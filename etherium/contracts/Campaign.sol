pragma solidity ^0.4.17;


contract CampaignFactory {
    address[] public deployedCampaigns;

    function createCampaign(uint256 minimum) public {
        address newCampain = new Campaign(minimum, msg.sender); // the CampaignFactory creates a new instance of
        //the Campaign contract
        // this prevents the user from modifying the contract
        // also means that the user has to pay to create the new Campaign

        deployedCampaigns.push(newCampain); // address address to the array of deployedCampaigns
    }

    function getDeployedCampaigns() public view returns (address[]) {
        return deployedCampaigns; // returns a list of all the Campaigns created
    }
}


contract Campaign {
    struct Request {
        string description;
        uint256 value;
        address recipient;
        bool complete;
        uint256 approvalCount; // track number of approvals
        mapping(address => bool) approvals; //to track who has voted
    }

    Request[] public requests;
    address public manager;
    uint256 public minimumContribution;
    mapping(address => bool) public approvers;
    uint256 public approversCount;

    modifier restricted() {
        require(msg.sender == manager);
        _;
    }

    //function Campaign (uint minimum) public {
    constructor(uint256 minimum, address creator) public {
        manager = creator;
        minimumContribution = minimum;
    }

    function contribute() public payable {
        require(msg.value > minimumContribution);

        approvers[msg.sender] = true; // mapping -> adds key of msg.sender and value of true.
        // However key is never stored!
        approversCount++;
    }

    function createRequest(string description, uint256 value, address recipient)
        public
        restricted
    {
        Request memory newRequest = Request({
            description: // 1. new variable of type Request 2. newRequest == name of variable 3. creating an instance of the struct
            description, // description: argument description
            value: value, // value: argument value
            recipient: recipient, // etc
            complete: false,
            approvalCount: 0
            // don't need to add mapping because it is a reference type.
        });

        requests.push(newRequest);
    }

    function approveRequest(uint256 index) public {
        // function for contributor to approve request
        Request storage request = requests[index];

        require(approvers[msg.sender]); // is the person an approver?
        require(!request.approvals[msg.sender]); // if falsy then kick the user approveRequest
        request.approvals[msg.sender] = true;
        request.approvalCount++;
    }

    function finaliseRequest(uint256 index) public restricted {
        Request storage request = requests[index]; // variable to avoid repetition

        require(request.approvalCount > (approversCount / 2)); // we need over 50% of approvals
        require(!request.complete); // 'complete' needs to be false

        request.recipient.transfer(request.value); //sending the value of the 'request' to the vendor
        request.complete = true;
    }
}

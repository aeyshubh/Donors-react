//SPDX-License-Identifier : MIT;
// Contract Addr : 0x07d2a73b495FE8B41D5a1992cae58BA95832f305
pragma solidity ^0.8.5;

contract donate{
    struct vc{
        address from;
        address to;
        uint256 amount;
        uint256 timestamp;
    }

    vc[] donations;
    event showDonations(
        address from,
        address indexed to,
        uint256 amount,
        uint256 timestamp
    );
    function donateEthers(address _to) public payable{
        donations.push(
            vc(
                msg.sender,
                _to,
                msg.value,
                block.timestamp

            )
        );

        emit showDonations(
            msg.sender,
            _to,
            msg.value,
            block.timestamp
        );

    }

    function getDonations() view public returns(vc[] memory){
    return donations;
}

}



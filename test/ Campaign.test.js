//Campaign and CampaignFactory in the same file because they are similarly related
const assert = require("assert");
const ganache = require("ganache-cli");
const Web3 = require("web3");
const web3 = new Web3(ganache.provider());

const compiledFactory = require("../etherium/build/CampaignFactory.json");

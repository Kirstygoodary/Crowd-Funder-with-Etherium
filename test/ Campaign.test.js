//Campaign and CampaignFactory in the same file because they are similarly related
const assert = require("assert");
const ganache = require("ganache-cli");
const Web3 = require("web3");
const web3 = new Web3(ganache.provider());

const compiledFactory = require("../etherium/build/CampaignFactory.json");
const compiledCampaign = require("../etherium/build/Campaign.json");

let accounts;
let factory; // a deployed instance of the factory
let campaignAddress; // taking the address from the campaign variable
let campaign; // creating an instance of the campaign from the factory variable

beforeEach(async () => {
  accounts = await web3.eth.getAccounts();
  factory = await new web3.eth.Contract(JSON.parse(compiledFactory.interface))
    .deploy({ data: compiledFactory.bytecode })
    .send({ from: accounts[0], gas: 1000000 });
  // passing in the ABI / interface. Needs to be parsed in to a js format before deploy and send

  await factory.methods
    .createCampaign("100") // in wei
    .send({ from: accounts[0], gas: "1000000" });

  const addresses = await factory.methods.getDeployedCampaigns().call(); // view function therefore can only call()
  campaignAddress = addresses[0];

  campaign = await new web3.eth.Contract(
    JSON.parse(compiledCampaign.interface),
    campaignAddress
  );
  /**
   * Because the contract has already been deployed, the address is taken as the second argument
   */
});

describe("Campaigns", () => {
  it("deploys a factory and a campaign succesfully", () => {
    assert.ok(factory.options.address);
    assert.ok(campaign.options.address);
  });
});

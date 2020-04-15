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
  it("deploys a factory and a campaign successfully", () => {
    assert.ok(factory.options.address);
    assert.ok(campaign.options.address);
  });
  it("marks the caller of the function as the manager", async () => {
    const manager = await campaign.methods.manager().call(); // manager() is automatically created because it is a public variable
    assert.equal(accounts[0], manager); //assert.equal -> what it is, what it should be
  });
  it("allows people to contribute money and marks them as approvers", async () => {
    await campaign.methods
      .contribute()
      .send({ value: "200", from: accounts[1] });
    const isContributor = await campaign.methods.approvers(accounts[1]).call();
    assert(isContributor); //mapping. if true -> passes the test
  });
  it("requires a minimum contribution", async () => {
    try {
      await campaign.methods
        .contribute()
        .send({ value: "5", from: accounts[1] });
      assert(false); // if false then the test will fail
    } catch (err) {
      assert(err); // want to catch the error for it to pass.
    }
  });
  it("allows a manager to make a payment request", async () => {
    await campaign.methods
      .createRequest("buy batteries", "100", accounts[1])
      .send({ from: accounts[0], gas: "1000000" }); //.send({}) -> always used when the contract data is being modified
    const request = await campaign.methods.requests(0).call();
    assert.equal("buy batteries", request.description);
  });
  it("processes the requests", async () => {
    await campaign.methods
      .contribute()
      .send({ from: accounts[0], value: web3.utils.toWei("10", "ether") });

    await campaign.methods
      .createRequest(
        "buy batteries",
        web3.utils.toWei("5", "ether"),
        accounts[1] //account ether is being sent to
      )
      .send({ from: accounts[0], gas: "1000000" });

    await campaign.methods
      .approveRequest(0)
      .send({ from: accounts[0], gas: "1000000" });

    await campaign.methods
      .finaliseRequest(0)
      .send({ from: accounts[0], gas: "1000000" });

    let balance = await web3.eth.getBalance(accounts[1]);
    balance = web3.utils.fromWei(balance, "ether");
    balance = parseFloat(balance);

    assert(balance > 104);
  });
});

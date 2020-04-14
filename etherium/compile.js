const path = require("path");
const solc = require("solc");
const fs = require("fs-extra"); // similar to fs but with extra functions. Improved version of the fs module.

const buildPath = path.resolve(__dirname, "build");
fs.removeSync(buildPath);

const campaignPath = path.resolve(__dirname, "contracts", "Campaign.sol");
const source = fs.readFileSync(campaignPath, "utf8");
const output = solc.compile(source, 1).contracts; //output is the contracts property

fs.ensureDirSync(buildPath); // checks to see if the directory exists, if not then it creates it for us

for (let contract in output) {
  fs.outputJSONSync(
    path.resolve(buildPath, contract.replace(":", "") + ".json"), //adds files to the build folder. removes the ":" created at the start of the file
    output[contract]
  );
  /**
   * looping over the Campaign / CampaignFactory contracts
   * for each contract -> its going to write out a JSON file
   * output[contract] ->
   */
}

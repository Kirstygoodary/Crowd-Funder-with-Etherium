import web3 from "./web3"; //importing copy of web3 from file
import CampaignFactory from "./build/CampaignFactory.json";
// importing the compiled contract from the build folder because it has the ABI / interface

const instance = new web3.eth.Contract(
  JSON.parse(CampaignFactory.interface),
  "0x0Af753bCB3A75B3f429F6ab52E7576B35df81c85"
);

export default instance;

// creating a deployed factory instance so that we can just import it wherever we need it

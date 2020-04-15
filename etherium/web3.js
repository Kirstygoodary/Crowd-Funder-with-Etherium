import Web3 from "web3";

let web3;
/**
 * Not all browsers have metamask running so the 'window' variable may be undefined.
 */

if (typeof window !== "undefined" && typeof window.web3 !== "undefined") {
  // if true then we are in the browser and metamask is running :)
  web3 = new Web3(window.web3.currentProvider);
} else {
  const provider = new Web3.providers.HttpProvider(
    "https://rinkeby.infura.io/v3/067ff9bc69b648509759a2e25e9f305d"
  ); // link is from deploy.js
  // infura provides another way to access the Rinkeby network.

  web3 = new Web3(provider);

  //We are on the server OR the user is not running metamask
  // Therefore we are creating a new provider
}

//const web3 = new Web3(window.web3.currentProvider);
/**
 * Creating a new instance of web3 and using the provider
 * from Metamask.
 *
 * Will revisit this because users who do not
 * use Metamask will not be able to use the
 * application.
 */

export default web3;

// creating a new instance so that we can just import it wherever we need it

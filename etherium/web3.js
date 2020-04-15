import web3 from "web3";

const web3 = new Web3(window.web3.currentProvider);
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

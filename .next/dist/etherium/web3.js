"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _web = require("web3");

var _web2 = _interopRequireDefault(_web);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var web3 = void 0;
/**
 * Not all browsers have metamask running so the 'window' variable may be undefined.
 */

if (typeof window !== "undefined" && typeof window.web3 !== "undefined") {
  // if true then we are in the browser and metamask is running :)
  web3 = new _web2.default(window.web3.currentProvider);
} else {
  var provider = new _web2.default.providers.HttpProvider("https://rinkeby.infura.io/v3/067ff9bc69b648509759a2e25e9f305d"); // link is from deploy.js
  // infura provides another way to access the Rinkeby network.

  web3 = new _web2.default(provider);

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

exports.default = web3;

// creating a new instance so that we can just import it wherever we need it
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImV0aGVyaXVtL3dlYjMuanMiXSwibmFtZXMiOlsiV2ViMyIsIndlYjMiLCJ3aW5kb3ciLCJjdXJyZW50UHJvdmlkZXIiLCJwcm92aWRlciIsInByb3ZpZGVycyIsIkh0dHBQcm92aWRlciJdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUEsQUFBTyxBQUFQOzs7Ozs7QUFFQSxJQUFJLFlBQUo7QUFDQTs7OztBQUlBLElBQUksT0FBTyxBQUFQLFdBQWtCLEFBQWxCLGVBQWlDLE9BQU8sT0FBTyxBQUFkLFNBQXVCLEFBQTVELGFBQXlFLEFBQ3ZFO0FBQ0E7U0FBTyxBQUFJLEFBQUosa0JBQVMsT0FBTyxBQUFQLEtBQVksQUFBckIsQUFBUCxBQUNEO0FBSEQsT0FHTyxBQUNMO01BQU0sV0FBVyxJQUFJLGNBQUssQUFBTCxVQUFlLEFBQW5CLGFBQ2YsQUFEZSxBQUFqQixBQURLLGtFQUdGLEFBQ0g7QUFFQTs7U0FBTyxBQUFJLEFBQUosa0JBQVMsQUFBVCxBQUFQLEFBRUE7O0FBQ0E7QUFDRDs7O0FBRUQ7QUFDQSxBQVNBOzs7Ozs7Ozs7a0JBQWUsQUFBZjs7QUFFQSIsImZpbGUiOiJ3ZWIzLmpzIiwic291cmNlUm9vdCI6Ii9Vc2Vycy9LaXJzdHkvYmxvY2tjaGFpbl9wcm9qZWN0cy9raWNrc3RhcnQifQ==
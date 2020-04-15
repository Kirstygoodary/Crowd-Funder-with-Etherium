"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _web = require("./web3");

var _web2 = _interopRequireDefault(_web);

var _CampaignFactory = require("./build/CampaignFactory.json");

var _CampaignFactory2 = _interopRequireDefault(_CampaignFactory);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// importing the compiled contract from the build folder because it has the ABI / interface

var instance = new _web2.default.eth.Contract(JSON.parse(_CampaignFactory2.default.interface), "0x0Af753bCB3A75B3f429F6ab52E7576B35df81c85"); //importing copy of web3 from file
exports.default = instance;

// creating a deployed factory instance so that we can just import it wherever we need it
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImV0aGVyaXVtL2ZhY3RvcnkuanMiXSwibmFtZXMiOlsid2ViMyIsIkNhbXBhaWduRmFjdG9yeSIsImluc3RhbmNlIiwiZXRoIiwiQ29udHJhY3QiLCJKU09OIiwicGFyc2UiLCJpbnRlcmZhY2UiXSwibWFwcGluZ3MiOiI7Ozs7OztBLEFBQUEsQUFBTyxBQUFVOzs7O0FBQ2pCLEFBQU8sQUFBcUI7Ozs7OztBQUM1Qjs7QUFFQSxJQUFNLFdBQVcsSUFBSSxjQUFBLEFBQUssSUFBVCxBQUFhLFNBQzVCLEtBQUEsQUFBSyxNQUFNLDBCQURJLEFBQ2YsQUFBMkIsWUFEN0IsQUFBaUIsQUFFZixBQUdGLCtDQVQyQjtrQkFTM0IsQUFBZTs7QUFFZiIsImZpbGUiOiJmYWN0b3J5LmpzIiwic291cmNlUm9vdCI6Ii9Vc2Vycy9LaXJzdHkvYmxvY2tjaGFpbl9wcm9qZWN0cy9raWNrc3RhcnQifQ==
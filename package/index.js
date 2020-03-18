"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _Request = _interopRequireDefault(require("./Request"));

var _RequestException = _interopRequireDefault(require("./RequestException"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ReactAxiosRequest = {
  Request: _Request.default,
  RequestException: _RequestException.default
};
var _default = ReactAxiosRequest;
exports.default = _default;
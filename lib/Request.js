"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = require("react");

var _propTypes = _interopRequireDefault(require("prop-types"));

var _axios = _interopRequireDefault(require("axios"));

var _requestException = _interopRequireDefault(require("./requestException"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) { return; } var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var Request = function Request(_ref) {
  var method = _ref.method,
      base = _ref.base,
      route = _ref.route,
      body = _ref.body,
      config = _ref.config,
      children = _ref.children;

  var _useState = (0, _react.useState)({
    loading: true,
    data: null,
    error: null
  }),
      _useState2 = _slicedToArray(_useState, 2),
      response = _useState2[0],
      setResponse = _useState2[1];

  var url = base + (route && "/".concat(route));

  var handleData = function handleData(_ref2) {
    var data = _ref2.data;

    var newResponse = _objectSpread({}, response, {
      data: data,
      loading: false,
      error: null
    });

    setResponse(newResponse);
    return newResponse;
  };

  var handleError = function handleError(error) {
    var newResponse = _objectSpread({}, response, {
      error: error,
      loading: false,
      data: null
    });

    setResponse(newResponse);
    return newResponse;
  };

  var requestCallback = /*#__PURE__*/function () {
    var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(props) {
      var result;
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              setResponse(_objectSpread({}, response, {
                loading: true
              }));
              _context.prev = 1;

              if (body || props) {
                _context.next = 4;
                break;
              }

              throw new _requestException.default("Request body is reqired");

            case 4:
              _context.next = 6;
              return _axios.default[method.toLowerCase()](url, body || props, config);

            case 6:
              result = _context.sent;
              return _context.abrupt("return", handleData(result));

            case 10:
              _context.prev = 10;
              _context.t0 = _context["catch"](1);
              return _context.abrupt("return", handleError(_context.t0));

            case 13:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, null, [[1, 10]]);
    }));

    return function requestCallback(_x) {
      return _ref3.apply(this, arguments);
    };
  }();

  (0, _react.useEffect)(function () {
    if (method === "get") {
      _axios.default.get(url, config).then(handleData).catch(handleError);
    } // eslint-disable-next-line react-hooks/exhaustive-deps

  }, []);
  return children(_objectSpread({}, response, {
    requestCallback: requestCallback
  }));
};

Request.propTypes = {
  children: _propTypes.default.func.isRequired,
  base: _propTypes.default.string.isRequired,
  method: _propTypes.default.oneOf(["get", "post", "patch", "put", "delete"]),
  route: _propTypes.default.string,
  config: _propTypes.default.object,
  body: _propTypes.default.object
};
Request.defaultProps = {
  method: "get",
  route: "",
  body: null,
  config: null
};
var _default = Request;
exports.default = _default;
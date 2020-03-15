"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = require("react");

var _propTypes = _interopRequireDefault(require("prop-types"));

var _axios = _interopRequireDefault(require("axios"));

var _RequestException = _interopRequireDefault(require("./RequestException"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) { return; } var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var Request = function Request(_ref) {
  var method = _ref.method,
      base = _ref.base,
      route = _ref.route,
      path = _ref.path,
      body = _ref.body,
      children = _ref.children;

  var _useState = (0, _react.useState)(null),
      _useState2 = _slicedToArray(_useState, 2),
      data = _useState2[0],
      setData = _useState2[1];

  var _useState3 = (0, _react.useState)(null),
      _useState4 = _slicedToArray(_useState3, 2),
      error = _useState4[0],
      setError = _useState4[1];

  var url = base && route ? "".concat(base, "/").concat(route) : path;

  var handleData = function handleData(_ref2) {
    var data = _ref2.data;
    setData(data);
    return data;
  };

  var handleError = function handleError(error) {
    setError(error);
    return error;
  };

  var requestCallback = /*#__PURE__*/function () {
    var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(props) {
      var result;
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.prev = 0;

              if (body || props) {
                _context.next = 3;
                break;
              }

              throw new _RequestException.default("Request body is reqired");

            case 3:
              _context.next = 5;
              return _axios.default[method.toLowerCase()](url, body || props);

            case 5:
              result = _context.sent;
              return _context.abrupt("return", handleData(result));

            case 9:
              _context.prev = 9;
              _context.t0 = _context["catch"](0);
              return _context.abrupt("return", handleError(_context.t0));

            case 12:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, null, [[0, 9]]);
    }));

    return function requestCallback(_x) {
      return _ref3.apply(this, arguments);
    };
  }();

  (0, _react.useEffect)(function () {
    if (method === "get") {
      _axios.default.get(url).then(handleData).catch(handleError);
    }
  }, [method, url]);
  return children({
    data: data,
    error: error,
    requestCallback: requestCallback
  });
};

Request.propTypes = {
  children: _propTypes.default.func.isRequired,
  method: _propTypes.default.oneOf(["get", "post", "patch", "put", "delete"]),
  base: _propTypes.default.string,
  route: _propTypes.default.string,
  path: _propTypes.default.string,
  body: _propTypes.default.object
};
Request.defaultProps = {
  method: "get",
  base: "./",
  route: "",
  path: "./",
  body: null
};
var _default = Request;
exports.default = _default;
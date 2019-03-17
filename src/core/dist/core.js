"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.runLighthouse = runLighthouse;

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var lighthouse = require('lighthouse');

var chromeLauncher = require('chrome-launcher');

function runLighthouse(url) {
  return new Promise(
  /*#__PURE__*/
  function () {
    var _ref = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee(resolve, reject) {
      var chromeOptions, chrome, port, lighthouseResults;
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              chromeOptions = {
                chromeFlags: ['--headless', '--disable-gpu']
              };
              _context.prev = 1;
              _context.next = 4;
              return chromeLauncher.launch(chromeOptions);

            case 4:
              chrome = _context.sent;
              port = chrome.port;
              _context.next = 8;
              return lighthouse(url, {
                port: port
              });

            case 8:
              lighthouseResults = _context.sent;
              _context.next = 11;
              return chrome.kill();

            case 11:
              resolve(lighthouseResults);
              _context.next = 17;
              break;

            case 14:
              _context.prev = 14;
              _context.t0 = _context["catch"](1);
              reject(_context.t0);

            case 17:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, null, [[1, 14]]);
    }));

    return function (_x, _x2) {
      return _ref.apply(this, arguments);
    };
  }());
}
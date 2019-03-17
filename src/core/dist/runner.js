"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.runPipeline = runPipeline;

var _core = require("./core");

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function runPipeline() {
  return new (
  /*#__PURE__*/
  function () {
    function Runner() {
      _classCallCheck(this, Runner);

      this.plugins = [];
      this.url = '';
      this.tag = 'default tag';
    }

    _createClass(Runner, [{
      key: "registerUrl",
      value: function registerUrl(inputUrl) {
        this.url = inputUrl;
        return this;
      }
    }, {
      key: "registerTag",
      value: function registerTag(inputTag) {
        this.tag = inputTag;
        return this;
      }
    }, {
      key: "registerPlugin",
      value: function registerPlugin(plugin, config) {
        this.plugins.push({
          plugin: plugin,
          config: config
        });
        return this;
      }
    }, {
      key: "run",
      value: function () {
        var _run = _asyncToGenerator(
        /*#__PURE__*/
        regeneratorRuntime.mark(function _callee() {
          var result, pluginResults;
          return regeneratorRuntime.wrap(function _callee$(_context) {
            while (1) {
              switch (_context.prev = _context.next) {
                case 0:
                  _context.next = 2;
                  return (0, _core.runLighthouse)();

                case 2:
                  result = _context.sent;
                  pluginResults = this.plugins.map(function (plugin) {
                    var pluginRunner = plugin.plugin;
                    return pluginRunner(plugin.config, result);
                  });
                  return _context.abrupt("return", Promise.all(pluginResults));

                case 5:
                case "end":
                  return _context.stop();
              }
            }
          }, _callee, this);
        }));

        function run() {
          return _run.apply(this, arguments);
        }

        return run;
      }()
    }]);

    return Runner;
  }())();
}
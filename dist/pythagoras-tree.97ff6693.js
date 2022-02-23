// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"js/pythagoras-tree.js":[function(require,module,exports) {
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

var Tree = /*#__PURE__*/function () {
  function Tree() {
    _classCallCheck(this, Tree);

    this.canvas = document.querySelector('#ctx');
    this.Drange = document.querySelector('#set_degr');
    this.ctx = this.canvas.getContext('2d');
    this.ctx.lineWidth = 1; // толщина линии

    this.ctx.strokeStyle = 'white'; // цвет    линии

    this.degrBase = 45;
    this.degr = this.degrBase;
    this.set_default();
    this.handleRange();
  }

  _createClass(Tree, [{
    key: "set_default",
    value: function set_default() {
      this.length = 160; // первоначальная длинна лнии

      this.step_value = 10; // кол-во шагов (рисования)

      this.baseX = 600; // дефолтная ширина

      this.baseY = 720; // дефолтная высота (в самом низу)
      // координаты столба дерева

      this.lineX = 600;
      this.lineY = 500;
    }
  }, {
    key: "handleRange",
    value: function handleRange() {
      var _this = this;

      this.Drange.addEventListener('mousemove', function (e) {
        if (e.which == 1) {
          _this.rangeFunc(Number(e.target.value));
        }
      }, false);
      this.Drange.addEventListener('change', function (e) {
        _this.rangeFunc(Number(e.target.value));
      }, false);
    }
  }, {
    key: "rangeFunc",
    value: function rangeFunc(value) {
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
      var degrees_monitor = document.querySelector('.degrees_monitor');
      degrees_monitor.textContent = value;
      this.degrBase = value;
      this.degr = value;
      this.set_default();
      this.makeTree();
    }
  }, {
    key: "makeTree",
    value: function makeTree() {
      // отрисовываем столб дерева
      this.ctx.beginPath(); // clear field

      this.ctx.moveTo(this.baseX, this.baseY); // передвигаем перо

      this.ctx.lineTo(this.lineX, this.lineY); // рисуем линию

      this.createBranch(this.step_value, true, this.degr, this.length, this.lineX, this.lineY);
      this.set_default();
      this.ctx.moveTo(this.lineX, this.lineY); // передвигаем перо

      this.degr = this.degrBase;
      this.createBranch(this.step_value, false, this.degr, this.length, this.lineX, this.lineY);
      this.ctx.stroke();
      this.ctx.closePath();
    }
  }, {
    key: "createBranch",
    value: function createBranch() {
      var stepValue = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 10;
      var sideBool = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
      var degr = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 45;
      var length = arguments.length > 3 ? arguments[3] : undefined;
      var lineX = arguments.length > 4 ? arguments[4] : undefined;
      var lineY = arguments.length > 5 ? arguments[5] : undefined;
      var direction = sideBool ? 'right' : 'left';

      if (stepValue > 0) {
        // processing
        var result = this.count_angle(degr, length, lineX, lineY, direction);
        this.ctx.moveTo(lineX, lineY);
        this.ctx.lineTo(result.lineX, result.lineY);
        length = length / 1.6;
        stepValue--;
        this.createBranch(stepValue, sideBool, degr - Number(this.degrBase), length, result.lineX, result.lineY);
        this.createBranch(stepValue, sideBool, degr + Number(this.degrBase), length, result.lineX, result.lineY);
      }
    }
  }, {
    key: "count_angle",
    value: function count_angle(degr, length, lineX, lineY, side) {
      degr = Number(degr);
      if (degr <= 0) degr = 360 + degr;

      if (degr > 0 && degr < 90) {
        var result = this.do_1_section_new(lineX, lineY, length, degr, side);
        lineX = result.lineX;
        lineY = result.lineY;
      }

      if (degr > 90 && degr < 180) {
        var _result = this.do_2_section_new(lineX, lineY, length, degr, side);

        lineX = _result.lineX;
        lineY = _result.lineY;
      }

      if (degr > 180 && degr < 270) {
        var _result2 = this.do_3_section_new(lineX, lineY, length, degr, side);

        lineX = _result2.lineX;
        lineY = _result2.lineY;
      }

      if (degr > 270 && degr < 360) {
        var _result3 = this.do_4_section_new(lineX, lineY, length, degr, side);

        lineX = _result3.lineX;
        lineY = _result3.lineY;
      } /////////


      if (degr == 90) lineY -= length;

      if (degr == 180) {
        if (side == "right") {
          lineX -= length;
        }

        if (side == "left") {
          lineX += length;
        }
      }

      if (degr == 270) lineY += length;

      if (degr == 360) {
        if (side == "right") {
          lineX += length;
        }

        if (side == "left") {
          lineX -= length;
        }
      }

      return {
        "lineY": lineY,
        "lineX": lineX
      };
    } ///////

  }, {
    key: "do_1_section_new",
    value: function do_1_section_new(lineX, lineY, length, degr, side) {
      var radian = degr * Math.PI / 180; // if turn right

      var sin = Math.sin(radian);
      var cos = Math.cos(radian);
      var yLength = length * sin;
      var xLength = length * cos;

      if (side == "right") {
        lineX += xLength;
        lineY -= yLength;
      }

      if (side == "left") {
        lineX -= xLength;
        lineY -= yLength;
      }

      return {
        "lineY": lineY,
        "lineX": lineX
      };
    }
  }, {
    key: "do_2_section_new",
    value: function do_2_section_new(lineX, lineY, length, degr, side) {
      degr = degr - 90;
      var radian = degr * Math.PI / 180; // if turn right

      var sin = Math.sin(radian);
      var cos = Math.cos(radian);
      var xLength = length * sin;
      var yLength = length * cos;

      if (side == "right") {
        lineX -= xLength;
        lineY -= yLength;
      }

      if (side == "left") {
        lineX += xLength;
        lineY -= yLength;
      }

      return {
        "lineY": lineY,
        "lineX": lineX
      };
    }
  }, {
    key: "do_3_section_new",
    value: function do_3_section_new(lineX, lineY, length, degr, side) {
      degr = degr - 180;
      var radian = degr * Math.PI / 180; // if turn right

      var sin = Math.sin(radian);
      var cos = Math.cos(radian);
      var xLength = length * sin;
      var yLength = length * cos;

      if (side == "right") {
        lineX -= xLength;
        lineY += yLength;
      }

      if (side == "left") {
        lineX += xLength;
        lineY += yLength;
      }

      return {
        "lineY": lineY,
        "lineX": lineX
      };
    }
  }, {
    key: "do_4_section_new",
    value: function do_4_section_new(lineX, lineY, length, degr, side) {
      degr = degr - 270;
      var radian = degr * Math.PI / 180; // if turn right

      var sin = Math.sin(radian);
      var cos = Math.cos(radian);
      var xLength = length * sin;
      var yLength = length * cos;

      if (side == "right") {
        lineX += xLength;
        lineY += yLength;
      }

      if (side == "left") {
        lineX -= xLength;
        lineY += yLength;
      }

      return {
        "lineY": lineY,
        "lineX": lineX
      };
    }
  }]);

  return Tree;
}();

var Tree_ex = new Tree();
Tree_ex.makeTree();
},{}],"../node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "62916" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["../node_modules/parcel-bundler/src/builtins/hmr-runtime.js","js/pythagoras-tree.js"], null)
//# sourceMappingURL=/pythagoras-tree.97ff6693.js.map
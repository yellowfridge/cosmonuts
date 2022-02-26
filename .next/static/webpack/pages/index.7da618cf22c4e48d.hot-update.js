"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
self["webpackHotUpdate_N_E"]("pages/index",{

/***/ "./pages/web3connector.js":
/*!********************************!*\
  !*** ./pages/web3connector.js ***!
  \********************************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": function() { return /* binding */ Web3Connector; }\n/* harmony export */ });\n/* harmony import */ var _home_redlentils_Seafile_Websites_avatarnft_node_modules_next_dist_compiled_regenerator_runtime_runtime_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./node_modules/next/dist/compiled/regenerator-runtime/runtime.js */ \"./node_modules/next/dist/compiled/regenerator-runtime/runtime.js\");\n/* harmony import */ var _home_redlentils_Seafile_Websites_avatarnft_node_modules_next_dist_compiled_regenerator_runtime_runtime_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_home_redlentils_Seafile_Websites_avatarnft_node_modules_next_dist_compiled_regenerator_runtime_runtime_js__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"./node_modules/react/jsx-dev-runtime.js\");\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react */ \"./node_modules/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var _web3_react_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @web3-react/core */ \"./node_modules/@web3-react/core/dist/core.esm.js\");\n/* harmony import */ var _ethereum_components_wallet_connectors__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../ethereum/components/wallet/connectors */ \"./ethereum/components/wallet/connectors.js\");\n/* module decorator */ module = __webpack_require__.hmd(module);\n\n\n\n\n\nfunction asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {\n    try {\n        var info = gen[key](arg);\n        var value = info.value;\n    } catch (error) {\n        reject(error);\n        return;\n    }\n    if (info.done) {\n        resolve(value);\n    } else {\n        Promise.resolve(value).then(_next, _throw);\n    }\n}\nfunction _asyncToGenerator(fn) {\n    return function() {\n        var self = this, args = arguments;\n        return new Promise(function(resolve, reject) {\n            var gen = fn.apply(self, args);\n            function _next(value) {\n                asyncGeneratorStep(gen, resolve, reject, _next, _throw, \"next\", value);\n            }\n            function _throw(err) {\n                asyncGeneratorStep(gen, resolve, reject, _next, _throw, \"throw\", err);\n            }\n            _next(undefined);\n        });\n    };\n}\nvar _s = $RefreshSig$();\nfunction Web3Connector(props) {\n    _s();\n    var ref = (0,_web3_react_core__WEBPACK_IMPORTED_MODULE_3__.useWeb3React)(), active = ref.active, account = ref.account, library = ref.library, connector = ref.connector, activate = ref.activate, deactivate = ref.deactivate;\n    var ref1 = (0,react__WEBPACK_IMPORTED_MODULE_2__.useState)(props.isWalletConnected), activeStatus = ref1[0], setActiveStatus = ref1[1];\n    var ref2 = (0,react__WEBPACK_IMPORTED_MODULE_2__.useState)(props.connectWalletClick), connectWalletClick = ref2[0], setConnectWalletClick = ref2[1];\n    function connect() {\n        return _connect.apply(this, arguments);\n    }\n    function _connect() {\n        _connect = _asyncToGenerator(_home_redlentils_Seafile_Websites_avatarnft_node_modules_next_dist_compiled_regenerator_runtime_runtime_js__WEBPACK_IMPORTED_MODULE_0___default().mark(function _callee() {\n            return _home_redlentils_Seafile_Websites_avatarnft_node_modules_next_dist_compiled_regenerator_runtime_runtime_js__WEBPACK_IMPORTED_MODULE_0___default().wrap(function _callee$(_ctx) {\n                while(1)switch(_ctx.prev = _ctx.next){\n                    case 0:\n                        _ctx.prev = 0;\n                        _ctx.next = 3;\n                        return activate(_ethereum_components_wallet_connectors__WEBPACK_IMPORTED_MODULE_4__.injected);\n                    case 3:\n                        localStorage.setItem('isWalletConnected', true);\n                        _ctx.next = 9;\n                        break;\n                    case 6:\n                        _ctx.prev = 6;\n                        _ctx.t0 = _ctx[\"catch\"](0);\n                        console.log(_ctx.t0);\n                    case 9:\n                    case \"end\":\n                        return _ctx.stop();\n                }\n            }, _callee, null, [\n                [\n                    0,\n                    6\n                ]\n            ]);\n        }));\n        return _connect.apply(this, arguments);\n    }\n    function disconnect() {\n        return _disconnect.apply(this, arguments);\n    }\n    function _disconnect() {\n        _disconnect = _asyncToGenerator(_home_redlentils_Seafile_Websites_avatarnft_node_modules_next_dist_compiled_regenerator_runtime_runtime_js__WEBPACK_IMPORTED_MODULE_0___default().mark(function _callee() {\n            return _home_redlentils_Seafile_Websites_avatarnft_node_modules_next_dist_compiled_regenerator_runtime_runtime_js__WEBPACK_IMPORTED_MODULE_0___default().wrap(function _callee$(_ctx) {\n                while(1)switch(_ctx.prev = _ctx.next){\n                    case 0:\n                        try {\n                            deactivate();\n                            localStorage.setItem('isWalletConnected', false);\n                        } catch (ex) {\n                            console.log(ex);\n                        }\n                    case 1:\n                    case \"end\":\n                        return _ctx.stop();\n                }\n            }, _callee);\n        }));\n        return _disconnect.apply(this, arguments);\n    }\n    (0,react__WEBPACK_IMPORTED_MODULE_2__.useEffect)(function() {\n        var connectWalletOnPageLoad = function() {\n            var _ref = _asyncToGenerator(_home_redlentils_Seafile_Websites_avatarnft_node_modules_next_dist_compiled_regenerator_runtime_runtime_js__WEBPACK_IMPORTED_MODULE_0___default().mark(function _callee() {\n                return _home_redlentils_Seafile_Websites_avatarnft_node_modules_next_dist_compiled_regenerator_runtime_runtime_js__WEBPACK_IMPORTED_MODULE_0___default().wrap(function _callee$(_ctx) {\n                    while(1)switch(_ctx.prev = _ctx.next){\n                        case 0:\n                            if (!((localStorage === null || localStorage === void 0 ? void 0 : localStorage.getItem('isWalletConnected')) === 'true')) {\n                                _ctx.next = 10;\n                                break;\n                            }\n                            _ctx.prev = 1;\n                            _ctx.next = 4;\n                            return activate(_ethereum_components_wallet_connectors__WEBPACK_IMPORTED_MODULE_4__.injected);\n                        case 4:\n                            localStorage.setItem('isWalletConnected', true);\n                            _ctx.next = 10;\n                            break;\n                        case 7:\n                            _ctx.prev = 7;\n                            _ctx.t0 = _ctx[\"catch\"](1);\n                            console.log(_ctx.t0);\n                        case 10:\n                        case \"end\":\n                            return _ctx.stop();\n                    }\n                }, _callee, null, [\n                    [\n                        1,\n                        7\n                    ]\n                ]);\n            }));\n            return function connectWalletOnPageLoad() {\n                return _ref.apply(this, arguments);\n            };\n        }();\n        connectWalletOnPageLoad();\n        var setActive = function() {\n            setActiveStatus(active);\n        };\n        setActive();\n        var walletClicked = function() {\n            var _ref = _asyncToGenerator(_home_redlentils_Seafile_Websites_avatarnft_node_modules_next_dist_compiled_regenerator_runtime_runtime_js__WEBPACK_IMPORTED_MODULE_0___default().mark(function _callee() {\n                return _home_redlentils_Seafile_Websites_avatarnft_node_modules_next_dist_compiled_regenerator_runtime_runtime_js__WEBPACK_IMPORTED_MODULE_0___default().wrap(function _callee$(_ctx) {\n                    while(1)switch(_ctx.prev = _ctx.next){\n                        case 0:\n                            _ctx.prev = 0;\n                            _ctx.next = 3;\n                            return activate(_ethereum_components_wallet_connectors__WEBPACK_IMPORTED_MODULE_4__.injected);\n                        case 3:\n                            setActiveStatus(true);\n                            _ctx.next = 9;\n                            break;\n                        case 6:\n                            _ctx.prev = 6;\n                            _ctx.t0 = _ctx[\"catch\"](0);\n                            console.log(_ctx.t0);\n                        case 9:\n                            setConnectWalletClick(false);\n                        case 10:\n                        case \"end\":\n                            return _ctx.stop();\n                    }\n                }, _callee, null, [\n                    [\n                        0,\n                        6\n                    ]\n                ]);\n            }));\n            return function walletClicked() {\n                return _ref.apply(this, arguments);\n            };\n        }();\n    }, []);\n    return(/*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxDEV)(\"div\", {\n        children: this.walletClicked.bind(this)\n    }, void 0, false, {\n        fileName: \"/home/redlentils/Seafile/Websites/avatarnft/pages/web3connector.js\",\n        lineNumber: 60,\n        columnNumber: 5\n    }, this));\n};\n_s(Web3Connector, \"5y3GZS0cnOZSS9gXTqBCKDqBO/4=\", false, function() {\n    return [\n        _web3_react_core__WEBPACK_IMPORTED_MODULE_3__.useWeb3React\n    ];\n});\n_c = Web3Connector;\nvar _c;\n$RefreshReg$(_c, \"Web3Connector\");\n\n\n;\n    // Wrapped in an IIFE to avoid polluting the global scope\n    ;\n    (function () {\n        var _a, _b;\n        // Legacy CSS implementations will `eval` browser code in a Node.js context\n        // to extract CSS. For backwards compatibility, we need to check we're in a\n        // browser context before continuing.\n        if (typeof self !== 'undefined' &&\n            // AMP / No-JS mode does not inject these helpers:\n            '$RefreshHelpers$' in self) {\n            var currentExports = module.__proto__.exports;\n            var prevExports = (_b = (_a = module.hot.data) === null || _a === void 0 ? void 0 : _a.prevExports) !== null && _b !== void 0 ? _b : null;\n            // This cannot happen in MainTemplate because the exports mismatch between\n            // templating and execution.\n            self.$RefreshHelpers$.registerExportsForReactRefresh(currentExports, module.id);\n            // A module can be accepted automatically based on its exports, e.g. when\n            // it is a Refresh Boundary.\n            if (self.$RefreshHelpers$.isReactRefreshBoundary(currentExports)) {\n                // Save the previous exports on update so we can compare the boundary\n                // signatures.\n                module.hot.dispose(function (data) {\n                    data.prevExports = currentExports;\n                });\n                // Unconditionally accept an update to this module, we'll check if it's\n                // still a Refresh Boundary later.\n                module.hot.accept();\n                // This field is set when the previous version of this module was a\n                // Refresh Boundary, letting us know we need to check for invalidation or\n                // enqueue an update.\n                if (prevExports !== null) {\n                    // A boundary can become ineligible if its exports are incompatible\n                    // with the previous exports.\n                    //\n                    // For example, if you add/remove/change exports, we'll want to\n                    // re-execute the importing modules, and force those components to\n                    // re-render. Similarly, if you convert a class component to a\n                    // function, we want to invalidate the boundary.\n                    if (self.$RefreshHelpers$.shouldInvalidateReactRefreshBoundary(prevExports, currentExports)) {\n                        module.hot.invalidate();\n                    }\n                    else {\n                        self.$RefreshHelpers$.scheduleUpdate();\n                    }\n                }\n            }\n            else {\n                // Since we just executed the code for the module, it's possible that the\n                // new exports made it ineligible for being a boundary.\n                // We only care about the case when we were _previously_ a boundary,\n                // because we already accepted this update (accidental side effect).\n                var isNoLongerABoundary = prevExports !== null;\n                if (isNoLongerABoundary) {\n                    module.hot.invalidate();\n                }\n            }\n        }\n    })();\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9wYWdlcy93ZWIzY29ubmVjdG9yLmpzLmpzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7OztBQUEyQztBQUNJO0FBQ29COzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBRXBELFFBQVEsQ0FBQ0ksYUFBYSxDQUFDQyxLQUFLLEVBQUUsQ0FBQzs7SUFDNUMsR0FBSyxDQUFpRUgsR0FBYyxHQUFkQSw4REFBWSxJQUExRUksTUFBTSxHQUF3REosR0FBYyxDQUE1RUksTUFBTSxFQUFFQyxPQUFPLEdBQStDTCxHQUFjLENBQXBFSyxPQUFPLEVBQUVDLE9BQU8sR0FBc0NOLEdBQWMsQ0FBM0RNLE9BQU8sRUFBRUMsU0FBUyxHQUEyQlAsR0FBYyxDQUFsRE8sU0FBUyxFQUFFQyxRQUFRLEdBQWlCUixHQUFjLENBQXZDUSxRQUFRLEVBQUVDLFVBQVUsR0FBS1QsR0FBYyxDQUE3QlMsVUFBVTtJQUVqRSxHQUFLLENBQW1DWCxJQUFpQyxHQUFqQ0EsK0NBQVEsQ0FBQ0ssS0FBSyxDQUFDTyxpQkFBaUIsR0FBakVDLFlBQVksR0FBcUJiLElBQWlDLEtBQXBEYyxlQUFlLEdBQUlkLElBQWlDO0lBQ3pFLEdBQUssQ0FBK0NBLElBQWtDLEdBQWxDQSwrQ0FBUSxDQUFDSyxLQUFLLENBQUNVLGtCQUFrQixHQUE5RUEsa0JBQWtCLEdBQTJCZixJQUFrQyxLQUEzRGdCLHFCQUFxQixHQUFJaEIsSUFBa0M7YUFFdkVpQixPQUFPO2VBQVBBLFFBQU87O2FBQVBBLFFBQU87UUFBUEEsUUFBTyw0S0FBdEIsUUFBUSxXQUFpQixDQUFDOzs7Ozs7K0JBRWhCUCxRQUFRLENBQUNQLDRFQUFROzt3QkFDdkJlLFlBQVksQ0FBQ0MsT0FBTyxDQUFDLENBQW1CLG9CQUFFLElBQUk7Ozs7Ozt3QkFFOUNDLE9BQU8sQ0FBQ0MsR0FBRzs7Ozs7Ozs7Ozs7UUFFZixDQUFDO2VBUGNKLFFBQU87O2FBU1BLLFVBQVU7ZUFBVkEsV0FBVTs7YUFBVkEsV0FBVTtRQUFWQSxXQUFVLDRLQUF6QixRQUFRLFdBQW9CLENBQUM7Ozs7d0JBQzNCLEdBQUcsQ0FBQyxDQUFDOzRCQUNIWCxVQUFVOzRCQUNWTyxZQUFZLENBQUNDLE9BQU8sQ0FBQyxDQUFtQixvQkFBRSxLQUFLO3dCQUNqRCxDQUFDLENBQUMsS0FBSyxFQUFFSSxFQUFFLEVBQUUsQ0FBQzs0QkFDWkgsT0FBTyxDQUFDQyxHQUFHLENBQUNFLEVBQUU7d0JBQ2hCLENBQUM7Ozs7OztRQUNILENBQUM7ZUFQY0QsV0FBVTs7SUFTekJyQixnREFBUyxDQUFDLFFBQ1osR0FEa0IsQ0FBQztRQUNmLEdBQUssQ0FBQ3VCLHVCQUF1QjtnTUFBRyxRQUFRLFdBQUksQ0FBQzs7OzttQ0FDdkNOLFlBQVksYUFBWkEsWUFBWSxLQUFaQSxJQUFJLENBQUpBLENBQXFCLEdBQXJCQSxJQUFJLENBQUpBLENBQXFCLEdBQXJCQSxZQUFZLENBQUVPLE9BQU8sQ0FBQyxDQUFtQix5QkFBTSxDQUFNOzs7Ozs7bUNBRS9DZixRQUFRLENBQUNQLDRFQUFROzs0QkFDdkJlLFlBQVksQ0FBQ0MsT0FBTyxDQUFDLENBQW1CLG9CQUFFLElBQUk7Ozs7Ozs0QkFFOUNDLE9BQU8sQ0FBQ0MsR0FBRzs7Ozs7Ozs7Ozs7WUFHakIsQ0FBQzs0QkFUS0csdUJBQXVCOzs7O1FBVTdCQSx1QkFBdUI7UUFFdkIsR0FBSyxDQUFDRSxTQUFTLEdBQUcsUUFDdEIsR0FENEIsQ0FBQztZQUN2QlosZUFBZSxDQUFDUixNQUFNO1FBQ3hCLENBQUM7UUFDRG9CLFNBQVM7UUFFVCxHQUFLLENBQUNDLGFBQWE7Z01BQUcsUUFBUSxXQUFJLENBQUM7Ozs7OzttQ0FFekJqQixRQUFRLENBQUNQLDRFQUFROzs0QkFDdkJXLGVBQWUsQ0FBQyxJQUFJOzs7Ozs7NEJBRXBCTSxPQUFPLENBQUNDLEdBQUc7OzRCQUViTCxxQkFBcUIsQ0FBQyxLQUFLOzs7Ozs7Ozs7OztZQUM3QixDQUFDOzRCQVJLVyxhQUFhOzs7O0lBVXJCLENBQUMsRUFBRSxDQUFDLENBQUM7SUFFTCxNQUFNLDZFQUNIQyxDQUFHO2tCQUNELElBQUksQ0FBQ0QsYUFBYSxDQUFDRSxJQUFJLENBQUMsSUFBSTs7Ozs7O0FBR25DLENBQUM7R0EzRHVCekIsYUFBYTs7UUFDbUNGLDBEQUFZOzs7S0FENURFLGFBQWEiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9fTl9FLy4vcGFnZXMvd2ViM2Nvbm5lY3Rvci5qcz9lNjhlIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IHVzZVN0YXRlLCB1c2VFZmZlY3QgfSBmcm9tICdyZWFjdCc7XG5pbXBvcnQgeyB1c2VXZWIzUmVhY3QgfSBmcm9tICdAd2ViMy1yZWFjdC9jb3JlJ1xuaW1wb3J0IHsgaW5qZWN0ZWQgfSBmcm9tICcuLi9ldGhlcmV1bS9jb21wb25lbnRzL3dhbGxldC9jb25uZWN0b3JzJztcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gV2ViM0Nvbm5lY3Rvcihwcm9wcykge1xuICBjb25zdCB7IGFjdGl2ZSwgYWNjb3VudCwgbGlicmFyeSwgY29ubmVjdG9yLCBhY3RpdmF0ZSwgZGVhY3RpdmF0ZSB9ID0gdXNlV2ViM1JlYWN0KClcblxuICBjb25zdCBbYWN0aXZlU3RhdHVzLCBzZXRBY3RpdmVTdGF0dXNdID0gdXNlU3RhdGUocHJvcHMuaXNXYWxsZXRDb25uZWN0ZWQpO1xuICBjb25zdCBbY29ubmVjdFdhbGxldENsaWNrLCBzZXRDb25uZWN0V2FsbGV0Q2xpY2tdID0gdXNlU3RhdGUocHJvcHMuY29ubmVjdFdhbGxldENsaWNrKTtcblxuICBhc3luYyBmdW5jdGlvbiBjb25uZWN0KCkge1xuICAgIHRyeSB7XG4gICAgICBhd2FpdCBhY3RpdmF0ZShpbmplY3RlZClcbiAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKCdpc1dhbGxldENvbm5lY3RlZCcsIHRydWUpXG4gICAgfSBjYXRjaCAoZXgpIHtcbiAgICAgIGNvbnNvbGUubG9nKGV4KVxuICAgIH1cbiAgfVxuXG4gIGFzeW5jIGZ1bmN0aW9uIGRpc2Nvbm5lY3QoKSB7XG4gICAgdHJ5IHtcbiAgICAgIGRlYWN0aXZhdGUoKVxuICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oJ2lzV2FsbGV0Q29ubmVjdGVkJywgZmFsc2UpXG4gICAgfSBjYXRjaCAoZXgpIHtcbiAgICAgIGNvbnNvbGUubG9nKGV4KVxuICAgIH1cbiAgfVxuXG4gIHVzZUVmZmVjdCgoKSA9PiB7XG4gICAgY29uc3QgY29ubmVjdFdhbGxldE9uUGFnZUxvYWQgPSBhc3luYyAoKSA9PiB7XG4gICAgICBpZiAobG9jYWxTdG9yYWdlPy5nZXRJdGVtKCdpc1dhbGxldENvbm5lY3RlZCcpID09PSAndHJ1ZScpIHtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICBhd2FpdCBhY3RpdmF0ZShpbmplY3RlZClcbiAgICAgICAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbSgnaXNXYWxsZXRDb25uZWN0ZWQnLCB0cnVlKVxuICAgICAgICB9IGNhdGNoIChleCkge1xuICAgICAgICAgIGNvbnNvbGUubG9nKGV4KVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICAgIGNvbm5lY3RXYWxsZXRPblBhZ2VMb2FkKCk7XG5cbiAgICBjb25zdCBzZXRBY3RpdmUgPSAoKSA9PiB7XG4gICAgICBzZXRBY3RpdmVTdGF0dXMoYWN0aXZlKTtcbiAgICB9XG4gICAgc2V0QWN0aXZlKCk7XG5cbiAgICBjb25zdCB3YWxsZXRDbGlja2VkID0gYXN5bmMgKCkgPT4ge1xuICAgICAgdHJ5IHtcbiAgICAgICAgYXdhaXQgYWN0aXZhdGUoaW5qZWN0ZWQpO1xuICAgICAgICBzZXRBY3RpdmVTdGF0dXModHJ1ZSk7XG4gICAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgICAgY29uc29sZS5sb2coZXJyKTtcbiAgICAgIH1cbiAgICAgIHNldENvbm5lY3RXYWxsZXRDbGljayhmYWxzZSk7XG4gICAgfVxuXG4gIH0sIFtdKVxuXG4gIHJldHVybiAoXG4gICAgPGRpdj5cbiAgICAgIHt0aGlzLndhbGxldENsaWNrZWQuYmluZCh0aGlzKX1cbiAgICA8L2Rpdj5cbiAgKVxufVxuIl0sIm5hbWVzIjpbInVzZVN0YXRlIiwidXNlRWZmZWN0IiwidXNlV2ViM1JlYWN0IiwiaW5qZWN0ZWQiLCJXZWIzQ29ubmVjdG9yIiwicHJvcHMiLCJhY3RpdmUiLCJhY2NvdW50IiwibGlicmFyeSIsImNvbm5lY3RvciIsImFjdGl2YXRlIiwiZGVhY3RpdmF0ZSIsImlzV2FsbGV0Q29ubmVjdGVkIiwiYWN0aXZlU3RhdHVzIiwic2V0QWN0aXZlU3RhdHVzIiwiY29ubmVjdFdhbGxldENsaWNrIiwic2V0Q29ubmVjdFdhbGxldENsaWNrIiwiY29ubmVjdCIsImxvY2FsU3RvcmFnZSIsInNldEl0ZW0iLCJjb25zb2xlIiwibG9nIiwiZGlzY29ubmVjdCIsImV4IiwiY29ubmVjdFdhbGxldE9uUGFnZUxvYWQiLCJnZXRJdGVtIiwic2V0QWN0aXZlIiwid2FsbGV0Q2xpY2tlZCIsImRpdiIsImJpbmQiXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///./pages/web3connector.js\n");

/***/ })

});
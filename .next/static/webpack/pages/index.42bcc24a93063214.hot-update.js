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

/***/ "./pages/index.js":
/*!************************!*\
  !*** ./pages/index.js ***!
  \************************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _home_redlentils_Seafile_Websites_avatarnft_node_modules_next_dist_compiled_regenerator_runtime_runtime_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./node_modules/next/dist/compiled/regenerator-runtime/runtime.js */ \"./node_modules/next/dist/compiled/regenerator-runtime/runtime.js\");\n/* harmony import */ var _home_redlentils_Seafile_Websites_avatarnft_node_modules_next_dist_compiled_regenerator_runtime_runtime_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_home_redlentils_Seafile_Websites_avatarnft_node_modules_next_dist_compiled_regenerator_runtime_runtime_js__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"./node_modules/react/jsx-dev-runtime.js\");\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react */ \"./node_modules/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var semantic_ui_react__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! semantic-ui-react */ \"./node_modules/semantic-ui-react/dist/es/index.js\");\n/* harmony import */ var _components_layout__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../components/layout */ \"./components/layout.js\");\n/* harmony import */ var _metamask_detect_provider__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @metamask/detect-provider */ \"./node_modules/@metamask/detect-provider/dist/index.js\");\n/* harmony import */ var _metamask_detect_provider__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_metamask_detect_provider__WEBPACK_IMPORTED_MODULE_4__);\n/* harmony import */ var _ipfsConnection__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./ipfsConnection */ \"./pages/ipfsConnection.js\");\n/* harmony import */ var react_qr_code__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! react-qr-code */ \"./node_modules/react-qr-code/lib/index.js\");\n/* module decorator */ module = __webpack_require__.hmd(module);\n\n\n\n\n\n\n\n\nfunction _assertThisInitialized(self) {\n    if (self === void 0) {\n        throw new ReferenceError(\"this hasn't been initialised - super() hasn't been called\");\n    }\n    return self;\n}\nfunction asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {\n    try {\n        var info = gen[key](arg);\n        var value = info.value;\n    } catch (error) {\n        reject(error);\n        return;\n    }\n    if (info.done) {\n        resolve(value);\n    } else {\n        Promise.resolve(value).then(_next, _throw);\n    }\n}\nfunction _asyncToGenerator(fn) {\n    return function() {\n        var self = this, args = arguments;\n        return new Promise(function(resolve, reject) {\n            var gen = fn.apply(self, args);\n            function _next(value) {\n                asyncGeneratorStep(gen, resolve, reject, _next, _throw, \"next\", value);\n            }\n            function _throw(err) {\n                asyncGeneratorStep(gen, resolve, reject, _next, _throw, \"throw\", err);\n            }\n            _next(undefined);\n        });\n    };\n}\nfunction _classCallCheck(instance, Constructor) {\n    if (!(instance instanceof Constructor)) {\n        throw new TypeError(\"Cannot call a class as a function\");\n    }\n}\nfunction _defineProperties(target, props) {\n    for(var i = 0; i < props.length; i++){\n        var descriptor = props[i];\n        descriptor.enumerable = descriptor.enumerable || false;\n        descriptor.configurable = true;\n        if (\"value\" in descriptor) descriptor.writable = true;\n        Object.defineProperty(target, descriptor.key, descriptor);\n    }\n}\nfunction _createClass(Constructor, protoProps, staticProps) {\n    if (protoProps) _defineProperties(Constructor.prototype, protoProps);\n    if (staticProps) _defineProperties(Constructor, staticProps);\n    return Constructor;\n}\nfunction _getPrototypeOf(o) {\n    _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {\n        return o.__proto__ || Object.getPrototypeOf(o);\n    };\n    return _getPrototypeOf(o);\n}\nfunction _inherits(subClass, superClass) {\n    if (typeof superClass !== \"function\" && superClass !== null) {\n        throw new TypeError(\"Super expression must either be null or a function\");\n    }\n    subClass.prototype = Object.create(superClass && superClass.prototype, {\n        constructor: {\n            value: subClass,\n            writable: true,\n            configurable: true\n        }\n    });\n    if (superClass) _setPrototypeOf(subClass, superClass);\n}\nfunction _possibleConstructorReturn(self, call) {\n    if (call && (_typeof(call) === \"object\" || typeof call === \"function\")) {\n        return call;\n    }\n    return _assertThisInitialized(self);\n}\nfunction _setPrototypeOf(o, p) {\n    _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {\n        o.__proto__ = p;\n        return o;\n    };\n    return _setPrototypeOf(o, p);\n}\nvar _typeof = function(obj) {\n    \"@swc/helpers - typeof\";\n    return obj && typeof Symbol !== \"undefined\" && obj.constructor === Symbol ? \"symbol\" : typeof obj;\n};\nfunction _isNativeReflectConstruct() {\n    if (typeof Reflect === \"undefined\" || !Reflect.construct) return false;\n    if (Reflect.construct.sham) return false;\n    if (typeof Proxy === \"function\") return true;\n    try {\n        Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {}));\n        return true;\n    } catch (e) {\n        return false;\n    }\n}\nfunction _createSuper(Derived) {\n    var hasNativeReflectConstruct = _isNativeReflectConstruct();\n    return function _createSuperInternal() {\n        var Super = _getPrototypeOf(Derived), result;\n        if (hasNativeReflectConstruct) {\n            var NewTarget = _getPrototypeOf(this).constructor;\n            result = Reflect.construct(Super, arguments, NewTarget);\n        } else {\n            result = Super.apply(this, arguments);\n        }\n        return _possibleConstructorReturn(this, result);\n    };\n}\nvar Main = /*#__PURE__*/ function(Component1) {\n    \"use strict\";\n    _inherits(Main, Component1);\n    var _super = _createSuper(Main);\n    function Main(props) {\n        _classCallCheck(this, Main);\n        var _this;\n        _this = _super.call(this, props);\n        _this.state = {\n            isUserConnected: null,\n            currentAccount: null\n        };\n        return _this;\n    }\n    _createClass(Main, [\n        {\n            key: \"componentDidMount\",\n            value: function componentDidMount() {\n                var _this = this;\n                return _asyncToGenerator(_home_redlentils_Seafile_Websites_avatarnft_node_modules_next_dist_compiled_regenerator_runtime_runtime_js__WEBPACK_IMPORTED_MODULE_0___default().mark(function _callee() {\n                    var provider;\n                    return _home_redlentils_Seafile_Websites_avatarnft_node_modules_next_dist_compiled_regenerator_runtime_runtime_js__WEBPACK_IMPORTED_MODULE_0___default().wrap(function _callee$(_ctx) {\n                        while(1)switch(_ctx.prev = _ctx.next){\n                            case 0:\n                                _ctx.next = 2;\n                                return _metamask_detect_provider__WEBPACK_IMPORTED_MODULE_4___default()();\n                            case 2:\n                                provider = _ctx.sent;\n                                (function() {\n                                    if (provider.selectedAddress === null) {\n                                        _this.setState({\n                                            currentAccount: '',\n                                            isUserConnected: 'No'\n                                        });\n                                    } else {\n                                        _this.setState({\n                                            currentAccount: provider.selectedAddress,\n                                            isUserConnected: 'Yes'\n                                        });\n                                    }\n                                })();\n                                console.log(\"END OF COMPONENT DID MOUNT\");\n                            case 5:\n                            case \"end\":\n                                return _ctx.stop();\n                        }\n                    }, _callee);\n                }))();\n            }\n        },\n        {\n            key: \"render\",\n            value: function render() {\n                return(/*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxDEV)(_components_layout__WEBPACK_IMPORTED_MODULE_3__[\"default\"], {\n                    children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxDEV)(\"div\", {\n                        children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxDEV)(semantic_ui_react__WEBPACK_IMPORTED_MODULE_7__.List, {\n                            divided: true,\n                            relaxed: true,\n                            children: [\n                                /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxDEV)(semantic_ui_react__WEBPACK_IMPORTED_MODULE_7__.List.Item, {\n                                    children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxDEV)(\"h3\", {\n                                        children: \"Let's get cracking. Showing all the data we are pulling below.\"\n                                    }, void 0, false, {\n                                        fileName: \"/home/redlentils/Seafile/Websites/avatarnft/pages/index.js\",\n                                        lineNumber: 47,\n                                        columnNumber: 15\n                                    }, this)\n                                }, void 0, false, {\n                                    fileName: \"/home/redlentils/Seafile/Websites/avatarnft/pages/index.js\",\n                                    lineNumber: 46,\n                                    columnNumber: 13\n                                }, this),\n                                /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxDEV)(semantic_ui_react__WEBPACK_IMPORTED_MODULE_7__.List.Item, {\n                                    children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxDEV)(\"h4\", {\n                                        children: [\n                                            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxDEV)(\"p\", {\n                                                children: [\n                                                    \"Is User Connected? \",\n                                                    this.state.isUserConnected\n                                                ]\n                                            }, void 0, true, {\n                                                fileName: \"/home/redlentils/Seafile/Websites/avatarnft/pages/index.js\",\n                                                lineNumber: 51,\n                                                columnNumber: 17\n                                            }, this),\n                                            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxDEV)(\"p\", {\n                                                children: [\n                                                    \"User Account Number: \",\n                                                    this.state.currentAccount\n                                                ]\n                                            }, void 0, true, {\n                                                fileName: \"/home/redlentils/Seafile/Websites/avatarnft/pages/index.js\",\n                                                lineNumber: 52,\n                                                columnNumber: 17\n                                            }, this)\n                                        ]\n                                    }, void 0, true, {\n                                        fileName: \"/home/redlentils/Seafile/Websites/avatarnft/pages/index.js\",\n                                        lineNumber: 50,\n                                        columnNumber: 15\n                                    }, this)\n                                }, void 0, false, {\n                                    fileName: \"/home/redlentils/Seafile/Websites/avatarnft/pages/index.js\",\n                                    lineNumber: 49,\n                                    columnNumber: 13\n                                }, this),\n                                /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxDEV)(semantic_ui_react__WEBPACK_IMPORTED_MODULE_7__.Divider, {\n                                    horizontal: true,\n                                    children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxDEV)(semantic_ui_react__WEBPACK_IMPORTED_MODULE_7__.Header, {\n                                        as: \"h4\",\n                                        children: \"IPFS Functionality\"\n                                    }, void 0, false, {\n                                        fileName: \"/home/redlentils/Seafile/Websites/avatarnft/pages/index.js\",\n                                        lineNumber: 56,\n                                        columnNumber: 15\n                                    }, this)\n                                }, void 0, false, {\n                                    fileName: \"/home/redlentils/Seafile/Websites/avatarnft/pages/index.js\",\n                                    lineNumber: 55,\n                                    columnNumber: 13\n                                }, this),\n                                /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxDEV)(_ipfsConnection__WEBPACK_IMPORTED_MODULE_5__[\"default\"], {}, void 0, false, {\n                                    fileName: \"/home/redlentils/Seafile/Websites/avatarnft/pages/index.js\",\n                                    lineNumber: 60,\n                                    columnNumber: 13\n                                }, this),\n                                /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxDEV)(semantic_ui_react__WEBPACK_IMPORTED_MODULE_7__.Divider, {\n                                    horizontal: true,\n                                    children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxDEV)(semantic_ui_react__WEBPACK_IMPORTED_MODULE_7__.Header, {\n                                        as: \"h4\",\n                                        children: \"QR Code Generator\"\n                                    }, void 0, false, {\n                                        fileName: \"/home/redlentils/Seafile/Websites/avatarnft/pages/index.js\",\n                                        lineNumber: 62,\n                                        columnNumber: 15\n                                    }, this)\n                                }, void 0, false, {\n                                    fileName: \"/home/redlentils/Seafile/Websites/avatarnft/pages/index.js\",\n                                    lineNumber: 61,\n                                    columnNumber: 13\n                                }, this),\n                                /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxDEV)(semantic_ui_react__WEBPACK_IMPORTED_MODULE_7__.Container, {\n                                    textAlign: \"center\",\n                                    children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxDEV)(react_qr_code__WEBPACK_IMPORTED_MODULE_6__[\"default\"], {\n                                        value: \"https://www.youtube.com/watch?v=DLzxrzFCyOs\"\n                                    }, void 0, false, {\n                                        fileName: \"/home/redlentils/Seafile/Websites/avatarnft/pages/index.js\",\n                                        lineNumber: 67,\n                                        columnNumber: 15\n                                    }, this)\n                                }, void 0, false, {\n                                    fileName: \"/home/redlentils/Seafile/Websites/avatarnft/pages/index.js\",\n                                    lineNumber: 66,\n                                    columnNumber: 13\n                                }, this)\n                            ]\n                        }, void 0, true, {\n                            fileName: \"/home/redlentils/Seafile/Websites/avatarnft/pages/index.js\",\n                            lineNumber: 45,\n                            columnNumber: 11\n                        }, this)\n                    }, void 0, false, {\n                        fileName: \"/home/redlentils/Seafile/Websites/avatarnft/pages/index.js\",\n                        lineNumber: 44,\n                        columnNumber: 9\n                    }, this)\n                }, void 0, false, {\n                    fileName: \"/home/redlentils/Seafile/Websites/avatarnft/pages/index.js\",\n                    lineNumber: 43,\n                    columnNumber: 7\n                }, this));\n            }\n        }\n    ]);\n    return Main;\n}(react__WEBPACK_IMPORTED_MODULE_2__.Component);\n/* harmony default export */ __webpack_exports__[\"default\"] = (Main);\n\n\n;\n    // Wrapped in an IIFE to avoid polluting the global scope\n    ;\n    (function () {\n        var _a, _b;\n        // Legacy CSS implementations will `eval` browser code in a Node.js context\n        // to extract CSS. For backwards compatibility, we need to check we're in a\n        // browser context before continuing.\n        if (typeof self !== 'undefined' &&\n            // AMP / No-JS mode does not inject these helpers:\n            '$RefreshHelpers$' in self) {\n            var currentExports = module.__proto__.exports;\n            var prevExports = (_b = (_a = module.hot.data) === null || _a === void 0 ? void 0 : _a.prevExports) !== null && _b !== void 0 ? _b : null;\n            // This cannot happen in MainTemplate because the exports mismatch between\n            // templating and execution.\n            self.$RefreshHelpers$.registerExportsForReactRefresh(currentExports, module.id);\n            // A module can be accepted automatically based on its exports, e.g. when\n            // it is a Refresh Boundary.\n            if (self.$RefreshHelpers$.isReactRefreshBoundary(currentExports)) {\n                // Save the previous exports on update so we can compare the boundary\n                // signatures.\n                module.hot.dispose(function (data) {\n                    data.prevExports = currentExports;\n                });\n                // Unconditionally accept an update to this module, we'll check if it's\n                // still a Refresh Boundary later.\n                module.hot.accept();\n                // This field is set when the previous version of this module was a\n                // Refresh Boundary, letting us know we need to check for invalidation or\n                // enqueue an update.\n                if (prevExports !== null) {\n                    // A boundary can become ineligible if its exports are incompatible\n                    // with the previous exports.\n                    //\n                    // For example, if you add/remove/change exports, we'll want to\n                    // re-execute the importing modules, and force those components to\n                    // re-render. Similarly, if you convert a class component to a\n                    // function, we want to invalidate the boundary.\n                    if (self.$RefreshHelpers$.shouldInvalidateReactRefreshBoundary(prevExports, currentExports)) {\n                        module.hot.invalidate();\n                    }\n                    else {\n                        self.$RefreshHelpers$.scheduleUpdate();\n                    }\n                }\n            }\n            else {\n                // Since we just executed the code for the module, it's possible that the\n                // new exports made it ineligible for being a boundary.\n                // We only care about the case when we were _previously_ a boundary,\n                // because we already accepted this update (accidental side effect).\n                var isNoLongerABoundary = prevExports !== null;\n                if (isNoLongerABoundary) {\n                    module.hot.invalidate();\n                }\n            }\n        }\n    })();\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9wYWdlcy9pbmRleC5qcy5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7O0FBQXdDO0FBQ29DO0FBQ25DO0FBQ3FCO0FBQ2pCO0FBQ1g7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7SUFFNUJXLElBQUksaUJBQVYsUUFBUTs7OzthQUFGQSxJQUFJLENBQ0lDLEtBQUs7OztrQ0FDVEEsS0FBSztjQUNOQyxLQUFLLEdBQUcsQ0FBQztZQUNaQyxlQUFlLEVBQUUsSUFBSTtZQUNyQkMsY0FBYyxFQUFFLElBQUk7UUFDdEIsQ0FBQzs7Ozs7WUFLR0MsR0FBaUIsRUFBakJBLENBQWlCO21CQUF2QixRQUFRLENBQUZBLGlCQUFpQjs7Z01BQXZCLFFBQVEsV0FBa0IsQ0FBQzt3QkFDbkJDLFFBQVE7Ozs7O3VDQUFTVCxnRUFBc0I7O2dDQUF2Q1MsUUFBUTtpQ0FFYixRQUNMLEdBRFcsQ0FBQztvQ0FDTixFQUFFLEVBQUVBLFFBQVEsQ0FBQ0MsZUFBZSxLQUFLLElBQUksRUFBRSxDQUFDOzhDQUNqQ0MsUUFBUSxDQUFDLENBQUM7NENBQ2JKLGNBQWMsRUFBRSxDQUFFOzRDQUNsQkQsZUFBZSxFQUFFLENBQUk7d0NBQ3ZCLENBQUM7b0NBQ0gsQ0FBQyxNQUFNLENBQUM7OENBQ0RLLFFBQVEsQ0FBQyxDQUFDOzRDQUNiSixjQUFjLEVBQUVFLFFBQVEsQ0FBQ0MsZUFBZTs0Q0FDeENKLGVBQWUsRUFBRSxDQUFLO3dDQUN4QixDQUFDO29DQUNILENBQUM7Z0NBQ0gsQ0FBQztnQ0FFRE0sT0FBTyxDQUFDQyxHQUFHLENBQUMsQ0FBNEI7Ozs7OztnQkFFMUMsQ0FBQzs7OztZQUVEQyxHQUFNLEVBQU5BLENBQU07bUJBQU5BLFFBQVEsQ0FBUkEsTUFBTSxHQUFHLENBQUM7Z0JBRVIsTUFBTSw2RUFDSGYsMERBQU07MEdBQ0pnQixDQUFHOzhHQUNEcEIsbURBQUk7NEJBQUNxQixPQUFPOzRCQUFDQyxPQUFPOzs0R0FDbEJ0Qix3REFBUzswSEFDUHdCLENBQUU7a0RBQUMsQ0FBOEQ7Ozs7Ozs7Ozs7OzRHQUVuRXhCLHdEQUFTOzBIQUNQeUIsQ0FBRTs7d0hBQ0FDLENBQUM7O29EQUFDLENBQW1CO29EQUFDLElBQUksQ0FBQ2hCLEtBQUssQ0FBQ0MsZUFBZTs7Ozs7Ozt3SEFDaERlLENBQUM7O29EQUFDLENBQXFCO29EQUFDLElBQUksQ0FBQ2hCLEtBQUssQ0FBQ0UsY0FBYzs7Ozs7Ozs7Ozs7Ozs7Ozs7OzRHQUdyRFgsc0RBQU87b0NBQUMwQixVQUFVOzBIQUNoQnpCLHFEQUFNO3dDQUFDMEIsRUFBRSxFQUFDLENBQUk7a0RBQUMsQ0FFaEI7Ozs7Ozs7Ozs7OzRHQUVEdEIsdURBQWM7Ozs7OzRHQUNkTCxzREFBTztvQ0FBQzBCLFVBQVU7MEhBQ2hCekIscURBQU07d0NBQUMwQixFQUFFLEVBQUMsQ0FBSTtrREFBQyxDQUVoQjs7Ozs7Ozs7Ozs7NEdBRUR6Qix3REFBUztvQ0FBQzBCLFNBQVMsRUFBQyxDQUFROzBIQUMxQnRCLHFEQUFNO3dDQUFDdUIsS0FBSyxFQUFDLENBQTZDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7WUFNdkUsQ0FBQzs7OztFQWpFZ0JoQyw0Q0FBUztBQW9FNUIsK0RBQWVVLElBQUkiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9fTl9FLy4vcGFnZXMvaW5kZXguanM/YmVlNyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QsIHsgQ29tcG9uZW50IH0gZnJvbSAncmVhY3QnO1xuaW1wb3J0IHsgQnV0dG9uLCBMaXN0LCBEaXZpZGVyLCBIZWFkZXIsIENvbnRhaW5lciB9IGZyb20gJ3NlbWFudGljLXVpLXJlYWN0JztcbmltcG9ydCBMYXlvdXQgZnJvbSAnLi4vY29tcG9uZW50cy9sYXlvdXQnO1xuaW1wb3J0IGRldGVjdEV0aGVyZXVtUHJvdmlkZXIgZnJvbSAnQG1ldGFtYXNrL2RldGVjdC1wcm92aWRlcic7XG5pbXBvcnQgQ29ubmVjdGlvbklQRlMgZnJvbSAnLi9pcGZzQ29ubmVjdGlvbic7XG5pbXBvcnQgUVJDb2RlIGZyb20gJ3JlYWN0LXFyLWNvZGUnO1xuXG5jbGFzcyBNYWluIGV4dGVuZHMgQ29tcG9uZW50IHtcbiAgY29uc3RydWN0b3IocHJvcHMpIHtcbiAgICBzdXBlcihwcm9wcyk7XG4gICAgdGhpcy5zdGF0ZSA9IHtcbiAgICAgIGlzVXNlckNvbm5lY3RlZDogbnVsbCxcbiAgICAgIGN1cnJlbnRBY2NvdW50OiBudWxsXG4gICAgfTtcblxuICAgIC8vdGhpcy5jb25uZWN0VXNlciA9IHRoaXMuY29ubmVjdFVzZXIuYmluZCh0aGlzKTtcbiAgfVxuXG4gIGFzeW5jIGNvbXBvbmVudERpZE1vdW50KCkge1xuICAgIGNvbnN0IHByb3ZpZGVyID0gYXdhaXQgZGV0ZWN0RXRoZXJldW1Qcm92aWRlcigpO1xuXG4gICAgKCgpID0+IHtcbiAgICAgIGlmIChwcm92aWRlci5zZWxlY3RlZEFkZHJlc3MgPT09IG51bGwpIHtcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICAgICAgY3VycmVudEFjY291bnQ6ICcnLFxuICAgICAgICAgIGlzVXNlckNvbm5lY3RlZDogJ05vJ1xuICAgICAgICB9KTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgICAgIGN1cnJlbnRBY2NvdW50OiBwcm92aWRlci5zZWxlY3RlZEFkZHJlc3MsXG4gICAgICAgICAgaXNVc2VyQ29ubmVjdGVkOiAnWWVzJ1xuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9KSgpO1xuXG4gICAgY29uc29sZS5sb2coXCJFTkQgT0YgQ09NUE9ORU5UIERJRCBNT1VOVFwiKTtcblxuICB9XG5cbiAgcmVuZGVyKCkge1xuXG4gICAgcmV0dXJuIChcbiAgICAgIDxMYXlvdXQ+XG4gICAgICAgIDxkaXY+XG4gICAgICAgICAgPExpc3QgZGl2aWRlZCByZWxheGVkPlxuICAgICAgICAgICAgPExpc3QuSXRlbT5cbiAgICAgICAgICAgICAgPGgzPkxldCdzIGdldCBjcmFja2luZy4gU2hvd2luZyBhbGwgdGhlIGRhdGEgd2UgYXJlIHB1bGxpbmcgYmVsb3cuPC9oMz5cbiAgICAgICAgICAgIDwvTGlzdC5JdGVtPlxuICAgICAgICAgICAgPExpc3QuSXRlbT5cbiAgICAgICAgICAgICAgPGg0PlxuICAgICAgICAgICAgICAgIDxwPklzIFVzZXIgQ29ubmVjdGVkPyB7dGhpcy5zdGF0ZS5pc1VzZXJDb25uZWN0ZWR9PC9wPlxuICAgICAgICAgICAgICAgIDxwPlVzZXIgQWNjb3VudCBOdW1iZXI6IHt0aGlzLnN0YXRlLmN1cnJlbnRBY2NvdW50fTwvcD5cbiAgICAgICAgICAgICAgPC9oND5cbiAgICAgICAgICAgIDwvTGlzdC5JdGVtPlxuICAgICAgICAgICAgPERpdmlkZXIgaG9yaXpvbnRhbD5cbiAgICAgICAgICAgICAgPEhlYWRlciBhcz0naDQnPlxuICAgICAgICAgICAgICAgIElQRlMgRnVuY3Rpb25hbGl0eVxuICAgICAgICAgICAgICA8L0hlYWRlcj5cbiAgICAgICAgICAgIDwvRGl2aWRlcj5cbiAgICAgICAgICAgIDxDb25uZWN0aW9uSVBGUyAvPlxuICAgICAgICAgICAgPERpdmlkZXIgaG9yaXpvbnRhbD5cbiAgICAgICAgICAgICAgPEhlYWRlciBhcz0naDQnPlxuICAgICAgICAgICAgICAgIFFSIENvZGUgR2VuZXJhdG9yXG4gICAgICAgICAgICAgIDwvSGVhZGVyPlxuICAgICAgICAgICAgPC9EaXZpZGVyPlxuICAgICAgICAgICAgPENvbnRhaW5lciB0ZXh0QWxpZ249J2NlbnRlcic+XG4gICAgICAgICAgICAgIDxRUkNvZGUgdmFsdWU9J2h0dHBzOi8vd3d3LnlvdXR1YmUuY29tL3dhdGNoP3Y9REx6eHJ6RkN5T3MnLz5cbiAgICAgICAgICAgIDwvQ29udGFpbmVyPlxuICAgICAgICAgIDwvTGlzdD5cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L0xheW91dD5cbiAgICApO1xuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IE1haW5cbiJdLCJuYW1lcyI6WyJSZWFjdCIsIkNvbXBvbmVudCIsIkJ1dHRvbiIsIkxpc3QiLCJEaXZpZGVyIiwiSGVhZGVyIiwiQ29udGFpbmVyIiwiTGF5b3V0IiwiZGV0ZWN0RXRoZXJldW1Qcm92aWRlciIsIkNvbm5lY3Rpb25JUEZTIiwiUVJDb2RlIiwiTWFpbiIsInByb3BzIiwic3RhdGUiLCJpc1VzZXJDb25uZWN0ZWQiLCJjdXJyZW50QWNjb3VudCIsImNvbXBvbmVudERpZE1vdW50IiwicHJvdmlkZXIiLCJzZWxlY3RlZEFkZHJlc3MiLCJzZXRTdGF0ZSIsImNvbnNvbGUiLCJsb2ciLCJyZW5kZXIiLCJkaXYiLCJkaXZpZGVkIiwicmVsYXhlZCIsIkl0ZW0iLCJoMyIsImg0IiwicCIsImhvcml6b250YWwiLCJhcyIsInRleHRBbGlnbiIsInZhbHVlIl0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///./pages/index.js\n");

/***/ })

});
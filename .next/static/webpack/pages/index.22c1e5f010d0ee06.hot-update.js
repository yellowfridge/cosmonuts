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

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _home_redlentils_Seafile_Websites_avatarnft_node_modules_next_dist_compiled_regenerator_runtime_runtime_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./node_modules/next/dist/compiled/regenerator-runtime/runtime.js */ \"./node_modules/next/dist/compiled/regenerator-runtime/runtime.js\");\n/* harmony import */ var _home_redlentils_Seafile_Websites_avatarnft_node_modules_next_dist_compiled_regenerator_runtime_runtime_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_home_redlentils_Seafile_Websites_avatarnft_node_modules_next_dist_compiled_regenerator_runtime_runtime_js__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"./node_modules/react/jsx-dev-runtime.js\");\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react */ \"./node_modules/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var semantic_ui_react__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! semantic-ui-react */ \"./node_modules/semantic-ui-react/dist/es/index.js\");\n/* harmony import */ var _components_layout__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../components/layout */ \"./components/layout.js\");\n/* harmony import */ var _ethereum_provider__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../ethereum/provider */ \"./ethereum/provider.js\");\n/* harmony import */ var _metamask_detect_provider__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @metamask/detect-provider */ \"./node_modules/@metamask/detect-provider/dist/index.js\");\n/* harmony import */ var _metamask_detect_provider__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_metamask_detect_provider__WEBPACK_IMPORTED_MODULE_5__);\n/* harmony import */ var _ipfsConnection__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./ipfsConnection */ \"./pages/ipfsConnection.js\");\n/* module decorator */ module = __webpack_require__.hmd(module);\n\n\n\n\n\n\n\n\nfunction _assertThisInitialized(self) {\n    if (self === void 0) {\n        throw new ReferenceError(\"this hasn't been initialised - super() hasn't been called\");\n    }\n    return self;\n}\nfunction asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {\n    try {\n        var info = gen[key](arg);\n        var value = info.value;\n    } catch (error) {\n        reject(error);\n        return;\n    }\n    if (info.done) {\n        resolve(value);\n    } else {\n        Promise.resolve(value).then(_next, _throw);\n    }\n}\nfunction _asyncToGenerator(fn) {\n    return function() {\n        var self = this, args = arguments;\n        return new Promise(function(resolve, reject) {\n            var gen = fn.apply(self, args);\n            function _next(value) {\n                asyncGeneratorStep(gen, resolve, reject, _next, _throw, \"next\", value);\n            }\n            function _throw(err) {\n                asyncGeneratorStep(gen, resolve, reject, _next, _throw, \"throw\", err);\n            }\n            _next(undefined);\n        });\n    };\n}\nfunction _classCallCheck(instance, Constructor) {\n    if (!(instance instanceof Constructor)) {\n        throw new TypeError(\"Cannot call a class as a function\");\n    }\n}\nfunction _defineProperties(target, props) {\n    for(var i = 0; i < props.length; i++){\n        var descriptor = props[i];\n        descriptor.enumerable = descriptor.enumerable || false;\n        descriptor.configurable = true;\n        if (\"value\" in descriptor) descriptor.writable = true;\n        Object.defineProperty(target, descriptor.key, descriptor);\n    }\n}\nfunction _createClass(Constructor, protoProps, staticProps) {\n    if (protoProps) _defineProperties(Constructor.prototype, protoProps);\n    if (staticProps) _defineProperties(Constructor, staticProps);\n    return Constructor;\n}\nfunction _getPrototypeOf(o) {\n    _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {\n        return o.__proto__ || Object.getPrototypeOf(o);\n    };\n    return _getPrototypeOf(o);\n}\nfunction _inherits(subClass, superClass) {\n    if (typeof superClass !== \"function\" && superClass !== null) {\n        throw new TypeError(\"Super expression must either be null or a function\");\n    }\n    subClass.prototype = Object.create(superClass && superClass.prototype, {\n        constructor: {\n            value: subClass,\n            writable: true,\n            configurable: true\n        }\n    });\n    if (superClass) _setPrototypeOf(subClass, superClass);\n}\nfunction _possibleConstructorReturn(self, call) {\n    if (call && (_typeof(call) === \"object\" || typeof call === \"function\")) {\n        return call;\n    }\n    return _assertThisInitialized(self);\n}\nfunction _setPrototypeOf(o, p) {\n    _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {\n        o.__proto__ = p;\n        return o;\n    };\n    return _setPrototypeOf(o, p);\n}\nvar _typeof = function(obj) {\n    \"@swc/helpers - typeof\";\n    return obj && typeof Symbol !== \"undefined\" && obj.constructor === Symbol ? \"symbol\" : typeof obj;\n};\nfunction _isNativeReflectConstruct() {\n    if (typeof Reflect === \"undefined\" || !Reflect.construct) return false;\n    if (Reflect.construct.sham) return false;\n    if (typeof Proxy === \"function\") return true;\n    try {\n        Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {}));\n        return true;\n    } catch (e) {\n        return false;\n    }\n}\nfunction _createSuper(Derived) {\n    var hasNativeReflectConstruct = _isNativeReflectConstruct();\n    return function _createSuperInternal() {\n        var Super = _getPrototypeOf(Derived), result;\n        if (hasNativeReflectConstruct) {\n            var NewTarget = _getPrototypeOf(this).constructor;\n            result = Reflect.construct(Super, arguments, NewTarget);\n        } else {\n            result = Super.apply(this, arguments);\n        }\n        return _possibleConstructorReturn(this, result);\n    };\n}\nvar Main = /*#__PURE__*/ function(Component1) {\n    \"use strict\";\n    _inherits(Main, Component1);\n    var _super = _createSuper(Main);\n    function Main(props) {\n        _classCallCheck(this, Main);\n        var _this;\n        _this = _super.call(this, props);\n        _this.state = {\n            isUserConnected: null,\n            currentAccount: null\n        };\n        return _this;\n    }\n    _createClass(Main, [\n        {\n            key: \"componentDidMount\",\n            value: function componentDidMount() {\n                var _this = this;\n                return _asyncToGenerator(_home_redlentils_Seafile_Websites_avatarnft_node_modules_next_dist_compiled_regenerator_runtime_runtime_js__WEBPACK_IMPORTED_MODULE_0___default().mark(function _callee() {\n                    var provider;\n                    return _home_redlentils_Seafile_Websites_avatarnft_node_modules_next_dist_compiled_regenerator_runtime_runtime_js__WEBPACK_IMPORTED_MODULE_0___default().wrap(function _callee$(_ctx) {\n                        while(1)switch(_ctx.prev = _ctx.next){\n                            case 0:\n                                _ctx.next = 2;\n                                return _metamask_detect_provider__WEBPACK_IMPORTED_MODULE_5___default()();\n                            case 2:\n                                provider = _ctx.sent;\n                                //this.setState({ provider: provider });\n                                (function() {\n                                    if (provider.selectedAddress === null) {\n                                        _this.setState({\n                                            currentAccount: '',\n                                            isUserConnected: 'No'\n                                        });\n                                    } else {\n                                        _this.setState({\n                                            currentAccount: provider.selectedAddress,\n                                            isUserConnected: 'Yes'\n                                        });\n                                    }\n                                })();\n                                /*\n    (() => {\n      if (provider.isMetaMask) {\n        this.setState({ isMetaMaskInstalled: 'Yes' });\n      } else {\n        this.setState({ isMetaMaskInstalled: 'No' });\n      }\n    })();\n    */ /*\n    (async () => {\n      try {\n        await provider.request({ method: 'eth_requestAccounts' });\n      } catch (err) {\n        console.log(err);\n      }\n    })()\n    */ console.log(\"Provider\", provider);\n                                console.log(\"END OF COMPONENT DID MOUNT\");\n                            case 6:\n                            case \"end\":\n                                return _ctx.stop();\n                        }\n                    }, _callee);\n                }))();\n            }\n        },\n        {\n            /*\n  componentDidUpdate(prevProps, prevState) {\n    const checkAccountChanges = () => {\n      if (prevState.currentAccount !== this.state.currentAccount) {\n        this.setState({\n          currentAccount: this.state.currentAccount\n        })\n      }\n\n      if (prevState.isUserConnected !== this.state.isUserConnected) {\n        this.setState({\n          isUserConnected: this.state.isUserConnected\n        })\n      }\n    }\n\n  }\n  /*\n\n  /*\n  connectUser() {\n    //web3 = checkConnection();\n    //const userAccount = enableUser();\n    //web3, userAccount = activate();\n    //this.setState({currentAccount: userAccount});\n    //let provider = getProvider();\n    //this.setState({provider: provider});\n    //if (this.state.provider !== window.ethereum) {\n    //  console.error(\"Provider is not window.ethereum\");\n    //} else {\n    //  console.log(\"Successfully have provider.\");\n    //}\n    console.log(this.state.provider);\n  }\n  */ key: \"render\",\n            value: function render() {\n                //console.log(\"PROVIDER RENDER\", this.state.provider);\n                return(/*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxDEV)(_components_layout__WEBPACK_IMPORTED_MODULE_3__[\"default\"], {\n                    children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxDEV)(\"div\", {\n                        children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxDEV)(semantic_ui_react__WEBPACK_IMPORTED_MODULE_7__.List, {\n                            divided: true,\n                            relaxed: true,\n                            children: [\n                                /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxDEV)(semantic_ui_react__WEBPACK_IMPORTED_MODULE_7__.List.Item, {\n                                    children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxDEV)(\"h3\", {\n                                        children: \"Let's get cracking. Showing all the data we are pulling below.\"\n                                    }, void 0, false, {\n                                        fileName: \"/home/redlentils/Seafile/Websites/avatarnft/pages/index.js\",\n                                        lineNumber: 106,\n                                        columnNumber: 15\n                                    }, this)\n                                }, void 0, false, {\n                                    fileName: \"/home/redlentils/Seafile/Websites/avatarnft/pages/index.js\",\n                                    lineNumber: 105,\n                                    columnNumber: 13\n                                }, this),\n                                /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxDEV)(semantic_ui_react__WEBPACK_IMPORTED_MODULE_7__.List.Item, {\n                                    children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxDEV)(\"h4\", {\n                                        children: [\n                                            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxDEV)(\"p\", {\n                                                children: [\n                                                    \"Is User Connected? \",\n                                                    this.state.isUserConnected\n                                                ]\n                                            }, void 0, true, {\n                                                fileName: \"/home/redlentils/Seafile/Websites/avatarnft/pages/index.js\",\n                                                lineNumber: 110,\n                                                columnNumber: 17\n                                            }, this),\n                                            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxDEV)(\"p\", {\n                                                children: [\n                                                    \"User Account Number: \",\n                                                    this.state.currentAccount\n                                                ]\n                                            }, void 0, true, {\n                                                fileName: \"/home/redlentils/Seafile/Websites/avatarnft/pages/index.js\",\n                                                lineNumber: 111,\n                                                columnNumber: 17\n                                            }, this)\n                                        ]\n                                    }, void 0, true, {\n                                        fileName: \"/home/redlentils/Seafile/Websites/avatarnft/pages/index.js\",\n                                        lineNumber: 109,\n                                        columnNumber: 15\n                                    }, this)\n                                }, void 0, false, {\n                                    fileName: \"/home/redlentils/Seafile/Websites/avatarnft/pages/index.js\",\n                                    lineNumber: 108,\n                                    columnNumber: 13\n                                }, this),\n                                /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxDEV)(semantic_ui_react__WEBPACK_IMPORTED_MODULE_7__.List.Item, {\n                                    children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxDEV)(_ipfsConnection__WEBPACK_IMPORTED_MODULE_6__[\"default\"], {}, void 0, false, {\n                                        fileName: \"/home/redlentils/Seafile/Websites/avatarnft/pages/index.js\",\n                                        lineNumber: 115,\n                                        columnNumber: 15\n                                    }, this)\n                                }, void 0, false, {\n                                    fileName: \"/home/redlentils/Seafile/Websites/avatarnft/pages/index.js\",\n                                    lineNumber: 114,\n                                    columnNumber: 13\n                                }, this),\n                                /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxDEV)(semantic_ui_react__WEBPACK_IMPORTED_MODULE_7__.List.Item, {\n                                    children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxDEV)(\"h2\", {\n                                        children: \"Boom shaka shaka\"\n                                    }, void 0, false, {\n                                        fileName: \"/home/redlentils/Seafile/Websites/avatarnft/pages/index.js\",\n                                        lineNumber: 118,\n                                        columnNumber: 15\n                                    }, this)\n                                }, void 0, false, {\n                                    fileName: \"/home/redlentils/Seafile/Websites/avatarnft/pages/index.js\",\n                                    lineNumber: 117,\n                                    columnNumber: 13\n                                }, this)\n                            ]\n                        }, void 0, true, {\n                            fileName: \"/home/redlentils/Seafile/Websites/avatarnft/pages/index.js\",\n                            lineNumber: 104,\n                            columnNumber: 11\n                        }, this)\n                    }, void 0, false, {\n                        fileName: \"/home/redlentils/Seafile/Websites/avatarnft/pages/index.js\",\n                        lineNumber: 103,\n                        columnNumber: 9\n                    }, this)\n                }, void 0, false, {\n                    fileName: \"/home/redlentils/Seafile/Websites/avatarnft/pages/index.js\",\n                    lineNumber: 102,\n                    columnNumber: 7\n                }, this));\n            }\n        }\n    ]);\n    return Main;\n}(react__WEBPACK_IMPORTED_MODULE_2__.Component);\n/* harmony default export */ __webpack_exports__[\"default\"] = (Main);\n\n\n;\n    // Wrapped in an IIFE to avoid polluting the global scope\n    ;\n    (function () {\n        var _a, _b;\n        // Legacy CSS implementations will `eval` browser code in a Node.js context\n        // to extract CSS. For backwards compatibility, we need to check we're in a\n        // browser context before continuing.\n        if (typeof self !== 'undefined' &&\n            // AMP / No-JS mode does not inject these helpers:\n            '$RefreshHelpers$' in self) {\n            var currentExports = module.__proto__.exports;\n            var prevExports = (_b = (_a = module.hot.data) === null || _a === void 0 ? void 0 : _a.prevExports) !== null && _b !== void 0 ? _b : null;\n            // This cannot happen in MainTemplate because the exports mismatch between\n            // templating and execution.\n            self.$RefreshHelpers$.registerExportsForReactRefresh(currentExports, module.id);\n            // A module can be accepted automatically based on its exports, e.g. when\n            // it is a Refresh Boundary.\n            if (self.$RefreshHelpers$.isReactRefreshBoundary(currentExports)) {\n                // Save the previous exports on update so we can compare the boundary\n                // signatures.\n                module.hot.dispose(function (data) {\n                    data.prevExports = currentExports;\n                });\n                // Unconditionally accept an update to this module, we'll check if it's\n                // still a Refresh Boundary later.\n                module.hot.accept();\n                // This field is set when the previous version of this module was a\n                // Refresh Boundary, letting us know we need to check for invalidation or\n                // enqueue an update.\n                if (prevExports !== null) {\n                    // A boundary can become ineligible if its exports are incompatible\n                    // with the previous exports.\n                    //\n                    // For example, if you add/remove/change exports, we'll want to\n                    // re-execute the importing modules, and force those components to\n                    // re-render. Similarly, if you convert a class component to a\n                    // function, we want to invalidate the boundary.\n                    if (self.$RefreshHelpers$.shouldInvalidateReactRefreshBoundary(prevExports, currentExports)) {\n                        module.hot.invalidate();\n                    }\n                    else {\n                        self.$RefreshHelpers$.scheduleUpdate();\n                    }\n                }\n            }\n            else {\n                // Since we just executed the code for the module, it's possible that the\n                // new exports made it ineligible for being a boundary.\n                // We only care about the case when we were _previously_ a boundary,\n                // because we already accepted this update (accidental side effect).\n                var isNoLongerABoundary = prevExports !== null;\n                if (isNoLongerABoundary) {\n                    module.hot.invalidate();\n                }\n            }\n        }\n    })();\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9wYWdlcy9pbmRleC5qcy5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7O0FBQXdDO0FBQ1E7QUFDUDtBQUNLO0FBQ2dCO0FBQ2pCOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0lBRXZDUSxJQUFJLGlCQUFWLFFBQVE7Ozs7YUFBRkEsSUFBSSxDQUNJQyxLQUFLOzs7a0NBQ1RBLEtBQUs7Y0FDTkMsS0FBSyxHQUFHLENBQUM7WUFDWkMsZUFBZSxFQUFFLElBQUk7WUFDckJDLGNBQWMsRUFBRSxJQUFJO1FBQ3RCLENBQUM7Ozs7O1lBS0dDLEdBQWlCLEVBQWpCQSxDQUFpQjttQkFBdkIsUUFBUSxDQUFGQSxpQkFBaUI7O2dNQUF2QixRQUFRLFdBQWtCLENBQUM7d0JBQ25CQyxRQUFROzs7Ozt1Q0FBU1IsZ0VBQXNCOztnQ0FBdkNRLFFBQVE7Z0NBQ2QsRUFBd0M7aUNBRXZDLFFBQ0wsR0FEVyxDQUFDO29DQUNOLEVBQUUsRUFBRUEsUUFBUSxDQUFDQyxlQUFlLEtBQUssSUFBSSxFQUFFLENBQUM7OENBQ2pDQyxRQUFRLENBQUMsQ0FBQzs0Q0FDYkosY0FBYyxFQUFFLENBQUU7NENBQ2xCRCxlQUFlLEVBQUUsQ0FBSTt3Q0FDdkIsQ0FBQztvQ0FDSCxDQUFDLE1BQU0sQ0FBQzs4Q0FDREssUUFBUSxDQUFDLENBQUM7NENBQ2JKLGNBQWMsRUFBRUUsUUFBUSxDQUFDQyxlQUFlOzRDQUN4Q0osZUFBZSxFQUFFLENBQUs7d0NBQ3hCLENBQUM7b0NBQ0gsQ0FBQztnQ0FDSCxDQUFDO2dDQUVELEVBUUU7Ozs7Ozs7O0lBQUEsR0FFRixFQVFFOzs7Ozs7OztJQUFBLEdBRUZNLE9BQU8sQ0FBQ0MsR0FBRyxDQUFDLENBQVUsV0FBRUosUUFBUTtnQ0FDaENHLE9BQU8sQ0FBQ0MsR0FBRyxDQUFDLENBQTRCOzs7Ozs7Z0JBRTFDLENBQUM7Ozs7WUFFRCxFQWtDRTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztFQUFBLEdBRUZDLEdBQU0sRUFBTkEsQ0FBTTttQkFBTkEsUUFBUSxDQUFSQSxNQUFNLEdBQUcsQ0FBQztnQkFDUixFQUFzRDtnQkFFdEQsTUFBTSw2RUFDSGYsMERBQU07MEdBQ0pnQixDQUFHOzhHQUNEakIsbURBQUk7NEJBQUNrQixPQUFPOzRCQUFDQyxPQUFPOzs0R0FDbEJuQix3REFBUzswSEFDUHFCLENBQUU7a0RBQUMsQ0FBOEQ7Ozs7Ozs7Ozs7OzRHQUVuRXJCLHdEQUFTOzBIQUNQc0IsQ0FBRTs7d0hBQ0FDLENBQUM7O29EQUFDLENBQW1CO29EQUFDLElBQUksQ0FBQ2hCLEtBQUssQ0FBQ0MsZUFBZTs7Ozs7Ozt3SEFDaERlLENBQUM7O29EQUFDLENBQXFCO29EQUFDLElBQUksQ0FBQ2hCLEtBQUssQ0FBQ0UsY0FBYzs7Ozs7Ozs7Ozs7Ozs7Ozs7OzRHQUdyRFQsd0RBQVM7MEhBQ1BJLHVEQUFjOzs7Ozs7Ozs7OzRHQUVoQkosd0RBQVM7MEhBQ1B3QixDQUFFO2tEQUFDLENBQWdCOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7WUFNaEMsQ0FBQzs7OztFQXBIZ0IxQiw0Q0FBUztBQXVINUIsK0RBQWVPLElBQUkiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9fTl9FLy4vcGFnZXMvaW5kZXguanM/YmVlNyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QsIHsgQ29tcG9uZW50IH0gZnJvbSAncmVhY3QnO1xuaW1wb3J0IHsgQnV0dG9uLCBMaXN0IH0gZnJvbSAnc2VtYW50aWMtdWktcmVhY3QnO1xuaW1wb3J0IExheW91dCBmcm9tICcuLi9jb21wb25lbnRzL2xheW91dCc7XG5pbXBvcnQgZ2V0UHJvdmlkZXIgZnJvbSAnLi4vZXRoZXJldW0vcHJvdmlkZXInO1xuaW1wb3J0IGRldGVjdEV0aGVyZXVtUHJvdmlkZXIgZnJvbSAnQG1ldGFtYXNrL2RldGVjdC1wcm92aWRlcic7XG5pbXBvcnQgQ29ubmVjdGlvbklQRlMgZnJvbSAnLi9pcGZzQ29ubmVjdGlvbic7XG5cbmNsYXNzIE1haW4gZXh0ZW5kcyBDb21wb25lbnQge1xuICBjb25zdHJ1Y3Rvcihwcm9wcykge1xuICAgIHN1cGVyKHByb3BzKTtcbiAgICB0aGlzLnN0YXRlID0ge1xuICAgICAgaXNVc2VyQ29ubmVjdGVkOiBudWxsLFxuICAgICAgY3VycmVudEFjY291bnQ6IG51bGxcbiAgICB9O1xuXG4gICAgLy90aGlzLmNvbm5lY3RVc2VyID0gdGhpcy5jb25uZWN0VXNlci5iaW5kKHRoaXMpO1xuICB9XG5cbiAgYXN5bmMgY29tcG9uZW50RGlkTW91bnQoKSB7XG4gICAgY29uc3QgcHJvdmlkZXIgPSBhd2FpdCBkZXRlY3RFdGhlcmV1bVByb3ZpZGVyKCk7XG4gICAgLy90aGlzLnNldFN0YXRlKHsgcHJvdmlkZXI6IHByb3ZpZGVyIH0pO1xuXG4gICAgKCgpID0+IHtcbiAgICAgIGlmIChwcm92aWRlci5zZWxlY3RlZEFkZHJlc3MgPT09IG51bGwpIHtcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICAgICAgY3VycmVudEFjY291bnQ6ICcnLFxuICAgICAgICAgIGlzVXNlckNvbm5lY3RlZDogJ05vJ1xuICAgICAgICB9KTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgICAgIGN1cnJlbnRBY2NvdW50OiBwcm92aWRlci5zZWxlY3RlZEFkZHJlc3MsXG4gICAgICAgICAgaXNVc2VyQ29ubmVjdGVkOiAnWWVzJ1xuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9KSgpO1xuXG4gICAgLypcbiAgICAoKCkgPT4ge1xuICAgICAgaWYgKHByb3ZpZGVyLmlzTWV0YU1hc2spIHtcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7IGlzTWV0YU1hc2tJbnN0YWxsZWQ6ICdZZXMnIH0pO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7IGlzTWV0YU1hc2tJbnN0YWxsZWQ6ICdObycgfSk7XG4gICAgICB9XG4gICAgfSkoKTtcbiAgICAqL1xuXG4gICAgLypcbiAgICAoYXN5bmMgKCkgPT4ge1xuICAgICAgdHJ5IHtcbiAgICAgICAgYXdhaXQgcHJvdmlkZXIucmVxdWVzdCh7IG1ldGhvZDogJ2V0aF9yZXF1ZXN0QWNjb3VudHMnIH0pO1xuICAgICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKGVycik7XG4gICAgICB9XG4gICAgfSkoKVxuICAgICovXG5cbiAgICBjb25zb2xlLmxvZyhcIlByb3ZpZGVyXCIsIHByb3ZpZGVyKTtcbiAgICBjb25zb2xlLmxvZyhcIkVORCBPRiBDT01QT05FTlQgRElEIE1PVU5UXCIpO1xuXG4gIH1cblxuICAvKlxuICBjb21wb25lbnREaWRVcGRhdGUocHJldlByb3BzLCBwcmV2U3RhdGUpIHtcbiAgICBjb25zdCBjaGVja0FjY291bnRDaGFuZ2VzID0gKCkgPT4ge1xuICAgICAgaWYgKHByZXZTdGF0ZS5jdXJyZW50QWNjb3VudCAhPT0gdGhpcy5zdGF0ZS5jdXJyZW50QWNjb3VudCkge1xuICAgICAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgICAgICBjdXJyZW50QWNjb3VudDogdGhpcy5zdGF0ZS5jdXJyZW50QWNjb3VudFxuICAgICAgICB9KVxuICAgICAgfVxuXG4gICAgICBpZiAocHJldlN0YXRlLmlzVXNlckNvbm5lY3RlZCAhPT0gdGhpcy5zdGF0ZS5pc1VzZXJDb25uZWN0ZWQpIHtcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICAgICAgaXNVc2VyQ29ubmVjdGVkOiB0aGlzLnN0YXRlLmlzVXNlckNvbm5lY3RlZFxuICAgICAgICB9KVxuICAgICAgfVxuICAgIH1cblxuICB9XG4gIC8qXG5cbiAgLypcbiAgY29ubmVjdFVzZXIoKSB7XG4gICAgLy93ZWIzID0gY2hlY2tDb25uZWN0aW9uKCk7XG4gICAgLy9jb25zdCB1c2VyQWNjb3VudCA9IGVuYWJsZVVzZXIoKTtcbiAgICAvL3dlYjMsIHVzZXJBY2NvdW50ID0gYWN0aXZhdGUoKTtcbiAgICAvL3RoaXMuc2V0U3RhdGUoe2N1cnJlbnRBY2NvdW50OiB1c2VyQWNjb3VudH0pO1xuICAgIC8vbGV0IHByb3ZpZGVyID0gZ2V0UHJvdmlkZXIoKTtcbiAgICAvL3RoaXMuc2V0U3RhdGUoe3Byb3ZpZGVyOiBwcm92aWRlcn0pO1xuICAgIC8vaWYgKHRoaXMuc3RhdGUucHJvdmlkZXIgIT09IHdpbmRvdy5ldGhlcmV1bSkge1xuICAgIC8vICBjb25zb2xlLmVycm9yKFwiUHJvdmlkZXIgaXMgbm90IHdpbmRvdy5ldGhlcmV1bVwiKTtcbiAgICAvL30gZWxzZSB7XG4gICAgLy8gIGNvbnNvbGUubG9nKFwiU3VjY2Vzc2Z1bGx5IGhhdmUgcHJvdmlkZXIuXCIpO1xuICAgIC8vfVxuICAgIGNvbnNvbGUubG9nKHRoaXMuc3RhdGUucHJvdmlkZXIpO1xuICB9XG4gICovXG5cbiAgcmVuZGVyKCkge1xuICAgIC8vY29uc29sZS5sb2coXCJQUk9WSURFUiBSRU5ERVJcIiwgdGhpcy5zdGF0ZS5wcm92aWRlcik7XG5cbiAgICByZXR1cm4gKFxuICAgICAgPExheW91dD5cbiAgICAgICAgPGRpdj5cbiAgICAgICAgICA8TGlzdCBkaXZpZGVkIHJlbGF4ZWQ+XG4gICAgICAgICAgICA8TGlzdC5JdGVtPlxuICAgICAgICAgICAgICA8aDM+TGV0J3MgZ2V0IGNyYWNraW5nLiBTaG93aW5nIGFsbCB0aGUgZGF0YSB3ZSBhcmUgcHVsbGluZyBiZWxvdy48L2gzPlxuICAgICAgICAgICAgPC9MaXN0Lkl0ZW0+XG4gICAgICAgICAgICA8TGlzdC5JdGVtPlxuICAgICAgICAgICAgICA8aDQ+XG4gICAgICAgICAgICAgICAgPHA+SXMgVXNlciBDb25uZWN0ZWQ/IHt0aGlzLnN0YXRlLmlzVXNlckNvbm5lY3RlZH08L3A+XG4gICAgICAgICAgICAgICAgPHA+VXNlciBBY2NvdW50IE51bWJlcjoge3RoaXMuc3RhdGUuY3VycmVudEFjY291bnR9PC9wPlxuICAgICAgICAgICAgICA8L2g0PlxuICAgICAgICAgICAgPC9MaXN0Lkl0ZW0+XG4gICAgICAgICAgICA8TGlzdC5JdGVtPlxuICAgICAgICAgICAgICA8Q29ubmVjdGlvbklQRlMgLz5cbiAgICAgICAgICAgIDwvTGlzdC5JdGVtPlxuICAgICAgICAgICAgPExpc3QuSXRlbT5cbiAgICAgICAgICAgICAgPGgyPkJvb20gc2hha2Egc2hha2E8L2gyPlxuICAgICAgICAgICAgPC9MaXN0Lkl0ZW0+XG4gICAgICAgICAgPC9MaXN0PlxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvTGF5b3V0PlxuICAgICk7XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgTWFpblxuIl0sIm5hbWVzIjpbIlJlYWN0IiwiQ29tcG9uZW50IiwiQnV0dG9uIiwiTGlzdCIsIkxheW91dCIsImdldFByb3ZpZGVyIiwiZGV0ZWN0RXRoZXJldW1Qcm92aWRlciIsIkNvbm5lY3Rpb25JUEZTIiwiTWFpbiIsInByb3BzIiwic3RhdGUiLCJpc1VzZXJDb25uZWN0ZWQiLCJjdXJyZW50QWNjb3VudCIsImNvbXBvbmVudERpZE1vdW50IiwicHJvdmlkZXIiLCJzZWxlY3RlZEFkZHJlc3MiLCJzZXRTdGF0ZSIsImNvbnNvbGUiLCJsb2ciLCJyZW5kZXIiLCJkaXYiLCJkaXZpZGVkIiwicmVsYXhlZCIsIkl0ZW0iLCJoMyIsImg0IiwicCIsImgyIl0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///./pages/index.js\n");

/***/ })

});
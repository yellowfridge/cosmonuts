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

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _home_redlentils_Seafile_Websites_avatarnft_node_modules_next_dist_compiled_regenerator_runtime_runtime_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./node_modules/next/dist/compiled/regenerator-runtime/runtime.js */ \"./node_modules/next/dist/compiled/regenerator-runtime/runtime.js\");\n/* harmony import */ var _home_redlentils_Seafile_Websites_avatarnft_node_modules_next_dist_compiled_regenerator_runtime_runtime_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_home_redlentils_Seafile_Websites_avatarnft_node_modules_next_dist_compiled_regenerator_runtime_runtime_js__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"./node_modules/react/jsx-dev-runtime.js\");\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react */ \"./node_modules/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var semantic_ui_react__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! semantic-ui-react */ \"./node_modules/semantic-ui-react/dist/es/index.js\");\n/* harmony import */ var _components_layout__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../components/layout */ \"./components/layout.js\");\n/* harmony import */ var _ethereum_provider__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../ethereum/provider */ \"./ethereum/provider.js\");\n/* harmony import */ var _metamask_detect_provider__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @metamask/detect-provider */ \"./node_modules/@metamask/detect-provider/dist/index.js\");\n/* harmony import */ var _metamask_detect_provider__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_metamask_detect_provider__WEBPACK_IMPORTED_MODULE_5__);\n/* harmony import */ var _web3connector__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./web3connector */ \"./pages/web3connector.js\");\n/* module decorator */ module = __webpack_require__.hmd(module);\n\n\n\n\n\n//import { checkConnection, enableUser } from '../ethereum/web3';\n//import activate from '../ethereum/web3';\n\n\n//import ConnectWallet from './connect-wallet';\n\nfunction _assertThisInitialized(self) {\n    if (self === void 0) {\n        throw new ReferenceError(\"this hasn't been initialised - super() hasn't been called\");\n    }\n    return self;\n}\nfunction asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {\n    try {\n        var info = gen[key](arg);\n        var value = info.value;\n    } catch (error) {\n        reject(error);\n        return;\n    }\n    if (info.done) {\n        resolve(value);\n    } else {\n        Promise.resolve(value).then(_next, _throw);\n    }\n}\nfunction _asyncToGenerator(fn) {\n    return function() {\n        var self = this, args = arguments;\n        return new Promise(function(resolve, reject) {\n            var gen = fn.apply(self, args);\n            function _next(value) {\n                asyncGeneratorStep(gen, resolve, reject, _next, _throw, \"next\", value);\n            }\n            function _throw(err) {\n                asyncGeneratorStep(gen, resolve, reject, _next, _throw, \"throw\", err);\n            }\n            _next(undefined);\n        });\n    };\n}\nfunction _classCallCheck(instance, Constructor) {\n    if (!(instance instanceof Constructor)) {\n        throw new TypeError(\"Cannot call a class as a function\");\n    }\n}\nfunction _defineProperties(target, props) {\n    for(var i = 0; i < props.length; i++){\n        var descriptor = props[i];\n        descriptor.enumerable = descriptor.enumerable || false;\n        descriptor.configurable = true;\n        if (\"value\" in descriptor) descriptor.writable = true;\n        Object.defineProperty(target, descriptor.key, descriptor);\n    }\n}\nfunction _createClass(Constructor, protoProps, staticProps) {\n    if (protoProps) _defineProperties(Constructor.prototype, protoProps);\n    if (staticProps) _defineProperties(Constructor, staticProps);\n    return Constructor;\n}\nfunction _getPrototypeOf(o) {\n    _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {\n        return o.__proto__ || Object.getPrototypeOf(o);\n    };\n    return _getPrototypeOf(o);\n}\nfunction _inherits(subClass, superClass) {\n    if (typeof superClass !== \"function\" && superClass !== null) {\n        throw new TypeError(\"Super expression must either be null or a function\");\n    }\n    subClass.prototype = Object.create(superClass && superClass.prototype, {\n        constructor: {\n            value: subClass,\n            writable: true,\n            configurable: true\n        }\n    });\n    if (superClass) _setPrototypeOf(subClass, superClass);\n}\nfunction _possibleConstructorReturn(self, call) {\n    if (call && (_typeof(call) === \"object\" || typeof call === \"function\")) {\n        return call;\n    }\n    return _assertThisInitialized(self);\n}\nfunction _setPrototypeOf(o, p) {\n    _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {\n        o.__proto__ = p;\n        return o;\n    };\n    return _setPrototypeOf(o, p);\n}\nvar _typeof = function(obj) {\n    \"@swc/helpers - typeof\";\n    return obj && typeof Symbol !== \"undefined\" && obj.constructor === Symbol ? \"symbol\" : typeof obj;\n};\nfunction _isNativeReflectConstruct() {\n    if (typeof Reflect === \"undefined\" || !Reflect.construct) return false;\n    if (Reflect.construct.sham) return false;\n    if (typeof Proxy === \"function\") return true;\n    try {\n        Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {}));\n        return true;\n    } catch (e) {\n        return false;\n    }\n}\nfunction _createSuper(Derived) {\n    var hasNativeReflectConstruct = _isNativeReflectConstruct();\n    return function _createSuperInternal() {\n        var Super = _getPrototypeOf(Derived), result;\n        if (hasNativeReflectConstruct) {\n            var NewTarget = _getPrototypeOf(this).constructor;\n            result = Reflect.construct(Super, arguments, NewTarget);\n        } else {\n            result = Super.apply(this, arguments);\n        }\n        return _possibleConstructorReturn(this, result);\n    };\n}\nvar Main = /*#__PURE__*/ function(Component1) {\n    \"use strict\";\n    _inherits(Main, Component1);\n    var _super = _createSuper(Main);\n    function Main(props) {\n        _classCallCheck(this, Main);\n        var _this;\n        _this = _super.call(this, props);\n        _this.state = {\n            provider: null,\n            currentAccount: null,\n            isUserConnected: false,\n            errorMessage: null,\n            isWalletConnected: null,\n            connectWalletClick: false\n        };\n        _this.connectUser = _this.connectUser.bind(_assertThisInitialized(_this));\n        return _this;\n    }\n    _createClass(Main, [\n        {\n            key: \"componentDidMount\",\n            value: function componentDidMount() {\n                var _this = this;\n                return _asyncToGenerator(_home_redlentils_Seafile_Websites_avatarnft_node_modules_next_dist_compiled_regenerator_runtime_runtime_js__WEBPACK_IMPORTED_MODULE_0___default().mark(function _callee() {\n                    var provider;\n                    return _home_redlentils_Seafile_Websites_avatarnft_node_modules_next_dist_compiled_regenerator_runtime_runtime_js__WEBPACK_IMPORTED_MODULE_0___default().wrap(function _callee$(_ctx) {\n                        while(1)switch(_ctx.prev = _ctx.next){\n                            case 0:\n                                _ctx.next = 2;\n                                return _metamask_detect_provider__WEBPACK_IMPORTED_MODULE_5___default()();\n                            case 2:\n                                provider = _ctx.sent;\n                                _this.setState({\n                                    provider: provider\n                                });\n                            case 4:\n                            case \"end\":\n                                return _ctx.stop();\n                        }\n                    }, _callee);\n                }))();\n            }\n        },\n        {\n            key: \"connectUser\",\n            value: /*\n  connectUser() {\n    //web3 = checkConnection();\n    //const userAccount = enableUser();\n    //web3, userAccount = activate();\n    //this.setState({currentAccount: userAccount});\n    //let provider = getProvider();\n    //this.setState({provider: provider});\n    //if (this.state.provider !== window.ethereum) {\n    //  console.error(\"Provider is not window.ethereum\");\n    //} else {\n    //  console.log(\"Successfully have provider.\");\n    //}\n    console.log(this.state.provider);\n  }\n  */ function connectUser() {\n                var _this = this;\n                return _asyncToGenerator(_home_redlentils_Seafile_Websites_avatarnft_node_modules_next_dist_compiled_regenerator_runtime_runtime_js__WEBPACK_IMPORTED_MODULE_0___default().mark(function _callee() {\n                    return _home_redlentils_Seafile_Websites_avatarnft_node_modules_next_dist_compiled_regenerator_runtime_runtime_js__WEBPACK_IMPORTED_MODULE_0___default().wrap(function _callee$(_ctx) {\n                        while(1)switch(_ctx.prev = _ctx.next){\n                            case 0:\n                                _this.setState({\n                                    connectWalletClick: true\n                                });\n                                console.log(_this.state.isWalletConnected);\n                                console.log(_web3connector__WEBPACK_IMPORTED_MODULE_6__[\"default\"]);\n                            case 3:\n                            case \"end\":\n                                return _ctx.stop();\n                        }\n                    }, _callee);\n                }))();\n            }\n        },\n        {\n            key: \"createNFT\",\n            value: function createNFT() {\n                console.log(\"MINT ME THAT MONEY\");\n            }\n        },\n        {\n            key: \"render\",\n            value: function render() {\n                return(/*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxDEV)(_components_layout__WEBPACK_IMPORTED_MODULE_3__[\"default\"], {\n                    children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxDEV)(\"div\", {\n                        className: \"connect-wallet\",\n                        children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxDEV)(semantic_ui_react__WEBPACK_IMPORTED_MODULE_7__.List, {\n                            divided: true,\n                            relaxed: true,\n                            children: [\n                                /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxDEV)(semantic_ui_react__WEBPACK_IMPORTED_MODULE_7__.List.Item, {\n                                    children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxDEV)(semantic_ui_react__WEBPACK_IMPORTED_MODULE_7__.Button, {\n                                        floated: \"left\",\n                                        content: \"Connect Wallet\",\n                                        icon: \"add circle\",\n                                        primary: true,\n                                        onClick: this.connectUser,\n                                        disabled: this.state.isUserConnected\n                                    }, void 0, false, {\n                                        fileName: \"/home/redlentils/Seafile/Websites/avatarnft/pages/index.js\",\n                                        lineNumber: 65,\n                                        columnNumber: 13\n                                    }, this)\n                                }, void 0, false, {\n                                    fileName: \"/home/redlentils/Seafile/Websites/avatarnft/pages/index.js\",\n                                    lineNumber: 64,\n                                    columnNumber: 11\n                                }, this),\n                                /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxDEV)(semantic_ui_react__WEBPACK_IMPORTED_MODULE_7__.List.Item, {\n                                    children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxDEV)(semantic_ui_react__WEBPACK_IMPORTED_MODULE_7__.Button, {\n                                        floated: \"left\",\n                                        content: \"Create Unique NFT\",\n                                        icon: \"add circle\",\n                                        primary: true,\n                                        onClick: this.createNFT\n                                    }, void 0, false, {\n                                        fileName: \"/home/redlentils/Seafile/Websites/avatarnft/pages/index.js\",\n                                        lineNumber: 75,\n                                        columnNumber: 13\n                                    }, this)\n                                }, void 0, false, {\n                                    fileName: \"/home/redlentils/Seafile/Websites/avatarnft/pages/index.js\",\n                                    lineNumber: 74,\n                                    columnNumber: 11\n                                }, this)\n                            ]\n                        }, void 0, true, {\n                            fileName: \"/home/redlentils/Seafile/Websites/avatarnft/pages/index.js\",\n                            lineNumber: 63,\n                            columnNumber: 11\n                        }, this)\n                    }, void 0, false, {\n                        fileName: \"/home/redlentils/Seafile/Websites/avatarnft/pages/index.js\",\n                        lineNumber: 62,\n                        columnNumber: 9\n                    }, this)\n                }, void 0, false, {\n                    fileName: \"/home/redlentils/Seafile/Websites/avatarnft/pages/index.js\",\n                    lineNumber: 61,\n                    columnNumber: 7\n                }, this));\n            }\n        }\n    ]);\n    return Main;\n}(react__WEBPACK_IMPORTED_MODULE_2__.Component);\n/* harmony default export */ __webpack_exports__[\"default\"] = (Main);\n\n\n;\n    // Wrapped in an IIFE to avoid polluting the global scope\n    ;\n    (function () {\n        var _a, _b;\n        // Legacy CSS implementations will `eval` browser code in a Node.js context\n        // to extract CSS. For backwards compatibility, we need to check we're in a\n        // browser context before continuing.\n        if (typeof self !== 'undefined' &&\n            // AMP / No-JS mode does not inject these helpers:\n            '$RefreshHelpers$' in self) {\n            var currentExports = module.__proto__.exports;\n            var prevExports = (_b = (_a = module.hot.data) === null || _a === void 0 ? void 0 : _a.prevExports) !== null && _b !== void 0 ? _b : null;\n            // This cannot happen in MainTemplate because the exports mismatch between\n            // templating and execution.\n            self.$RefreshHelpers$.registerExportsForReactRefresh(currentExports, module.id);\n            // A module can be accepted automatically based on its exports, e.g. when\n            // it is a Refresh Boundary.\n            if (self.$RefreshHelpers$.isReactRefreshBoundary(currentExports)) {\n                // Save the previous exports on update so we can compare the boundary\n                // signatures.\n                module.hot.dispose(function (data) {\n                    data.prevExports = currentExports;\n                });\n                // Unconditionally accept an update to this module, we'll check if it's\n                // still a Refresh Boundary later.\n                module.hot.accept();\n                // This field is set when the previous version of this module was a\n                // Refresh Boundary, letting us know we need to check for invalidation or\n                // enqueue an update.\n                if (prevExports !== null) {\n                    // A boundary can become ineligible if its exports are incompatible\n                    // with the previous exports.\n                    //\n                    // For example, if you add/remove/change exports, we'll want to\n                    // re-execute the importing modules, and force those components to\n                    // re-render. Similarly, if you convert a class component to a\n                    // function, we want to invalidate the boundary.\n                    if (self.$RefreshHelpers$.shouldInvalidateReactRefreshBoundary(prevExports, currentExports)) {\n                        module.hot.invalidate();\n                    }\n                    else {\n                        self.$RefreshHelpers$.scheduleUpdate();\n                    }\n                }\n            }\n            else {\n                // Since we just executed the code for the module, it's possible that the\n                // new exports made it ineligible for being a boundary.\n                // We only care about the case when we were _previously_ a boundary,\n                // because we already accepted this update (accidental side effect).\n                var isNoLongerABoundary = prevExports !== null;\n                if (isNoLongerABoundary) {\n                    module.hot.invalidate();\n                }\n            }\n        }\n    })();\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9wYWdlcy9pbmRleC5qcy5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7O0FBQXdDO0FBQ1E7QUFDUDtBQUN6QyxFQUFpRTtBQUNqRSxFQUEwQztBQUNJO0FBQ2dCO0FBQzlELEVBQStDO0FBQ0o7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7SUFFckNRLElBQUksaUJBQVYsUUFBUTs7OzthQUFGQSxJQUFJLENBQ0lDLEtBQUs7OztrQ0FDVEEsS0FBSztjQUNOQyxLQUFLLEdBQUcsQ0FBQztZQUNaQyxRQUFRLEVBQUUsSUFBSTtZQUNkQyxjQUFjLEVBQUUsSUFBSTtZQUNwQkMsZUFBZSxFQUFFLEtBQUs7WUFDdEJDLFlBQVksRUFBRSxJQUFJO1lBQ2xCQyxpQkFBaUIsRUFBRSxJQUFJO1lBQ3ZCQyxrQkFBa0IsRUFBRSxLQUFLO1FBQzNCLENBQUM7Y0FFSUMsV0FBVyxTQUFRQSxXQUFXLENBQUNDLElBQUk7Ozs7O1lBR3BDQyxHQUFpQixFQUFqQkEsQ0FBaUI7bUJBQXZCLFFBQVEsQ0FBRkEsaUJBQWlCOztnTUFBdkIsUUFBUSxXQUFrQixDQUFDO3dCQUNuQlIsUUFBUTs7Ozs7dUNBQVNMLGdFQUFzQjs7Z0NBQXZDSyxRQUFRO3NDQUNUUyxRQUFRLENBQUMsQ0FBQztvQ0FBQ1QsUUFBUSxFQUFFQSxRQUFRO2dDQUFDLENBQUM7Ozs7OztnQkFFdEMsQ0FBQzs7OztZQW1CS00sR0FBVyxFQUFYQSxDQUFXO21CQWpCakIsRUFlRTs7Ozs7Ozs7Ozs7Ozs7O0VBQUEsR0FFRixRQUFRLENBQUZBLFdBQVc7O2dNQUFqQixRQUFRLFdBQVksQ0FBQzs7OztzQ0FDZEcsUUFBUSxDQUFDLENBQUM7b0NBQUNKLGtCQUFrQixFQUFFLElBQUk7Z0NBQUMsQ0FBQztnQ0FDMUNLLE9BQU8sQ0FBQ0MsR0FBRyxPQUFNWixLQUFLLENBQUNLLGlCQUFpQjtnQ0FDeENNLE9BQU8sQ0FBQ0MsR0FBRyxDQUFDZixzREFBYTs7Ozs7O2dCQUMzQixDQUFDOzs7O1lBRURnQixHQUFTLEVBQVRBLENBQVM7bUJBQVRBLFFBQVEsQ0FBUkEsU0FBUyxHQUFHLENBQUM7Z0JBQ1hGLE9BQU8sQ0FBQ0MsR0FBRyxDQUFDLENBQW9CO1lBQ2xDLENBQUM7OztZQUVERSxHQUFNLEVBQU5BLENBQU07bUJBQU5BLFFBQVEsQ0FBUkEsTUFBTSxHQUFHLENBQUM7Z0JBQ1IsTUFBTSw2RUFDSHBCLDBEQUFNOzBHQUNKcUIsQ0FBRzt3QkFBQ0MsU0FBUyxFQUFDLENBQWdCOzhHQUM1QnZCLG1EQUFJOzRCQUFDd0IsT0FBTzs0QkFBQ0MsT0FBTzs7NEdBQ3BCekIsd0RBQVM7MEhBQ1BELHFEQUFNO3dDQUNMNEIsT0FBTyxFQUFDLENBQU07d0NBQ2RDLE9BQU8sRUFBQyxDQUFnQjt3Q0FDeEJDLElBQUksRUFBQyxDQUFZO3dDQUNqQkMsT0FBTzt3Q0FDUEMsT0FBTyxFQUFFLElBQUksQ0FBQ2pCLFdBQVc7d0NBQ3pCa0IsUUFBUSxFQUFFLElBQUksQ0FBQ3pCLEtBQUssQ0FBQ0csZUFBZTs7Ozs7Ozs7Ozs7NEdBR3ZDVix3REFBUzswSEFDUEQscURBQU07d0NBQ0w0QixPQUFPLEVBQUMsQ0FBTTt3Q0FDZEMsT0FBTyxFQUFDLENBQW1CO3dDQUMzQkMsSUFBSSxFQUFDLENBQVk7d0NBQ2pCQyxPQUFPO3dDQUNQQyxPQUFPLEVBQUUsSUFBSSxDQUFDWCxTQUFTOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7WUFPbkMsQ0FBQzs7OztFQTVFZ0J0Qiw0Q0FBUztBQStFNUIsK0RBQWVPLElBQUkiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9fTl9FLy4vcGFnZXMvaW5kZXguanM/YmVlNyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QsIHsgQ29tcG9uZW50IH0gZnJvbSAncmVhY3QnO1xuaW1wb3J0IHsgQnV0dG9uLCBMaXN0IH0gZnJvbSAnc2VtYW50aWMtdWktcmVhY3QnO1xuaW1wb3J0IExheW91dCBmcm9tICcuLi9jb21wb25lbnRzL2xheW91dCc7XG4vL2ltcG9ydCB7IGNoZWNrQ29ubmVjdGlvbiwgZW5hYmxlVXNlciB9IGZyb20gJy4uL2V0aGVyZXVtL3dlYjMnO1xuLy9pbXBvcnQgYWN0aXZhdGUgZnJvbSAnLi4vZXRoZXJldW0vd2ViMyc7XG5pbXBvcnQgZ2V0UHJvdmlkZXIgZnJvbSAnLi4vZXRoZXJldW0vcHJvdmlkZXInO1xuaW1wb3J0IGRldGVjdEV0aGVyZXVtUHJvdmlkZXIgZnJvbSAnQG1ldGFtYXNrL2RldGVjdC1wcm92aWRlcic7XG4vL2ltcG9ydCBDb25uZWN0V2FsbGV0IGZyb20gJy4vY29ubmVjdC13YWxsZXQnO1xuaW1wb3J0IFdlYjNDb25uZWN0b3IgZnJvbSAnLi93ZWIzY29ubmVjdG9yJztcblxuY2xhc3MgTWFpbiBleHRlbmRzIENvbXBvbmVudCB7XG4gIGNvbnN0cnVjdG9yKHByb3BzKSB7XG4gICAgc3VwZXIocHJvcHMpO1xuICAgIHRoaXMuc3RhdGUgPSB7XG4gICAgICBwcm92aWRlcjogbnVsbCxcbiAgICAgIGN1cnJlbnRBY2NvdW50OiBudWxsLFxuICAgICAgaXNVc2VyQ29ubmVjdGVkOiBmYWxzZSxcbiAgICAgIGVycm9yTWVzc2FnZTogbnVsbCxcbiAgICAgIGlzV2FsbGV0Q29ubmVjdGVkOiBudWxsLFxuICAgICAgY29ubmVjdFdhbGxldENsaWNrOiBmYWxzZVxuICAgIH07XG5cbiAgICB0aGlzLmNvbm5lY3RVc2VyID0gdGhpcy5jb25uZWN0VXNlci5iaW5kKHRoaXMpO1xuICB9XG5cbiAgYXN5bmMgY29tcG9uZW50RGlkTW91bnQoKSB7XG4gICAgY29uc3QgcHJvdmlkZXIgPSBhd2FpdCBkZXRlY3RFdGhlcmV1bVByb3ZpZGVyKCk7XG4gICAgdGhpcy5zZXRTdGF0ZSh7IHByb3ZpZGVyOiBwcm92aWRlciB9KTtcblxuICB9XG5cbiAgLypcbiAgY29ubmVjdFVzZXIoKSB7XG4gICAgLy93ZWIzID0gY2hlY2tDb25uZWN0aW9uKCk7XG4gICAgLy9jb25zdCB1c2VyQWNjb3VudCA9IGVuYWJsZVVzZXIoKTtcbiAgICAvL3dlYjMsIHVzZXJBY2NvdW50ID0gYWN0aXZhdGUoKTtcbiAgICAvL3RoaXMuc2V0U3RhdGUoe2N1cnJlbnRBY2NvdW50OiB1c2VyQWNjb3VudH0pO1xuICAgIC8vbGV0IHByb3ZpZGVyID0gZ2V0UHJvdmlkZXIoKTtcbiAgICAvL3RoaXMuc2V0U3RhdGUoe3Byb3ZpZGVyOiBwcm92aWRlcn0pO1xuICAgIC8vaWYgKHRoaXMuc3RhdGUucHJvdmlkZXIgIT09IHdpbmRvdy5ldGhlcmV1bSkge1xuICAgIC8vICBjb25zb2xlLmVycm9yKFwiUHJvdmlkZXIgaXMgbm90IHdpbmRvdy5ldGhlcmV1bVwiKTtcbiAgICAvL30gZWxzZSB7XG4gICAgLy8gIGNvbnNvbGUubG9nKFwiU3VjY2Vzc2Z1bGx5IGhhdmUgcHJvdmlkZXIuXCIpO1xuICAgIC8vfVxuICAgIGNvbnNvbGUubG9nKHRoaXMuc3RhdGUucHJvdmlkZXIpO1xuICB9XG4gICovXG5cbiAgYXN5bmMgY29ubmVjdFVzZXIoKSB7XG4gICAgdGhpcy5zZXRTdGF0ZSh7IGNvbm5lY3RXYWxsZXRDbGljazogdHJ1ZSB9KTtcbiAgICBjb25zb2xlLmxvZyh0aGlzLnN0YXRlLmlzV2FsbGV0Q29ubmVjdGVkKTtcbiAgICBjb25zb2xlLmxvZyhXZWIzQ29ubmVjdG9yKTtcbiAgfVxuXG4gIGNyZWF0ZU5GVCgpIHtcbiAgICBjb25zb2xlLmxvZyhcIk1JTlQgTUUgVEhBVCBNT05FWVwiKTtcbiAgfVxuXG4gIHJlbmRlcigpIHtcbiAgICByZXR1cm4gKFxuICAgICAgPExheW91dD5cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJjb25uZWN0LXdhbGxldFwiPlxuICAgICAgICAgIDxMaXN0IGRpdmlkZWQgcmVsYXhlZD5cbiAgICAgICAgICA8TGlzdC5JdGVtPlxuICAgICAgICAgICAgPEJ1dHRvblxuICAgICAgICAgICAgICBmbG9hdGVkPVwibGVmdFwiXG4gICAgICAgICAgICAgIGNvbnRlbnQ9XCJDb25uZWN0IFdhbGxldFwiXG4gICAgICAgICAgICAgIGljb249XCJhZGQgY2lyY2xlXCJcbiAgICAgICAgICAgICAgcHJpbWFyeVxuICAgICAgICAgICAgICBvbkNsaWNrPXt0aGlzLmNvbm5lY3RVc2VyfVxuICAgICAgICAgICAgICBkaXNhYmxlZD17dGhpcy5zdGF0ZS5pc1VzZXJDb25uZWN0ZWR9XG4gICAgICAgICAgICAvPlxuICAgICAgICAgIDwvTGlzdC5JdGVtPlxuICAgICAgICAgIDxMaXN0Lkl0ZW0+XG4gICAgICAgICAgICA8QnV0dG9uXG4gICAgICAgICAgICAgIGZsb2F0ZWQ9XCJsZWZ0XCJcbiAgICAgICAgICAgICAgY29udGVudD1cIkNyZWF0ZSBVbmlxdWUgTkZUXCJcbiAgICAgICAgICAgICAgaWNvbj1cImFkZCBjaXJjbGVcIlxuICAgICAgICAgICAgICBwcmltYXJ5XG4gICAgICAgICAgICAgIG9uQ2xpY2s9e3RoaXMuY3JlYXRlTkZUfVxuICAgICAgICAgICAgLz5cbiAgICAgICAgICA8L0xpc3QuSXRlbT5cbiAgICAgICAgICA8L0xpc3Q+XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9MYXlvdXQ+XG4gICAgKTtcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBNYWluXG4iXSwibmFtZXMiOlsiUmVhY3QiLCJDb21wb25lbnQiLCJCdXR0b24iLCJMaXN0IiwiTGF5b3V0IiwiZ2V0UHJvdmlkZXIiLCJkZXRlY3RFdGhlcmV1bVByb3ZpZGVyIiwiV2ViM0Nvbm5lY3RvciIsIk1haW4iLCJwcm9wcyIsInN0YXRlIiwicHJvdmlkZXIiLCJjdXJyZW50QWNjb3VudCIsImlzVXNlckNvbm5lY3RlZCIsImVycm9yTWVzc2FnZSIsImlzV2FsbGV0Q29ubmVjdGVkIiwiY29ubmVjdFdhbGxldENsaWNrIiwiY29ubmVjdFVzZXIiLCJiaW5kIiwiY29tcG9uZW50RGlkTW91bnQiLCJzZXRTdGF0ZSIsImNvbnNvbGUiLCJsb2ciLCJjcmVhdGVORlQiLCJyZW5kZXIiLCJkaXYiLCJjbGFzc05hbWUiLCJkaXZpZGVkIiwicmVsYXhlZCIsIkl0ZW0iLCJmbG9hdGVkIiwiY29udGVudCIsImljb24iLCJwcmltYXJ5Iiwib25DbGljayIsImRpc2FibGVkIl0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///./pages/index.js\n");

/***/ })

});
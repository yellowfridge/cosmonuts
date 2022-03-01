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

/***/ "./pages/ipfsConnection.js":
/*!*********************************!*\
  !*** ./pages/ipfsConnection.js ***!
  \*********************************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": function() { return /* binding */ ConnectionIPFS; }\n/* harmony export */ });\n/* harmony import */ var _home_redlentils_Seafile_Websites_avatarnft_node_modules_next_dist_compiled_regenerator_runtime_runtime_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./node_modules/next/dist/compiled/regenerator-runtime/runtime.js */ \"./node_modules/next/dist/compiled/regenerator-runtime/runtime.js\");\n/* harmony import */ var _home_redlentils_Seafile_Websites_avatarnft_node_modules_next_dist_compiled_regenerator_runtime_runtime_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_home_redlentils_Seafile_Websites_avatarnft_node_modules_next_dist_compiled_regenerator_runtime_runtime_js__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"./node_modules/react/jsx-dev-runtime.js\");\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react */ \"./node_modules/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var semantic_ui_react__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! semantic-ui-react */ \"./node_modules/semantic-ui-react/dist/es/index.js\");\n/* harmony import */ var ipfs_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ipfs-core */ \"./node_modules/ipfs-core/esm/src/index.js\");\n/* module decorator */ module = __webpack_require__.hmd(module);\n\n\n\n\n\nfunction asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {\n    try {\n        var info = gen[key](arg);\n        var value = info.value;\n    } catch (error) {\n        reject(error);\n        return;\n    }\n    if (info.done) {\n        resolve(value);\n    } else {\n        Promise.resolve(value).then(_next, _throw);\n    }\n}\nfunction _asyncToGenerator(fn) {\n    return function() {\n        var self = this, args = arguments;\n        return new Promise(function(resolve, reject) {\n            var gen = fn.apply(self, args);\n            function _next(value) {\n                asyncGeneratorStep(gen, resolve, reject, _next, _throw, \"next\", value);\n            }\n            function _throw(err) {\n                asyncGeneratorStep(gen, resolve, reject, _next, _throw, \"throw\", err);\n            }\n            _next(undefined);\n        });\n    };\n}\nvar _s = $RefreshSig$();\nfunction ConnectionIPFS(props) {\n    var handleChange = function handleChange(event) {\n        setMessage(event.target.value);\n    };\n    var copyToClipboard = function copyToClipboard(event) {\n        var copyInput = event.target.value;\n        copyInput.select();\n        document.execCommand('copy');\n        copyInput.remove();\n    };\n    _s();\n    var ref = (0,react__WEBPACK_IMPORTED_MODULE_2__.useState)(''), message = ref[0], setMessage = ref[1];\n    var ref1 = (0,react__WEBPACK_IMPORTED_MODULE_2__.useState)('This is where unique CID will be shown...'), ipfsCID = ref1[0], setIpfsCID = ref1[1];\n    var addtoIPFSClicked = function() {\n        var _ref = _asyncToGenerator(_home_redlentils_Seafile_Websites_avatarnft_node_modules_next_dist_compiled_regenerator_runtime_runtime_js__WEBPACK_IMPORTED_MODULE_0___default().mark(function _callee() {\n            var ipfs, cid;\n            return _home_redlentils_Seafile_Websites_avatarnft_node_modules_next_dist_compiled_regenerator_runtime_runtime_js__WEBPACK_IMPORTED_MODULE_0___default().wrap(function _callee$(_ctx) {\n                while(1)switch(_ctx.prev = _ctx.next){\n                    case 0:\n                        console.log('IN HERE BOI');\n                        console.log(\"Message\", message);\n                        _ctx.next = 4;\n                        return ipfs_core__WEBPACK_IMPORTED_MODULE_3__.create();\n                    case 4:\n                        ipfs = _ctx.sent;\n                        _ctx.next = 7;\n                        return ipfs.add(message);\n                    case 7:\n                        cid = _ctx.sent.cid;\n                        console.log(\"ipfs\", ipfs);\n                        console.log(\"cid\", cid.toString());\n                        setIpfsCID(cid);\n                    case 11:\n                    case \"end\":\n                        return _ctx.stop();\n                }\n            }, _callee);\n        }));\n        return function addtoIPFSClicked() {\n            return _ref.apply(this, arguments);\n        };\n    }();\n    // Needs its own change function for copy portion\n    return(/*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxDEV)(\"div\", {\n        children: [\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxDEV)(semantic_ui_react__WEBPACK_IMPORTED_MODULE_4__.Input, {\n                action: {\n                    content: 'Add to IPFS',\n                    onClick: function() {\n                        return addtoIPFSClicked();\n                    },\n                    color: 'teal'\n                },\n                placeholder: \"Place text to be saved to IPFS...\",\n                style: {\n                    width: '600px'\n                },\n                onChange: handleChange,\n                value: message\n            }, void 0, false, {\n                fileName: \"/home/redlentils/Seafile/Websites/avatarnft/pages/ipfsConnection.js\",\n                lineNumber: 35,\n                columnNumber: 5\n            }, this),\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxDEV)(semantic_ui_react__WEBPACK_IMPORTED_MODULE_4__.Divider, {\n                hidden: true\n            }, void 0, false, {\n                fileName: \"/home/redlentils/Seafile/Websites/avatarnft/pages/ipfsConnection.js\",\n                lineNumber: 46,\n                columnNumber: 5\n            }, this),\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxDEV)(semantic_ui_react__WEBPACK_IMPORTED_MODULE_4__.Input, {\n                disabled: true,\n                action: {\n                    content: 'Copy',\n                    color: 'teal',\n                    onClick: function() {\n                        return copyToClipboard();\n                    }\n                },\n                placeholder: \"\",\n                style: {\n                    width: '600px'\n                },\n                value: ipfsCID\n            }, void 0, false, {\n                fileName: \"/home/redlentils/Seafile/Websites/avatarnft/pages/ipfsConnection.js\",\n                lineNumber: 47,\n                columnNumber: 5\n            }, this)\n        ]\n    }, void 0, true, {\n        fileName: \"/home/redlentils/Seafile/Websites/avatarnft/pages/ipfsConnection.js\",\n        lineNumber: 34,\n        columnNumber: 5\n    }, this));\n};\n_s(ConnectionIPFS, \"ydl5Dim/4YgopXy3eRA6oLF6ZU8=\");\n_c = ConnectionIPFS;\nvar _c;\n$RefreshReg$(_c, \"ConnectionIPFS\");\n\n\n;\n    // Wrapped in an IIFE to avoid polluting the global scope\n    ;\n    (function () {\n        var _a, _b;\n        // Legacy CSS implementations will `eval` browser code in a Node.js context\n        // to extract CSS. For backwards compatibility, we need to check we're in a\n        // browser context before continuing.\n        if (typeof self !== 'undefined' &&\n            // AMP / No-JS mode does not inject these helpers:\n            '$RefreshHelpers$' in self) {\n            var currentExports = module.__proto__.exports;\n            var prevExports = (_b = (_a = module.hot.data) === null || _a === void 0 ? void 0 : _a.prevExports) !== null && _b !== void 0 ? _b : null;\n            // This cannot happen in MainTemplate because the exports mismatch between\n            // templating and execution.\n            self.$RefreshHelpers$.registerExportsForReactRefresh(currentExports, module.id);\n            // A module can be accepted automatically based on its exports, e.g. when\n            // it is a Refresh Boundary.\n            if (self.$RefreshHelpers$.isReactRefreshBoundary(currentExports)) {\n                // Save the previous exports on update so we can compare the boundary\n                // signatures.\n                module.hot.dispose(function (data) {\n                    data.prevExports = currentExports;\n                });\n                // Unconditionally accept an update to this module, we'll check if it's\n                // still a Refresh Boundary later.\n                module.hot.accept();\n                // This field is set when the previous version of this module was a\n                // Refresh Boundary, letting us know we need to check for invalidation or\n                // enqueue an update.\n                if (prevExports !== null) {\n                    // A boundary can become ineligible if its exports are incompatible\n                    // with the previous exports.\n                    //\n                    // For example, if you add/remove/change exports, we'll want to\n                    // re-execute the importing modules, and force those components to\n                    // re-render. Similarly, if you convert a class component to a\n                    // function, we want to invalidate the boundary.\n                    if (self.$RefreshHelpers$.shouldInvalidateReactRefreshBoundary(prevExports, currentExports)) {\n                        module.hot.invalidate();\n                    }\n                    else {\n                        self.$RefreshHelpers$.scheduleUpdate();\n                    }\n                }\n            }\n            else {\n                // Since we just executed the code for the module, it's possible that the\n                // new exports made it ineligible for being a boundary.\n                // We only care about the case when we were _previously_ a boundary,\n                // because we already accepted this update (accidental side effect).\n                var isNoLongerABoundary = prevExports !== null;\n                if (isNoLongerABoundary) {\n                    module.hot.invalidate();\n                }\n            }\n        }\n    })();\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9wYWdlcy9pcGZzQ29ubmVjdGlvbi5qcy5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7QUFBZ0M7QUFDMEI7QUFDekI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFFbEIsUUFBUSxDQUFDSyxjQUFjLENBQUNDLEtBQUssRUFBRSxDQUFDO1FBZXBDQyxZQUFZLEdBQXJCLFFBQVEsQ0FBQ0EsWUFBWSxDQUFDQyxLQUFLLEVBQUUsQ0FBQztRQUM1QkMsVUFBVSxDQUFDRCxLQUFLLENBQUNFLE1BQU0sQ0FBQ0MsS0FBSztJQUMvQixDQUFDO1FBRVFDLGVBQWUsR0FBeEIsUUFBUSxDQUFDQSxlQUFlLENBQUNKLEtBQUssRUFBRSxDQUFDO1FBQy9CLEdBQUcsQ0FBQ0ssU0FBUyxHQUFHTCxLQUFLLENBQUNFLE1BQU0sQ0FBQ0MsS0FBSztRQUNsQ0UsU0FBUyxDQUFDQyxNQUFNO1FBQ2hCQyxRQUFRLENBQUNDLFdBQVcsQ0FBQyxDQUFNO1FBQzNCSCxTQUFTLENBQUNJLE1BQU07SUFDbEIsQ0FBQzs7SUF0QkQsR0FBSyxDQUF5QmpCLEdBQVksR0FBWkEsK0NBQVEsQ0FBQyxDQUFFLElBQWxDa0IsT0FBTyxHQUFnQmxCLEdBQVksS0FBMUJTLFVBQVUsR0FBSVQsR0FBWTtJQUMxQyxHQUFLLENBQXlCQSxJQUFxRCxHQUFyREEsK0NBQVEsQ0FBQyxDQUEyQyw2Q0FBM0VtQixPQUFPLEdBQWdCbkIsSUFBcUQsS0FBbkVvQixVQUFVLEdBQUlwQixJQUFxRDtJQUVuRixHQUFLLENBQUNxQixnQkFBZ0I7NExBQUcsUUFBUSxXQUFJLENBQUM7Z0JBRzlCQyxJQUFJLEVBQ0ZDLEdBQUc7Ozs7d0JBSFhDLE9BQU8sQ0FBQ0MsR0FBRyxDQUFDLENBQWE7d0JBQ3pCRCxPQUFPLENBQUNDLEdBQUcsQ0FBQyxDQUFTLFVBQUVQLE9BQU87OytCQUNYZCw2Q0FBVzs7d0JBQXhCa0IsSUFBSTs7K0JBQ1lBLElBQUksQ0FBQ0ssR0FBRyxDQUFDVCxPQUFPOzt3QkFBOUJLLEdBQUcsYUFBSEEsR0FBRzt3QkFDWEMsT0FBTyxDQUFDQyxHQUFHLENBQUMsQ0FBTSxPQUFFSCxJQUFJO3dCQUN4QkUsT0FBTyxDQUFDQyxHQUFHLENBQUMsQ0FBSyxNQUFFRixHQUFHLENBQUNLLFFBQVE7d0JBQy9CUixVQUFVLENBQUNHLEdBQUc7Ozs7OztRQUNoQixDQUFDO3dCQVJLRixnQkFBZ0I7Ozs7SUFxQnRCLEVBQWlEO0lBRWpELE1BQU0sNkVBQ0hRLENBQUc7O3dGQUNIM0Isb0RBQUs7Z0JBQ0o0QixNQUFNLEVBQUUsQ0FBQztvQkFDUEMsT0FBTyxFQUFFLENBQWE7b0JBQ3RCQyxPQUFPLEVBQUUsUUFBUTt3QkFBRlgsTUFBTSxDQUFOQSxnQkFBZ0I7O29CQUMvQlksS0FBSyxFQUFFLENBQU07Z0JBQ2YsQ0FBQztnQkFDREMsV0FBVyxFQUFDLENBQW1DO2dCQUMvQ0MsS0FBSyxFQUFFLENBQUNDO29CQUFBQSxLQUFLLEVBQUUsQ0FBTztnQkFBQSxDQUFDO2dCQUN2QkMsUUFBUSxFQUFHOUIsWUFBWTtnQkFDdkJJLEtBQUssRUFBRU8sT0FBTzs7Ozs7O3dGQUVmZixzREFBTztnQkFBQ21DLE1BQU07Ozs7Ozt3RkFDZHBDLG9EQUFLO2dCQUNKcUMsUUFBUTtnQkFDUlQsTUFBTSxFQUFFLENBQUM7b0JBQ1BDLE9BQU8sRUFBRSxDQUFNO29CQUNmRSxLQUFLLEVBQUUsQ0FBTTtvQkFDYkQsT0FBTyxFQUFFLFFBQVE7d0JBQUZwQixNQUFNLENBQU5BLGVBQWU7O2dCQUNoQyxDQUFDO2dCQUNEc0IsV0FBVyxFQUFDLENBQUU7Z0JBQ2RDLEtBQUssRUFBRSxDQUFDQztvQkFBQUEsS0FBSyxFQUFFLENBQU87Z0JBQUEsQ0FBQztnQkFDdkJ6QixLQUFLLEVBQUVRLE9BQU87Ozs7Ozs7Ozs7OztBQUlwQixDQUFDO0dBdkR1QmQsY0FBYztLQUFkQSxjQUFjIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vX05fRS8uL3BhZ2VzL2lwZnNDb25uZWN0aW9uLmpzPzlkNmUiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgdXNlU3RhdGUgfSBmcm9tICdyZWFjdCc7XG5pbXBvcnQgeyBCdXR0b24sIElucHV0LCBEaXZpZGVyIH0gZnJvbSAnc2VtYW50aWMtdWktcmVhY3QnO1xuaW1wb3J0ICogYXMgSVBGUyBmcm9tICdpcGZzLWNvcmUnO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBDb25uZWN0aW9uSVBGUyhwcm9wcykge1xuXG4gIGNvbnN0IFttZXNzYWdlLCBzZXRNZXNzYWdlXSA9IHVzZVN0YXRlKCcnKVxuICBjb25zdCBbaXBmc0NJRCwgc2V0SXBmc0NJRF0gPSB1c2VTdGF0ZSgnVGhpcyBpcyB3aGVyZSB1bmlxdWUgQ0lEIHdpbGwgYmUgc2hvd24uLi4nKVxuXG4gIGNvbnN0IGFkZHRvSVBGU0NsaWNrZWQgPSBhc3luYyAoKSA9PiB7XG4gICAgY29uc29sZS5sb2coJ0lOIEhFUkUgQk9JJyk7XG4gICAgY29uc29sZS5sb2coXCJNZXNzYWdlXCIsIG1lc3NhZ2UpO1xuICAgIGNvbnN0IGlwZnMgPSBhd2FpdCBJUEZTLmNyZWF0ZSgpO1xuICAgIGNvbnN0IHsgY2lkIH0gPSBhd2FpdCBpcGZzLmFkZChtZXNzYWdlKTtcbiAgICBjb25zb2xlLmxvZyhcImlwZnNcIiwgaXBmcylcbiAgICBjb25zb2xlLmxvZyhcImNpZFwiLCBjaWQudG9TdHJpbmcoKSk7XG4gICAgc2V0SXBmc0NJRChjaWQpO1xuICB9XG5cbiAgZnVuY3Rpb24gaGFuZGxlQ2hhbmdlKGV2ZW50KSB7XG4gICAgc2V0TWVzc2FnZShldmVudC50YXJnZXQudmFsdWUpO1xuICB9XG5cbiAgZnVuY3Rpb24gY29weVRvQ2xpcGJvYXJkKGV2ZW50KSB7XG4gICAgdmFyIGNvcHlJbnB1dCA9IGV2ZW50LnRhcmdldC52YWx1ZTtcbiAgICBjb3B5SW5wdXQuc2VsZWN0KCk7XG4gICAgZG9jdW1lbnQuZXhlY0NvbW1hbmQoJ2NvcHknKTtcbiAgICBjb3B5SW5wdXQucmVtb3ZlKCk7XG4gIH1cblxuICAvLyBOZWVkcyBpdHMgb3duIGNoYW5nZSBmdW5jdGlvbiBmb3IgY29weSBwb3J0aW9uXG5cbiAgcmV0dXJuIChcbiAgICA8ZGl2PlxuICAgIDxJbnB1dFxuICAgICAgYWN0aW9uPXt7XG4gICAgICAgIGNvbnRlbnQ6ICdBZGQgdG8gSVBGUycsXG4gICAgICAgIG9uQ2xpY2s6ICgpID0+IGFkZHRvSVBGU0NsaWNrZWQoKSxcbiAgICAgICAgY29sb3I6ICd0ZWFsJ1xuICAgICAgfX1cbiAgICAgIHBsYWNlaG9sZGVyPSdQbGFjZSB0ZXh0IHRvIGJlIHNhdmVkIHRvIElQRlMuLi4nXG4gICAgICBzdHlsZT17e3dpZHRoOiAnNjAwcHgnfX1cbiAgICAgIG9uQ2hhbmdlPSB7aGFuZGxlQ2hhbmdlfVxuICAgICAgdmFsdWU9e21lc3NhZ2V9XG4gICAgLz5cbiAgICA8RGl2aWRlciBoaWRkZW4gLz5cbiAgICA8SW5wdXRcbiAgICAgIGRpc2FibGVkXG4gICAgICBhY3Rpb249e3tcbiAgICAgICAgY29udGVudDogJ0NvcHknLFxuICAgICAgICBjb2xvcjogJ3RlYWwnLFxuICAgICAgICBvbkNsaWNrOiAoKSA9PiBjb3B5VG9DbGlwYm9hcmQoKSxcbiAgICAgIH19XG4gICAgICBwbGFjZWhvbGRlcj0nJ1xuICAgICAgc3R5bGU9e3t3aWR0aDogJzYwMHB4J319XG4gICAgICB2YWx1ZT17aXBmc0NJRH1cbiAgICAvPlxuICAgIDwvZGl2PlxuICApXG59XG4iXSwibmFtZXMiOlsidXNlU3RhdGUiLCJCdXR0b24iLCJJbnB1dCIsIkRpdmlkZXIiLCJJUEZTIiwiQ29ubmVjdGlvbklQRlMiLCJwcm9wcyIsImhhbmRsZUNoYW5nZSIsImV2ZW50Iiwic2V0TWVzc2FnZSIsInRhcmdldCIsInZhbHVlIiwiY29weVRvQ2xpcGJvYXJkIiwiY29weUlucHV0Iiwic2VsZWN0IiwiZG9jdW1lbnQiLCJleGVjQ29tbWFuZCIsInJlbW92ZSIsIm1lc3NhZ2UiLCJpcGZzQ0lEIiwic2V0SXBmc0NJRCIsImFkZHRvSVBGU0NsaWNrZWQiLCJpcGZzIiwiY2lkIiwiY29uc29sZSIsImxvZyIsImNyZWF0ZSIsImFkZCIsInRvU3RyaW5nIiwiZGl2IiwiYWN0aW9uIiwiY29udGVudCIsIm9uQ2xpY2siLCJjb2xvciIsInBsYWNlaG9sZGVyIiwic3R5bGUiLCJ3aWR0aCIsIm9uQ2hhbmdlIiwiaGlkZGVuIiwiZGlzYWJsZWQiXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///./pages/ipfsConnection.js\n");

/***/ })

});
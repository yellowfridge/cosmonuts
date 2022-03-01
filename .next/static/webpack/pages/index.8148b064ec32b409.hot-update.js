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

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": function() { return /* binding */ ConnectionIPFS; }\n/* harmony export */ });\n/* harmony import */ var _home_redlentils_Seafile_Websites_avatarnft_node_modules_next_dist_compiled_regenerator_runtime_runtime_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./node_modules/next/dist/compiled/regenerator-runtime/runtime.js */ \"./node_modules/next/dist/compiled/regenerator-runtime/runtime.js\");\n/* harmony import */ var _home_redlentils_Seafile_Websites_avatarnft_node_modules_next_dist_compiled_regenerator_runtime_runtime_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_home_redlentils_Seafile_Websites_avatarnft_node_modules_next_dist_compiled_regenerator_runtime_runtime_js__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"./node_modules/react/jsx-dev-runtime.js\");\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react */ \"./node_modules/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var semantic_ui_react__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! semantic-ui-react */ \"./node_modules/semantic-ui-react/dist/es/index.js\");\n/* harmony import */ var ipfs_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ipfs-core */ \"./node_modules/ipfs-core/esm/src/index.js\");\n/* module decorator */ module = __webpack_require__.hmd(module);\n\n\n\n\n\nfunction asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {\n    try {\n        var info = gen[key](arg);\n        var value = info.value;\n    } catch (error) {\n        reject(error);\n        return;\n    }\n    if (info.done) {\n        resolve(value);\n    } else {\n        Promise.resolve(value).then(_next, _throw);\n    }\n}\nfunction _asyncToGenerator(fn) {\n    return function() {\n        var self = this, args = arguments;\n        return new Promise(function(resolve, reject) {\n            var gen = fn.apply(self, args);\n            function _next(value) {\n                asyncGeneratorStep(gen, resolve, reject, _next, _throw, \"next\", value);\n            }\n            function _throw(err) {\n                asyncGeneratorStep(gen, resolve, reject, _next, _throw, \"throw\", err);\n            }\n            _next(undefined);\n        });\n    };\n}\nvar _s = $RefreshSig$();\nfunction ConnectionIPFS(props) {\n    var handleChange = function handleChange(event) {\n        setMessage(event.target.value);\n    };\n    var copyToClipboard = function copyToClipboard(cidValue) {\n        console.log(\"CID Value\", cidValue.toString());\n        cidValue.select();\n        document.execCommand('copy');\n        cidValue.remove();\n    };\n    var handleCIDChange = // Needs its own change function for copy portion\n    function handleCIDChange(event) {\n        setIpfsCID(event.target.value);\n    };\n    _s();\n    var ref = (0,react__WEBPACK_IMPORTED_MODULE_2__.useState)(''), message = ref[0], setMessage = ref[1];\n    var ref1 = (0,react__WEBPACK_IMPORTED_MODULE_2__.useState)('This is where unique CID will be shown...'), ipfsCID = ref1[0], setIpfsCID = ref1[1];\n    var addtoIPFSClicked = function() {\n        var _ref = _asyncToGenerator(_home_redlentils_Seafile_Websites_avatarnft_node_modules_next_dist_compiled_regenerator_runtime_runtime_js__WEBPACK_IMPORTED_MODULE_0___default().mark(function _callee() {\n            var ipfs, cid;\n            return _home_redlentils_Seafile_Websites_avatarnft_node_modules_next_dist_compiled_regenerator_runtime_runtime_js__WEBPACK_IMPORTED_MODULE_0___default().wrap(function _callee$(_ctx) {\n                while(1)switch(_ctx.prev = _ctx.next){\n                    case 0:\n                        console.log('IN HERE BOI');\n                        console.log(\"Message\", message);\n                        _ctx.next = 4;\n                        return ipfs_core__WEBPACK_IMPORTED_MODULE_3__.create();\n                    case 4:\n                        ipfs = _ctx.sent;\n                        _ctx.next = 7;\n                        return ipfs.add(message);\n                    case 7:\n                        cid = _ctx.sent.cid;\n                        console.log(\"ipfs\", ipfs);\n                        console.log(\"cid\", cid.toString());\n                        setIpfsCID(cid);\n                    case 11:\n                    case \"end\":\n                        return _ctx.stop();\n                }\n            }, _callee);\n        }));\n        return function addtoIPFSClicked() {\n            return _ref.apply(this, arguments);\n        };\n    }();\n    return(/*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxDEV)(\"div\", {\n        children: [\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxDEV)(semantic_ui_react__WEBPACK_IMPORTED_MODULE_4__.Input, {\n                action: {\n                    content: 'Add to IPFS',\n                    onClick: function() {\n                        return addtoIPFSClicked();\n                    },\n                    color: 'teal'\n                },\n                placeholder: \"Place text to be saved to IPFS...\",\n                style: {\n                    width: '600px'\n                },\n                onChange: handleChange,\n                value: message\n            }, void 0, false, {\n                fileName: \"/home/redlentils/Seafile/Websites/avatarnft/pages/ipfsConnection.js\",\n                lineNumber: 38,\n                columnNumber: 5\n            }, this),\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxDEV)(semantic_ui_react__WEBPACK_IMPORTED_MODULE_4__.Divider, {\n                hidden: true\n            }, void 0, false, {\n                fileName: \"/home/redlentils/Seafile/Websites/avatarnft/pages/ipfsConnection.js\",\n                lineNumber: 49,\n                columnNumber: 5\n            }, this),\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxDEV)(semantic_ui_react__WEBPACK_IMPORTED_MODULE_4__.Input, {\n                disabled: true,\n                action: {\n                    content: 'Copy',\n                    color: 'teal',\n                    onClick: function() {\n                        return copyToClipboard(ipfsCID);\n                    }\n                },\n                placeholder: \"\",\n                style: {\n                    width: '600px'\n                },\n                onChange: handleCIDChange,\n                value: ipfsCID\n            }, void 0, false, {\n                fileName: \"/home/redlentils/Seafile/Websites/avatarnft/pages/ipfsConnection.js\",\n                lineNumber: 50,\n                columnNumber: 5\n            }, this)\n        ]\n    }, void 0, true, {\n        fileName: \"/home/redlentils/Seafile/Websites/avatarnft/pages/ipfsConnection.js\",\n        lineNumber: 37,\n        columnNumber: 5\n    }, this));\n};\n_s(ConnectionIPFS, \"ydl5Dim/4YgopXy3eRA6oLF6ZU8=\");\n_c = ConnectionIPFS;\nvar _c;\n$RefreshReg$(_c, \"ConnectionIPFS\");\n\n\n;\n    // Wrapped in an IIFE to avoid polluting the global scope\n    ;\n    (function () {\n        var _a, _b;\n        // Legacy CSS implementations will `eval` browser code in a Node.js context\n        // to extract CSS. For backwards compatibility, we need to check we're in a\n        // browser context before continuing.\n        if (typeof self !== 'undefined' &&\n            // AMP / No-JS mode does not inject these helpers:\n            '$RefreshHelpers$' in self) {\n            var currentExports = module.__proto__.exports;\n            var prevExports = (_b = (_a = module.hot.data) === null || _a === void 0 ? void 0 : _a.prevExports) !== null && _b !== void 0 ? _b : null;\n            // This cannot happen in MainTemplate because the exports mismatch between\n            // templating and execution.\n            self.$RefreshHelpers$.registerExportsForReactRefresh(currentExports, module.id);\n            // A module can be accepted automatically based on its exports, e.g. when\n            // it is a Refresh Boundary.\n            if (self.$RefreshHelpers$.isReactRefreshBoundary(currentExports)) {\n                // Save the previous exports on update so we can compare the boundary\n                // signatures.\n                module.hot.dispose(function (data) {\n                    data.prevExports = currentExports;\n                });\n                // Unconditionally accept an update to this module, we'll check if it's\n                // still a Refresh Boundary later.\n                module.hot.accept();\n                // This field is set when the previous version of this module was a\n                // Refresh Boundary, letting us know we need to check for invalidation or\n                // enqueue an update.\n                if (prevExports !== null) {\n                    // A boundary can become ineligible if its exports are incompatible\n                    // with the previous exports.\n                    //\n                    // For example, if you add/remove/change exports, we'll want to\n                    // re-execute the importing modules, and force those components to\n                    // re-render. Similarly, if you convert a class component to a\n                    // function, we want to invalidate the boundary.\n                    if (self.$RefreshHelpers$.shouldInvalidateReactRefreshBoundary(prevExports, currentExports)) {\n                        module.hot.invalidate();\n                    }\n                    else {\n                        self.$RefreshHelpers$.scheduleUpdate();\n                    }\n                }\n            }\n            else {\n                // Since we just executed the code for the module, it's possible that the\n                // new exports made it ineligible for being a boundary.\n                // We only care about the case when we were _previously_ a boundary,\n                // because we already accepted this update (accidental side effect).\n                var isNoLongerABoundary = prevExports !== null;\n                if (isNoLongerABoundary) {\n                    module.hot.invalidate();\n                }\n            }\n        }\n    })();\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,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VixLQUFLLEVBQUVhLE9BQU87Ozs7Ozs7Ozs7OztBQUlwQixDQUFDO0dBM0R1Qm5CLGNBQWM7S0FBZEEsY0FBYyIsInNvdXJjZXMiOlsid2VicGFjazovL19OX0UvLi9wYWdlcy9pcGZzQ29ubmVjdGlvbi5qcz85ZDZlIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IHVzZVN0YXRlIH0gZnJvbSAncmVhY3QnO1xuaW1wb3J0IHsgQnV0dG9uLCBJbnB1dCwgRGl2aWRlciB9IGZyb20gJ3NlbWFudGljLXVpLXJlYWN0JztcbmltcG9ydCAqIGFzIElQRlMgZnJvbSAnaXBmcy1jb3JlJztcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gQ29ubmVjdGlvbklQRlMocHJvcHMpIHtcblxuICBjb25zdCBbbWVzc2FnZSwgc2V0TWVzc2FnZV0gPSB1c2VTdGF0ZSgnJylcbiAgY29uc3QgW2lwZnNDSUQsIHNldElwZnNDSURdID0gdXNlU3RhdGUoJ1RoaXMgaXMgd2hlcmUgdW5pcXVlIENJRCB3aWxsIGJlIHNob3duLi4uJylcblxuICBjb25zdCBhZGR0b0lQRlNDbGlja2VkID0gYXN5bmMgKCkgPT4ge1xuICAgIGNvbnNvbGUubG9nKCdJTiBIRVJFIEJPSScpO1xuICAgIGNvbnNvbGUubG9nKFwiTWVzc2FnZVwiLCBtZXNzYWdlKTtcbiAgICBjb25zdCBpcGZzID0gYXdhaXQgSVBGUy5jcmVhdGUoKTtcbiAgICBjb25zdCB7IGNpZCB9ID0gYXdhaXQgaXBmcy5hZGQobWVzc2FnZSk7XG4gICAgY29uc29sZS5sb2coXCJpcGZzXCIsIGlwZnMpXG4gICAgY29uc29sZS5sb2coXCJjaWRcIiwgY2lkLnRvU3RyaW5nKCkpO1xuICAgIHNldElwZnNDSUQoY2lkKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGhhbmRsZUNoYW5nZShldmVudCkge1xuICAgIHNldE1lc3NhZ2UoZXZlbnQudGFyZ2V0LnZhbHVlKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGNvcHlUb0NsaXBib2FyZChjaWRWYWx1ZSkge1xuICAgIGNvbnNvbGUubG9nKFwiQ0lEIFZhbHVlXCIsIGNpZFZhbHVlLnRvU3RyaW5nKCkpO1xuICAgIGNpZFZhbHVlLnNlbGVjdCgpO1xuICAgIGRvY3VtZW50LmV4ZWNDb21tYW5kKCdjb3B5Jyk7XG4gICAgY2lkVmFsdWUucmVtb3ZlKCk7XG4gIH1cblxuICAvLyBOZWVkcyBpdHMgb3duIGNoYW5nZSBmdW5jdGlvbiBmb3IgY29weSBwb3J0aW9uXG4gIGZ1bmN0aW9uIGhhbmRsZUNJRENoYW5nZShldmVudCkge1xuICAgIHNldElwZnNDSUQoZXZlbnQudGFyZ2V0LnZhbHVlKTtcbiAgfVxuXG4gIHJldHVybiAoXG4gICAgPGRpdj5cbiAgICA8SW5wdXRcbiAgICAgIGFjdGlvbj17e1xuICAgICAgICBjb250ZW50OiAnQWRkIHRvIElQRlMnLFxuICAgICAgICBvbkNsaWNrOiAoKSA9PiBhZGR0b0lQRlNDbGlja2VkKCksXG4gICAgICAgIGNvbG9yOiAndGVhbCdcbiAgICAgIH19XG4gICAgICBwbGFjZWhvbGRlcj0nUGxhY2UgdGV4dCB0byBiZSBzYXZlZCB0byBJUEZTLi4uJ1xuICAgICAgc3R5bGU9e3t3aWR0aDogJzYwMHB4J319XG4gICAgICBvbkNoYW5nZT17aGFuZGxlQ2hhbmdlfVxuICAgICAgdmFsdWU9e21lc3NhZ2V9XG4gICAgLz5cbiAgICA8RGl2aWRlciBoaWRkZW4gLz5cbiAgICA8SW5wdXRcbiAgICAgIGRpc2FibGVkXG4gICAgICBhY3Rpb249e3tcbiAgICAgICAgY29udGVudDogJ0NvcHknLFxuICAgICAgICBjb2xvcjogJ3RlYWwnLFxuICAgICAgICBvbkNsaWNrOiAoKSA9PiBjb3B5VG9DbGlwYm9hcmQoaXBmc0NJRCksXG4gICAgICB9fVxuICAgICAgcGxhY2Vob2xkZXI9JydcbiAgICAgIHN0eWxlPXt7d2lkdGg6ICc2MDBweCd9fVxuICAgICAgb25DaGFuZ2U9e2hhbmRsZUNJRENoYW5nZX1cbiAgICAgIHZhbHVlPXtpcGZzQ0lEfVxuICAgIC8+XG4gICAgPC9kaXY+XG4gIClcbn1cbiJdLCJuYW1lcyI6WyJ1c2VTdGF0ZSIsIkJ1dHRvbiIsIklucHV0IiwiRGl2aWRlciIsIklQRlMiLCJDb25uZWN0aW9uSVBGUyIsInByb3BzIiwiaGFuZGxlQ2hhbmdlIiwiZXZlbnQiLCJzZXRNZXNzYWdlIiwidGFyZ2V0IiwidmFsdWUiLCJjb3B5VG9DbGlwYm9hcmQiLCJjaWRWYWx1ZSIsImNvbnNvbGUiLCJsb2ciLCJ0b1N0cmluZyIsInNlbGVjdCIsImRvY3VtZW50IiwiZXhlY0NvbW1hbmQiLCJyZW1vdmUiLCJoYW5kbGVDSURDaGFuZ2UiLCJzZXRJcGZzQ0lEIiwibWVzc2FnZSIsImlwZnNDSUQiLCJhZGR0b0lQRlNDbGlja2VkIiwiaXBmcyIsImNpZCIsImNyZWF0ZSIsImFkZCIsImRpdiIsImFjdGlvbiIsImNvbnRlbnQiLCJvbkNsaWNrIiwiY29sb3IiLCJwbGFjZWhvbGRlciIsInN0eWxlIiwid2lkdGgiLCJvbkNoYW5nZSIsImhpZGRlbiIsImRpc2FibGVkIl0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///./pages/ipfsConnection.js\n");

/***/ })

});
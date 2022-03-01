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

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": function() { return /* binding */ ConnectionIPFS; }\n/* harmony export */ });\n/* harmony import */ var _home_redlentils_Seafile_Websites_avatarnft_node_modules_next_dist_compiled_regenerator_runtime_runtime_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./node_modules/next/dist/compiled/regenerator-runtime/runtime.js */ \"./node_modules/next/dist/compiled/regenerator-runtime/runtime.js\");\n/* harmony import */ var _home_redlentils_Seafile_Websites_avatarnft_node_modules_next_dist_compiled_regenerator_runtime_runtime_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_home_redlentils_Seafile_Websites_avatarnft_node_modules_next_dist_compiled_regenerator_runtime_runtime_js__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"./node_modules/react/jsx-dev-runtime.js\");\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react */ \"./node_modules/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var semantic_ui_react__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! semantic-ui-react */ \"./node_modules/semantic-ui-react/dist/es/index.js\");\n/* harmony import */ var ipfs_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ipfs-core */ \"./node_modules/ipfs-core/esm/src/index.js\");\n/* module decorator */ module = __webpack_require__.hmd(module);\n\n\n\n\n\nfunction asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {\n    try {\n        var info = gen[key](arg);\n        var value = info.value;\n    } catch (error) {\n        reject(error);\n        return;\n    }\n    if (info.done) {\n        resolve(value);\n    } else {\n        Promise.resolve(value).then(_next, _throw);\n    }\n}\nfunction _asyncToGenerator(fn) {\n    return function() {\n        var self = this, args = arguments;\n        return new Promise(function(resolve, reject) {\n            var gen = fn.apply(self, args);\n            function _next(value) {\n                asyncGeneratorStep(gen, resolve, reject, _next, _throw, \"next\", value);\n            }\n            function _throw(err) {\n                asyncGeneratorStep(gen, resolve, reject, _next, _throw, \"throw\", err);\n            }\n            _next(undefined);\n        });\n    };\n}\nvar _s = $RefreshSig$();\nfunction ConnectionIPFS(props) {\n    var handleChange = function handleChange(event) {\n        setMessage(event.target.value);\n    };\n    var copyToClipboard = function copyToClipboard(event) {\n        console.log(\"event\", event);\n        console.log(\"copyArea\", this.cidValue.select());\n    //cidValue.toString().select();\n    //document.execCommand('copy');\n    //cidValue.toString().remove();\n    };\n    var handleCIDChange = function handleCIDChange(event) {\n        setIpfsCID(event.target.value);\n    };\n    _s();\n    var ref = (0,react__WEBPACK_IMPORTED_MODULE_2__.useState)(''), message = ref[0], setMessage = ref[1];\n    var ref1 = (0,react__WEBPACK_IMPORTED_MODULE_2__.useState)('This is where unique CID will be shown...'), ipfsCID = ref1[0], setIpfsCID = ref1[1];\n    var addtoIPFSClicked = function() {\n        var _ref = _asyncToGenerator(_home_redlentils_Seafile_Websites_avatarnft_node_modules_next_dist_compiled_regenerator_runtime_runtime_js__WEBPACK_IMPORTED_MODULE_0___default().mark(function _callee() {\n            var ipfs, cid;\n            return _home_redlentils_Seafile_Websites_avatarnft_node_modules_next_dist_compiled_regenerator_runtime_runtime_js__WEBPACK_IMPORTED_MODULE_0___default().wrap(function _callee$(_ctx) {\n                while(1)switch(_ctx.prev = _ctx.next){\n                    case 0:\n                        console.log('IN HERE BOI');\n                        console.log(\"Message\", message);\n                        _ctx.next = 4;\n                        return ipfs_core__WEBPACK_IMPORTED_MODULE_3__.create();\n                    case 4:\n                        ipfs = _ctx.sent;\n                        _ctx.next = 7;\n                        return ipfs.add(message);\n                    case 7:\n                        cid = _ctx.sent.cid;\n                        console.log(\"ipfs\", ipfs);\n                        console.log(\"cid\", cid.toString());\n                        setIpfsCID(cid);\n                    case 11:\n                    case \"end\":\n                        return _ctx.stop();\n                }\n            }, _callee);\n        }));\n        return function addtoIPFSClicked() {\n            return _ref.apply(this, arguments);\n        };\n    }();\n    return(/*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxDEV)(\"div\", {\n        children: [\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxDEV)(semantic_ui_react__WEBPACK_IMPORTED_MODULE_4__.Input, {\n                action: {\n                    content: 'Add to IPFS',\n                    onClick: function() {\n                        return addtoIPFSClicked();\n                    },\n                    color: 'teal'\n                },\n                placeholder: \"Place text to be saved to IPFS...\",\n                style: {\n                    width: '600px'\n                },\n                onChange: handleChange,\n                value: message\n            }, void 0, false, {\n                fileName: \"/home/redlentils/Seafile/Websites/avatarnft/pages/ipfsConnection.js\",\n                lineNumber: 38,\n                columnNumber: 5\n            }, this),\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxDEV)(semantic_ui_react__WEBPACK_IMPORTED_MODULE_4__.Divider, {\n                hidden: true\n            }, void 0, false, {\n                fileName: \"/home/redlentils/Seafile/Websites/avatarnft/pages/ipfsConnection.js\",\n                lineNumber: 49,\n                columnNumber: 5\n            }, this),\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxDEV)(semantic_ui_react__WEBPACK_IMPORTED_MODULE_4__.Input, {\n                disabled: true,\n                action: {\n                    content: 'Copy',\n                    color: 'teal',\n                    onClick: function() {\n                        return copyToClipboard(ipfsCID);\n                    }\n                },\n                placeholder: \"\",\n                style: {\n                    width: '600px'\n                },\n                onChange: handleCIDChange,\n                value: ipfsCID\n            }, void 0, false, {\n                fileName: \"/home/redlentils/Seafile/Websites/avatarnft/pages/ipfsConnection.js\",\n                lineNumber: 50,\n                columnNumber: 5\n            }, this)\n        ]\n    }, void 0, true, {\n        fileName: \"/home/redlentils/Seafile/Websites/avatarnft/pages/ipfsConnection.js\",\n        lineNumber: 37,\n        columnNumber: 5\n    }, this));\n};\n_s(ConnectionIPFS, \"ydl5Dim/4YgopXy3eRA6oLF6ZU8=\");\n_c = ConnectionIPFS;\nvar _c;\n$RefreshReg$(_c, \"ConnectionIPFS\");\n\n\n;\n    // Wrapped in an IIFE to avoid polluting the global scope\n    ;\n    (function () {\n        var _a, _b;\n        // Legacy CSS implementations will `eval` browser code in a Node.js context\n        // to extract CSS. For backwards compatibility, we need to check we're in a\n        // browser context before continuing.\n        if (typeof self !== 'undefined' &&\n            // AMP / No-JS mode does not inject these helpers:\n            '$RefreshHelpers$' in self) {\n            var currentExports = module.__proto__.exports;\n            var prevExports = (_b = (_a = module.hot.data) === null || _a === void 0 ? void 0 : _a.prevExports) !== null && _b !== void 0 ? _b : null;\n            // This cannot happen in MainTemplate because the exports mismatch between\n            // templating and execution.\n            self.$RefreshHelpers$.registerExportsForReactRefresh(currentExports, module.id);\n            // A module can be accepted automatically based on its exports, e.g. when\n            // it is a Refresh Boundary.\n            if (self.$RefreshHelpers$.isReactRefreshBoundary(currentExports)) {\n                // Save the previous exports on update so we can compare the boundary\n                // signatures.\n                module.hot.dispose(function (data) {\n                    data.prevExports = currentExports;\n                });\n                // Unconditionally accept an update to this module, we'll check if it's\n                // still a Refresh Boundary later.\n                module.hot.accept();\n                // This field is set when the previous version of this module was a\n                // Refresh Boundary, letting us know we need to check for invalidation or\n                // enqueue an update.\n                if (prevExports !== null) {\n                    // A boundary can become ineligible if its exports are incompatible\n                    // with the previous exports.\n                    //\n                    // For example, if you add/remove/change exports, we'll want to\n                    // re-execute the importing modules, and force those components to\n                    // re-render. Similarly, if you convert a class component to a\n                    // function, we want to invalidate the boundary.\n                    if (self.$RefreshHelpers$.shouldInvalidateReactRefreshBoundary(prevExports, currentExports)) {\n                        module.hot.invalidate();\n                    }\n                    else {\n                        self.$RefreshHelpers$.scheduleUpdate();\n                    }\n                }\n            }\n            else {\n                // Since we just executed the code for the module, it's possible that the\n                // new exports made it ineligible for being a boundary.\n                // We only care about the case when we were _previously_ a boundary,\n                // because we already accepted this update (accidental side effect).\n                var isNoLongerABoundary = prevExports !== null;\n                if (isNoLongerABoundary) {\n                    module.hot.invalidate();\n                }\n            }\n        }\n    })();\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,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LEtBQUssRUFBRVMsT0FBTzs7Ozs7Ozs7Ozs7O0FBSXBCLENBQUM7R0EzRHVCZixjQUFjO0tBQWRBLGNBQWMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9fTl9FLy4vcGFnZXMvaXBmc0Nvbm5lY3Rpb24uanM/OWQ2ZSJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyB1c2VTdGF0ZSB9IGZyb20gJ3JlYWN0JztcbmltcG9ydCB7IEJ1dHRvbiwgSW5wdXQsIERpdmlkZXIgfSBmcm9tICdzZW1hbnRpYy11aS1yZWFjdCc7XG5pbXBvcnQgKiBhcyBJUEZTIGZyb20gJ2lwZnMtY29yZSc7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIENvbm5lY3Rpb25JUEZTKHByb3BzKSB7XG5cbiAgY29uc3QgW21lc3NhZ2UsIHNldE1lc3NhZ2VdID0gdXNlU3RhdGUoJycpXG4gIGNvbnN0IFtpcGZzQ0lELCBzZXRJcGZzQ0lEXSA9IHVzZVN0YXRlKCdUaGlzIGlzIHdoZXJlIHVuaXF1ZSBDSUQgd2lsbCBiZSBzaG93bi4uLicpXG5cbiAgY29uc3QgYWRkdG9JUEZTQ2xpY2tlZCA9IGFzeW5jICgpID0+IHtcbiAgICBjb25zb2xlLmxvZygnSU4gSEVSRSBCT0knKTtcbiAgICBjb25zb2xlLmxvZyhcIk1lc3NhZ2VcIiwgbWVzc2FnZSk7XG4gICAgY29uc3QgaXBmcyA9IGF3YWl0IElQRlMuY3JlYXRlKCk7XG4gICAgY29uc3QgeyBjaWQgfSA9IGF3YWl0IGlwZnMuYWRkKG1lc3NhZ2UpO1xuICAgIGNvbnNvbGUubG9nKFwiaXBmc1wiLCBpcGZzKVxuICAgIGNvbnNvbGUubG9nKFwiY2lkXCIsIGNpZC50b1N0cmluZygpKTtcbiAgICBzZXRJcGZzQ0lEKGNpZCk7XG4gIH1cblxuICBmdW5jdGlvbiBoYW5kbGVDaGFuZ2UoZXZlbnQpIHtcbiAgICBzZXRNZXNzYWdlKGV2ZW50LnRhcmdldC52YWx1ZSk7XG4gIH1cblxuICBmdW5jdGlvbiBjb3B5VG9DbGlwYm9hcmQoZXZlbnQpIHtcbiAgICBjb25zb2xlLmxvZyhcImV2ZW50XCIsIGV2ZW50KTtcbiAgICBjb25zb2xlLmxvZyhcImNvcHlBcmVhXCIsIHRoaXMuY2lkVmFsdWUuc2VsZWN0KCkpO1xuICAgIC8vY2lkVmFsdWUudG9TdHJpbmcoKS5zZWxlY3QoKTtcbiAgICAvL2RvY3VtZW50LmV4ZWNDb21tYW5kKCdjb3B5Jyk7XG4gICAgLy9jaWRWYWx1ZS50b1N0cmluZygpLnJlbW92ZSgpO1xuICB9XG5cbiAgZnVuY3Rpb24gaGFuZGxlQ0lEQ2hhbmdlKGV2ZW50KSB7XG4gICAgc2V0SXBmc0NJRChldmVudC50YXJnZXQudmFsdWUpO1xuICB9XG5cbiAgcmV0dXJuIChcbiAgICA8ZGl2PlxuICAgIDxJbnB1dFxuICAgICAgYWN0aW9uPXt7XG4gICAgICAgIGNvbnRlbnQ6ICdBZGQgdG8gSVBGUycsXG4gICAgICAgIG9uQ2xpY2s6ICgpID0+IGFkZHRvSVBGU0NsaWNrZWQoKSxcbiAgICAgICAgY29sb3I6ICd0ZWFsJ1xuICAgICAgfX1cbiAgICAgIHBsYWNlaG9sZGVyPSdQbGFjZSB0ZXh0IHRvIGJlIHNhdmVkIHRvIElQRlMuLi4nXG4gICAgICBzdHlsZT17e3dpZHRoOiAnNjAwcHgnfX1cbiAgICAgIG9uQ2hhbmdlPXtoYW5kbGVDaGFuZ2V9XG4gICAgICB2YWx1ZT17bWVzc2FnZX1cbiAgICAvPlxuICAgIDxEaXZpZGVyIGhpZGRlbiAvPlxuICAgIDxJbnB1dFxuICAgICAgZGlzYWJsZWRcbiAgICAgIGFjdGlvbj17e1xuICAgICAgICBjb250ZW50OiAnQ29weScsXG4gICAgICAgIGNvbG9yOiAndGVhbCcsXG4gICAgICAgIG9uQ2xpY2s6ICgpID0+IGNvcHlUb0NsaXBib2FyZChpcGZzQ0lEKSxcbiAgICAgIH19XG4gICAgICBwbGFjZWhvbGRlcj0nJ1xuICAgICAgc3R5bGU9e3t3aWR0aDogJzYwMHB4J319XG4gICAgICBvbkNoYW5nZT17aGFuZGxlQ0lEQ2hhbmdlfVxuICAgICAgdmFsdWU9e2lwZnNDSUR9XG4gICAgLz5cbiAgICA8L2Rpdj5cbiAgKVxufVxuIl0sIm5hbWVzIjpbInVzZVN0YXRlIiwiQnV0dG9uIiwiSW5wdXQiLCJEaXZpZGVyIiwiSVBGUyIsIkNvbm5lY3Rpb25JUEZTIiwicHJvcHMiLCJoYW5kbGVDaGFuZ2UiLCJldmVudCIsInNldE1lc3NhZ2UiLCJ0YXJnZXQiLCJ2YWx1ZSIsImNvcHlUb0NsaXBib2FyZCIsImNvbnNvbGUiLCJsb2ciLCJjaWRWYWx1ZSIsInNlbGVjdCIsImhhbmRsZUNJRENoYW5nZSIsInNldElwZnNDSUQiLCJtZXNzYWdlIiwiaXBmc0NJRCIsImFkZHRvSVBGU0NsaWNrZWQiLCJpcGZzIiwiY2lkIiwiY3JlYXRlIiwiYWRkIiwidG9TdHJpbmciLCJkaXYiLCJhY3Rpb24iLCJjb250ZW50Iiwib25DbGljayIsImNvbG9yIiwicGxhY2Vob2xkZXIiLCJzdHlsZSIsIndpZHRoIiwib25DaGFuZ2UiLCJoaWRkZW4iLCJkaXNhYmxlZCJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///./pages/ipfsConnection.js\n");

/***/ })

});
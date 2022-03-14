/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/client/js/contestUpload.js":
/*!****************************************!*\
  !*** ./src/client/js/contestUpload.js ***!
  \****************************************/
/***/ (() => {

eval("function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== \"undefined\" && o[Symbol.iterator] || o[\"@@iterator\"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === \"number\") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError(\"Invalid attempt to iterate non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.\"); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }\n\nfunction _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === \"string\") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === \"Object\" && o.constructor) n = o.constructor.name; if (n === \"Map\" || n === \"Set\") return Array.from(o); if (n === \"Arguments\" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }\n\nfunction _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }\n\n(function () {\n  var sectionTypes = document.querySelectorAll('.section-type');\n  var submitBtn = document.querySelector('input[type=submit]');\n\n  var _iterator = _createForOfIteratorHelper(sectionTypes),\n      _step;\n\n  try {\n    var _loop = function _loop() {\n      var sectionType = _step.value;\n      sectionType.addEventListener('change', function () {\n        var sectionTypeId = sectionType.id;\n        sectionValue = document.getElementById(sectionTypeId.slice(0, sectionTypeId.length - 4) + 'value');\n\n        if (sectionType.value === '') {\n          sectionValue.innerHTML = \"<option value=\\\"\\\"></option>\";\n        } else if (sectionType.value === 'sex') {\n          sectionValue.innerHTML = '';\n          sectionValue.innerHTML += \"<option value=\\\"male\\\">\\uB0A8</option>\";\n          sectionValue.innerHTML += \"<option value=\\\"female\\\">\\uC5EC</option>\";\n        } else if (sectionType.value === 'age-over' || sectionType.value === 'age-under') {\n          sectionValue.innerHTML = '';\n          var maxYear = new Date().getFullYear() - 4;\n\n          for (var i = 0; i < 68; i++) {\n            sectionValue.innerHTML += \"<option value=\".concat(maxYear - i, \">\").concat(maxYear - i, \"</option>\");\n          }\n        } else if (sectionType.value === 'school') {\n          sectionValue.innerHTML = '';\n          sectionValue.innerHTML += \"<option value=\\\"university\\\">\\uB300\\uD559\\uAD50</option>\";\n          sectionValue.innerHTML += \"<option value=\\\"high\\\">\\uACE0\\uB4F1\\uD559\\uAD50</option>\";\n          sectionValue.innerHTML += \"<option value=\\\"middle\\\">\\uC911\\uD559\\uAD50</option>\";\n          sectionValue.innerHTML += \"<option value=\\\"elementary\\\">\\uCD08\\uB4F1\\uD559\\uAD50</option>\";\n        } else if (sectionType.value === 'belongNow') {\n          sectionValue.innerHTML = '';\n          sectionValue.innerHTML += \"<option value=\\\"national\\\">\\uB0B4\\uC154\\uB110\\uB9AC\\uADF8</option>\";\n          sectionValue.innerHTML += \"<option value=\\\"city\\\">\\uC2DC\\uB3C4\\uB9AC\\uADF8</option>\";\n          sectionValue.innerHTML += \"<option value=\\\"seoul-semi-pro\\\">\\uC11C\\uC6B8 \\uC5F0\\uAD6C\\uC0DD</option>\";\n          sectionValue.innerHTML += \"<option value=\\\"local-semi-pro\\\">\\uC9C0\\uC5ED \\uC5F0\\uAD6C\\uC0DD</option>\";\n          sectionValue.innerHTML += \"<option value=\\\"federation\\\">\\uD55C\\uBC14\\uC5F0</option>\";\n        } else if (sectionType.value === 'belongPre') {\n          sectionValue.innerHTML = '';\n          sectionValue.innerHTML += \"<option value=\\\"national\\\">\\uB0B4\\uC154\\uB110\\uB9AC\\uADF8</option>\";\n          sectionValue.innerHTML += \"<option value=\\\"city\\\">\\uC2DC\\uB3C4\\uB9AC\\uADF8</option>\";\n          sectionValue.innerHTML += \"<option value=\\\"seoul-semi-pro\\\">\\uC11C\\uC6B8 \\uC5F0\\uAD6C\\uC0DD</option>\";\n          sectionValue.innerHTML += \"<option value=\\\"local-semi-pro\\\">\\uC9C0\\uC5ED \\uC5F0\\uAD6C\\uC0DD</option>\";\n        }\n      });\n    };\n\n    for (_iterator.s(); !(_step = _iterator.n()).done;) {\n      _loop();\n    }\n  } catch (err) {\n    _iterator.e(err);\n  } finally {\n    _iterator.f();\n  }\n})();\n\n//# sourceURL=webpack://baduk-platform/./src/client/js/contestUpload.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = {};
/******/ 	__webpack_modules__["./src/client/js/contestUpload.js"]();
/******/ 	
/******/ })()
;
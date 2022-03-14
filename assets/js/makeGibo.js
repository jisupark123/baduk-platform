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

/***/ "./src/client/js/makeGibo.js":
/*!***********************************!*\
  !*** ./src/client/js/makeGibo.js ***!
  \***********************************/
/***/ (() => {

eval("function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }\n\nfunction _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, \"next\", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, \"throw\", err); } _next(undefined); }); }; }\n\nfunction _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== \"undefined\" && o[Symbol.iterator] || o[\"@@iterator\"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === \"number\") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError(\"Invalid attempt to iterate non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.\"); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }\n\nfunction _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }\n\nfunction _nonIterableSpread() { throw new TypeError(\"Invalid attempt to spread non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.\"); }\n\nfunction _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === \"string\") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === \"Object\" && o.constructor) n = o.constructor.name; if (n === \"Map\" || n === \"Set\") return Array.from(o); if (n === \"Arguments\" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }\n\nfunction _iterableToArray(iter) { if (typeof Symbol !== \"undefined\" && iter[Symbol.iterator] != null || iter[\"@@iterator\"] != null) return Array.from(iter); }\n\nfunction _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }\n\nfunction _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }\n\n(function () {\n  //---------------------------- seletors ---------------------------------------------\n  var giboStartBtn = document.querySelector('#gibo-start-btn');\n  var canvas = document.querySelector('canvas');\n  var gibo = document.querySelector('.gibo');\n  var tools = document.querySelector('.tools');\n  var form = document.querySelector('form');\n  var titleInput = form.querySelector('#title');\n  var blackPlayerInput = form.querySelector('#blackPlayer');\n  var whitePlayerInput = form.querySelector('#whitePlayer');\n  var adventageInput = form.querySelector('#adventage');\n  var resultInput = form.querySelector('#result');\n  var showNumBtn = tools.querySelector('#showNumBtn');\n  var goBeginBtn = tools.querySelector('#goBegin');\n  var goEndBtn = tools.querySelector('#goEnd');\n  var goBefore5Btn = tools.querySelector('#goBefore5');\n  var goBefore1Btn = tools.querySelector('#goBefore1');\n  var goNext1Btn = tools.querySelector('#goNext1');\n  var goNext5Btn = tools.querySelector('#goNext5');\n  var saveBtn = tools.querySelector('.save'); //---------------------------- variables ---------------------------------------------\n\n  var hiddenClassName = 'hidden';\n  var showNum = false;\n  var ctx = canvas.getContext('2d');\n  var BOARD_WIDTH = 700;\n  var margin = 30;\n  var LINE_COLOR = 'black';\n  var CANVAS_WIDTH = BOARD_WIDTH + margin * 2;\n  var CANVAS_HEIGHT = CANVAS_WIDTH;\n  canvas.width = CANVAS_WIDTH;\n  canvas.height = CANVAS_HEIGHT;\n  var row = 19; // 바둑판 줄 개수\n\n  var box = row - 1; // 바둑판 칸 개수\n\n  var boxSize = BOARD_WIDTH / box; // 바둑판 한 칸의 너비\n\n  var dolSize = 17; // 바둑돌 크기\n\n  var black = 1; // 검은돌은 1\n\n  var white = 2; // 흰돌은 2\n\n  var count = 0;\n  var recordPae = {};\n  var sequence = [];\n  var board = new Array(Math.pow(box + 1, 2)).fill(-1);\n  var record = [{\n    board: _toConsumableArray(board),\n    sequence: []\n  }];\n  var checkDirection = [[1, 0], [0, -1], [0, 1], [-1, 0]]; // 바둑판 그리기\n\n  function drawBoard() {\n    // 바둑판 - 판\n    ctx.fillStyle = '#e38d00';\n    ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT); // 바둑판 - 줄 (사각형을 12X12로 채우기)\n\n    for (var x = 0; x < box; x++) {\n      for (var y = 0; y < box; y++) {\n        var w = (CANVAS_WIDTH - margin * 2) / box; // 한칸의 너비\n\n        ctx.strokeStyle = LINE_COLOR;\n        ctx.lineWidth = 1;\n        ctx.strokeRect(w * x + margin, w * y + margin, w, w);\n      }\n    }\n\n    ctx.fillStyle = LINE_COLOR;\n    ctx.lineWidth = 1; // 바둑판 - 화점\n\n    function drawDot(x, y) {\n      ctx.fillStyle = LINE_COLOR;\n      ctx.lineWidth = 1;\n      ctx.beginPath();\n      ctx.arc(x, y, dolSize / 3, 0, Math.PI * 2);\n      ctx.fill();\n    } // 귀 화점\n\n\n    for (var a = 0; a < 2; a++) {\n      for (var b = 0; b < 2; b++) {\n        drawDot((3 + a) * boxSize + margin + a * (box - 7) * boxSize, (3 + b) * boxSize + margin + b * (box - 7) * boxSize);\n      }\n    } // 변 화점\n\n\n    drawDot(3 * boxSize + margin, 9 * boxSize + margin);\n    drawDot(9 * boxSize + margin, 3 * boxSize + margin);\n    drawDot(9 * boxSize + margin, 15 * boxSize + margin);\n    drawDot(15 * boxSize + margin, 9 * boxSize + margin); // 중앙 화점\n\n    drawDot(CANVAS_WIDTH / 2, CANVAS_HEIGHT / 2);\n  } // 방금 둔 바둑돌에 사각 표시\n\n\n  var drawRect = function drawRect(x, y) {\n    var w = boxSize / 2;\n    ctx.strokeStyle = 'red';\n    ctx.lineWidth = 3;\n    ctx.strokeRect(x * boxSize + margin - w, y * boxSize + margin - w, w + boxSize / 2, w + boxSize / 2);\n  }; // 돌에 숫자 그리기\n\n\n  var drawNumber = function drawNumber(x, y, color) {\n    var num = sequence.lastIndexOf(xyToIndex(x, y)) + 1;\n    var w = dolSize / 2;\n    var numberMarginX = num >= 100 ? -4 : num >= 10 ? -3.5 : 1;\n    var numberMarginY = num >= 100 ? -3 : 0;\n    ctx.fillStyle = color;\n    ctx.beginPath();\n    ctx.font = \"\".concat(num < 100 ? 23 : 16, \"px notoSans\");\n    ctx.fillText(num, x * boxSize + margin - w + numberMarginX, y * boxSize + margin + w + numberMarginY);\n  };\n\n  function drawDol(x, y, color) {\n    ctx.fillStyle = color;\n    ctx.beginPath();\n    ctx.arc(x * boxSize + margin, y * boxSize + margin - 0.2, // 0.2는 보정,\n    dolSize, 0, Math.PI * 2);\n    ctx.fill();\n  } //바둑알 그리기. 실제로는 바둑판까지 매번 통째로 그려줌\n\n\n  var drawBasicDol = function drawBasicDol(x, y) {\n    for (var i = 0; i < board.length; i++) {\n      var a = indexToXy(i)[0];\n      var b = indexToXy(i)[1];\n\n      if (board[xyToIndex(a, b)] === 1) {\n        drawDol(a, b, 'black');\n        if (showNum) drawNumber(a, b, 'white');\n      } else if (board[xyToIndex(a, b)] === 2) {\n        drawDol(a, b, 'white');\n        if (showNum) drawNumber(a, b, 'black');\n      }\n    } // 만들어진 배열이 실패도, 성공도와 같은지 확인하고 그에 따른 대응 출력\n\n  }; // 배열을 콘솔창에 grid로 보여주는 함수.\n  // 코딩하면서 바둑판이 어떻게 그려지는지 콘솔창에서 확인하려는 목적이고, 게임과는 관계 없음.\n\n\n  function indexView(m) {\n    var s = '\\n';\n    var c = 0;\n\n    var _iterator = _createForOfIteratorHelper(m),\n        _step;\n\n    try {\n      for (_iterator.s(); !(_step = _iterator.n()).done;) {\n        var e = _step.value;\n        s += \"\".concat(e, \" \");\n        if (c % box === row) s += '\\n'; //줄바꿈 문자 삽입\n\n        c++;\n      }\n    } catch (err) {\n      _iterator.e(err);\n    } finally {\n      _iterator.f();\n    }\n\n    return s;\n  } // x,y 좌표를 배열의 index값으로 반환\n\n\n  var xyToIndex = function xyToIndex(x, y) {\n    if (x >= row || x < 0 || y >= row || y < 0) {\n      return undefined;\n    } else {\n      return x + y * row;\n    }\n  };\n\n  var indexToXy = function indexToXy(i) {\n    var x = i % row;\n    var y = Math.floor(i / row);\n    return [x, y];\n  };\n\n  var onTheBoard = function onTheBoard(offsetX, offsetY) {\n    if (offsetX > margin - (margin - 10) && offsetX < CANVAS_WIDTH - (margin - 10) && offsetY > margin - (margin - 10) && offsetY < CANVAS_WIDTH - (margin - 10)) {\n      return true;\n    }\n\n    return false;\n  };\n\n  var adjustCoordinate = function adjustCoordinate(x, y) {\n    var a = Math.round(Math.abs(x - margin) / boxSize);\n    var b = Math.round(Math.abs(y - margin) / boxSize);\n    return [a, b];\n  };\n\n  function handleRules(x, y) {\n    function wayOutIsZero(x, y, color) {\n      var makeList = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;\n      var countWayOut = 0;\n      var alreadyFound = [];\n      var surroundedDols = [];\n\n      function subWayOutIsZero(x, y, color) {\n        if (countWayOut) {\n          return false;\n        }\n\n        for (var k = 0; k < 4; k++) {\n          if (countWayOut) {\n            return false;\n          }\n\n          var a = x + checkDirection[k][0];\n          var b = y + checkDirection[k][1];\n\n          if (a < 0 || a >= row || b < 0 || b >= row) {\n            continue;\n          }\n\n          var checkString = String(a) + '/' + String(b);\n\n          if (alreadyFound.includes(checkString)) {\n            continue;\n          }\n\n          if (board[xyToIndex(a, b)] === -1) {\n            countWayOut += 1;\n            return false;\n          } else if (board[xyToIndex(a, b)] === color) {\n            alreadyFound.push(checkString);\n            subWayOutIsZero(a, b, color);\n          }\n        }\n\n        if (countWayOut) {\n          return false;\n        }\n\n        if (makeList) {\n          surroundedDols.push(xyToIndex(x, y));\n        }\n\n        return makeList ? Array.from(new Set(surroundedDols)) : true;\n      }\n\n      return subWayOutIsZero(x, y, color);\n    }\n\n    function handlePae(x, y, color, dolsToCatch) {\n      var surrounding = [];\n\n      for (var k = 0; k < 4; k++) {\n        var a = x + checkDirection[k][0];\n        var b = y + checkDirection[k][1];\n        surrounding.push(board[xyToIndex(a, b)]);\n      }\n\n      if (dolsToCatch.length === 1 && surrounding.indexOf(color) === -1 && surrounding.indexOf(-1) === -1) {\n        var recordXY = xyToIndex(x, y) > dolsToCatch[0] ? \"\".concat(xyToIndex(x, y), \"/\").concat(dolsToCatch[0]) : \"\".concat(dolsToCatch[0], \"/\").concat(xyToIndex(x, y));\n        var thisCount = count + 1;\n\n        if (recordPae[recordXY] === thisCount - 1) {\n          return false;\n        } else {\n          recordPae[recordXY] = thisCount;\n        }\n\n        return true;\n      } else {\n        return true;\n      }\n    }\n\n    var thisColor = count % 2 === 0 ? 1 : 2;\n    var opponentColor = thisColor === 1 ? 2 : 1;\n    var opponentDols = [];\n    var dolsToCatch = []; // 옆에 상대돌이 있는지 확인\n    // 가로,세로 4방향\n\n    for (var k = 0; k < 4; k++) {\n      var a = x + checkDirection[k][0];\n      var b = y + checkDirection[k][1];\n\n      if (board[xyToIndex(a, b)] === opponentColor) {\n        opponentDols.push([a, b]);\n      }\n    }\n\n    if (opponentDols.length) {\n      var _iterator2 = _createForOfIteratorHelper(opponentDols),\n          _step2;\n\n      try {\n        for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {\n          var opponentDol = _step2.value;\n          var lst = wayOutIsZero(opponentDol[0], opponentDol[1], opponentColor, true);\n\n          if (lst) {\n            var _iterator3 = _createForOfIteratorHelper(lst),\n                _step3;\n\n            try {\n              for (_iterator3.s(); !(_step3 = _iterator3.n()).done;) {\n                var d = _step3.value;\n                dolsToCatch.push(d);\n              }\n            } catch (err) {\n              _iterator3.e(err);\n            } finally {\n              _iterator3.f();\n            }\n          }\n        }\n      } catch (err) {\n        _iterator2.e(err);\n      } finally {\n        _iterator2.f();\n      }\n    } else {\n      return wayOutIsZero(x, y, thisColor) ? false : true;\n    }\n\n    if (dolsToCatch.length) {\n      if (!handlePae(x, y, thisColor, dolsToCatch)) {\n        return false;\n      }\n    } else {\n      return wayOutIsZero(x, y, thisColor) ? false : true;\n    }\n\n    for (var _i = 0, _dolsToCatch = dolsToCatch; _i < _dolsToCatch.length; _i++) {\n      var dolToCatch = _dolsToCatch[_i];\n      board[dolToCatch] = -1;\n    }\n\n    return true;\n  }\n\n  function renderCurrentBoard() {\n    drawBoard();\n    drawBasicDol();\n  }\n\n  canvas.addEventListener('mouseup', function (e) {\n    var x = adjustCoordinate(e.offsetX, e.offsetY)[0];\n    var y = adjustCoordinate(e.offsetX, e.offsetY)[1];\n\n    if (onTheBoard(e.offsetX, e.offsetY)) {\n      // 이미 돌이 놓여진 자리인지 확인\n      if (board[xyToIndex(x, y)] != -1) {\n        return; // 비어있는 자리이면, 순서에 따라서 흑,백 구분해서 그리는 함수 실행\n      } else {\n        count % 2 === 0 ? board[xyToIndex(x, y)] = 1 : board[xyToIndex(x, y)] = 2;\n      }\n\n      if (!handleRules(x, y)) {\n        board[xyToIndex(x, y)] = -1;\n        return;\n      }\n\n      count++;\n      sequence.push(xyToIndex(x, y));\n      record = record.slice(0, count);\n      record.push({\n        board: _toConsumableArray(board),\n        sequence: _toConsumableArray(sequence)\n      });\n      renderCurrentBoard();\n    }\n  });\n  canvas.addEventListener('mousemove', function (e) {\n    if (onTheBoard(e.offsetX, e.offsetY)) {\n      var x = adjustCoordinate(e.offsetX, e.offsetY)[0];\n      var y = adjustCoordinate(e.offsetX, e.offsetY)[1];\n\n      if (board[xyToIndex(x, y)] !== -1) {\n        renderCurrentBoard();\n      } else {\n        if (count % 2 === 0) {\n          renderCurrentBoard();\n          drawDol(x, y, 'rgba(0,0,0,0.3)');\n        } else {\n          renderCurrentBoard();\n          drawDol(x, y, 'rgba(255,255,255,0.5)');\n        }\n      }\n    }\n  });\n  canvas.addEventListener('mouseleave', function () {\n    renderCurrentBoard();\n  });\n  drawBoard(); //---------------------------- handleFunctions ---------------------------------------------\n\n  function handlegiboStartBtnClick(event) {\n    event.preventDefault();\n    gibo.classList.remove(hiddenClassName);\n    scrollTo({\n      top: innerHeight,\n      behavior: 'smooth'\n    });\n  }\n\n  function toggleShowNum(event) {\n    event.preventDefault();\n    showNum = !showNum;\n    showNumBtn.innerText = showNum === true ? '순서 제거' : '순서 표시';\n    renderCurrentBoard();\n  }\n\n  function remoteControl(point) {\n    var move = point === 'begin' ? 0 : point === 'end' ? record.length - 1 : count + point;\n    if (!record[move]) return;\n    board = _toConsumableArray(record[move].board);\n    sequence = _toConsumableArray(record[move].sequence);\n    count = move;\n    renderCurrentBoard();\n  }\n\n  var saveGibo = /*#__PURE__*/function () {\n    var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {\n      var title, blackPlayer, whitePlayer, adventage, result, response, _yield$response$json, errorMessage;\n\n      return regeneratorRuntime.wrap(function _callee$(_context) {\n        while (1) {\n          switch (_context.prev = _context.next) {\n            case 0:\n              title = titleInput.value.trim();\n              blackPlayer = blackPlayerInput.value.trim();\n              whitePlayer = whitePlayerInput.value.trim();\n              adventage = adventageInput.value.trim();\n              result = resultInput.value.trim();\n\n              if (blackPlayer) {\n                _context.next = 11;\n                break;\n              }\n\n              alert('흑 대국자를 입력해주세요');\n              blackPlayerInput.focus();\n              return _context.abrupt(\"return\");\n\n            case 11:\n              if (whitePlayer) {\n                _context.next = 17;\n                break;\n              }\n\n              alert('백 대국자를 입력해주세요');\n              whitePlayerInput.focus();\n              return _context.abrupt(\"return\");\n\n            case 17:\n              if (adventage) {\n                _context.next = 23;\n                break;\n              }\n\n              alert('덤을 입력해주세요');\n              adventage.focus();\n              return _context.abrupt(\"return\");\n\n            case 23:\n              if (result) {\n                _context.next = 27;\n                break;\n              }\n\n              alert('결과를 입력해주세요');\n              result.focus();\n              return _context.abrupt(\"return\");\n\n            case 27:\n              record = record.slice(0, count + 1);\n              _context.next = 30;\n              return fetch('/api/save-gibo', {\n                method: 'POST',\n                headers: {\n                  'Content-Type': 'application/json'\n                },\n                body: JSON.stringify({\n                  title: title,\n                  blackPlayer: blackPlayer,\n                  whitePlayer: whitePlayer,\n                  adventage: adventage,\n                  result: result,\n                  record: record\n                })\n              });\n\n            case 30:\n              response = _context.sent;\n\n              if (!(response.status === 201)) {\n                _context.next = 36;\n                break;\n              }\n\n              alert('저장되었습니다');\n              window.location.href = '/';\n              _context.next = 41;\n              break;\n\n            case 36:\n              _context.next = 38;\n              return response.json();\n\n            case 38:\n              _yield$response$json = _context.sent;\n              errorMessage = _yield$response$json.errorMessage;\n              alert(\"\\uB2E4\\uC2DC \\uC2DC\\uB3C4\\uD574\\uC8FC\\uC2ED\\uC2DC\\uC624\\n\\n\".concat(errorMessage));\n\n            case 41:\n            case \"end\":\n              return _context.stop();\n          }\n        }\n      }, _callee);\n    }));\n\n    return function saveGibo() {\n      return _ref.apply(this, arguments);\n    };\n  }(); //---------------------------- addEventListeners ---------------------------------------------\n\n\n  giboStartBtn.addEventListener('click', handlegiboStartBtnClick);\n  showNumBtn.addEventListener('click', toggleShowNum);\n  goBeginBtn.addEventListener('click', function () {\n    return remoteControl('begin');\n  });\n  goEndBtn.addEventListener('click', function () {\n    return remoteControl('end');\n  });\n  goBefore5Btn.addEventListener('click', function () {\n    return remoteControl(-5);\n  });\n  goBefore1Btn.addEventListener('click', function () {\n    return remoteControl(-1);\n  });\n  goNext1Btn.addEventListener('click', function () {\n    return remoteControl(1);\n  });\n  goNext5Btn.addEventListener('click', function () {\n    return remoteControl(5);\n  });\n  saveBtn.addEventListener('click', saveGibo);\n})();\n\n//# sourceURL=webpack://baduk-platform/./src/client/js/makeGibo.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = {};
/******/ 	__webpack_modules__["./src/client/js/makeGibo.js"]();
/******/ 	
/******/ })()
;
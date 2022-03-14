"use strict";

function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

(function () {
  var inputLineBox = document.querySelector('.input-line');
  var inputLine = inputLineBox.querySelector('input');
  var inputLineBtn = inputLineBox.querySelector('.input-line-btn');
  var questionBox = document.querySelector('.question-upload');
  var inputTitle = questionBox.querySelector('.question-upload__title');
  var turnBlackBtn = questionBox.querySelector('.question-upload__turn-black');
  var turnWhiteBtn = questionBox.querySelector('.question-upload__turn-white');
  var pickBlackBtn = questionBox.querySelector('.question-upload__black-btn');
  var pickWhiteBtn = questionBox.querySelector('.question-upload__white-btn');
  var canvas = questionBox.querySelector('.question-canvas');
  var finishQuestionBtn = questionBox.querySelector('.question-upload__finish-btn');
  var black = 1; // 검은돌은 1

  var white = 2; // 흰돌은 2

  var CLICKED_CLASSNAME = 'clicked';
  var HIDDEN_CLASSNAME = 'hidden';
  var realBoard = []; // 최종적으로 저장할 바둑판

  var pickedColor = black;
  var turn = black;

  function makeCanvas(canvas, line) {
    var ctx = canvas.getContext('2d');
    var BOARD_WIDTH = 300;
    var margin = 30;
    var LINE_COLOR = 'black';
    var CANVAS_WIDTH = BOARD_WIDTH + margin * 2;
    var CANVAS_HEIGHT = CANVAS_WIDTH;
    canvas.width = CANVAS_WIDTH;
    canvas.height = CANVAS_HEIGHT;
    var row = line ? line : 13; // 바둑판 줄 개수

    var box = row - 1; // 바둑판 칸 개수

    var boxSize = BOARD_WIDTH / box; // 바둑판 한 칸의 너비

    var dolSize = 10; // 바둑돌 크기

    var count = 0;
    var recordPae = {};
    var board = new Array(Math.pow(box + 1, 2)).fill(-1);
    var checkDirection = [[1, 0], [0, -1], [0, 1], [-1, 0]]; // 바둑판 그리기

    function drawBoard() {
      // 바둑판 - 판
      ctx.fillStyle = '#e38d00';
      ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT); // 바둑판 - 줄 (사각형을 12X12로 채우기)

      for (var x = 0; x < box; x++) {
        for (var y = 0; y < box; y++) {
          var w = (CANVAS_WIDTH - margin * 2) / box; // 한칸의 너비

          ctx.strokeStyle = LINE_COLOR;
          ctx.lineWidth = 1;
          ctx.strokeRect(w * x + margin, w * y + margin, w, w);
        }
      }

      ctx.fillStyle = LINE_COLOR;
      ctx.lineWidth = 1; // 바둑판 - 화점

      function drawDot(x, y) {
        ctx.fillStyle = LINE_COLOR;
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.arc(x, y, dolSize / 3, 0, Math.PI * 2);
        ctx.fill();
      } // 귀 화점


      for (var a = 0; a < 2; a++) {
        for (var b = 0; b < 2; b++) {
          drawDot((3 + a) * boxSize + margin + a * (box - 7) * boxSize, (3 + b) * boxSize + margin + b * (box - 7) * boxSize);
        }
      } // 변 화점
      // 중앙 화점


      drawDot(CANVAS_WIDTH / 2, CANVAS_HEIGHT / 2);
    } // 방금 둔 바둑돌에 사각 표시


    var drawRect = function drawRect(x, y) {
      var w = boxSize / 2;
      ctx.strokeStyle = 'red';
      ctx.lineWidth = 3;
      ctx.strokeRect(x * boxSize + margin - w, y * boxSize + margin - w, w + boxSize / 2, w + boxSize / 2);
    };

    function drawDol(x, y, color) {
      ctx.fillStyle = color;
      ctx.beginPath();
      ctx.arc(x * boxSize + margin, y * boxSize + margin - 0.2, // 0.2는 보정
      dolSize, 0, Math.PI * 2);
      ctx.fill();
    } //바둑알 그리기. 실제로는 바둑판까지 매번 통째로 그려줌


    var drawBasicDol = function drawBasicDol() {
      for (var i = 0; i < board.length; i++) {
        var a = indexToXy(i)[0];
        var b = indexToXy(i)[1];

        if (board[xyToIndex(a, b)] === 1) {
          drawDol(a, b, 'black');
        } else if (board[xyToIndex(a, b)] === 2) {
          drawDol(a, b, 'white');
        }
      } // 만들어진 배열이 실패도, 성공도와 같은지 확인하고 그에 따른 대응 출력

    }; // 배열을 콘솔창에 grid로 보여주는 함수.
    // 코딩하면서 바둑판이 어떻게 그려지는지 콘솔창에서 확인하려는 목적이고, 게임과는 관계 없음.


    function indexView(m) {
      var s = '\n';
      var c = 0;

      var _iterator = _createForOfIteratorHelper(m),
          _step;

      try {
        for (_iterator.s(); !(_step = _iterator.n()).done;) {
          var e = _step.value;
          s += "".concat(e, " ");
          if (c % box === row) s += '\n'; //줄바꿈 문자 삽입

          c++;
        }
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }

      return s;
    } // x,y 좌표를 배열의 index값으로 반환


    var xyToIndex = function xyToIndex(x, y) {
      if (x >= row || x < 0 || y >= row || y < 0) {
        return undefined;
      } else {
        return x + y * row;
      }
    };

    var indexToXy = function indexToXy(i) {
      var x = i % row;
      var y = Math.floor(i / row);
      return [x, y];
    };

    var onTheBoard = function onTheBoard(offsetX, offsetY) {
      if (offsetX > margin - (margin - 10) && offsetX < CANVAS_WIDTH - (margin - 10) && offsetY > margin - (margin - 10) && offsetY < CANVAS_WIDTH - (margin - 10)) {
        return true;
      }

      return false;
    };

    var adjustCoordinate = function adjustCoordinate(x, y) {
      var a = Math.floor(Math.abs(x - margin) / boxSize);
      var b = Math.floor(Math.abs(y - margin) / boxSize);
      return [a, b];
    };

    function handleRules(x, y) {
      function wayOutIsZero(x, y, color) {
        var makeList = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;
        var countWayOut = 0;
        var alreadyFound = [];
        var surroundedDols = [];

        function subWayOutIsZero(x, y, color) {
          if (countWayOut) {
            return false;
          }

          for (var k = 0; k < 4; k++) {
            if (countWayOut) {
              return false;
            }

            var a = x + checkDirection[k][0];
            var b = y + checkDirection[k][1];

            if (a < 0 || a >= row || b < 0 || b >= row) {
              continue;
            }

            var checkString = String(a) + '/' + String(b);

            if (alreadyFound.includes(checkString)) {
              continue;
            }

            if (board[xyToIndex(a, b)] === -1) {
              countWayOut += 1;
              return false;
            } else if (board[xyToIndex(a, b)] === color) {
              alreadyFound.push(checkString);
              subWayOutIsZero(a, b, color);
            }
          }

          if (countWayOut) {
            return false;
          }

          if (makeList) {
            surroundedDols.push(xyToIndex(x, y));
          }

          return makeList ? Array.from(new Set(surroundedDols)) : true;
        }

        return subWayOutIsZero(x, y, color);
      }

      function handlePae(x, y, color, dolsToCatch) {
        var surrounding = [];

        for (var k = 0; k < 4; k++) {
          var a = x + checkDirection[k][0];
          var b = y + checkDirection[k][1];
          surrounding.push(board[xyToIndex(a, b)]);
        }

        if (dolsToCatch.length === 1 && surrounding.indexOf(color) === -1 && surrounding.indexOf(-1) === -1) {
          var recordXY = xyToIndex(x, y) > dolsToCatch[0] ? "".concat(xyToIndex(x, y), "/").concat(dolsToCatch[0]) : "".concat(dolsToCatch[0], "/").concat(xyToIndex(x, y));
          var thisCount = count + 1;

          if (recordPae[recordXY] === thisCount - 1) {
            return false;
          } else {
            recordPae[recordXY] = thisCount;
          }

          return true;
        } else {
          return true;
        }
      }

      var thisColor = count % 2 === 0 ? 1 : 2;
      var opponentColor = thisColor === 1 ? 2 : 1;
      var opponentDols = [];
      var dolsToCatch = []; // 옆에 상대돌이 있는지 확인
      // 가로,세로 4방향

      for (var k = 0; k < 4; k++) {
        var a = x + checkDirection[k][0];
        var b = y + checkDirection[k][1];

        if (board[xyToIndex(a, b)] === opponentColor) {
          opponentDols.push([a, b]);
        }
      }

      if (opponentDols.length) {
        var _iterator2 = _createForOfIteratorHelper(opponentDols),
            _step2;

        try {
          for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
            var opponentDol = _step2.value;
            var lst = wayOutIsZero(opponentDol[0], opponentDol[1], opponentColor, true);

            if (lst) {
              var _iterator3 = _createForOfIteratorHelper(lst),
                  _step3;

              try {
                for (_iterator3.s(); !(_step3 = _iterator3.n()).done;) {
                  var d = _step3.value;
                  dolsToCatch.push(d);
                }
              } catch (err) {
                _iterator3.e(err);
              } finally {
                _iterator3.f();
              }
            }
          }
        } catch (err) {
          _iterator2.e(err);
        } finally {
          _iterator2.f();
        }
      } else {
        return wayOutIsZero(x, y, thisColor) ? false : true;
      }

      if (dolsToCatch.length) {
        if (!handlePae(x, y, thisColor, dolsToCatch)) {
          return false;
        }
      } else {
        return wayOutIsZero(x, y, thisColor) ? false : true;
      }

      for (var _i = 0, _dolsToCatch = dolsToCatch; _i < _dolsToCatch.length; _i++) {
        var dolToCatch = _dolsToCatch[_i];
        board[dolToCatch] = -1;
      }

      return true;
    }

    drawBoard();
    drawBasicDol();
    canvas.addEventListener('mouseup', function (e) {
      var x = adjustCoordinate(e.offsetX, e.offsetY)[0];
      var y = adjustCoordinate(e.offsetX, e.offsetY)[1];

      if (onTheBoard(e.offsetX, e.offsetY)) {
        // 이미 돌이 놓여진 자리인지 확인
        if (board[xyToIndex(x, y)] != -1) {
          return; // 비어있는 자리이면, 순서에 따라서 흑,백 구분해서 그리는 함수 실행
        } else {
          pickedColor === black ? board[xyToIndex(x, y)] = black : board[xyToIndex(x, y)] = white;
        }

        if (!handleRules(x, y)) {
          board[xyToIndex(x, y)] = -1;
          return;
        }

        realBoard = board;
        count++;
        drawBoard();
        drawBasicDol(x, y);
      }
    });
    canvas.addEventListener('mousemove', function (e) {
      if (onTheBoard(e.offsetX, e.offsetY)) {
        var x = adjustCoordinate(e.offsetX, e.offsetY)[0];
        var y = adjustCoordinate(e.offsetX, e.offsetY)[1];

        if (board[xyToIndex(x, y)] !== -1) {
          drawBoard();
          drawBasicDol();
        } else {
          if (pickedColor === black) {
            drawBoard();
            drawBasicDol();
            drawDol(x, y, 'rgba(0,0,0,0.5)');
          } else {
            drawBoard();
            drawBasicDol();
            drawDol(x, y, 'rgba(255,255,255,0.5)');
          }
        }
      }
    });
    canvas.addEventListener('mouseleave', function () {
      drawBoard();
      drawBasicDol();
    }); // window.addEventListener('keydown', (e) => {
    //   if(e.keyCode === 37){
    //     if(recordBoard.length > 1){
    //       board = recordBoard[recordBoard.length - 2];
    //       recordBoard.pop()
    //       drawBoard();
    //       drawBasicDol();
    //     }
    //   }
    // })
  }

  function handleturnBlackBtn(event) {
    event.preventDefault();

    if (turn !== black) {
      turn = black;
      turnBlackBtn.classList.add(CLICKED_CLASSNAME);
      turnWhiteBtn.classList.remove(CLICKED_CLASSNAME);
    }
  }

  function handleturnWhiteBtn(event) {
    event.preventDefault();

    if (turn !== white) {
      turn = white;
      turnWhiteBtn.classList.add(CLICKED_CLASSNAME);
      turnBlackBtn.classList.remove(CLICKED_CLASSNAME);
    }
  }

  function handlePickBlackBtn(event) {
    event.preventDefault();

    if (pickedColor === white) {
      pickedColor = black;
      pickBlackBtn.classList.add(CLICKED_CLASSNAME);
      pickWhiteBtn.classList.remove(CLICKED_CLASSNAME);
    }
  }

  function handlePickWhiteBtn(event) {
    event.preventDefault();

    if (pickedColor === black) {
      pickedColor = white;
      pickWhiteBtn.classList.add(CLICKED_CLASSNAME);
      pickBlackBtn.classList.remove(CLICKED_CLASSNAME);
    }
  }

  function finishMakeQuestion(event) {
    event.preventDefault();
    var title = inputTitle.value;

    if (!title) {
      alert('제목을 입력해주세요');
      return;
    }

    localStorage.setItem('turn', turn);
    localStorage.setItem('board', JSON.stringify(realBoard));
    localStorage.setItem('title', title);
    location.replace('answer-upload');
  }

  function createCanvas() {
    var line = Number(inputLine.value);
    inputLineBox.classList.add(HIDDEN_CLASSNAME);
    questionBox.classList.remove(HIDDEN_CLASSNAME);
    makeCanvas(canvas, line);
  } //---------------------------- addEventListener ---------------------------------------------


  inputLineBtn.addEventListener('click', createCanvas);
  turnBlackBtn.addEventListener('click', handleturnBlackBtn);
  turnWhiteBtn.addEventListener('click', handleturnWhiteBtn);
  pickBlackBtn.addEventListener('click', handlePickBlackBtn);
  pickWhiteBtn.addEventListener('click', handlePickWhiteBtn);
  finishQuestionBtn.addEventListener('click', finishMakeQuestion);
})();
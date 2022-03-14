"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.postUploadContest = exports.postSaveQuestion = exports.postNoticeUpload = exports.manageNotices = exports.getUploadQuestion = exports.getUploadFailure = exports.getUploadContest = exports.getUploadAnswer = exports.getNoticeUpload = exports.deleteNotices = exports.bookedPhoneNumber = void 0;

var _Notice = _interopRequireDefault(require("../models/Notice"));

var _Contest = _interopRequireDefault(require("../models/Contest"));

var _LDQuestion = _interopRequireDefault(require("../models/LDQuestion"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var bookedPhoneNumber = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(req, res) {
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            return _context.abrupt("return", res.render('manage/booked'));

          case 1:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function bookedPhoneNumber(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

exports.bookedPhoneNumber = bookedPhoneNumber;

var todayDate = function todayDate() {
  var today = new Date();
  var year = today.getFullYear();
  var month = ('0' + (today.getMonth() + 1)).slice(-2);
  var day = ('0' + today.getDate()).slice(-2);
  var dateString = year + '-' + month + '-' + day;
  return dateString;
};

var manageNotices = /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(req, res) {
    var notices;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return _Notice["default"].find({});

          case 2:
            notices = _context2.sent;
            return _context2.abrupt("return", res.render('manage/manageNotices', {
              notices: notices
            }));

          case 4:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));

  return function manageNotices(_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}();

exports.manageNotices = manageNotices;

var getNoticeUpload = function getNoticeUpload(req, res) {
  return res.render('manage/notice-upload');
};

exports.getNoticeUpload = getNoticeUpload;

var postNoticeUpload = /*#__PURE__*/function () {
  var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(req, res) {
    var _req$body, title, content, isImportant;

    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _req$body = req.body, title = _req$body.title, content = _req$body.content, isImportant = _req$body.isImportant;
            _context3.next = 3;
            return _Notice["default"].create({
              title: title,
              content: content,
              writtenAt: todayDate(),
              isImportant: isImportant ? true : false
            });

          case 3:
            return _context3.abrupt("return", res.redirect('/manage/notices'));

          case 4:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
  }));

  return function postNoticeUpload(_x5, _x6) {
    return _ref3.apply(this, arguments);
  };
}();

exports.postNoticeUpload = postNoticeUpload;

var deleteNotices = /*#__PURE__*/function () {
  var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(req, res) {
    var ids, _iterator, _step, id;

    return regeneratorRuntime.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            ids = req.query.notice;

            if (ids) {
              _context4.next = 3;
              break;
            }

            return _context4.abrupt("return", res.redirect('/manage/notices'));

          case 3:
            if (!Array.isArray(ids)) {
              ids = Array(ids);
            }

            _iterator = _createForOfIteratorHelper(ids);
            _context4.prev = 5;

            _iterator.s();

          case 7:
            if ((_step = _iterator.n()).done) {
              _context4.next = 13;
              break;
            }

            id = _step.value;
            _context4.next = 11;
            return _Notice["default"].deleteOne({
              _id: id
            });

          case 11:
            _context4.next = 7;
            break;

          case 13:
            _context4.next = 18;
            break;

          case 15:
            _context4.prev = 15;
            _context4.t0 = _context4["catch"](5);

            _iterator.e(_context4.t0);

          case 18:
            _context4.prev = 18;

            _iterator.f();

            return _context4.finish(18);

          case 21:
            return _context4.abrupt("return", res.redirect('/manage/notices'));

          case 22:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4, null, [[5, 15, 18, 21]]);
  }));

  return function deleteNotices(_x7, _x8) {
    return _ref4.apply(this, arguments);
  };
}();

exports.deleteNotices = deleteNotices;

var getUploadContest = function getUploadContest(req, res) {
  return res.render('manage/contest-upload');
};

exports.getUploadContest = getUploadContest;

var postUploadContest = /*#__PURE__*/function () {
  var _ref5 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5(req, res) {
    var body, sections, i, type, value, rOrt, rOrv, idx, obj, k, eAndt, eAndv, _k, contest, _iterator2, _step2, date, section;

    return regeneratorRuntime.wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            body = req.body;
            sections = {};
            i = 1;

          case 3:
            if (!body["sectionName".concat(i)]) {
              _context5.next = 40;
              break;
            }

            sections["S".concat(i)] = {};
            sections["S".concat(i)]['sectionName'] = body["sectionName".concat(i)];
            sections["S".concat(i)]['requirementTypes'] = body["section".concat(i, "-requirement-type")];
            sections["S".concat(i)]['requirementValues'] = body["section".concat(i, "-requirement-value")];
            sections["S".concat(i)]['excludeTypes'] = body["section".concat(i, "-exclude-type")];
            sections["S".concat(i)]['excludeValues'] = body["section".concat(i, "-exclude-value")];
            rOrt = body["section".concat(i, "-requirementOr-type")];
            rOrv = body["section".concat(i, "-requirementOr-value")];
            idx = 0;
            obj = void 0;
            sections["S".concat(i)]['requirementOr'] = [];

          case 15:
            if (!(idx < rOrt.length)) {
              _context5.next = 24;
              break;
            }

            if (!(!rOrt[idx] || !rOrv[idx] || !rOrt[idx + 1] || !rOrv[idx + 1])) {
              _context5.next = 18;
              break;
            }

            return _context5.abrupt("break", 24);

          case 18:
            obj = {};

            for (k = 0; k < 2; k++) {
              obj["".concat(rOrt[idx])] = rOrv[idx];
              obj["".concat(rOrt[idx + 1])] = rOrv[idx + 1];
            }

            sections["S".concat(i)]['requirementOr'].push(obj);
            idx += 2;
            _context5.next = 15;
            break;

          case 24:
            eAndt = body["section".concat(i, "-excludeAnd-type")];
            eAndv = body["section".concat(i, "-excludeAnd-value")];
            idx = 0;
            sections["S".concat(i)]['excludeAnd'] = [];

          case 28:
            if (!(idx < eAndt.length)) {
              _context5.next = 37;
              break;
            }

            if (!(!eAndt[idx] || !eAndv[idx] || !eAndt[idx + 1] || !eAndv[idx + 1])) {
              _context5.next = 31;
              break;
            }

            return _context5.abrupt("break", 37);

          case 31:
            obj = {};

            for (_k = 0; _k < 2; _k++) {
              obj["".concat(eAndt[idx])] = eAndv[idx];
              obj["".concat(eAndt[idx + 1])] = eAndv[idx + 1];
            }

            sections["S".concat(i)]['excludeAnd'].push(obj);
            idx += 2;
            _context5.next = 28;
            break;

          case 37:
            i++;
            _context5.next = 3;
            break;

          case 40:
            _context5.prev = 40;
            _context5.next = 43;
            return _Contest["default"].create({
              title: body.title,
              link: body.link
            });

          case 43:
            contest = _context5.sent;
            _iterator2 = _createForOfIteratorHelper(body.dates);

            try {
              for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
                date = _step2.value;

                if (date) {
                  contest.dates.push(date);
                }
              }
            } catch (err) {
              _iterator2.e(err);
            } finally {
              _iterator2.f();
            }

            for (section in sections) {
              contest.sections.push(sections[section]);
            }

            _context5.next = 49;
            return contest.save();

          case 49:
            return _context5.abrupt("return", res.status(201).redirect('/'));

          case 52:
            _context5.prev = 52;
            _context5.t0 = _context5["catch"](40);
            return _context5.abrupt("return", res.status(400).render('manage/contest-upload', {
              errorMessage: _context5.t0
            }));

          case 55:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5, null, [[40, 52]]);
  }));

  return function postUploadContest(_x9, _x10) {
    return _ref5.apply(this, arguments);
  };
}();

exports.postUploadContest = postUploadContest;

var getUploadQuestion = function getUploadQuestion(req, res) {
  res.render('manage/question-upload');
};

exports.getUploadQuestion = getUploadQuestion;

var getUploadAnswer = function getUploadAnswer(req, res) {
  res.render('manage/answer-upload');
};

exports.getUploadAnswer = getUploadAnswer;

var getUploadFailure = function getUploadFailure(req, res) {
  res.render('manage/failure-upload');
};

exports.getUploadFailure = getUploadFailure;

var postSaveQuestion = /*#__PURE__*/function () {
  var _ref6 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6(req, res) {
    var _req$body$question, board, turn, answer, failures, title;

    return regeneratorRuntime.wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            _req$body$question = req.body.question, board = _req$body$question.board, turn = _req$body$question.turn, answer = _req$body$question.answer, failures = _req$body$question.failures, title = _req$body$question.title;
            _context6.prev = 1;
            _context6.next = 4;
            return _LDQuestion["default"].create({
              board: board,
              turn: turn,
              answer: answer,
              failures: failures,
              title: title
            });

          case 4:
            return _context6.abrupt("return", res.sendStatus(201));

          case 7:
            _context6.prev = 7;
            _context6.t0 = _context6["catch"](1);
            return _context6.abrupt("return", res.status(404));

          case 10:
          case "end":
            return _context6.stop();
        }
      }
    }, _callee6, null, [[1, 7]]);
  }));

  return function postSaveQuestion(_x11, _x12) {
    return _ref6.apply(this, arguments);
  };
}();

exports.postSaveQuestion = postSaveQuestion;
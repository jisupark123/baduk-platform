"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.startKakaoLogin = exports.postMakeGibo = exports.postContestFilter = exports.getMakeGibo = exports.getContestFilter = exports.calendar = void 0;

var _User = _interopRequireDefault(require("../models/User"));

var _Contest = _interopRequireDefault(require("../models/Contest"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var startKakaoLogin = function startKakaoLogin(req, res) {};

exports.startKakaoLogin = startKakaoLogin;

var calendar = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(req, res) {
    var _yield$User$findById, contestFilter, contests;

    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return _User["default"].findById(req.session.user._id);

          case 2:
            _yield$User$findById = _context.sent;
            contestFilter = _yield$User$findById.contestFilter;
            _context.next = 6;
            return _Contest["default"].find({});

          case 6:
            contests = _context.sent;
            return _context.abrupt("return", res.render('calendar', {
              contests: contests,
              contestFilter: contestFilter
            }));

          case 8:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function calendar(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

exports.calendar = calendar;

var getContestFilter = function getContestFilter(req, res) {
  return res.render('contest-filter');
};

exports.getContestFilter = getContestFilter;

var postContestFilter = /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(req, res) {
    var _req$body, name, sex, age, school, belongNow, belongPre, user;

    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _req$body = req.body, name = _req$body.name, sex = _req$body.sex, age = _req$body.age, school = _req$body.school, belongNow = _req$body.belongNow, belongPre = _req$body.belongPre;
            _context2.next = 3;
            return _User["default"].findById(req.session.user._id);

          case 3:
            user = _context2.sent;
            user.contestFilter = {
              name: name,
              sex: sex,
              age: age,
              school: school,
              belongNow: belongNow,
              belongPre: belongPre
            };
            _context2.next = 7;
            return user.save();

          case 7:
            return _context2.abrupt("return", res.redirect('/users/calendar'));

          case 8:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));

  return function postContestFilter(_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}();

exports.postContestFilter = postContestFilter;

var getMakeGibo = function getMakeGibo(req, res) {
  return res.render('make-gibo');
};

exports.getMakeGibo = getMakeGibo;

var postMakeGibo = function postMakeGibo(req, res) {
  return null;
};

exports.postMakeGibo = postMakeGibo;
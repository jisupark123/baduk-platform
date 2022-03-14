"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.recorder = exports.postLogin = exports.postJoin = exports.notices = exports.noticeView = exports.logout = exports.home = exports.getLogin = exports.getJoin = exports.dashboard = void 0;

var _Notice = _interopRequireDefault(require("../models/Notice"));

var _User = _interopRequireDefault(require("../models/User"));

var _bcrypt = _interopRequireDefault(require("bcrypt"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var home = function home(req, res) {
  return res.render('home');
};

exports.home = home;

var getJoin = function getJoin(req, res) {
  return res.render('join');
};

exports.getJoin = getJoin;

var postJoin = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(req, res) {
    var _req$body, name, userId, password, password2, email, emailExists;

    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _req$body = req.body, name = _req$body.name, userId = _req$body.userId, password = _req$body.password, password2 = _req$body.password2, email = _req$body.email;

            if (!(password !== password2)) {
              _context.next = 3;
              break;
            }

            return _context.abrupt("return", res.status(400).render('join', {
              errorMessage: '비밀번호가 다릅니다'
            }));

          case 3:
            _context.next = 5;
            return _User["default"].exists({
              email: email
            });

          case 5:
            emailExists = _context.sent;

            if (!emailExists) {
              _context.next = 8;
              break;
            }

            return _context.abrupt("return", res.status(400).render('join', {
              errorMessage: '이미 존재하는 이메일입니다'
            }));

          case 8:
            _context.prev = 8;
            _context.next = 11;
            return _User["default"].create({
              name: name,
              userId: userId,
              password: password,
              email: email
            });

          case 11:
            return _context.abrupt("return", res.redirect('/login'));

          case 14:
            _context.prev = 14;
            _context.t0 = _context["catch"](8);
            return _context.abrupt("return", res.status(400).render('join', {
              pageTitle: pageTitle,
              errorMessage: _context.t0._message
            }));

          case 17:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[8, 14]]);
  }));

  return function postJoin(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

exports.postJoin = postJoin;

var getLogin = function getLogin(req, res) {
  return res.render('login');
};

exports.getLogin = getLogin;

var postLogin = /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(req, res) {
    var _req$body2, userId, password, user, checkingPW;

    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _req$body2 = req.body, userId = _req$body2.userId, password = _req$body2.password;
            _context2.next = 3;
            return _User["default"].findOne({
              userId: userId,
              socialOnly: false
            });

          case 3:
            user = _context2.sent;

            if (user) {
              _context2.next = 6;
              break;
            }

            return _context2.abrupt("return", res.status(400).render('login', {
              errorMessage: '존재하지 않는 아이디입니다.'
            }));

          case 6:
            _context2.next = 8;
            return _bcrypt["default"].compare(password, user.password);

          case 8:
            checkingPW = _context2.sent;

            if (checkingPW) {
              _context2.next = 11;
              break;
            }

            return _context2.abrupt("return", res.status(400).render('login', {
              errorMessage: '잘못된 비밀번호입니다.'
            }));

          case 11:
            req.session.loggedIn = true;
            req.session.user = user;
            return _context2.abrupt("return", res.redirect('/'));

          case 14:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));

  return function postLogin(_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}();

exports.postLogin = postLogin;

var logout = function logout(req, res) {
  req.session.destroy();
  return res.redirect('/');
};

exports.logout = logout;

var notices = /*#__PURE__*/function () {
  var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(req, res) {
    var notices;
    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.next = 2;
            return _Notice["default"].find({});

          case 2:
            notices = _context3.sent;
            return _context3.abrupt("return", res.render('notices', {
              notices: notices
            }));

          case 4:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
  }));

  return function notices(_x5, _x6) {
    return _ref3.apply(this, arguments);
  };
}();

exports.notices = notices;

var noticeView = /*#__PURE__*/function () {
  var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(req, res) {
    var id, notice;
    return regeneratorRuntime.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            id = req.params.id;
            _context4.next = 3;
            return _Notice["default"].findById(id);

          case 3:
            notice = _context4.sent;
            return _context4.abrupt("return", res.render('noticeView', {
              notice: notice
            }));

          case 5:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4);
  }));

  return function noticeView(_x7, _x8) {
    return _ref4.apply(this, arguments);
  };
}();

exports.noticeView = noticeView;

var dashboard = function dashboard(req, res) {
  if (!req.session.loggedIn) {
    return res.redirect('/login');
  }

  return res.render('dashboard');
};

exports.dashboard = dashboard;

var recorder = function recorder(req, res) {
  return res.render('recorder');
};

exports.recorder = recorder;
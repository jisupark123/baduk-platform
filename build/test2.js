"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.postLogin = exports.postJoin = exports.home = exports.getlogin = exports.getJoin = void 0;

var _User = _interopRequireDefault(require("./models/User"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

// Add your magic here!
var home = function home(req, res) {
  if (req.session.loggedIn) {
    return res.redirect("/login");
  }

  return res.render("home", {
    pageTitle: "home"
  });
};

exports.home = home;

var getJoin = function getJoin(req, res) {
  return res.render("join", {
    pageTitle: "Join"
  });
};

exports.getJoin = getJoin;

var postJoin = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(req, res) {
    var _req$body, username, name, password, password2, pageTitle, usernameExists;

    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _req$body = req.body, username = _req$body.username, name = _req$body.name, password = _req$body.password, password2 = _req$body.password2;
            pageTitle = "Join";

            if (!(password !== password2)) {
              _context.next = 4;
              break;
            }

            return _context.abrupt("return", res.render("join", {
              pageTitle: pageTitle,
              errorMessage: "비밀번호가 다릅니다"
            }));

          case 4:
            _context.next = 6;
            return _User["default"].exists({
              username: username
            });

          case 6:
            usernameExists = _context.sent;

            if (!usernameExists) {
              _context.next = 9;
              break;
            }

            return _context.abrupt("return", res.render("join", {
              pageTitle: pageTitle,
              errorMessage: "이미 존재하는 아이디입니다"
            }));

          case 9:
            _context.prev = 9;
            _context.next = 12;
            return _User["default"].create({
              username: username,
              name: name,
              password: password
            });

          case 12:
            return _context.abrupt("return", res.redirect("/login"));

          case 15:
            _context.prev = 15;
            _context.t0 = _context["catch"](9);
            return _context.abrupt("return", res.status(400).render("join", {
              pageTitle: pageTitle,
              errorMessage: _context.t0._message
            }));

          case 18:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[9, 15]]);
  }));

  return function postJoin(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

exports.postJoin = postJoin;

var getlogin = function getlogin(req, res) {
  return res.render("login", {
    pageTitle: "Login"
  });
};

exports.getlogin = getlogin;

var postLogin = /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(req, res) {
    var _req$body2, username, password, pageTitle, user, checkingPW;

    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _req$body2 = req.body, username = _req$body2.username, password = _req$body2.password;
            pageTitle = "Login";
            _context2.next = 4;
            return _User["default"].findOne({
              username: username
            });

          case 4:
            user = _context2.sent;

            if (user) {
              _context2.next = 7;
              break;
            }

            return _context2.abrupt("return", res.render("login", {
              pageTitle: pageTitle,
              errorMessage: "존재하지 않는 아이디입니다."
            }));

          case 7:
            _context2.next = 9;
            return bcrypt.compare(password, user.password);

          case 9:
            checkingPW = _context2.sent;

            if (checkingPW) {
              _context2.next = 12;
              break;
            }

            return _context2.abrupt("return", res.render("login", {
              pageTitle: pageTitle,
              errorMessage: "잘못된 비밀번호입니다."
            }));

          case 12:
            req.session.loggedIn = true;
            req.session.user = user;
            return _context2.abrupt("return", res.redirect("/"));

          case 15:
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
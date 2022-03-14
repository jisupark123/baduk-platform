"use strict";

function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

(function () {
  var date = new Date();
  var MINI_WINDOW_CLASSNAME = 'mini-window';

  var renderCalendar = function renderCalendar() {
    var year = date.getFullYear();
    var month = date.getMonth() + 1;
    var preLast = new Date(year, month - 1, 0); // 지난달 마지막 날

    var thisLast = new Date(year, month, 0); // 이번달 마지막 날

    var PLDate = preLast.getDate();
    var PLDay = preLast.getDay();
    var TLDate = thisLast.getDate();
    var TLDay = thisLast.getDay();
    var preDates = [];

    var thisDates = _toConsumableArray(Array(TLDate + 1).keys()).slice(1);

    var nextDates = [];

    if (PLDay !== 6) {
      // 저번달 마지막날이 토요일이면 필요없음
      for (var i = 0; i <= PLDay; i++) {
        preDates.unshift(PLDate - i);
      }
    }

    var rowCount = TLDate === 31 && (PLDay === 4 || PLDay === 5) || TLDate === 30 && PLDay === 5 ? 7 : 14;

    for (var _i = 1; _i < rowCount - TLDay; _i++) {
      nextDates.push(_i);
    }

    var dates = preDates.concat(thisDates, nextDates);
    var firstDateIndex = dates.indexOf(1);
    var lastDateIndex = dates.indexOf(TLDate) > 10 ? dates.indexOf(TLDate) : dates.lastIndexOf(TLDate);
    dates.forEach(function (date, i) {
      var condition = i >= firstDateIndex && i <= lastDateIndex ? 'this' : 'other';
      dates[i] = "<div class=\"calendar__date\"><div class=".concat(condition, ">").concat(date, "</div></div>");
    });
    document.querySelector('.calendar__dates').innerHTML = dates.join('');
    document.querySelector('.calendar__year-month').innerText = "".concat(year, "\uB144 ").concat(month, "\uC6D4"); // 오늘 날짜 그리기

    var today = new Date();
    var todayDate = today.getDate();

    if (year === today.getFullYear() && month === today.getMonth() + 1) {
      var _iterator = _createForOfIteratorHelper(document.querySelectorAll('.this')),
          _step;

      try {
        for (_iterator.s(); !(_step = _iterator.n()).done;) {
          var _date = _step.value;

          if (+_date.innerText === todayDate) {
            _date.classList.add('today');

            break;
          }
        }
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }
    }
  };

  var filter = function filter(contests, contestfilter) {
    var possibleContests = [];

    var _iterator2 = _createForOfIteratorHelper(contests),
        _step2;

    try {
      for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
        var contest = _step2.value;
        var contestPossible = false; // 대회 전체 가능 여부 (테스트를 하나라도 통과하면 true로 바뀜)

        var title = contest.title,
            link = contest.link,
            dates = contest.dates,
            sections = contest.sections;
        var contestObj = {};
        var sectionList = [];

        var _iterator3 = _createForOfIteratorHelper(sections),
            _step3;

        try {
          for (_iterator3.s(); !(_step3 = _iterator3.n()).done;) {
            var section = _step3.value;
            var sectionPossible = true; // 각 부문별 가능 여부 (테스트를 하나라도 탈락하면 false로 바뀜)

            var RT = section.requirementTypes;
            var RV = section.requirementValues;
            var RO = section.requirementOr;
            var ET = section.excludeTypes;
            var EV = section.excludeValues;
            var EA = section.excludeAnd;

            for (var i in RT) {
              if (RT[i] && contestfilter[RT[i]] !== RV[i]) {
                // 필수 조건 (값에 해당되지 않으면 제외)
                sectionPossible = false;
                break;
              }

              if (ET[i] && contestfilter[ET[i] === EV[i]]) {
                // 제외 조건 (값에 해당되면 제외)
                sectionPossible = false;
                break;
              }
            }

            if (RO.length) {
              // 필수 조건(or) (2개의 값 중 하나라도 true면 통과)
              for (var _i2 in RO) {
                var extraPossible = 0;

                for (var key in RO[_i2]) {
                  // 2번 반복
                  if (key === 'age-over') {
                    extraPossible += contestfilter.age <= RO[_i2][key]; // 2002년생 기준일 때 2002년생까지 통과
                  } else if (key === 'age-under') {
                    extraPossible += contestfilter.age > RO[_i2][key];
                  } else {
                    extraPossible += contestfilter.age === RO[_i2][key];
                  }
                }

                if (!extraPossible) {
                  sectionPossible = false;
                  break;
                }
              }
            }

            if (EA.length) {
              // 제외 조건(and) (2개의 값 모두 일치하면 제외)
              for (var _i3 in EA) {
                var _extraPossible = 0;

                for (var _key in EA[_i3]) {
                  // 2번 반복
                  if (_key === 'age-over') {
                    _extraPossible += contestfilter.age > EA[_i3][_key]; // 2002년생 기준일 때 2002년 생이면 탈락 2003년 생이면 통과
                  } else if (_key === 'age-under') {
                    _extraPossible += contestfilter.age <= EA[_i3][_key];
                  } else {
                    _extraPossible += contestfilter.age !== EA[_i3][_key];
                  }
                }

                if (!_extraPossible) {
                  sectionPossible = false;
                  break;
                }
              }
            }

            if (sectionPossible === true) {
              contestPossible = true;
              sectionList.push(section.sectionName);
            }
          }
        } catch (err) {
          _iterator3.e(err);
        } finally {
          _iterator3.f();
        }

        if (contestPossible === true) {
          possibleContests.push({
            title: title,
            link: link,
            dates: dates,
            sections: sectionList
          });
        }
      }
    } catch (err) {
      _iterator2.e(err);
    } finally {
      _iterator2.f();
    }

    return possibleContests;
  };

  var renderContest = function renderContest(contests, contestfilter) {
    // 날짜별로 id 추가
    var yearMonth = document.querySelector('.calendar__year-month').innerText;
    var year = Number(yearMonth.slice(0, 4));
    var month = Number(yearMonth.length === 9 ? yearMonth.slice(-3, yearMonth.length - 1) : yearMonth.slice(-2, yearMonth.length - 1));
    var dateCells = document.querySelectorAll('.calendar__date');

    var _iterator4 = _createForOfIteratorHelper(dateCells),
        _step4;

    try {
      for (_iterator4.s(); !(_step4 = _iterator4.n()).done;) {
        var dateCell = _step4.value;
        dateCell.innerHTML += "<div class='calendar__contest'></div>";

        var _date2 = dateCell.innerText.padStart(2, '0');

        if (dateCell.querySelector('.this')) {
          dateCell.id = "".concat(year).concat(month).concat(_date2);
        } else {
          if (_date2 > 15) {
            month === 1 ? dateCell.id = "".concat(year - 1).concat(month + 11).concat(_date2) : dateCell.id = "".concat(year).concat(month - 1).concat(_date2);
          } else {
            month === 12 ? dateCell.id = "".concat(year + 1).concat(month - 11).concat(_date2) : dateCell.id = "".concat(year).concat(month + 1).concat(_date2);
          }
        }
      } // 해당되는 날짜에 대회 추가

    } catch (err) {
      _iterator4.e(err);
    } finally {
      _iterator4.f();
    }

    var possibleContests = filter(contests, contestfilter);

    var _iterator5 = _createForOfIteratorHelper(contests),
        _step5;

    try {
      var _loop = function _loop() {
        var contest = _step5.value;
        var title = contest.title,
            link = contest.link,
            dates = contest.dates,
            sections = contest.sections;
        var viewSectionNames = '';

        var _iterator6 = _createForOfIteratorHelper(sections),
            _step6;

        try {
          for (_iterator6.s(); !(_step6 = _iterator6.n()).done;) {
            var section = _step6.value;
            viewSectionNames += "<span>".concat(section.sectionName, "</span>");
          }
        } catch (err) {
          _iterator6.e(err);
        } finally {
          _iterator6.f();
        }

        var _iterator7 = _createForOfIteratorHelper(dates),
            _step7;

        try {
          for (_iterator7.s(); !(_step7 = _iterator7.n()).done;) {
            var d = _step7.value;
            var contestDate = d.split('-');
            contestDate = contestDate[0] + contestDate[1] + contestDate[2].slice(0, 2);

            var _iterator8 = _createForOfIteratorHelper(dateCells),
                _step8;

            try {
              for (_iterator8.s(); !(_step8 = _iterator8.n()).done;) {
                var _dateCell = _step8.value;

                if (_dateCell.id === contestDate) {
                  (function () {
                    var contestBox = _dateCell.querySelector('.calendar__contest');

                    contestBox.innerText = title;

                    _dateCell.addEventListener('mouseenter', function () {
                      contestBox.classList.add(MINI_WINDOW_CLASSNAME);
                      contestBox.innerHTML = "<span>".concat(title, "</span><span><\uCD94\uCC9C></span>").concat(viewSectionNames, "<a href=").concat(link, ">").concat(link, "</span>");
                    });

                    _dateCell.addEventListener('mouseleave', function () {
                      contestBox.classList.remove(MINI_WINDOW_CLASSNAME);
                      contestBox.innerHTML = title;
                    });
                  })();
                }
              }
            } catch (err) {
              _iterator8.e(err);
            } finally {
              _iterator8.f();
            }
          }
        } catch (err) {
          _iterator7.e(err);
        } finally {
          _iterator7.f();
        }
      };

      for (_iterator5.s(); !(_step5 = _iterator5.n()).done;) {
        _loop();
      }
    } catch (err) {
      _iterator5.e(err);
    } finally {
      _iterator5.f();
    }
  };

  var toPreMonth = function toPreMonth() {
    date.setDate(1);
    date.setMonth(date.getMonth() - 1);
    renderCalendar();
    renderContest(contests, contestfilter);
  };

  var toNextMonth = function toNextMonth() {
    date.setDate(1);
    date.setMonth(date.getMonth() + 1);
    renderCalendar();
    renderContest(contests, contestfilter);
  };

  var thisMonth = function thisMonth() {
    date = new Date();
    renderCalendar();
    renderContest(contests, contestfilter);
  };

  var preMonthBtn = document.querySelector('.go-pre');
  var nextMonthBtn = document.querySelector('.go-next');
  var calendar = document.querySelector('.calendar');
  var contests = calendar.dataset.contests ? JSON.parse(calendar.dataset.contests) : undefined;
  var contestfilter = calendar.dataset.contestfilter ? JSON.parse(calendar.dataset.contestfilter) : undefined;
  renderCalendar();

  if (contests && contestfilter) {
    renderContest(contests, contestfilter);
  }

  preMonthBtn.addEventListener('click', toPreMonth);
  nextMonthBtn.addEventListener('click', toNextMonth);
})();
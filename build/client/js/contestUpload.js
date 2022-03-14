"use strict";

function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

(function () {
  var sectionTypes = document.querySelectorAll('.section-type');
  var submitBtn = document.querySelector('input[type=submit]');

  var _iterator = _createForOfIteratorHelper(sectionTypes),
      _step;

  try {
    var _loop = function _loop() {
      var sectionType = _step.value;
      sectionType.addEventListener('change', function () {
        var sectionTypeId = sectionType.id;
        sectionValue = document.getElementById(sectionTypeId.slice(0, sectionTypeId.length - 4) + 'value');

        if (sectionType.value === '') {
          sectionValue.innerHTML = "<option value=\"\"></option>";
        } else if (sectionType.value === 'sex') {
          sectionValue.innerHTML = '';
          sectionValue.innerHTML += "<option value=\"male\">\uB0A8</option>";
          sectionValue.innerHTML += "<option value=\"female\">\uC5EC</option>";
        } else if (sectionType.value === 'age-over' || sectionType.value === 'age-under') {
          sectionValue.innerHTML = '';
          var maxYear = new Date().getFullYear() - 4;

          for (var i = 0; i < 68; i++) {
            sectionValue.innerHTML += "<option value=".concat(maxYear - i, ">").concat(maxYear - i, "</option>");
          }
        } else if (sectionType.value === 'school') {
          sectionValue.innerHTML = '';
          sectionValue.innerHTML += "<option value=\"university\">\uB300\uD559\uAD50</option>";
          sectionValue.innerHTML += "<option value=\"high\">\uACE0\uB4F1\uD559\uAD50</option>";
          sectionValue.innerHTML += "<option value=\"middle\">\uC911\uD559\uAD50</option>";
          sectionValue.innerHTML += "<option value=\"elementary\">\uCD08\uB4F1\uD559\uAD50</option>";
        } else if (sectionType.value === 'belongNow') {
          sectionValue.innerHTML = '';
          sectionValue.innerHTML += "<option value=\"national\">\uB0B4\uC154\uB110\uB9AC\uADF8</option>";
          sectionValue.innerHTML += "<option value=\"city\">\uC2DC\uB3C4\uB9AC\uADF8</option>";
          sectionValue.innerHTML += "<option value=\"seoul-semi-pro\">\uC11C\uC6B8 \uC5F0\uAD6C\uC0DD</option>";
          sectionValue.innerHTML += "<option value=\"local-semi-pro\">\uC9C0\uC5ED \uC5F0\uAD6C\uC0DD</option>";
          sectionValue.innerHTML += "<option value=\"federation\">\uD55C\uBC14\uC5F0</option>";
        } else if (sectionType.value === 'belongPre') {
          sectionValue.innerHTML = '';
          sectionValue.innerHTML += "<option value=\"national\">\uB0B4\uC154\uB110\uB9AC\uADF8</option>";
          sectionValue.innerHTML += "<option value=\"city\">\uC2DC\uB3C4\uB9AC\uADF8</option>";
          sectionValue.innerHTML += "<option value=\"seoul-semi-pro\">\uC11C\uC6B8 \uC5F0\uAD6C\uC0DD</option>";
          sectionValue.innerHTML += "<option value=\"local-semi-pro\">\uC9C0\uC5ED \uC5F0\uAD6C\uC0DD</option>";
        }
      });
    };

    for (_iterator.s(); !(_step = _iterator.n()).done;) {
      _loop();
    }
  } catch (err) {
    _iterator.e(err);
  } finally {
    _iterator.f();
  }
})();
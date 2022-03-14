"use strict";

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var startBtn = document.querySelector('.record-btn');
var video = document.getElementById('preview');
var stream;
var recorder;
var videoFile;

var downloadRecording = function downloadRecording() {
  var a = document.createElement('a');
  a.href = videoFile;
  a.download = 'MyRecording.webm';
  document.body.appendChild(a);
  a.click();
};

var stopRecording = function stopRecording() {
  startBtn.innerText = 'Download Recording';
  startBtn.removeEventListener('click', stopRecording);
  startBtn.addEventListener('click', downloadRecording);
  recorder.stop();
};

var startRecording = function startRecording() {
  startBtn.innerText = 'Stop Recording';
  startBtn.removeEventListener('click', startRecording);
  startBtn.addEventListener('click', stopRecording);
  recorder = new MediaRecorder(stream);
  console.log(recorder);

  recorder.ondataavailable = function (event) {
    videoFile = URL.createObjectURL(event.data);
    video.srcObject = null;
    video.src = videoFile;
    video.loop = true;
    video.play();
  };

  recorder.start();
};

var init = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return navigator.mediaDevices.getUserMedia({
              audio: false,
              video: {
                width: 200,
                height: 100
              }
            });

          case 2:
            stream = _context.sent;
            video.srcObject = stream;
            video.play();

          case 5:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function init() {
    return _ref.apply(this, arguments);
  };
}(); // init()


startBtn.addEventListener('click', startRecording); //-------------------------------------------------------------------------------

var audioStartBtn = document.querySelector('.audio-record-btn');
var audio = document.getElementById('audio-preview');
var audioStream;
var audioRecorder;
var audioFile;

var downloadAudioRecording = function downloadAudioRecording() {
  var a = document.createElement('a');
  a.href = audioFile;
  a.download = 'MyRecording.mp3';
  document.body.appendChild(a);
  a.click();
};

var stopAudioRecording = function stopAudioRecording() {
  audioStartBtn.innerText = 'Download Recording';
  audioStartBtn.removeEventListener('click', stopAudioRecording);
  audioStartBtn.addEventListener('click', downloadAudioRecording);
  audioRecorder.stop();
};

var startAudioRecording = /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            audioStartBtn.innerText = 'Stop Recording';
            audioStartBtn.removeEventListener('click', startAudioRecording);
            audioStartBtn.addEventListener('click', stopAudioRecording);
            _context2.next = 5;
            return navigator.mediaDevices.getUserMedia({
              audio: true,
              video: false
            });

          case 5:
            audioStream = _context2.sent;
            audio.srcObject = audioStream;
            audioRecorder = new MediaRecorder(audioStream);

            audioRecorder.ondataavailable = function (event) {
              audioFile = URL.createObjectURL(event.data);
              audio.srcObject = null;
              audio.src = audioFile;
            };

            audioRecorder.start();
            setTimeout(function () {
              if (audioRecorder.state === 'recording') {
                audioStartBtn.click();
              }
            }, 5000);

          case 11:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));

  return function startAudioRecording() {
    return _ref2.apply(this, arguments);
  };
}();

audioStartBtn.addEventListener('click', startAudioRecording);
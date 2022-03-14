const startBtn = document.querySelector('.record-btn');
const video = document.getElementById('preview');

let stream;
let recorder;
let videoFile;

const downloadRecording = () => {
  const a = document.createElement('a');
  a.href = videoFile;
  a.download = 'MyRecording.webm';
  document.body.appendChild(a);
  a.click();
};

const stopRecording = () => {
  startBtn.innerText = 'Download Recording';
  startBtn.removeEventListener('click', stopRecording);
  startBtn.addEventListener('click', downloadRecording);
  recorder.stop();
};

const startRecording = () => {
  startBtn.innerText = 'Stop Recording';
  startBtn.removeEventListener('click', startRecording);
  startBtn.addEventListener('click', stopRecording);
  recorder = new MediaRecorder(stream);
  console.log(recorder);
  recorder.ondataavailable = (event) => {
    videoFile = URL.createObjectURL(event.data);
    video.srcObject = null;
    video.src = videoFile;
    video.loop = true;
    video.play();
  };
  recorder.start();
};

const init = async () => {
  stream = await navigator.mediaDevices.getUserMedia({
    audio: false,
    video: { width: 200, height: 100 },
  });
  video.srcObject = stream;
  video.play();
};

// init()

startBtn.addEventListener('click', startRecording);

//-------------------------------------------------------------------------------
const audioStartBtn = document.querySelector('.audio-record-btn');
const audio = document.getElementById('audio-preview');

let audioStream;
let audioRecorder;
let audioFile;

const downloadAudioRecording = () => {
  const a = document.createElement('a');
  a.href = audioFile;
  a.download = 'MyRecording.mp3';
  document.body.appendChild(a);
  a.click();
};

const stopAudioRecording = () => {
  audioStartBtn.innerText = 'Download Recording';
  audioStartBtn.removeEventListener('click', stopAudioRecording);
  audioStartBtn.addEventListener('click', downloadAudioRecording);
  audioRecorder.stop();
};

const startAudioRecording = async () => {
  audioStartBtn.innerText = 'Stop Recording';
  audioStartBtn.removeEventListener('click', startAudioRecording);
  audioStartBtn.addEventListener('click', stopAudioRecording);
  audioStream = await navigator.mediaDevices.getUserMedia({
    audio: true,
    video: false,
  });
  audio.srcObject = audioStream;
  audioRecorder = new MediaRecorder(audioStream);
  audioRecorder.ondataavailable = (event) => {
    audioFile = URL.createObjectURL(event.data);
    audio.srcObject = null;
    audio.src = audioFile;
  };
  audioRecorder.start();
  setTimeout(() => {
    if (audioRecorder.state === 'recording') {
      audioStartBtn.click();
    }
  }, 5000);
};

audioStartBtn.addEventListener('click', startAudioRecording);

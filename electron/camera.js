let currentStream;

// Get references to the DOM elements
const videoElement = document.getElementById('video');
const videoSelect = document.getElementById('videoSelect');
const startButton = document.getElementById('startButton');
const stopButton = document.getElementById('stopButton');

// Add event listeners to the buttons
startButton.addEventListener('click', startWebcam);
stopButton.addEventListener('click', stopWebcam);
videoSelect.addEventListener('change', startWebcam);

// Get the list of video devices (webcams)
navigator.mediaDevices.enumerateDevices()
  .then(gotDevices)
  .catch(handleError);

// Populate the webcam list in the dropdown
function gotDevices(deviceInfos) {
  videoSelect.innerHTML = ''; // Clear the dropdown before adding options

  deviceInfos.forEach(deviceInfo => {
    if (deviceInfo.kind === 'videoinput') {
      const option = document.createElement('option');
      option.value = deviceInfo.deviceId;
      option.text = deviceInfo.label || `Camera ${videoSelect.length + 1}`;
      videoSelect.appendChild(option);
    }
  });
}

// Start the webcam feed
function startWebcam() {
  if (currentStream) {
    currentStream.getTracks().forEach(track => track.stop()); // Stop current feed
  }

  const videoSource = videoSelect.value;
  const constraints = {
    video: {
      deviceId: videoSource ? { exact: videoSource } : undefined
    }
  };

  navigator.mediaDevices.getUserMedia(constraints)
    .then(gotStream)
    .catch(handleError);
}

// Attach the video stream to the video element
function gotStream(stream) {
  currentStream = stream;
  videoElement.srcObject = stream;

  startButton.disabled = true;
  stopButton.disabled = false;
}

// Stop the webcam feed
function stopWebcam() {
  if (currentStream) {
    currentStream.getTracks().forEach(track => track.stop());
  }

  startButton.disabled = false;
  stopButton.disabled = true;
}

// Handle errors gracefully
function handleError(error) {
  console.error('Error:', error);
}

let currentStream: MediaStream | null = null;

// Get references to the DOM elements
const videoElement = document.getElementById('video') as HTMLVideoElement;
const videoSelect = document.getElementById('videoSelect') as HTMLSelectElement;
const startButton = document.getElementById('startButton') as HTMLButtonElement;
const stopButton = document.getElementById('stopButton') as HTMLButtonElement;

// Add event listeners to the buttons
startButton.addEventListener('click', startWebcam);
stopButton.addEventListener('click', stopWebcam);
videoSelect.addEventListener('change', startWebcam);

// Get the list of video devices (webcams)
navigator.mediaDevices.enumerateDevices()
  .then(gotDevices)
  .catch(handleError);

// Populate the webcam list in the dropdown
function gotDevices(deviceInfos: MediaDeviceInfo[]): void {
  videoSelect.innerHTML = ''; // Clear the dropdown before adding options

  deviceInfos.forEach((deviceInfo: MediaDeviceInfo) => {
    if (deviceInfo.kind === 'videoinput') {
      const option = document.createElement('option');
      option.value = deviceInfo.deviceId;
      option.text = deviceInfo.label || `Camera ${videoSelect.length + 1}`;
      videoSelect.appendChild(option);
    }
  });
}

// Start the webcam feed
function startWebcam(): void {
  if (currentStream) {
    currentStream.getTracks().forEach((track: MediaStreamTrack) => track.stop()); // Stop current feed
  }

  const videoSource: string = videoSelect.value;
  const constraints: MediaStreamConstraints = {
    video: {
      deviceId: videoSource ? { exact: videoSource } : undefined
    }
  };

  navigator.mediaDevices.getUserMedia(constraints)
    .then(gotStream)
    .catch(handleError);
}

// Attach the video stream to the video element
function gotStream(stream: MediaStream): void {
  currentStream = stream;
  videoElement.srcObject = stream;

  startButton.disabled = true;
  stopButton.disabled = false;
}

// Stop the webcam feed
function stopWebcam(): void {
  if (currentStream) {
    currentStream.getTracks().forEach((track: MediaStreamTrack) => track.stop());
    currentStream = null;
  }

  startButton.disabled = false;
  stopButton.disabled = true;
}

// Handle errors gracefully
function handleError(error: Error): void {
  console.error('Error:', error);
}

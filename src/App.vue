<template>
  <v-app>
    <v-main>
      <div class="screen-container">
        <!-- Screen Share Display -->
        <div class="screen-share-display">
          <video 
            ref="screenVideo" 
            autoplay 
            playsinline 
            style="width: 100%; height: 100%; background-color: #000;">
          </video>
        </div>

        <!-- Camera Feed Display -->
        <div v-if="isCameraRunning" class="camera-feed">
          <CameraDisplay :stream="currentStream" />
        </div>
      </div>
    </v-main>
    <BottomBar
      :participantCount="0"
      :cameraOptions="cameras"
      :selectedCameraId="selectedCameraId"
      @toggle-camera="toggleCamera"
      @update-camera="updateSelectedCamera"
      @share-screen="startScreenShare"
    />
  </v-app>
</template>

<script>
import CameraDisplay from "./components/CameraDisplay.vue";
import BottomBar from "./components/BottomBar.vue";

export default {
  name: "App",
  components: { CameraDisplay, BottomBar },
  data() {
    return {
      cameras: [],
      selectedCameraId: null,
      isCameraRunning: false,
      currentStream: null,
      screenStream: null
    };
  },
  methods: {
    async getCameras() {
      try {
        const devices = await navigator.mediaDevices.enumerateDevices();
        this.cameras = devices
          .filter(device => device.kind === 'videoinput')
          .map((device, index) => ({
            label: device.label || `Camera ${index + 1}`,
            deviceId: device.deviceId
          }));
        if (this.cameras.length > 0) {
          this.selectedCameraId = this.cameras[0].deviceId;
        }
      } catch (error) {
        console.error("Error getting cameras:", error);
      }
    },
    async startWebcam(deviceId) {
      if (this.currentStream) {
        this.stopWebcam();
      }
      try {
        const constraints = {
          video: {
            deviceId: deviceId ? { exact: deviceId } : undefined
          }
        };
        const stream = await navigator.mediaDevices.getUserMedia(constraints);
        this.currentStream = stream;
        this.isCameraRunning = true;
      } catch (error) {
        console.error("Error starting webcam:", error);
      }
    },
    stopWebcam() {
      if (this.currentStream) {
        this.currentStream.getTracks().forEach(track => track.stop());
        this.currentStream = null;
        this.isCameraRunning = false;
      }
    },
    toggleCamera(isOn, selectedDeviceId) {
      if (isOn) {
        this.startWebcam(selectedDeviceId || this.selectedCameraId);
      } else {
        this.stopWebcam();
      }
    },
    updateSelectedCamera(deviceId) {
      this.selectedCameraId = deviceId;
    },
    async startScreenShare() {
      try {
        const sources = await window.electron.getSources();
        const source = sources[0]; // Automatically selects the first screen, you can add logic for user choice.

        const constraints = {
          audio: false,
          video: {
            mandatory: {
              chromeMediaSource: 'desktop',
              chromeMediaSourceId: source.id,
            }
          }
        };

        const stream = await navigator.mediaDevices.getUserMedia(constraints);
        this.screenStream = stream;

        // Attach the stream to the video element
        const videoElement = this.$refs.screenVideo;
        videoElement.srcObject = stream;

      } catch (error) {
        console.error("Error starting screen share:", error);
      }
    }
  },
  mounted() {
    this.getCameras();
  }
};
</script>

<style scoped>
.screen-container {
  position: relative;
  width: 100%;
  height: 90vh;
  background-color: #f5f5f5;
  border: 2px solid #ccc;
  border-radius: 8px;
  overflow: hidden;
}

.screen-share-display {
  width: 100%;
  height: calc(100vh - 105px);
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #e0e0e0;
}

.camera-feed {
  position: absolute;
  bottom: 80px;
  right: 20px;
  width: 240px;
  height: 135px;
  background-color: #000;
  border: 2px solid #fff;
  border-radius: 8px;
  z-index: 10;
}
</style>

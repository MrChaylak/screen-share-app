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

    <!-- Bottom Bar for Controls -->
    <BottomBar
      :participantCount="0"
      :cameraOptions="cameras"
      :selectedCameraId="selectedCameraId"
      @toggle-camera="toggleCamera"
      @update-camera="updateSelectedCamera"
      @share-screen="showScreenSelection"
    />

    <!-- Screen Selection Dialog -->
    <v-dialog v-model="showScreenDialog" max-width="600px">
      <v-card>
        <v-card-title>Select a screen to share</v-card-title>
        <v-card-text>
          <v-row>
            <v-col 
              v-for="source in screenSources" 
              :key="source.id" 
              cols="6" 
              class="screen-option"
            >
              <v-img 
                :src="source.thumbnail" 
                aspect-ratio="16/9" 
                @click="startScreenShare(source)"
                class="screen-thumbnail"
              />
              <p class="text-center">{{ source.name }}</p>
            </v-col>
          </v-row>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn text @click="showScreenDialog = false">Cancel</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
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
      screenStream: null,
      screenSources: [], // Screens and windows to select from
      showScreenDialog: false, // Controls the screen selection dialog
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
    async showScreenSelection() {
      try {
        const sources = await window.electron.getSources();
        this.screenSources = sources.map(source => ({
          id: source.id,
          name: source.name,
          thumbnail: source.thumbnail.toDataURL()
        }));
        this.showScreenDialog = true;
      } catch (error) {
        console.error("Error fetching screens:", error);
      }
    },
    async startScreenShare(source) {
      try {
        this.showScreenDialog = false;

        const constraints = {
          audio: false,
          video: {
            mandatory: {
              chromeMediaSource: 'desktop',
              chromeMediaSourceId: source.id
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

.screen-option {
  cursor: pointer;
}

.screen-thumbnail {
  border-radius: 8px;
  border: 2px solid #ccc;
}

.screen-thumbnail:hover {
  border-color: #3f51b5;
}
</style>

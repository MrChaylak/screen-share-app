<template>
  <v-footer app>
    <v-container fluid>
      <v-row align="center" justify="center">
        <!-- Camera Device Selection -->
        <v-select
          label="Select Camera"
          v-model="selectedCamera"
          :items="cameraOptions"
          item-text="label"
          item-value="deviceId"
          class="mx-3"
          dense
          outlined
          style="max-width: 180px;"
        />

        <!-- Camera Toggle Button -->
        <v-btn icon @click="toggleCamera" class="mx-3">
          <v-icon>{{ isCameraOn ? 'mdi-camera' : 'mdi-camera-off' }}</v-icon>
        </v-btn>

        <!-- Share Screen Button -->
        <v-btn icon @click="shareScreen" class="mx-3">
          <v-icon>mdi-monitor-share</v-icon>
        </v-btn>

        <!-- People Icon with Count -->
        <v-btn icon class="mx-3">
          <v-icon>mdi-account-group</v-icon>
          <span>{{ participantCount }}</span>
        </v-btn>
      </v-row>
    </v-container>
  </v-footer>
</template>

<script lang="ts">
export default {
  name: 'BottomBar',
  props: {
    participantCount: {
      type: Number,
      required: true
    },
    cameraOptions: {
      type: Array,
      required: true
    },
    selectedCameraId: {
      type: String,
      required: false
    }
  },
  data() {
    return {
      isCameraOn: false,
      selectedCamera: this.selectedCameraId || null
    };
  },
  methods: {
    toggleCamera() {
      this.isCameraOn = !this.isCameraOn;
      this.$emit('toggle-camera', this.isCameraOn, this.selectedCamera);
    },
    shareScreen() {
      console.log('Screen sharing started');
    }
  },
  watch: {
    selectedCamera(newVal) {
      this.$emit('update-camera', newVal);
    }
  }
};
</script>

<style scoped>
v-btn {
  margin: 0 15px;
}
</style>
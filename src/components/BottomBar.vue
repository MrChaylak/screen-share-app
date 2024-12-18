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
        />

        <!-- Camera Toggle Button -->
        <v-btn icon @click="toggleCamera" class="mx-3">
          <v-icon>{{ isCameraOn ? 'mdi-camera' : 'mdi-camera-off' }}</v-icon>
        </v-btn>

        <!-- Share Screen Button -->
        <v-btn 
          v-if="!isScreenSharing" 
          icon 
          @click="$emit('share-screen')" 
          class="mx-3"
        >
          <v-icon>mdi-monitor-share</v-icon>
        </v-btn>

        <!-- Stop Screen Share Button -->
        <v-btn 
          v-if="isScreenSharing" 
          icon 
          @click="$emit('stop-screen-share')" 
          class="mx-3"
        >
          <v-icon>mdi-monitor-off</v-icon>
        </v-btn>
      </v-row>
    </v-container>
  </v-footer>
</template>

<script>
export default {
  props: ['isScreenSharing', 'cameraOptions'],
  data() {
    return { isCameraOn: false, selectedCamera: null };
  }
};
</script>

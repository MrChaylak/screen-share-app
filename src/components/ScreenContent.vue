<template>
    <v-container class="screen-content" fluid>
      <v-row class="fill-height">
        <!-- Screen Share Content -->
        <v-col class="screen-share" :style="screenShareStyle">
          <div class="screen-display border-md">
            <h2>Start Screen Share</h2>
          </div>
        </v-col>
      </v-row>
      <!-- Camera Feed at Bottom Right -->
      <div v-if="cameraActive" class="camera-display">
        <CameraDisplay />
      </div>
    </v-container>
  </template>
  
  <script lang="ts">
  import { defineComponent, computed } from 'vue';
  import CameraDisplay from './CameraDisplay.vue';
  
  export default defineComponent({
    name: 'ScreenContent',
    components: { CameraDisplay },
    props: {
      cameraActive: {
        type: Boolean,
        required: true
      }
    },
    setup(props) {
      const screenShareStyle = computed(() => {
        return props.cameraActive
          ? { marginRight: '260px' } // Leaves space for camera feed
          : {};
      });
  
      return { screenShareStyle };
    }
  });
  </script>
  
  <style scoped>
  .screen-content {
    height: calc(100vh - 45px); /* Full height minus BottomBar */
    overflow: hidden;
    position: relative;
  }
  
  .screen-share {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
  }
  
  .screen-display {
    width: 100%;
    height: 100%;
    border-radius: 8px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  
  .camera-display {
    position: absolute;
    bottom: 40px;
    right: 18px;
    width: 240px;
    height: 135px;
    background-color: #000;
    border-radius: 8px;
    z-index: 10;
  }
  </style>
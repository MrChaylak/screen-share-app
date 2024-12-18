<template>
  <v-container class="screen-content" fluid>
    <v-row class="fill-height">
      <v-col class="screen-share" :style="screenShareStyle">
        <div class="screen-display border-md">
          <h2>Start Screen Share</h2>
        </div>
      </v-col>
    </v-row>
    <div v-if="cameraActive" class="camera-display">
      <CameraDisplay :deviceId="cameraDeviceId" />
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
    },
    cameraDeviceId: {
      type: String,
      required: false
    }
  },
  setup(props) {
    const screenShareStyle = computed(() => {
      return props.cameraActive ? { marginRight: '260px' } : {};
    });

    return { screenShareStyle };
  }
});
</script>

<style scoped>
  .screen-content {
    height: calc(100vh - 45px);
    overflow: hidden;
    position: relative;
  }

  .camera-display {
    position: absolute;
    bottom: 100px;
    right: 18px;
    width: 240px;
    height: 135px;
    background-color: #000;
    border-radius: 8px;
    z-index: 10;
  }
</style>

<template>
  <v-app>
    <v-main>
      <ScreenContent :cameraActive="cameraActive" />
    </v-main>
    <BottomBar :participantCount="0" @toggle-camera="toggleCamera" />
  </v-app>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import BottomBar from './components/BottomBar.vue';
import ScreenContent from './components/ScreenContent.vue';

export default defineComponent({
  name: 'App',
  components: {
    BottomBar,
    ScreenContent
  },
  setup() {
    const cameraActive = ref(false);

    const toggleCamera = (isActive: boolean) => {
      cameraActive.value = isActive;
    };

    return {
      cameraActive,
      toggleCamera
    };
  }
});
</script>

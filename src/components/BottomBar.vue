<template>
    <v-footer app>
      <v-container fluid>
        <v-row align="center" justify="space-between">
          
          <!-- Camera Toggle Button -->
          <v-btn icon @click="toggleCamera">
            <v-icon>{{ cameraOn ? 'mdi-camera' : 'mdi-camera-off' }}</v-icon>
          </v-btn>
          
          <!-- Share Screen Button -->
          <v-btn icon @click="shareScreen">
            <v-icon>mdi-monitor-share</v-icon>
          </v-btn>
          
          <!-- People Icon with Count -->
          <v-btn icon>
            <v-icon>mdi-account-group</v-icon>
            <span>{{ participantCount }}</span>
          </v-btn>
        </v-row>
      </v-container>
    </v-footer>
  </template>
  
  <script lang="ts">
  import { defineComponent, ref } from 'vue';
  
  export default defineComponent({
    name: 'BottomBar',
    props: {
      participantCount: {
        type: Number,
        required: true
      }
    },
    setup() {
      const cameraOn = ref(true);
  
      const toggleCamera = () => {
        cameraOn.value = !cameraOn.value;
      };
  
      const shareScreen = () => {
        console.log('Screen sharing started');
      };
  
      return {
        cameraOn,
        toggleCamera,
        shareScreen
      };
    }
  });
  </script>
  
  <style scoped>
    v-btn {
      margin: 0 10px;
    }
  </style>
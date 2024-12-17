<template>
    <div class="camera-display-content">
      <p>Camera Display</p>
    </div>
  </template>
  
  <script lang="ts">
  import { defineComponent } from 'vue';
  
  export default defineComponent({
    name: 'CameraDisplay'
  });
  </script>
  
  <style scoped>
  .camera-display-content {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #fff;
    background-color: #000;
    border-radius: 8px;
  }
  </style>
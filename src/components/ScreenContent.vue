<template>
    <v-container class="screen-content">
      <v-row align="center" justify="center" class="fill-height">
        <v-col cols="12" class="text-center">
          <h2>Start Screen Share</h2>
        </v-col>
      </v-row>
    </v-container>
  </template>
  
  <script lang="ts">
  import { defineComponent } from 'vue';
  
  export default defineComponent({
    name: 'ScreenContent',
  });
  </script>
  
  <style scoped>
  .screen-content {
    background-color: #f5f5f5;
    height: 100%;
  }
  </style>
  

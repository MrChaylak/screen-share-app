 <!-- src/App.vue -->
 <template>
  <v-app>
    <v-main>
      <ScreenContent />
    </v-main>
    <BottomBar :participantCount="0" />
  </v-app>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import BottomBar from './components/BottomBar.vue';
import ScreenContent from './components/ScreenContent.vue';

export default defineComponent({
  name: 'App',
  components: {
    BottomBar,
    ScreenContent
  }
});
</script>

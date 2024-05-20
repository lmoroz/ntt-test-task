<template>
  <v-app>
    <v-main>
      <FormController />

      <div class="toggle-theme-button">
        <v-btn @click="toggleTheme"> Сменить тему </v-btn>
      </div>
    </v-main>
  </v-app>
</template>

<script setup lang="ts">
import { useTheme } from 'vuetify';
import { computed } from 'vue';

const theme = useTheme();
const currentTheme = computed(() => theme.global.current.value);

function toggleTheme() {
  theme.global.name.value = currentTheme.value.dark ? 'light' : 'dark';
}
</script>

<style lang="scss">
.toggle-theme-button {
  position: absolute;
  top: 12px;
  right: 12px;

  .v-btn__content {
    display: flex;
    justify-content: space-between;
    align-items: center;
    column-gap: 8px;
  }
}
</style>

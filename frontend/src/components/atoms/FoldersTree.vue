<template>
  <div :class="['folders-tree', className]">
    <template v-for="v in tree" :key="v.id">
      <FolderItem :data="v" />
    </template>
  </div>
</template>

<script setup lang="ts">
import { defineProps } from 'vue';

defineProps<{ tree: NestedFolders; className?: string }>();
</script>

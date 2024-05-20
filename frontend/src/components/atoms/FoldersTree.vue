<template>
  <div :class="['folders-tree', className]">
    <FolderItem v-for="v in tree" :key="v.id" :data="v" />
  </div>
</template>

<script setup lang="ts">
defineProps<{ tree: NestedFolders; className?: string }>();
</script>

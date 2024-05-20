<template>
  <v-card class="pa-0">
    <v-card-text class="pa-0">
      <v-btn
        :color="color"
        :loading="loading"
        :prepend-icon="data.is_open ? `mdi-folder-open` : `mdi-folder`"
        class="text-none"
        :class="{ 'cursor-default': !data.has_nested }"
        @click="openCloseMe"
      >
        <template #prepend>
          <v-icon color="white"></v-icon>
        </template>

        {{ data.name }}
        <v-tooltip activator="parent" location="end">
          <span v-html="data.description.replace(/\n/g, '<br />')"></span>
        </v-tooltip>
      </v-btn>
      <FoldersTree v-if="tree.length > 0 && data.is_open" :tree="tree" class-name="ml-6" />
    </v-card-text>
  </v-card>
</template>

<script setup lang="ts">
import { ref, computed, inject } from 'vue';
import { useStore } from '@/composables/useStore';
const { state } = useStore();
import { useApi } from '@/composables/useApi';
const { getFoldersByPath } = useApi();

const loading = ref<boolean>(false);
const props = defineProps<{ data: FolderInfo }>();
const fullTree = inject<NestedFolders>('tree', [] as NestedFolders);
const openCloseFolder = inject('openCloseFolder');

const color = computed<string>(() => {
  if (state.selectedFolder !== null && state.selectedFolder.id === props.data.id) return 'green';
  return props.data.has_nested ? `blue` : `grey`;
});

const tree = computed<NestedFolders>(
  () =>
    fullTree.value.filter((item: FolderInfo) => item.parent_id === props.data.id) as NestedFolders
);

const openCloseMe = async () => {
  if (props.data.has_nested) {
    loading.value = true;
    if (!tree.value.length) await getFoldersByPath(props.data.path);
    openCloseFolder(props.data as FolderInfo);
    loading.value = false;
  }
};
</script>

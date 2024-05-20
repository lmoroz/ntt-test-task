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
          <pre>{{ data.description }}</pre>
        </v-tooltip>
      </v-btn>
      <FoldersTree v-if="showTree" :tree="tree" class-name="ml-6" />
    </v-card-text>
  </v-card>
</template>

<script setup lang="ts">
import { ref, computed, inject, Ref } from 'vue';
import { useStore } from '@/composables/useStore';
import { useApi } from '@/composables/useApi';

const { state } = useStore();
const { getFoldersByPath } = useApi();

const loading = ref<boolean>(false);
const props = defineProps<{ data: FolderInfo }>();
const fullTree = inject<Ref<NestedFolders>>('tree', ref([] as NestedFolders));
const openCloseFolder = inject<(folder: FolderInfo) => void>('openCloseFolder', () => {});

const color = computed<string>(() => {
  if (state.selectedFolder !== null && state.selectedFolder.id === props.data.id) return 'green';
  return props.data.has_nested ? `blue` : `grey`;
});

const tree = computed<NestedFolders>(
  () =>
    fullTree.value.filter((item: FolderInfo) => item.parent_id === props.data.id) as NestedFolders
);
const showTree = computed<boolean | null>(() => tree.value.length > 0 && props.data.is_open);
const openCloseMe = async () => {
  if (props.data.has_nested) {
    loading.value = true;
    if (!tree.value.length) await getFoldersByPath(props.data.path);
    openCloseFolder(props.data as FolderInfo);
    loading.value = false;
  }
};
</script>

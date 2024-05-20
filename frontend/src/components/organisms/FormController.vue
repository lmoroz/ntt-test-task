<template>
  <v-container class="fill-height d-flex flex-column">
    <v-responsive class="align-centerfill-height" max-width="1280" :style="{ width: '100%' }">
      <v-form class="py-4 px-4 w-100" @submit.prevent="loadTree">
        <v-row>
          <v-col cols="12">
            <v-text-field
              ref="input"
              clearable
              variant="underlined"
              :error="apiState.error !== null"
              :error-messages="apiState.error"
              :model-value="state.path"
              label="Путь к папке: /"
              @keydown.esc="esc"
              @update:model-value="changePath"
            ></v-text-field>
            <v-btn density="comfortable" block :loading="apiState.loading" @click="loadTree"
              >Открыть дерево</v-btn
            >
          </v-col>
        </v-row>
      </v-form>

      <FoldersTreeWrapper v-show="showTree" @close="closeTree" @open-all="openTree" />
    </v-responsive>
  </v-container>
</template>

<script setup lang="ts">
import { ref, watch, provide } from 'vue';

import { useApi } from '@/composables/useApi';
const { apiState, getFolderInfoByPath, getFoldersByPath } = useApi(); // apiData, loading, error
import { useStore } from '@/composables/useStore';
const { state, setPath, setSelected, resetSelected } = useStore();
import { VTextField } from 'vuetify/components';

const input = ref<InstanceType<typeof VTextField> | null>(null);
const tree = ref<NestedFolders>([] as NestedFolders);
const showTree = ref<boolean>(false);
const parentFolderId = ref<FolderId | null>(null);

watch(
  () => [apiState.apiData],
  () => {
    if (
      Array.isArray(apiState.apiData) &&
      apiState.apiData.length > 0 &&
      parentFolderId.value !== null
    ) {
      tree.value.push(...apiState.apiData);
    }
  },
  {
    immediate: false,
    flush: 'sync',
  }
);
watch(
  () => [apiState.loading, apiState.error],
  () => {
    if (!apiState.loading && !apiState.error && Array.isArray(tree.value) && tree.value.length > 0)
      showTree.value = true;
  },
  {
    immediate: false,
    flush: 'post',
  }
);
const closeAll = (selectedIndex: number) => {
  tree.value[selectedIndex].is_open = false;
  const nestedItems = tree.value.filter(
    el => el.parent_id === tree.value[selectedIndex].id && el.has_nested
  );
  if (nestedItems.length > 0) {
    nestedItems.forEach(el => {
      const selectedIndex = tree.value.findIndex(nested => el.id === nested.id);
      closeAll(selectedIndex);
    });
  }
};
const openCloseFolder = (folder: FolderInfo) => {
  const selectedIndex = tree.value.findIndex(el => el.id === folder.id);
  if (folder.is_open) {
    closeAll(selectedIndex);
    resetSelected();
  } else {
    tree.value[selectedIndex].is_open = true;
    tree.value[selectedIndex].loaded = true;
    setSelected(folder);
  }
};
const esc = () => {
  if (input.value) input.value.blur();
};
const changePath = (newValue: string) => {
  setPath(newValue);
  apiState.error = null;
};
const loadTree = async () => {
  tree.value = [] as NestedFolders;
  await getFolderInfoByPath(state.path);
  if (apiState.apiData !== null && 'id' in apiState.apiData) {
    parentFolderId.value = apiState.apiData.id;
    await getFoldersByPath(state.path);
  }
};
const closeTree = () => {
  setPath('');
  resetSelected();
  showTree.value = false;
  tree.value = [] as NestedFolders;
};
const openTree = async (): Promise<void> => {
  const nextNotLoadedFolder = tree.value.findIndex(folder => folder.has_nested && !folder.loaded);
  const nextNotOpenFolder = tree.value.findIndex(folder => folder.has_nested && !folder.is_open);
  if (nextNotLoadedFolder !== -1) {
    await getFoldersByPath(tree.value[nextNotLoadedFolder].path);
    tree.value[nextNotLoadedFolder].loaded = true;
    return await openTree();
  } else if (nextNotOpenFolder !== -1) {
    apiState.loading = true;
    tree.value.forEach((folder, index) => {
      if (folder.has_nested && !folder.is_open) tree.value[index].is_open = true;
    });
    apiState.loading = false;
  }
  return;
};

provide('tree', tree);
provide('parentFolderId', parentFolderId);
provide('openCloseFolder', openCloseFolder);
</script>

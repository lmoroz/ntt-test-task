<template>
  <v-sheet elevation="0">
    <v-card elevation="0">
      <template #title> Директории </template>
      <template #text>
        <FoldersTree
          :tree="tree"
          class="flex-grow-1 overflow-auto mb-2"
          :style="{ maxHeight: `calc(100vh - 310px)` }"
        />
        <div style="height: 48px; position: relative; overflow: visible" class="mb2">
          <v-expansion-panels variant="accordion" class="mb-2 pinned_bottom">
            <v-expansion-panel>
              <v-expansion-panel-title>Легенда</v-expansion-panel-title>
              <v-expansion-panel-text>
                <v-card class="my-1" variant="text">
                  <div class="legend_row">
                    <v-btn color="blue" prepend-icon="mdi-folder">
                      <template #prepend>
                        <v-icon color="white"></v-icon>
                      </template>

                      Название папки
                    </v-btn>
                    Папка, имеющая вложенные, можно нажать, чтобы открыть
                  </div>
                  <v-overlay opacity=".01" scrim="primary" contained model-value persistent />
                </v-card>
                <v-card class="my-1" variant="text">
                  <div class="legend_row">
                    <v-btn color="grey" prepend-icon="mdi-folder">
                      <template #prepend>
                        <v-icon color="white"></v-icon>
                      </template>

                      Название папки
                    </v-btn>
                    Папка без вложений
                  </div>
                  <v-overlay opacity=".01" scrim="primary" contained model-value persistent />
                </v-card>
                <v-card class="my-1" variant="text">
                  <div class="legend_row">
                    <v-btn color="green" prepend-icon="mdi-folder-open">
                      <template #prepend>
                        <v-icon color="white"></v-icon>
                      </template>

                      Название папки
                    </v-btn>
                    Последняя открытая папка, путь которой можно скопировать, нажав «ОК»
                  </div>
                  <v-overlay opacity=".01" scrim="primary" contained model-value persistent />
                </v-card>
              </v-expansion-panel-text>
            </v-expansion-panel>
          </v-expansion-panels>
        </div>
        <div class="d-flex justify-start ga-2">
          <v-btn :disabled="!hasSelected" @click="setPathFromSelected">ОК</v-btn>
          <v-btn :disabled="!hasNotLoadedOrNotOpen" :loading="apiState.loading" @click="openAll"
            >Раскрыть все</v-btn
          >
          <v-btn @click="close">Закрыть</v-btn>
        </div>
      </template>
    </v-card>
  </v-sheet>
</template>

<script setup lang="ts">
import { computed, inject, Ref, ref } from 'vue';
import { useStore } from '@/composables/useStore';
const { state, setPathFromSelected } = useStore();
import { useApi } from '@/composables/useApi';
const { apiState } = useApi(); // apiData, loading, error

const parentFolderId = inject<Ref<FolderId | null>>('parentFolderId', ref(null));
const fullTree = inject<Ref<NestedFolders>>('tree', ref([] as NestedFolders));
const allIsOpened = inject<Ref<boolean>>('openAll', ref(false));

const tree = computed<NestedFolders>(() =>
  parentFolderId.value !== null && Array.isArray(fullTree.value)
    ? fullTree.value.filter((item: FolderInfo) => item.parent_id === parentFolderId.value)
    : ([] as NestedFolders)
);
const emit = defineEmits<{ close: []; openAll: [] }>();
const hasSelected = computed<boolean>(() => state.selectedFolder !== null);
const hasNotLoadedOrNotOpen = computed<boolean>(
  () =>
    fullTree.value.findIndex((folder: FolderInfo) => folder.has_nested && !folder.loaded) > -1 ||
    !allIsOpened
);

const close = () => {
  emit('close');
};
const openAll = () => {
  emit('openAll');
};
</script>

<style lang="scss" scoped>
.legend_row {
  display: flex;
  align-items: center;
  gap: 4px;
  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
    margin-bottom: 4px;
  }
}
.pinned_bottom {
  position: absolute;
  bottom: 0;
}
</style>

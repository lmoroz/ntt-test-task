import { reactive } from 'vue';

const state: State = reactive({
  selectedFolder: null,
  path: '',
});

const setSelected = (folder: FolderInfo) => {
  state.selectedFolder = folder;
};
const resetSelected = () => {
  state.selectedFolder = null;
};
const setPath = (path: string) => {
  state.path = path;
};

const setPathFromSelected = () => {
  state.path =
    state.selectedFolder !== null && state.selectedFolder.path !== null
      ? state.selectedFolder.path
      : '';
};

export function useStore() {
  return {
    state,
    setPath,
    setSelected,
    resetSelected,
    setPathFromSelected,
  };
}

declare global {
  interface ApiState {
    loading: boolean;
    error: string | null;
    apiData: NestedFolders | FolderInfo | null;
  }
  interface State {
    selectedFolder: FolderInfo | null;
    path: string;
  }
  interface FolderInfo {
    id: number;
    parent_id: number;
    name: string;
    description: string;
    has_nested: boolean;
    path: string;
    is_open: boolean | null;
    loaded: boolean | null;
  }

  interface FoldersGetBody {
    path: string;
  }

  type FolderId = number;

  type NestedFolders = FolderInfo[];
}
export {};

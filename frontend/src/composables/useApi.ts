import { reactive } from 'vue';
import axios from 'axios';

const apiState: ApiState = reactive({
  loading: false,
  error: null,
  apiData: null,
});

export function useApi() {
  const apiHost = import.meta.env.VITE_API_SERVER_HOST;
  const apiPort = import.meta.env.VITE_API_SERVER_PORT;
  const baseURL = `http://${apiHost}:${apiPort}/api/v3`;

  const axiosInstance = axios.create({ baseURL: baseURL });
  const getFolderInfoByPath = async (path: string) => {
    apiState.loading = true;
    apiState.error = null;
    try {
      const response = await axiosInstance.post(`/folder/get`, {
        path,
      } as FoldersGetBody);
      apiState.apiData = response.data as FolderInfo;
    } catch (err) {
      if (axios.isAxiosError(err)) {
        apiState.error = err.response?.statusText || err.message;
      } else {
        apiState.error = (err as Error).message;
      }
    } finally {
      apiState.loading = false;
    }
  };

  // Function to perform POST request
  const getFoldersByPath = async (path: string) => {
    apiState.loading = true;
    apiState.error = null;
    try {
      const response = await axiosInstance.post(`/folders/get`, {
        path,
      } as FoldersGetBody);
      apiState.apiData = response.data as NestedFolders;
    } catch (err) {
      if (axios.isAxiosError(err)) {
        apiState.error = err.response?.statusText || err.message;
      } else {
        apiState.error = (err as Error).message;
      }
    } finally {
      apiState.loading = false;
    }
  };

  return {
    apiState,
    getFolderInfoByPath,
    getFoldersByPath,
  };
}

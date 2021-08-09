
import { ref } from "vue";
import api from '@/services';

export default function useAxios(fn: string, params: any) {
  const data = ref([]);
  const loading = ref(false);
  const error = ref(null);

  const getData = async () => {
    loading.value = true;
    data.value = [];
    error.value = null;
    try {
      const response = await api[fn](params)
      data.value = response.data;
    } catch (err) {
      error.value = err;
    }
    loading.value = false;
  };

  return {
    data, loading, error, getData
  };
}
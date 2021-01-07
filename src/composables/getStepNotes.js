import { ref } from "vue";
import cleanData from "@/utilities/cleanData";

export default () => {
  const notes = ref([]);
  const isLoading = ref(false);

  const loadStepNotes = async (url) => {
    try {
      isLoading.value = true;
      let response = await fetch(url);
      let data = await response.json();
      notes.value = cleanData.cleanStep(data);
    } catch (error) {
      console.error(error.message);
    } finally {
      isLoading.value = false;
    }
  };

  return {
    notes,
    isLoading,
    loadStepNotes,
  };
};

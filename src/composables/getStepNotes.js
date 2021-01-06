import { ref } from "vue";
import cleanData from "@/utilities/cleanData";

export default () => {
  const notes = ref([]);

  const loadStepNotes = async (url) => {
    try {
      let response = await fetch(url);
      let data = await response.json();
      notes.value = cleanData.cleanStep(data);
    } catch (error) {
      console.error(error.message);
    }
  };

  return {
    notes,
    loadStepNotes,
  };
};

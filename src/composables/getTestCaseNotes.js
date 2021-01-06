import { ref } from "vue";
import cleanData from "@/utilities/cleanData";

export default () => {
  const notes = ref([]);

  const loadTestCaseNotes = async (url) => {
    try {
      let response = await fetch(url);
      let data = await response.json();
      notes.value = cleanData.cleanTestCase(data);
    } catch (error) {
      console.error(error.message);
    }
  };

  return {
    notes,
    loadTestCaseNotes,
  };
};

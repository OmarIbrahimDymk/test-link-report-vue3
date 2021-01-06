import { ref } from "vue";

export default () => {
  const testPlans = ref([]);

  const loadTestPlans = async (url) => {
    try {
      let response = await fetch(url);
      testPlans.value = await response.json();
    } catch (error) {
      console.error("Problem while getting data..");
      console.error(error.message);
    }
  };

  return {
    testPlans,
    loadTestPlans,
  };
};

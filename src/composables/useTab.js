import { ref } from "vue";

const useTab = (defaultTab) => {
  const currentTab = ref(defaultTab);

  const updateTab = (tabName) => {
    currentTab.value = tabName;
  };

  return {
    currentTab,
    updateTab,
  };
};

export default useTab;

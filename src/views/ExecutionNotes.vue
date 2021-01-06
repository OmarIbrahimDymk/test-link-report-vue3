<template>
  <div class="row">
    <div class="col s12">
      <div class="card">
        <div class="card-content">
          <span class="card-title">Execution Notes</span>
          <div class="row">
            <div class="col s12 tabs">
              <button
                type="button"
                @click="updateTab('TestCase')"
                :class="{ active: currentTab == 'TestCase' }"
              >
                Test Case
              </button>
              <button
                type="button"
                @click="updateTab('Step')"
                :class="{ active: currentTab == 'Step' }"
              >
                Step
              </button>
            </div>
          </div>
          <div class="row">
            <div class="col s12">
              <keep-alive>
                <component :is="currentTab"></component>
              </keep-alive>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";

import useTab from "@/composables/useTab.js";

import Step from "@/components/EN_Step";
import TestCase from "@/components/EN_TestCase";

export default {
  name: "ExecutionNotes",
  components: {
    Step,
    TestCase,
  },
  setup() {
    const { currentTab, updateTab } = useTab("TestCase");

    return {
      currentTab,
      updateTab,
    };
  },
};
</script>

<style lang='scss' scoped>
.tabs {
  border-radius: 0.5rem;
  display: flex;
  align-items: center;
  button {
    border: none;
    background: none;
    padding: 0.5rem;
    &.active {
      background: rgba($color: #ee6e73, $alpha: 0.2);
      border-bottom: 3px solid #ee6e73;
    }
  }
}
</style>
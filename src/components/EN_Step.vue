<template>
  <section>
    <h4>Step Notes</h4>
    <!-- Search Form -->
    <div v-if="testPlans" class="form">
      <form
        @submit.prevent="
          loadStepNotes(
            '/api/stepExecutionNotes?test_plan_id=' + showTestPlans.toString()
          )
        "
      >
        <div class="row">
          <h5>Select Test Plan(s)</h5>
        </div>
        <div class="test-plan-selection">
          <p class="test-plan" v-for="tp in testPlans" :key="tp.test_plan_id">
            <label>
              <input
                type="checkbox"
                :value="tp.test_plan_id"
                :id="tp.test_plan_id"
                v-model="showTestPlans"
              />
              <span>
                {{ tp.test_plan_name }}
              </span>
            </label>
          </p>
        </div>
        <class class="row">
          <button type="submit" :disabled="!showTestPlans.length">
            Search
          </button>
        </class>
      </form>
    </div>
    <div v-else>Fetching data..</div>
    <hr />
    <!-- Data Table -->
    <div v-if="notes.length">
      <button @click="downloadCSV(notes)">Download as CSV</button>
      <p>Total Results: {{ notes.length }}</p>
      <div>
        <label for="search"></label>
        <input
          type="text"
          name="search"
          id="search"
          placeholder="Search tester"
          v-model="search"
        />
      </div>
      <div style="overflow: auto; max-height: 80vh">
        <table class="highlight striped responsive-table">
          <thead>
            <tr>
              <th>No.</th>
              <th>Tester</th>
              <th>Execution Note</th>
              <th>Action</th>
              <th>Expected Result</th>
              <th>Step No</th>
              <th>TC id</th>
              <th>Test Case</th>
              <th>Test Plan</th>
              <th>Test Suite</th>
              <th>DateTime</th>
            </tr>
          </thead>

          <tbody>
            <tr v-for="note in filteredNotes" :key="note.tc_external_id">
              <td>{{ note.index }}</td>
              <td>{{ note.tester }}</td>
              <td>{{ note["execution note"] }}</td>
              <td>{{ note["action"] }}</td>
              <td>{{ note["expected result"] }}</td>
              <td>{{ note["step no"] }}</td>
              <td>{{ note["test case eid"] }}</td>
              <td>{{ note["Test Case"] }}</td>
              <td>{{ note["Test Plan"] }}</td>
              <td>{{ note["Test Suite"] }}</td>
              <td>{{ note.DateTime }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <div v-if="!notes.length && !isLoading">No data to show.</div>
    <div class="loader-wrapper" v-show="isLoading">
      <div class="preloader-wrapper active">
        <div class="spinner-layer spinner-blue">
          <div class="circle-clipper left">
            <div class="circle"></div>
          </div>
          <div class="gap-patch">
            <div class="circle"></div>
          </div>
          <div class="circle-clipper right">
            <div class="circle"></div>
          </div>
        </div>

        <div class="spinner-layer spinner-red">
          <div class="circle-clipper left">
            <div class="circle"></div>
          </div>
          <div class="gap-patch">
            <div class="circle"></div>
          </div>
          <div class="circle-clipper right">
            <div class="circle"></div>
          </div>
        </div>

        <div class="spinner-layer spinner-yellow">
          <div class="circle-clipper left">
            <div class="circle"></div>
          </div>
          <div class="gap-patch">
            <div class="circle"></div>
          </div>
          <div class="circle-clipper right">
            <div class="circle"></div>
          </div>
        </div>

        <div class="spinner-layer spinner-green">
          <div class="circle-clipper left">
            <div class="circle"></div>
          </div>
          <div class="gap-patch">
            <div class="circle"></div>
          </div>
          <div class="circle-clipper right">
            <div class="circle"></div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { computed, ref } from "vue";

import getTestPlans from "@/composables/getTestPlans";
import getStepNotes from "@/composables/getStepNotes";
import useDownload from "@/composables/useDownload";

export default {
  name: "EN_Step",
  setup() {
    const showTestPlans = ref([]);

    const search = ref("");
    const filteredNotes = computed(() => {
      return notes.value.filter((note) =>
        note.tester.toLowerCase().includes(search.value)
      );
    });

    const { testPlans, loadTestPlans } = getTestPlans();
    loadTestPlans("/api/getTestPlans");

    const { notes, isLoading, loadStepNotes } = getStepNotes();

    const { downloadCSV } = useDownload();

    return {
      showTestPlans,
      search,
      testPlans,
      notes,
      isLoading,
      loadStepNotes,
      downloadCSV,
      filteredNotes,
    };
  },
};
</script>

<style lang='scss'>
.form {
  margin: auto 1rem;
}
.test-plan-selection {
  display: flex;
  flex-wrap: wrap;
  p.test-plan {
    margin-right: 1.5rem;
    padding: 0.3rem;
    &:hover {
      background: rgba($color: #ee6e73, $alpha: 0.2);
    }
  }
}
.loader-wrapper {
  width: 5rem;
  margin: auto;
}
</style>
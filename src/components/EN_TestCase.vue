<template>
  <section>
    <h4>Test Case Notes</h4>
    <div v-if="testPlans" class="form">
      <form
        @submit.prevent="
          loadTestCaseNotes(
            '/api/executionNotes?test_plan_id=' + showTestPlans.toString()
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
    <div v-if="notes.length">
      <button @click="downloadCSV(notes)">Download as CSV</button>
      <p>Total Results: {{ notes.length }}</p>
      <table class="highlight striped responsive-table">
        <thead>
          <tr>
            <th>Tester</th>
            <th>Notes</th>
            <th>ID</th>
            <th>Test Case</th>
            <th>Test Plan</th>
            <th>Test Suite</th>
            <th>DateTime</th>
          </tr>
        </thead>

        <tbody>
          <tr v-for="note in notes" :key="note.tc_external_id">
            <td>{{ note.tester }}</td>
            <td>{{ note.notes }}</td>
            <td>{{ note.tc_external_id }}</td>
            <td>{{ note["Test Case"] }}</td>
            <td>{{ note["Test Plan"] }}</td>
            <td>{{ note["Test Suite"] }}</td>
            <td>{{ note.DateTime }}</td>
          </tr>
        </tbody>
      </table>
    </div>
    <div v-else>No data to show.</div>
  </section>
</template>

<script>
import { ref } from "vue";

import getTestPlans from "@/composables/getTestPlans";
import getTestCaseNotes from "@/composables/getTestCaseNotes";
import useDownload from "@/composables/useDownload";

export default {
  name: "EN_TestCase",
  setup() {
    const showTestPlans = ref([]);

    const { testPlans, loadTestPlans } = getTestPlans();
    loadTestPlans("/api/getTestPlans");

    const { notes, loadTestCaseNotes } = getTestCaseNotes();

    const { downloadCSV } = useDownload();

    return {
      showTestPlans,
      testPlans,
      notes,
      loadTestCaseNotes,
      downloadCSV,
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
</style>
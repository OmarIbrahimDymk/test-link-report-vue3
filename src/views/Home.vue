<template>
  <div class="row">
    <div class="col s12">
      <div class="card">
        <div class="card-content">
          <ul class="collection with-header">
            <li class="collection-header"><h4>Directory</h4></li>
            <li class="collection-item">
              <div>
                Home
                <router-link :to="{ name: 'Home' }" class="secondary-content">
                  <i class="material-icons">send</i>
                </router-link>
              </div>
            </li>
            <li class="collection-item">
              <div>
                About
                <router-link :to="{ name: 'About' }" class="secondary-content">
                  <i class="material-icons">send</i>
                </router-link>
              </div>
            </li>
            <li class="collection-item">
              <div>
                Execution Notes
                <router-link
                  :to="{ name: 'ExecutionNotes' }"
                  class="secondary-content"
                >
                  <i class="material-icons">send</i>
                </router-link>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Home",
};
</script>

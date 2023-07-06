<script setup>
import BasePageLayout from "./components/Layout/BasePageLayout.vue";
</script>

<template class="base-container">
  <BasePageLayout />
</template>

<script>
export default {
  name: "App",

  data: () => ({
    //
  }),
};
</script>

<style lang="scss">
@import url("https://fonts.googleapis.com/css2?family=Nunito:wght@400;500;700&display=swap");
@import "node_modules/bulma/bulma.sass";
@import "node_modules/bulma-checkradio/src/sass/index.sass";
@import "node_modules/bulma-list/sass/bulma-list.sass";

.base-container {
  -ms-overflow-style: none !important; /* for Internet Explorer, Edge */
  scrollbar-width: none !important; /* for Firefox */
  overflow-y: scroll !important;
}

.base-container::-webkit-scrollbar {
  display: none !important; /* for Chrome, Safari, and Opera */
}

.base-container::-webkit-scrollbar {
  width: 3px !important;
}

.base-container::-webkit-scrollbar-track {
  background-color: transparent !important;
  border-radius: 3px !important;
}

.base-container::-webkit-scrollbar-thumb {
  background-color: #d9d9d9 !important;
  border-radius: 3px !important;
}
</style>

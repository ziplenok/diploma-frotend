<template>
  <div id="base">
    <nav class="sticky-top">
      <NavBar />
    </nav>
    <main>
      <slot><RouterView /></slot>
    </main>
    <!-- <slot name="mobile-searchbar"></slot> -->
    <footer class="footer">
      <div class="content has-text-centered">
        <p>Footer Info</p>
      </div>
    </footer>
  </div>
  <slot></slot>
</template>

<script setup>
import { RouterView } from "vue-router";
import NavBar from "@/components/Layout/NavBar.vue";
</script>

<style lang="scss">
// @import "node_modules/bulma/bulma.sass";
// @import url("https://fonts.googleapis.com/css2?family=Didact+Gothic&display=swap");
// @import "node_modules/bulma-checkradio/src/sass/index.sass";
// @import "node_modules/bulma-slider/src/sass/index.sass";
// @import "node_modules/bulma-list/sass/bulma-list.sass";
@import "@/assets/variables.scss";

.sticky-top {
  position: sticky;
  top: 0;
  z-index: 8888;
}

footer {
  background-color: #101010 !important;
  color: white;
}

// main {
//   -ms-overflow-style: none !important; /* for Internet Explorer, Edge */
//   scrollbar-width: none !important; /* for Firefox */
//   overflow-y: scroll !important;
// }

// main::-webkit-scrollbar {
//   display: none !important; /* for Chrome, Safari, and Opera */
// }

// main::-webkit-scrollbar {
//   width: 3px !important;
// }

// main::-webkit-scrollbar-track {
//   background-color: transparent !important;
//   border-radius: 3px !important;
// }

// main::-webkit-scrollbar-thumb {
//   background-color: #d9d9d9 !important;
//   border-radius: 3px !important;
// }
</style>

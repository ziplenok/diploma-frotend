<template>
  <main class="main-section">
    <slot name="main-section"> </slot>
  </main>

  <footer>
    <slot name="footer"></slot>
  </footer>
</template>

<style lang="scss">
@import "@/assets/variables.scss";

.main-section {
  padding: 1rem;
}
</style>

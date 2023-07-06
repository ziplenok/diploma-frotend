<template>
  <div class="main-container">
    <div class="container">
      <div class="columns">
        <div class="column img-column">
          <img class="main-img" src="src/assets/img/group_of_screanshots.png" />
        </div>
        <div class="column is-half text-column">
          <h1 class="is-size-1 is-size-3-mobile mb-4">
            НАЙДИ СВОЙ УНИВЕРСИТЕТ МЕЧТЫ
          </h1>
          <p class="is-size-6 is-size-6-mobile mb-3">
            ВЫБСАЙТ ДЛЯ ПОИСКА УНИВЕРСИТЕТОВ В КАЗАХСТАНЕ
          </p>
          <RouterLink to="/calculator" class="button main-btn">
            Узнать шанс на поступление
          </RouterLink>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup></script>
<style lang="scss" scoped>
@import "@/assets/variables.scss";

.main-container {
  background: linear-gradient(
    231.45deg,
    #6844b5 5.16%,
    rgba(72, 70, 182, 0.932297) 29.15%,
    rgba(69, 121, 183, 0.946543) 52.29%,
    #3992ae 72.43%,
    #3eb5a6 93.02%
  );
}

.text-column {
  align-self: center;
  color: white;
  @include mobile {
    padding-left: 3rem;
  }
}

.img-column {
  padding: 0 !important;
}

.main-btn {
  background: linear-gradient(
    90deg,
    #d00000 0%,
    #d3004c 34.94%,
    rgba(255, 0, 77, 0.8) 65.8%,
    #ff8310 100%
  );
  box-shadow: 0px 4px 5px rgba(0, 0, 0, 0.3);
  border-radius: 7px;
  border: none;
  color: white;
  padding: 0.75rem 2rem !important;
}

// .main-img {
//   height: 100%;
//   width: 100%;
// }
</style>

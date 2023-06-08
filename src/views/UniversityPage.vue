<template>
  <div class="page-container">
    <NavBar />
    <div class="columns">
      <!-- <TopSectionBottomRounded> -->
      <div class="column has-text-white">
        <div class="top-grid">
          <div class="grid-box-b">
            <div class="is-size-6-mobile">Город:</div>
            <div class="is-size-5-mobile">Караганда</div>
            <div class="is-size-6-mobile">Сайт ВУЗа:</div>
            <a
              href="https://www.aiu.edu.kz/"
              class="is-underlined is-size-6-mobile has-text-white"
              >https://www.aiu.edu.kz/</a
            >
          </div>
          <div class="grid-box-a">
            <div class="is-size-6-mobile">Телефон:</div>
            <div class="is-size-5-mobile">8 (7212) 90 02 70</div>
            <!-- <div class="is-size-6-mobile has-text-weight-bold">Адрес:</div>
                <div class="is-size-7-mobile has-text-white">
                  г. Шымкент, Каратауский район, Тассайский подрайон, улица Жибек
                  жолы, земельный участок №6
                </div> -->
          </div>
        </div>
        <!-- </TopSectionBottomRounded> -->
      </div>

      <div class="column has-text-white">
        <h1 class="is-size-4-mobile is-size-3 mb-6">
          Карагандинский государственный университет имени академика Е.Букетова
          (КарГУ им. Букетова)
        </h1>

        <p class="is-size-5-mobile mb-6">Образовательные программы Бакалавр</p>
        <div class="card mb-3">
          <header class="card-header">
            <p class="card-header-title">
              Всемирная история и Иностранный язык
            </p>
            <button class="card-header-icon" aria-label="more options">
              <span class="icon">
                <font-awesome-icon icon="fa-solid fa-angle-down" />
              </span>
            </button>
          </header>
        </div>

        <div class="card mb-3">
          <header class="card-header">
            <p class="card-header-title">Биология и География</p>
            <button class="card-header-icon" aria-label="more options">
              <span class="icon">
                <font-awesome-icon icon="fa-solid fa-angle-down" />
              </span>
            </button>
          </header>
        </div>

        <div class="card mb-3">
          <header class="card-header">
            <p class="card-header-title">
              Творческий экзамен и Творческий экзамен
            </p>
            <button class="card-header-icon" aria-label="more options">
              <span class="icon">
                <font-awesome-icon icon="fa-solid fa-angle-down" />
              </span>
            </button>
          </header>
        </div>

        <div class="card mb-3">
          <header class="card-header">
            <p class="card-header-title">Математика и География</p>
            <button class="card-header-icon" aria-label="more options">
              <span class="icon">
                <font-awesome-icon icon="fa-solid fa-angle-down" />
              </span>
            </button>
          </header>
        </div>

        <div class="card mb-3">
          <header class="card-header">
            <p class="card-header-title">География и Иностранный язык</p>
            <button class="card-header-icon" aria-label="more options">
              <span class="icon">
                <font-awesome-icon icon="fa-solid fa-angle-down" />
              </span>
            </button>
          </header>
        </div>

        <div class="card mb-3">
          <header class="card-header">
            <p class="card-header-title">Русский язык и Русская литература</p>
            <button class="card-header-icon" aria-label="more options">
              <span class="icon">
                <font-awesome-icon icon="fa-solid fa-angle-down" />
              </span>
            </button>
          </header>
        </div>

        <div class="card mb-3">
          <header class="card-header">
            <p class="card-header-title">
              Казахский язык и Казахская литература
            </p>
            <button class="card-header-icon" aria-label="more options">
              <span class="icon">
                <font-awesome-icon icon="fa-solid fa-angle-down" />
              </span>
            </button>
          </header>
        </div>

        <div class="card mb-3">
          <header class="card-header">
            <p class="card-header-title">Математика и Информатика</p>
            <button class="card-header-icon" aria-label="more options">
              <span class="icon">
                <font-awesome-icon icon="fa-solid fa-angle-down" />
              </span>
            </button>
          </header>
        </div>

        <div class="card mb-3">
          <header class="card-header" @click="toggleEduProgramList()">
            <p class="card-header-title">Математика и Физика</p>
            <button class="card-header-icon" aria-label="more options">
              <span class="icon">
                <font-awesome-icon icon="fa-solid fa-angle-down" />
              </span>
            </button>
          </header>

          <div v-if="isOpenedEduProgramsList">
            <div class="card-content">
              <div class="content">
                <div class="has-text-centered">
                  <table class="table">
                    <thead>
                      <tr>
                        <th>Группа образовательных программ</th>
                        <th>Код образовательной программы</th>
                        <th>Образовательная программа</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>Автотранспортные средства В065</td>
                        <td>6B07105</td>
                        <td>Транспорт, транспортная техника и технологии</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="card mb-3">
          <header class="card-header">
            <p class="card-header-title">
              Всемирная история и Человек. Общество. Право
            </p>
            <button class="card-header-icon" aria-label="more options">
              <span class="icon">
                <font-awesome-icon icon="fa-solid fa-angle-down" />
              </span>
            </button>
          </header>
        </div>

        <div class="card mb-3">
          <header class="card-header">
            <p class="card-header-title">Всемирная история и География</p>
            <button class="card-header-icon" aria-label="more options">
              <span class="icon">
                <font-awesome-icon icon="fa-solid fa-angle-down" />
              </span>
            </button>
          </header>
        </div>

        <div class="card mb-3">
          <header class="card-header">
            <p class="card-header-title">Биология и Химия</p>
            <button class="card-header-icon" aria-label="more options">
              <span class="icon">
                <font-awesome-icon icon="fa-solid fa-angle-down" />
              </span>
            </button>
          </header>
        </div>

        <div class="card mb-3">
          <header class="card-header">
            <p class="card-header-title">Химия и Физика</p>
            <button class="card-header-icon" aria-label="more options">
              <span class="icon">
                <font-awesome-icon icon="fa-solid fa-angle-down" />
              </span>
            </button>
          </header>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref, computed, watch, onMounted } from "vue";
import NavBar from "@/components/Layout/NavBar.vue";

const isOpenedEduProgramsList = ref(false);

const toggleEduProgramList = () => {
  isOpenedEduProgramsList.value = !isOpenedEduProgramsList.value;
};
</script>
<style lang="scss">
@import "@/assets/variables.scss";
.page-container {
  min-height: 100vh;
  background: linear-gradient(
    231.45deg,
    #6844b5 5.16%,
    rgba(72, 70, 182, 0.932297) 29.15%,
    rgba(69, 121, 183, 0.946543) 52.29%,
    #3992ae 72.43%,
    #3eb5a6 93.02%
  );
}

.top-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
}

.grid-box-a {
  padding-left: 1rem;
}
.grid-box-b {
  justify-self: center;
}

.has-text-purple {
  color: #760044;
}

.content {
  overflow: auto;
}
</style>

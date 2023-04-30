<template>
  <div class="page-background">
    <div class="modal" :class="{ 'is-active': isOpenedUniversityInfo }">
      <div
        class="modal-background"
        @wheel.prevent
        @touchmove.prevent
        @scroll.prevent
      ></div>
      <div class="modal-content">
        <RouterView @closeInfo="handleCloseInfo" />
      </div>
    </div>

    <!-- <RouterView name="calculator"></RouterView> -->

    <div class="universities-container">
      <div class="container">
        <header class="py-4" v-if="isMobile">
          <h1 class="is-size-4-mobile has-text-white has-text-centered">
            ВУЗы
          </h1>
        </header>

        <div class="field is-grouped is-grouped-right search-wrapper">
          <!-- Modal backdrop -->

          <div
            v-if="isOpenedFilter"
            class="backdrop"
            @click="handleBackdropClick"
            @wheel.prevent
            @touchmove.prevent
            @scroll.prevent
          ></div>

          <!-- Filer Dropdown -->

          <div class="dropdown mr-3" :class="{ 'is-active': isOpenedFilter }">
            <div class="dropdown-trigger" @click="openFilterDropdown">
              <button
                class="button filter-wrapper"
                :class="{
                  elevate: isOpenedFilter,
                  'loading-bg': universityStore.loading,
                }"
                aria-haspopup="true"
              >
                <!-- <span class="mx-2">{{ state.cityButtonText }}</span> -->
                <div
                  class="btn-wrapper"
                  :class="{ 'after-load': universityStore.loading }"
                >
                  <span class="icon is-small">
                    <img
                      :src="filterWhiteIcon"
                      alt="filter-icon"
                      class="filter-white-icon"
                    />
                  </span>
                  <span class="is-size-7">Фильтр</span>
                  <span class="icon is-small">
                    <font-awesome-icon
                      v-if="!isOpenedFilter"
                      :icon="['fas', 'angle-up']"
                    />
                    <font-awesome-icon v-else :icon="['fas', 'angle-down']" />
                  </span>
                </div>
              </button>
            </div>
            <div
              class="dropdown-menu mt-6"
              :class="{ elevate: isOpenedFilter }"
              id="dropdown-menu-desktop"
              role="menu"
            >
              <div class="dropdown-content">
                <div class="dropdown-item checkbox-wrapper">
                  <div
                    class="has-text-white is-size-6 field is-flex is-flex-direction-column px-6"
                  >
                    <div class="mb-2">
                      <input
                        type="checkbox"
                        id="checkKafedra"
                        v-model="hasKafedra"
                      />
                      <label for="checkKafedra">Военная кафедра</label>
                    </div>
                    <div>
                      <input
                        type="checkbox"
                        id="checkDormitory"
                        v-model="hasDormitory"
                      />
                      <label for="checkDormitory">Общежитие</label>
                    </div>
                  </div>
                </div>
                <div class="has-text-centered">
                  <a
                    class="dropdown-item is-size-6 has-text-grey"
                    @click="selectCity('')"
                  >
                    Все города
                  </a>
                  <a
                    v-for="c in universityStore.cities"
                    class="dropdown-item is-size-6 has-text-grey"
                    @click="selectCity(c)"
                  >
                    {{ c }}
                  </a>
                </div>
              </div>
            </div>
          </div>

          <!-- Searchbar Desktop -->

          <p
            class="control has-icons-right input-control input-wrapper"
            :class="{ 'loading-bg': universityStore.loading }"
          >
            <input
              class="input input-desktop"
              type="text"
              placeholder="Поиск"
              v-model="state.searchName"
            />
            <span :class="{ 'after-load': universityStore.loading }">
              <span class="icon is-right">
                <img
                  :src="searchWhiteIcon"
                  alt="search-icon"
                  class="search-white-icon"
                />
              </span>
            </span>
          </p>
        </div>

        <!-- Table Desktop  -->

        <div
          class="table-wrapper"
          :class="{ 'loading-bg': universityStore.loading }"
        >
          <table class="table is-hoverable">
            <thead>
              <tr>
                <th class="shrink">
                  <span :class="{ 'after-load': universityStore.loading }"
                    >Код</span
                  >
                </th>
                <th class="fullwidth">
                  <span :class="{ 'after-load': universityStore.loading }"
                    >Название</span
                  >
                </th>
                <th class="shrink">
                  <span :class="{ 'after-load': universityStore.loading }"
                    >Сайт</span
                  >
                </th>
                <th class="shrink">
                  <span :class="{ 'after-load': universityStore.loading }"
                    >Регион</span
                  >
                </th>
              </tr>
            </thead>
            <tbody>
              <!-- Mock rows for loading -->

              <tr v-for="n in state.rowsPerPage" v-if="universityStore.loading">
                <td class="loading-row"></td>
                <td class="loading-row"></td>
                <td class="loading-row"></td>
                <td class="loading-row"></td>
              </tr>

              <tr
                v-for="(university, i) in state.paginatedData"
                :key="state.paginatedData[i]"
                class="has-text-white"
                @click="openModalInfo(university.id)"
              >
                <td class="shrink">{{ university.code }}</td>
                <td>{{ university.name }}</td>
                <td class="shrink">
                  <a :href="university.url" class="has-text-white">{{
                    university.url
                  }}</a>
                </td>
                <td class="shrink">{{ university.city }}</td>
              </tr>
            </tbody>
          </table>
        </div>

        <!-- Table Mobile -->

        <div class="table-wrapper-mobile">
          <div
            class="card mb-3 mx-3"
            v-for="(university, i) in state.paginatedData"
            :key="state.paginatedData[i]"
            v-if="isMobile"
            @click="openModalInfo(university.id)"
          >
            <!-- <RouterLink :to="`/${university.id}`"> -->
            <header class="card-header">
              <p class="card-header-title" @click="openUniversityInfo()">
                {{ university.name }}
              </p>
              <button class="card-header-icon" aria-label="more options">
                <span class="icon favorite-icon-wrapper">
                  <img
                    :src="favoriteIcon"
                    alt="favorite-icon"
                    class="favorite-icon"
                  />
                </span>
              </button>
            </header>
            <!-- </RouterLink> -->
          </div>
        </div>
      </div>
      <PaginationContent
        :currentPage="state.currentPage"
        :pageCount="state.pageCount"
        @set-currentpage="setCurrentPage"
      />
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, computed, onBeforeMount, watch } from "vue";
import searchIcon from "@/components/icons/SearchIcon.svg";
import searchWhiteIcon from "@/components/icons/SearchWhiteIcon.svg";
import filterIcon from "@/components/icons/FilterIcon.svg";
import filterWhiteIcon from "@/components/icons/FilterWhiteIcon.svg";
import { useUniversityStore } from "@/stores/universities";
import PaginationContent from "@/components/paginationa/PaginationContent.vue";
import { breakpointsTailwind, useBreakpoints } from "@vueuse/core";
import favoriteIcon from "@/components/icons/FavoriteIcon.svg";
import { useRouter } from "vue-router";
import CalculatorModal from "@/components/calculator/CalculatorModal.vue";

/*
  router
*/

const router = useRouter();

/*
  breakpoints
*/

const breakpoints = useBreakpoints(breakpointsTailwind);

const isMobile = breakpoints.isSmallerOrEqual("md");
const isDesktop = breakpoints.isGreater("md");

/*
  Fetching all universities info
*/

const universityStore = useUniversityStore();

onBeforeMount(() => {
  universityStore.fetchUniversities();
});

/*
  check boxes
*/

const hasKafedra = ref(false);

const hasDormitory = ref(false);

/*
  filter by city
*/

const isOpenedFilter = ref(false);

watch(
  () => isOpenedFilter.value,
  () => {
    if (isOpenedFilter.value) {
      document.documentElement.style.overflowY = "hidden";
      return;
    }
    document.documentElement.style.overflowY = "auto";
  }
);

const selectedCity = ref("");

const openFilterDropdown = () => {
  isOpenedFilter.value = !isOpenedFilter.value;
};

const selectCity = (city) => {
  selectedCity.value = city;
  isOpenedFilter.value = false;
};

/*
  reactive
*/

const state = reactive({
  cityButtonText: computed(() => {
    if (selectedCity.value === "") return "Город";
    return selectedCity.value;
  }),
  searchName: "",
  universityList: computed(() => {
    let filterList = universityStore.list;

    if (hasKafedra.value === true) {
      filterList = filterList.filter(
        (university) => university.kafedra === true
      );
    }

    if (hasDormitory.value === true) {
      filterList = filterList.filter(
        (university) => university.dormitory === true
      );
    }

    if (selectedCity.value !== "") {
      filterList = filterList.filter(
        (university) => university.city === selectedCity.value
      );
      setCurrentPage(1);
    }

    if (state.searchName.trim().length > 0) {
      filterList = filterList.filter((university) =>
        university.name
          .toLowerCase()
          .includes(state.searchName.trim().toLowerCase())
      );
      console.log(filterList);
    }
    return filterList;
  }),
  currentPage: 1,
  rowsPerPage: 15,
  pageCount: computed(() =>
    Math.ceil(state.universityList.length / state.rowsPerPage)
  ),
  paginatedData: computed(() =>
    state.universityList.slice(
      (state.currentPage - 1) * state.rowsPerPage,
      state.currentPage * state.rowsPerPage
    )
  ),
});

function setCurrentPage(number) {
  state.currentPage = number;
}

const paginationVisible = ref(true);

// watch(
//   () => state.paginatedData.length,
//   () => {
//     if (state.paginatedData.length <= state.pageCount) {
//       paginationVisible.value = false;
//       return;
//     }
//   }
// );

/*
  backdrop 
*/

const handleBackdropClick = () => {
  isOpenedFilter.value = false;
};

/*
  get university info
*/

const isOpenedUniversityInfo = ref(false);

watch(
  () => isOpenedUniversityInfo.value,
  () => {
    if (isOpenedUniversityInfo.value) {
      document.documentElement.style.overflowY = "hidden";
      return;
    }
    document.documentElement.style.overflowY = "auto";
  }
);

const openUniversityInfo = () => {
  isOpenedUniversityInfo.value = true;
  window.scrollTo(0, 0);
};

const handleCloseInfo = () => {
  isOpenedUniversityInfo.value = false;
  router.push("/");
};

const idPath = ref("");

const openModalInfo = (id) => {
  isOpenedUniversityInfo.value = true;
  window.scrollTo(0, 0);
  router.push(`/${id}`);
};
</script>

<style scoped lang="scss">
@import "@/assets/variables.scss";

.page-background {
  background: linear-gradient(
    231.45deg,
    #6844b5 5.16%,
    rgba(72, 70, 182, 0.932297) 29.15%,
    rgba(69, 121, 183, 0.946543) 52.29%,
    #3992ae 72.43%,
    #3eb5a6 93.02%
  );
  min-height: 100vh;
  min-width: 100vw;
}

.universities-container {
  @include desktop {
    padding: 4rem;
  }
  @include touch {
    padding-bottom: 4rem;
  }
}

.has-text-grey {
  color: #8f8f8f !important;
}

.elevate {
  z-index: 9999 !important;
}

.backdrop {
  z-index: 9998 !important;
  background: rgba(0, 0, 0, 0.4);
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  outline: 0;
  overflow: hidden;
  -webkit-overflow-scrolling: touch;
}

/*
  Filter for Universities
*/

.filter-search {
  @include touch {
    padding: 0 0.75rem;
  }
}

.filter-wrapper {
  display: flex !important;
  justify-content: center;
  align-items: center;
  background: linear-gradient(265.89deg, #3972c7 0%, #3b5dd6 100%);
  color: white !important;
  border-radius: 13px !important;
  padding: 0.5rem 1rem !important;
  border-color: transparent !important;
}

.filter-white-icon {
  height: 20px;
  width: 20px;
}

.trigger {
  background-color: transparent;
  color: white;
}

.btn-wrapper {
  display: flex !important;
  justify-content: center !important;
  align-items: center !important;
}

#dropdown-menu-desktop {
  @include desktop {
    transform: translateX(-5rem);
  }
}

.checkbox-wrapper {
  overflow-y: hidden !important;
}

.dropdown-content {
  background-color: #101010;
  // padding: 1rem 1.5rem;
  color: white !important;
  width: 21rem !important;
  max-height: 15rem;
  overflow: auto;
}

.dropdown-content::-webkit-scrollbar {
  width: 4px;
}

.dropdown-content::-webkit-scrollbar-track {
  background-color: transparent;
  border-radius: 3px;
}

.dropdown-content::-webkit-scrollbar-thumb {
  background-color: #d9d9d9;
  border-radius: 3px;
}

input[type="checkbox"] {
  vertical-align: middle !important;
  float: right !important;
}

input[type="checkbox"] {
  accent-color: #63c02a;
  transform: scale(1.5) translateY(5px);
}

/*
  Search Bar for universities
*/

.search-wrapper {
  @include touch {
    padding: 0 0.75rem;
  }
  margin-bottom: 2rem !important;
}

.input-wrapper {
  border-radius: 7px !important;
}

.input-control {
  @include desktop {
    width: 35rem;
  }
}

.input-desktop {
  background: rgba(0, 0, 0, 0.44) !important;
  border-radius: 7px !important;
}
::-webkit-input-placeholder {
  text-align: end;
}
:-moz-placeholder {
  text-align: end;
}

.search-white-icon {
  height: 24px;
  width: 24px;
}

/*
  Table of universities
*/
.table-wrapper {
  @include desktop {
    min-width: 50rem;
    background: linear-gradient(
      180deg,
      rgba(0, 181, 221, 0.34) 0%,
      rgba(207, 207, 207, 0.15) 100%
    );
    min-height: 100px;
    border-radius: 13px;
    padding: 1rem 3.5rem;
    margin-bottom: 2rem;
  }
  @include mobile {
    display: none;
  }
}

table {
  border-collapse: separate !important;
  border-spacing: 0 0.625rem !important;
  @include mobile {
    padding: 0 1rem !important;
  }
}

.table {
  background: transparent !important;
  widows: 20rem;
  table-layout: fixed !important;
}

.thead {
  margin-bottom: 2rem !important;
}

td:first-child {
  border-radius: 10px 0 0 10px !important;
}

td:last-child {
  border-radius: 0 10px 10px 0 !important;
}

td {
  vertical-align: middle !important;
  cursor: pointer !important;
}

td.shrink {
  white-space: nowrap !important;
  width: 1px !important;
}

.fullwidth {
  width: 100% !important;
}

.table-wrapper-mobile {
  @include desktop {
    display: none;
  }
}

.mobile-cell {
  text-align: left !important;
  padding: 1rem 1.2rem;
  max-width: 21rem;
}

.input-mobile {
  color: black !important;
}

.favorite-icon-wrapper {
  border-radius: 7px;
  background: rgba(0, 0, 0, 0.25);
  padding: 0.4rem;
}

#mobile-search-wrapper {
  padding: 0.75rem 1rem;
  background: #131313;
  border-top-left-radius: 12px;
  border-top-right-radius: 12px;
  position: sticky;
  bottom: 3rem;
  @include desktop {
    display: none;
  }
}

.open-info {
  height: 100vh;
  z-index: 9000 !important;
  border-radius: 0 !important;
  background: #171717 !important;
  overflow: scroll;
}

.filter-mobile-wrapper {
  border-radius: 7px !important;
}

/**
styles for loading
*/

.after-load {
  visibility: hidden;
}

.loading-bg {
  // background: #cacaca !important;
  overflow: hidden !important;
  position: relative;
}

.loading-bg:after {
  content: "" !important;
  width: 100% !important;
  height: 100% !important;
  top: 0 !important;
  left: 0 !important;
  background: linear-gradient(
    110deg,
    rgba(227, 227, 227, 0) 0%,
    rgba(227, 227, 227, 0) 40%,
    rgba(227, 227, 227, 0.1) 50%,
    rgba(227, 227, 227, 0) 60%,
    rgba(227, 227, 227, 0) 100%
  ) !important;
  animation: gradient-animation_2 1.2s linear infinite;
  position: absolute;
}

.loading-table {
  min-height: 62.5rem !important;
}

.loading-row {
  min-height: 3.5rem !important;
}

// @keyframes gradient-animation_2 {
//   0% {
//     transform: translateX(-100%);
//   }

//   100% {
//     transform: translateX(100%);
//   }
// }

// .modal {
//   display: block !important;
//   overflow: auto !important;
// }

.modal {
  z-index: 9999 !important;
}

.modal-content {
  padding: 2rem 1rem !important;
  min-height: 100vh !important;
  background: #101010;
}

.modal-content::-webkit-scrollbar {
  width: 0px;
}

.modal-content::-webkit-scrollbar-track {
  background-color: transparent;
  border-radius: 3px;
}

.modal-content::-webkit-scrollbar-thumb {
  background-color: #d9d9d9;
  border-radius: 3px;
}

.is-size-7 {
  font-size: 1.1rem !important;
}
</style>

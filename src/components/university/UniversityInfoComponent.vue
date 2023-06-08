<template>
  <section class="section">
    <font-awesome-icon
      :icon="['fas', 'xmark']"
      class="close-info-icon"
      @click="$emit('closeInfo')"
    />
    <div class="name has-text-white mb-6 is-size-5-mobile is-size-3">
      {{ universityInfo.name }}
    </div>

    <!-- Brief Info about university -->

    <div class="info mb-6">
      <h2 class="has-text-white mb-4 is-size-6-mobile is-size-5">
        Общая информация
      </h2>
      <div class="grid-2-col has-text-white is-size-6-mobile">
        <div class="about grid-4-row">
          <p>Код:</p>
          <p>Регион:</p>
          <p>Сайт:</p>
          <p>Телефон:</p>
          <p>Почта:</p>
        </div>
        <div class="justify-self-center grid-4-row">
          <p>{{ universityInfo.code }}</p>
          <p>{{ universityInfo.region }}</p>
          <p>{{ universityInfo.url }}</p>
          <p>{{ universityInfo.contact_phone }}</p>
          <p>{{ universityInfo.email }}</p>
        </div>
      </div>
    </div>

    <!-- Educational programs in university -->

    <p class="has-text-white is-size-6-mobile is-size-5 mb-6">
      Образовательные программы Бакалавр
    </p>

    <div
      v-for="[key, valueList] in eduProgramStore.list.map"
      @click="openEduProgramList(key)"
      class="card mb-5"
    >
      <header class="card-header">
        <p class="card-header-title is-size-5 is-size-6-mobile">{{ key }}</p>
        <button class="card-header-icon" aria-label="more options">
          <span class="icon">
            <font-awesome-icon icon="fa-solid fa-angle-down" />
          </span>
        </button>
      </header>

      <div v-if="key === selectedKey">
        <div class="card-content">
          <div class="content">
            <div class="has-text-centered">
              <table class="table table is-striped">
                <thead class="thead mb-6">
                  <tr class="is-size-6-mobile has-text-centered has-text-white">
                    <th>Группа образовательных программ</th>
                    <th>Код образовательной программы</th>
                    <th>Образовательная программа</th>
                  </tr>
                </thead>
                <tbody class="has-text-white">
                  <tr
                    v-for="value in valueList"
                    class="is-size-7-mobile is-size-6 mb-4"
                  >
                    <td>
                      {{ value.educationalGroupDto.code }}
                      {{ value.educationalGroupDto.name }}
                    </td>
                    <td>{{ value.code }}</td>
                    <td>{{ value.name }}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { inject, onBeforeMount, onMounted, toRefs, ref } from "vue";
import { useUniversityStore } from "@/stores/universities";
import { useEduProgramStore } from "@/stores/eduPrograms";
import { useRoute } from "vue-router";

const universityStore = useUniversityStore();
const eduProgramStore = useEduProgramStore();

/*
  Fetch educational programs by university id
*/

onBeforeMount(() => {
  eduProgramStore.fetchEduProgramsById(universityInfo.value.id);
});

/*
  route
*/

const route = useRoute();

/*
  university info
*/

const universityInfo = ref();

universityInfo.value = universityStore.getUniversityInfo(route.params.id);

const selectedKey = ref("");

const openEduProgramList = (key) => {
  console.log(selectedKey.value);
  if (selectedKey.value === key) return (selectedKey.value = "");
  selectedKey.value = key;
};

const emit = defineEmits(["closeInfo"]);
</script>

<style scoped lang="scss">
@import "@/assets/variables.scss";

.section {
  position: relative !important;
  padding: 2rem !important;
  min-height: 100vh;
}
.close-info-icon {
  color: white !important;
  position: absolute;
  right: 0;
  top: 0;
  height: 1.4rem;
  width: 1.4rem;
  cursor: pointer;
}

.grid-2-col {
  display: grid;
  grid-template-columns: 30fr 70fr;
}
.grid-4-row {
  @include desktop {
    display: grid;
    row-gap: 1rem;
  }
}
.about {
  color: #8f8f8f;
}

.justify-self-center {
  justify-self: center;
}
.card {
  border: 2px solid white;
}

.card-header {
  @include desktop {
    padding: 1rem 1.5rem !important;
  }
  cursor: pointer;
}

.card-content {
  padding: 0 !important;
}
.content {
  overflow: auto;
}

.table {
  background: transparent !important;
}

thead {
  border-top: 1px solid white !important;
  border-bottom: 1px solid white !important;
}

th {
  font-weight: 400 !important;
  color: #8f8f8f !important;
  color: white !important;
  text-align: center !important;
}

td {
  vertical-align: middle !important;
}
</style>

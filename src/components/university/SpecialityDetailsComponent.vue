<template>
  <section class="section">
    <font-awesome-icon
      :icon="['fas', 'xmark']"
      class="close-info-icon"
      @click="$emit('closeDetails')"
    />
    <!-- <div class="name has-text-white mb-6 is-size-5-mobile is-size-3">aaa</div> -->

    <!-- Educational programs in university -->

    <p class="has-text-white is-size-6-mobile is-size-5 mb-6">
      Доступные образовательные программы по специальности:
      <span class="is-underlined">
        {{ eduProgramStore.list.allSpecialities[id - 1].code }}
        {{ eduProgramStore.list.allSpecialities[id - 1].name }}
      </span>
    </p>

    <table class="table is-striped has-text-white">
      <tbody>
        <tr v-for="(detail, i) in eduProgramStore.list.specialityDetails">
          <th>{{ i + 1 }}</th>
          <td>
            {{ detail.programName }}
          </td>
          <td>
            {{ detail.universityName }}
          </td>
          <td>{{ detail.city }}</td>
        </tr>
      </tbody>
    </table>

    <!-- <div v-for="(detail, i) in eduProgramStore.list.specialityDetails">
      {{ detail.programCode }}
    </div> -->
  </section>
</template>

<script setup>
import { inject, onBeforeMount, onMounted, toRefs, ref, reactive } from "vue";
import { useUniversityStore } from "@/stores/universities";
import { useEduProgramStore } from "@/stores/eduPrograms";
import { useRoute, useRouter } from "vue-router";

const eduProgramStore = useEduProgramStore();

/*
  route
*/

const route = useRoute();

/*
  router
*/

const router = useRouter();

const id = route.params.id;

onBeforeMount(() => {
  eduProgramStore.fetchSpecialityDetailsById(route.params.id);
});

const selectedKey = ref("");

const openUniversityInfo = (id) => {
  console.log("dasfsdfsf");
  window.scrollTo(0, 0);
  router.push(`/${id}`);
};

const emit = defineEmits(["closeDetails"]);
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
  grid-template-columns: 50fr 50fr;
}
.grid-row {
  // @include desktop {
  display: grid;
  row-gap: 1rem;
  // }
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

tr {
  background-color: #101010 !important;
}

tr:nth-child(2n) {
  background-color: #282828 !important;
}

th,
th {
  font-weight: 400 !important;
  color: #8f8f8f !important;
  color: white !important;
  text-align: center !important;
}

td,
th {
  vertical-align: middle !important;
}
</style>

<template>
  <div class="calculator-container">
    <div class="modal is-active">
      <div
        class="modal-background"
        @wheel.prevent
        @touchmove.prevent
        @scroll.prevent
      ></div>
      <div class="modal-card">
        <section class="modal-card-body mx-6 has-text-white has-text-centered">
          <div class="dropdown-wrapper">
            <div class="mb-4">
              <div
                class="dropdown mb-1"
                :class="{ 'is-active': isOpenedSubjects }"
              >
                <div class="dropdown-trigger" @click="openSubjects">
                  <button
                    class="button trigger"
                    aria-haspopup="true"
                    aria-controls="dropdown-menu2"
                  >
                    <span>Выбрать предметы</span>
                  </button>
                </div>
                <div class="dropdown-menu" id="dropdown-menu" role="menu">
                  <div class="dropdown-content">
                    <div
                      class="dropdown-item"
                      v-for="subject in state.subjects"
                      @click="selectSubject(subject)"
                    >
                      <a> {{ subject.prof1 }} - {{ subject.prof2 }} </a>
                    </div>
                  </div>
                </div>
              </div>

              <p v-if="selectedSubject !== ''" class="is-size-7">
                {{ displayedSubject }}
              </p>
            </div>
            <div class="mb-4">
              <div
                class="dropdown mb-1"
                :class="{ 'is-active': isOpenedUniversities }"
              >
                <div class="dropdown-trigger" @click="openUniversities">
                  <button
                    class="button trigger"
                    aria-haspopup="true"
                    aria-controls="dropdown-menu2"
                  >
                    <span>Выбрать ВУЗ</span>
                  </button>
                  <div class="dropdown-menu" id="dropdown-menu" role="menu">
                    <div class="dropdown-content">
                      <div
                        class="dropdown-item"
                        v-for="univeristy in universityStore.universitiesForPrediction"
                        @click="selectUniversity(univeristy)"
                      >
                        <a>
                          {{ univeristy.name }}
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <p v-if="selectedUniversity !== ''" class="is-size-7">
                {{ displayedUniversity }}
              </p>
            </div>
          </div>

          <p class="mb-3">Преимущественные права</p>

          <div class="mb-3 px-5">
            <div class="is-flex is-justify-content-space-around mb-3">
              <button
                v-for="(obj, key) in state.preimushestvo.slice(0, 3)"
                :key="key"
                class="button is-rounded gradient-btn is-justify-content-center"
                :class="{ 'is-selected': obj.selected }"
                @click="selectPrava(obj.value)"
              >
                <span
                  class="has-tooltip-arrow has-tooltipl-multiline"
                  :data-tooltip="obj.about"
                  >{{ obj.name }}</span
                >
              </button>
            </div>

            <div id="scnd-row-prava">
              <div class="is-flex is-justify-content-space-around">
                <button
                  v-for="(obj, key) in state.preimushestvo.slice(3, 5)"
                  :key="key"
                  class="button is-rounded gradient-btn is-justify-content-center"
                  :class="{ 'is-selected': obj.selected }"
                  @click="selectPrava(obj.value)"
                >
                  <span
                    class="has-tooltip-arrow has-tooltipl-multiline"
                    :data-tooltip="obj.about"
                    >{{ obj.name }}</span
                  >
                </button>
              </div>
            </div>
          </div>

          <p class="mb-3">Квота</p>

          <div id="row-qvota">
            <div class="is-flex is-justify-content-space-around mb-3">
              <button
                v-for="(obj, key) in state.qvota"
                :key="key"
                class="button is-rounded gradient-btn is-justify-content-center"
                :class="{ 'is-selected': obj.selected }"
                @click="selectQvota(obj.value)"
              >
                {{ obj.name }}
              </button>
            </div>
          </div>

          <div class="slider-contaier mb-3">
            <div class="value-container is-size-4">
              {{ sliderValue }}
            </div>
            <input
              id="sliderWithValue"
              class="slider is-large is-circle is-fullwidth"
              min="0"
              max="140"
              step="1"
              type="range"
              v-model="sliderValue"
            />
          </div>

          <button class="button res-btn" @click="showResult">
            Показать результат
          </button>
        </section>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from "@vue/reactivity";
import {
  onMounted,
  onBeforeUnmount,
  onBeforeMount,
  reactive,
  ref,
  watch,
} from "vue";
import { useUniversityStore } from "@/stores/universities";
import { usePredictionStore } from "@/stores/prediction";
const universityStore = useUniversityStore();
const predictionStore = usePredictionStore();
import { useRouter } from "vue-router";

onBeforeMount(() => {
  universityStore.fetchUniversities();
});

onBeforeUnmount(() => {
  document.documentElement.style.overflow = "auto";
});

onMounted(() => {
  document.documentElement.style.overflow = "hidden";
});

/**
 * router
 */

const router = useRouter();

const sliderValue = ref(50);

const state = reactive({
  form: {
    subjects: {},
    university: {},
    preimushestvo: {},
    qvota: {},
  },
  preimushestvo: [
    {
      name: "НЕТ",
      value: "-",
      about: `У вас нет 
превилегий
при рассмотрений 
вашей кандидатуры`,
      selected: false,
    },
    {
      name: "АБ",
      value: "аб",
      about: `Вы являетесь
      обладателем "Алтын белгі"`,
      selected: false,
    },
    {
      name: "НЕПС",
      value: "непс",
      about: `Неполная семья`,
      selected: false,
    },
    {
      name: "МНС",
      value: "мнс",
      about: `Многодетная семья`,
      selected: false,
    },
    {
      name: "Отличник",
      value: "отличник",
      about: `Вы закончили школу с отличием`,
      selected: false,
    },
  ],
  qvota: [
    { name: "Общая", value: "City", selected: false },
    { name: "Сельская", value: "Village", selected: false },
  ],
  subjects: [
    {
      prof1: "Биология",
      prof2: "География",
    },
    {
      prof1: "Биология",
      prof2: "Химия",
    },
    {
      prof1: "Всемирная история",
      prof2: "География",
    },
    {
      prof1: "Всемирная история",
      prof2: "Иностранный язык",
    },
    {
      prof1: "Всемирная история",
      prof2: "Основы права",
    },
    {
      prof1: "География",
      prof2: "Всемирная история",
    },
    {
      prof1: "География",
      prof2: "Иностранный язык",
    },
    {
      prof1: "Иностранный язык",
      prof2: "Всемирная история",
    },
    {
      prof1: "Казахский /Русский язык",
      prof2: "Казахская /Русская литература",
    },
    {
      prof1: "Математика",
      prof2: "География",
    },
    {
      prof1: "Математика",
      prof2: "География",
    },
    {
      prof1: "Математика",
      prof2: "Физика",
    },
    {
      prof1: "Творческий экзамен",
      prof2: "Творческий экзамен",
    },
    {
      prof1: "Химия",
      prof2: "Физика",
    },
    {
      prof1: "Физика",
      prof2: "Математика",
    },
    {
      prof1: "Химия",
      prof2: "Биология",
    },
  ],
  universities: universityStore.universitiesForPrediction,
});

/**
 * subjects dropdown
 */

const isOpenedSubjects = ref(false);

const openSubjects = () => {
  isOpenedSubjects.value = !isOpenedSubjects.value;
};

const selectSubject = (subject) => {
  selectedSubject.value = subject;
  isOpenedSubjects.value = false;
  state.form.subjects = subject;
};

const selectedSubject = ref("");

const displayedSubject = ref("Все предметы");

// const displaySubject = computed(() => {
//   if (selectedSubject.value === "") {
//     displaySubject.value = "Все предметы";
//     return;
//   }
//   return (displayedSubject.value =
//     selectedSubject.value.prof1 + "-" + selectedSubject.value.prof2);
// });

watch(
  () => selectedSubject.value,
  () => {
    if (selectedSubject.value === "") {
      displayedSubject.value = "Все предметы";
      return;
    }
    return (displayedSubject.value =
      selectedSubject.value.prof1 + "-" + selectedSubject.value.prof2);
  }
);

/**
 * universities dropdown
 */

const isOpenedUniversities = ref(false);

const openUniversities = () => {
  isOpenedUniversities.value = !isOpenedUniversities.value;
};

const selectUniversity = (univeristy) => {
  selectedUniversity.value = univeristy;
  isOpenedSubjects.value = false;
  displayedUniversity.value = selectedUniversity.value.name;
  state.form.university = selectedUniversity.value;
};

const selectedUniversity = ref("");

const displayedUniversity = ref("Выбрать Университет");

watch(
  () => selectedSubject.value,
  () => {
    if (selectedUniversity.value.name !== "")
      return (displayedUniversity.value = selectedUniversity.value.name);
  }
);

/**
 * prava buttons
 */

const selectPrava = (value) => {
  state.preimushestvo.forEach((p) => {
    if (p.value === value) {
      p.selected = true;
      state.form.preimushestvo = p.value;
    }
    if (p.value !== value) p.selected = false;
  });
};

const selectQvota = (value) => {
  state.qvota.forEach((q) => {
    if (q.value === value) {
      q.selected = true;
      state.form.qvota = q.value;
    }
    if (q.value !== value) q.selected = false;
  });
};

const showResult = () => {
  predictionStore.postForm(state.form, sliderValue.value);
  router.push("/result");
};
</script>

<style scoped lang="scss">
@import "@/assets/variables.scss";

.calculator-container {
  background: linear-gradient(
    231.45deg,
    rgba(51, 0, 159, 0.85) 5.16%,
    rgba(54, 35, 202, 0.932297) 29.15%,
    rgba(48, 51, 188, 0.946543) 34.9%,
    #196d88 56.51%,
    #029482 93.02%
  );
  height: 100vh;
  width: 100vw;
}

.modal-card-body {
  background: linear-gradient(180deg, #206495 0%, #078f77 100%) !important;
  box-shadow: 0px 4px 14px rgba(0, 0, 0, 0.35) !important;
  border-radius: 10px !important;
  max-width: 28.25rem !important;
  max-height: 36rem !important;
  padding: 1.4rem 0;
  position: relative;
  @include desktop {
    padding-top: 2rem;
  }
  @include touch {
    margin-top: 2rem;
  }
  overflow-x: hidden;
}

.modal-card-body::-webkit-scrollbar {
  width: 0px !important;
}

.close-icon {
  position: absolute;
  top: 0.5rem;
  right: 0.5rem;
  height: 25px;
  width: 25px;
}

.trigger {
  background: rgba(0, 0, 0, 0.4) !important;
  border-radius: 7px !important;
  border: none !important;
  color: white !important;
}

.dropdown-wrapper {
  padding: 0 2.75rem;
  display: flex;
  flex-direction: column;
}
.dropdown {
  width: 100% !important;
  .dropdown-trigger {
    width: 100%;
  }

  .button {
    display: flex;
    width: 100%;
    justify-content: center;
  }
}

.dropdown-item {
  cursor: pointer !important;
}
.dropdown-content {
  border-radius: 0px !important;
  width: 100% !important;
  height: 20rem !important;
  overflow-y: auto;
}
.dropdown-content::-webkit-scrollbar {
  width: 3px !important;
}

.dropdown-content::-webkit-scrollbar-track {
  background-color: transparent !important;
  border-radius: 3px !important;
}

.dropdown-content::-webkit-scrollbar-thumb {
  background-color: #d9d9d9 !important;
  border-radius: 3px !important;
}

.is-selected {
  background: white !important;
  color: black !important;
}
.gradient-btn {
  background: linear-gradient(263.94deg, #567fe9 0%, #3abba4 100%);
  border: none;
  color: white;
  width: 7rem;
}

#scnd-row-prava {
  padding: 0 5rem;
  @include mobile {
    padding: 0 2rem;
  }
}

#row-qvota {
  padding: 0 4rem;
  @include mobile {
    padding: 0 2rem;
  }
}

.slider-contaier {
  padding: 0 2.5rem;
}

.res-btn {
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

.is-size-7 {
  font-size: 1rem;
}
</style>

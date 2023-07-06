<template>
  <div class="page-background">
    <div v-if="predictionStore.resForm.result.length === 0" class="image">
      <font-awesome-icon
        :icon="['fas', 'angle-left']"
        class="circle-icon"
        @click="changeForm"
      />
    </div>
    <div class="container padding-container">
      <!-- if we dont have result -->
      <!-- <article
        v-if="predictionStore.resForm.result.length === 0"
        class="message is-warning"
      >
        <div class="message-header">
          <p>Результат не найден</p>
          <button
            @click="changeForm"
            class="delete"
            aria-label="delete"
          ></button>
        </div>
        <div class="message-body">
          <ul>
            <li>
              Возможно был уазан
              <strong class="strong">маленький балл ЕНТ</strong>
            </li>
            <li>
              Либо по Вашему запросу
              <strong class="strong">недостаточно данных</strong>
            </li>
          </ul>
        </div>
      </article> -->

      <!-- if we have result -->
      <div
        v-if="predictionStore.resForm.result.length !== 0"
        v-for="(res, index) in predictionStore.resForm.result"
        class="result-wrapper"
      >
        <div class="columns">
          <div class="column progress-wrapper">
            <div class="prediction-grid">
              <VeProgress
                class="justify-self-center"
                :color="'#6CD32C'"
                :empty-color="'rgba(0, 0, 0, 0.24)'"
                :progress="predictionStore.resForm.result[index][1]"
                :font-size="'2.2rem'"
                :font-color="'white'"
                :thickness="15"
                :emptyThickness="10"
                :line-mode="'in 0.2'"
                :colorFill="'#1f334f'"
                :emptyColorFill="'#038698'"
                :size="170"
              />

              <p class="prediction-text">
                {{
                  renderPredictionText(predictionStore.resForm.result[index][1])
                }}
              </p>
            </div>
          </div>
          <div class="column is-two-thirds">
            <div class="result-row">
              <p class="align-self-center">
                {{ predictionStore.resForm.Univer.code }}
              </p>
              <p>{{ predictionStore.resForm.Univer.name }}</p>
            </div>
            <div class="result-row">
              <p class="align-self-center">
                {{ predictionStore.resForm.result[index][0].substring(0, 5) }}
              </p>
              <p>
                {{ predictionStore.resForm.result[index][0].substring(7) }}
              </p>
            </div>
            <div class="result-row">
              <p class="align-self-center">Предмет:</p>
              <p>
                {{ predictionStore.resForm.profile_subj_1 }} -
                {{ predictionStore.resForm.profile_subj_2 }}
              </p>
            </div>
            <div class="result-row">
              <p class="align-self-center">Балл:</p>
              <p>{{ predictionStore.resForm.Points }}</p>
            </div>
          </div>
          <!-- <div class="column"></div> -->
        </div>

        <div class="is-flex is-justify-content-center">
          <button class="button change-btn" @click="changeForm">
            Изменить
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
// import CircularProgress from "@/components/calculator/CircularProgressBar.vue";
// import "vue3-circle-progress/dist/circle-progress.css";
// import CircleProgress from "vue3-circle-progress";
import { ref, reactive, computed, onBeforeMount, watch, onMounted } from "vue";
import { VeProgress } from "vue-ellipse-progress";
import { usePredictionStore } from "@/stores/prediction";
import { useRouter } from "vue-router";

const predictionStore = usePredictionStore();

const router = useRouter();

onMounted(() => {
  document.documentElement.style.overflowY = "auto";

  if (predictionStore.resForm.result.length === 0) {
    document.documentElement.style.overflow = "hidden";
  }
});

const renderPredictionText = (value) => {
  value = parseInt(value.slice(0, -1));

  if (value > 50) return "Высокий шанс поступления на грант";
  if (value === 50) return "Средний шанс поступления на грант";
  if (value < 50) return "Небольшой шанс поступления на грант";
};

const changeForm = () => {
  router.push("/calculator");
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
  // min-width: 100vw;
  // @include desktop {
  //   padding: 4rem;
  // }
  @include touch {
    padding: 1.7rem 1.6rem;
  }
}

.image {
  width: 100%;
  height: 100vh;
  background-position: center;
  background-size: cover;
  background-image: url("src/assets/img/tryagain-img.png");
  // opacity: 0.4;
  position: relative;
}

.circle-icon {
  position: absolute;
  top: 170px;
  left: 520px;
  height: 37px;
  width: 37px;
  color: white;
  background-color: rgba(0, 0, 0, 0.4);
  text-align: center;
  line-height: 100px;
  vertical-align: middle;
  padding: 4px;
  border-radius: 50px;
  cursor: pointer;
}

.circle-icon:hover {
  background-color: rgba(0, 0, 0, 0.1);
}

.message {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.strong {
  font-weight: 700;
}

.padding-container {
  @include desktop {
    padding: 4rem !important;
  }
}

.result-wrapper {
  background: rgba(2, 2, 2, 0.3);
  margin: 0 auto !important;
  @include desktop {
    padding: 2rem 4rem;
    max-width: 79rem;
  }
  @include touch {
    padding: 1rem 0;
    margin-top: 1rem !important;
  }
  border-radius: 10px;
}

.result-wrapper:not(:first-child) {
  margin-top: 1.2rem !important;
}

// .progress-wrapper {
//   max-width: 6.25rem !important;
// }

.result-row {
  background: rgba(2, 2, 2, 0.3);
  border-radius: 10px;
  color: white;
  margin-bottom: 0.7rem;
  padding: 0.6rem 2rem;
  display: grid;
  grid-template-columns: 30% 70%;
  @include touch {
    border-radius: 0px;
  }
}

.change-btn {
  background: linear-gradient(264.32deg, #20aeb7 0%, #2bb483 100%);
  border-radius: 6px;
  color: white;
  padding: 1rem 2rem;
}
.prediction-text {
  color: white;
  font-size: 1.4rem;
  text-align: center;
  padding: 0 2.5rem;
}
.prediction-grid {
  display: grid;
  grid-template-columns: 1fr;
  row-gap: 0.5rem;
}
.justify-self-center {
  justify-self: center;
}

.align-self-center {
  align-self: center;
}
</style>

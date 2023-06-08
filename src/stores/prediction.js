import { ref, computed, reactive } from "vue";
import { defineStore } from "pinia";
import axios from "axios";
import qs from "qs";

export const usePredictionStore = defineStore("prediction", () => {
  const availableData = reactive({
    list: [
      {
        id: 0,
        combination: {
          prof1: "Биология",
          prof2: "География",
        },
        univesities: [
          13, 302, 25, 7, 42, 15, 141, 185, 37, 16, 34, 5, 47, 196, 11, 31, 27,
          2, 21, 38, 29, 40, 122, 24, 35, 53, 36, 45, 43, 501, 158, 12,
        ],
        prava: ["-", "аб", "мнс"],
        status: ["City", "Village"],
      },
      {
        id: 1,
        combination: {
          prof1: "Биология",
          prof2: "Химия",
        },
        univesities: [
          302, 7, 25, 185, 27, 13, 40, 31, 5, 45, 43, 16, 11, 38, 42, 10, 29,
          53, 35, 24, 2, 30, 37, 32, 49, 36, 141, 122, 501, 34, 15,
        ],
        prava: ["-", "аб", "мнс"],
        status: ["City", "Village"],
      },
      {
        id: 2,
        combination: {
          prof1: "Всемирная история",
          prof2: "География",
        },
        univesities: [
          7, 302, 25, 185, 27, 45, 13, 31, 37, 196, 43, 42, 35, 10, 34, 15,
        ],
        prava: ["-", "аб", "мнс"],
        status: ["City", "Village"],
      },
      {
        id: 3,
        combination: {
          prof1: "Всемирная история",
          prof2: "Иностранный язык",
        },
        univesities: [
          302, 13, 23, 7, 25, 27, 174, 45, 37, 185, 22, 40, 153, 11, 43, 83, 21,
          69,
        ],
        prava: ["-", "аб", "мнс"],
        status: ["City", "Village"],
      },
      {
        id: 4,
        combination: {
          prof1: "Всемирная история",
          prof2: "Основы права",
        },
        univesities: [27, 31, 174, 21, 13, 69],
        prava: ["-"],
        status: ["City"],
      },
      {
        id: 5,
        combination: {
          prof1: "География",
          prof2: "Иностранный язык",
        },
        univesities: [
          174, 13, 69, 21, 83, 27, 23, 37, 93, 5, 40, 16, 38, 25, 45, 153, 35,
          20, 122, 53,
        ],
        prava: ["-"],
        status: ["City"],
      },
      {
        id: 7,
        combination: {
          prof1: "Математика",
          prof2: "География",
        },
        univesities: [
          421, 21, 174, 13, 302, 27, 83, 122, 40, 32, 190, 5, 45, 43, 31, 12,
          36, 69, 37, 2, 11, 29, 93, 38, 16, 7, 34, 22, 501, 24, 3, 42, 19, 157,
          9,
        ],
        prava: ["-", "аб", "мнс", "отличник"],
        status: ["City", "Village"],
      },
      {
        id: 8,
        combination: {
          prof1: "Математика",
          prof2: "Физика",
        },
        univesities: [
          302, 185, 31, 13, 7, 25, 27, 43, 37, 11, 12, 42, 5, 45, 36, 38, 35,
          40, 10, 517, 196, 3, 34, 421, 522, 83, 190, 32, 21, 29, 69, 24, 57, 2,
          501, 93, 153, 16, 53, 15, 49, 122, 33, 184, 141, 19, 22, 39, 14, 9,
        ],
        prava: ["-", "аб", "мнс", "отличник"],
        status: ["City", "Village"],
      },
      {
        id: 8,
        combination: {
          prof1: "Химия",
          prof2: "Физика",
        },
        univesities: [421, 27, 38, 29, 31, 45, 53, 32, 33, 5, 501],
        prava: ["-"],
        status: ["City"],
      },
      {
        id: 9,
        combination: {
          prof1: "Творческий экзамен",
          prof2: "Творческий экзамен",
        },
        univesities: [
          20, 37, 13, 196, 5, 7, 34, 25, 15, 16, 501, 43, 141, 35, 31, 42, 517,
          38, 27, 93, 45, 22, 53, 29, 40, 182, 184, 190, 23, 69, 302, 522, 83,
          174, 11, 36, 158,
        ],
        prava: ["-", "аб", "мнс"],
        status: ["City", "Village"],
      },
      {
        id: 9,
        combination: {
          prof1: "Казахский /Русский язык",
          prof2: "Казахская /Русская литература",
        },
        univesities: [27, 25, 45, 16],
        prava: ["-"],
        status: ["City"],
      },
    ],
  });

  const resForm = reactive({
    status: {},
    preimushestvo: {},
    profile_subj_1: {},
    profile_subj_2: {},
    Points: 0,
    Univer: {},
    суммабалловсертификата: 89,
    "среднийбаллаттестата(диплома)": 4.571,
    "суммабалловпрофильныхпредметов(творческихэкзаменов)": 46,
    result: {},
  });

  const loading = ref(false);

  async function postForm(form, score) {
    loading.value = true;

    try {
      const data = {
        // status: "City",
        // preimushestvo: "аб",
        // profile_subj_1: "Математика",
        // profile_subj_2: "Физика",
        // Points: 132,
        // Univer_code: 13,
        // суммабалловсертификата: 89,
        // "среднийбаллаттестата(диплома)": 4.571,
        // "суммабалловпрофильныхпредметов(творческихэкзаменов)": 46,
        status: form.qvota,
        preimushestvo: form.preimushestvo,
        profile_subj_1: form.subjects.prof1,
        profile_subj_2: form.subjects.prof2,
        Points: score,
        Univer_code: parseInt(form.university.code.replace(/^0+/, "")),
        суммабалловсертификата: 89,
        "среднийбаллаттестата(диплома)": 4.571,
        "суммабалловпрофильныхпредметов(творческихэкзаменов)": 46,
      };

      console.log(data);

      resForm.status = "City";
      resForm.preimushestvo = form.preimushestvo;
      resForm.profile_subj_1 = form.subjects.prof1;
      resForm.profile_subj_2 = form.subjects.prof2;
      resForm.Points = score;
      resForm.Univer = form.university;

      // const response = await fetch("/predict", {
      //   method: "POST",
      //   headers: {
      //     "Content-Type": "application/json",
      //   },
      //   body: data,
      // }).them((response) => {
      //   console.log(response.status);
      // });

      // const options = {
      //   method: "POST",
      //   headers: { "content-type": "application/x-www-form-urlencoded" },
      //   data: qs.stringify(data),
      //   url,
      // };

      await axios
        .post("/predict", data, {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        })
        .then((res) => {
          resForm.result = Object.entries(res.data.spec);
        });

      // const text = await response.text();
    } catch (error) {
      console.log(error);
    }
    loading.value = false;

    if (loading.value === false) {
      this.$router.push("/result");
    }
  }

  const result = computed((index) => {
    const code = resForm.result[index][0].substring(0, 5);
    const speciality = resForm.result[index][0].substring(8);
    const percentage = resForm.result[index][1];
    return {
      code: code,
      speciality: speciality,
      percentage: percentage,
    };
  });

  return { resForm, postForm, availableData, loading };
});

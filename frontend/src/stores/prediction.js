import { ref, computed, reactive } from "vue";
import { defineStore } from "pinia";
import axios from "axios";
import qs from "qs";

export const usePredictionStore = defineStore("prediction", () => {
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
  });

  const loading = ref(false);

  async function postForm(form, score) {
    try {
      const url = "/predict";

      const data = {
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

      resForm.status = form.qvota;
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
        .post(url, data, {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        })
        .then((res) => console.log(res));

      // const text = await response.text();
    } catch (error) {
      handleError(error);
    }
  }

  return { resForm, postForm };
});

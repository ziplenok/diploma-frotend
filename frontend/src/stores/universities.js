import { ref, computed, reactive } from "vue";
import { defineStore } from "pinia";
import axios from "axios";

export const useUniversityStore = defineStore("university", () => {
  const list = ref([]);

  const universitiesForPrediction = ref([]);

  const loading = ref(false);

  async function fetchUniversities() {
    try {
      loading.value = true;

      const res = await axios.get("api_v1/universities/ru").then((response) => {
        list.value = response.data;
      });

      loading.value = false;
    } catch (error) {
      handleError(error);
    }
  }

  const cities = computed(() => new Set(list.value.map((u) => u.city)));

  const getUniversityInfo = computed(() => {
    return (id) => {
      console.log(list.value.filter((u) => u.id === parseInt(id)));
      return list.value.filter((u) => u.id === parseInt(id))[0];
    };
  });

  // const calculator = reactive({
  // });

  function setAvailableUniversityCodes(codes) {
    universitiesForPrediction.value = list.value.filter((u) =>
      // availableUniversityCodes.value.includes(
      //   parseInt(u.code.replace(/^0+/, ""))
      // )
      codes.includes(parseInt(u.code.replace(/^0+/, "")))
    );
  }

  const availableUniversityCodes = ref([
    13, 302, 25, 7, 42, 15, 141, 185, 37, 16, 34, 5, 47, 196, 20, 501, 43, 35,
    31, 517, 3, 10, 23, 11, 38, 27, 93, 45, 22, 53, 29, 40, 182, 184, 174, 153,
    83, 21, 69, 190, 522, 36, 421, 122, 32, 12, 2, 24, 30, 49, 158, 57, 33, 19,
    39, 14, 9, 157,
  ]);

  const getUniversitiesByAvailableCode = computed(() => {
    console.log("list[j]");
    return () => {
      // return list.value.filter((u) =>
      //   calculator.availableUniversityCodes.includes(
      //     parseInt(u.code.replace(/^0+/, ""))
      //   )
      // );

      let res = [];

      for (let i = 0; i < availableUniversityCodes.length; i++) {
        for (let j = 0; j < list.length; j++) {
          if (
            calculator.availableUniversityCodes[i] ===
            parseInt(list[j].value.code.replace(/^0+/, ""))
          )
            res.push(list[j]);
        }
      }
      return res;
    };
  });

  return {
    list,
    fetchUniversities,
    cities,
    getUniversityInfo,
    loading,
    universitiesForPrediction,
    setAvailableUniversityCodes,
  };
});

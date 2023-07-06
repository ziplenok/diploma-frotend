import { ref, computed, reactive } from "vue";
import { defineStore } from "pinia";
import axios from "axios";

export const useEduProgramStore = defineStore("eduProgram", () => {
  const list = reactive({
    map: {},
    allPrograms: [],
    programsByCombination: [],
    combinations: [],
    allSpecialities: [],
    specialityDetails: [],
  });

  async function fetchEduProgramsById(id) {
    try {
      const res = await axios
        .get("api_v1/universities/ru/" + id)
        .then((response) => {
          list.map = new Map(Object.entries(response.data));
        });
    } catch (error) {
      console.log("problem in edu programs");
    }
  }

  async function fetchEduProgramsByCombination(combination) {
    try {
      const res = await axios
        .get("api_v1/programs/ru/", {
          params: { prof1: combination.prof1, prof2: combination.prof2 },
        })
        .then((response) => {
          list.programsByCombination = response.data;
        });
    } catch (error) {
      console.log("problem in edu programs");
    }
  }

  const loading = ref(false);

  async function fetchAllEduPrograms() {
    try {
      loading.value = true;

      const res = await axios.get("api_v1/programs/ru").then((response) => {
        list.allPrograms = response.data;
      });

      // list.combinations = _unique(list.allPrograms, ["prof1", "prof2"]);

      loading.value = false;
    } catch (error) {
      console.log("problem in edu programs");
    }
  }

  async function fetchAllSpecialities() {
    try {
      loading.value = true;

      const res = await axios.get("api_v1/specialities/ru").then((response) => {
        list.allSpecialities = response.data;
      });

      list.combinations = _unique(list.allSpecialities, ["prof1", "prof2"]);

      loading.value = false;
    } catch (error) {
      console.log("problem in edu programs");
    }
  }

  async function fetchSpecialityDetailsById(id) {
    try {
      loading.value = true;

      const res = await axios
        .get("api_v1/specialities/ru/" + id)
        .then((response) => {
          list.specialityDetails = response.data;
        });

      loading.value = false;
    } catch (error) {
      console.log("problem in edu programs");
    }
  }

  // const combinations = computed(() => {
  //   list.combinations = unique(list.allPrograms, ["prof1", "prof2"]);
  // });

  // function _unique(arr, keyProps) {
  //   const kvArray = arr.map((entry) => {
  //     const key = keyProps.map((k) => entry[k]).join("|");
  //     return [key, entry];
  //   });
  //   const map = new Map(kvArray);
  //   return Array.from(map.values());
  // }

  function _unique(arr, keyProps) {
    const kvArray = arr.map((entry) => {
      const key = keyProps.map((k) => entry[k]).join("|");
      return [key, entry];
    });
    const map = new Map(kvArray);
    return Array.from(map.values());
  }

  function _assignObjectCombination(arr) {
    for (let i = 0; i < arr.length; i++) {
      arr[i] = Object.assign({}, { prof1: arr[i].prof1, prof2: arr[i].prof2 });
    }
  }

  return {
    list,
    fetchEduProgramsById,
    fetchEduProgramsByCombination,
    fetchAllEduPrograms,
    fetchAllSpecialities,
    fetchSpecialityDetailsById,
    loading,
  };
});

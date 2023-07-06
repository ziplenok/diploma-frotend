import { createRouter, createWebHistory } from "vue-router";
import ViewCalculator from "@/views/ViewCalculator.vue";
import ViewSpecialities from "@/views/ViewSpecialities.vue";
import ViewSpecialities2 from "@/views/ViewSpecialities2.vue";
import ViewUniversities from "@/views/ViewUniversities.vue";
import UniversityInfo from "@/components/university/UniversityInfoComponent.vue";
import SpecialityDetails from "@/components/university/SpecialityDetailsComponent.vue";
import CalculatorModal from "@/components/calculator/CalculatorModal.vue";
import ResultPage from "@/components/calculator/ResultPage.vue";
import ViewMain from "@/views/ViewMain.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/university",
      name: "university",
      component: ViewUniversities,
      children: [
        { path: ":id", component: UniversityInfo },
        // { path: "calculator", component: CalculatorModal, name: "calculator" },
      ],
    },
    {
      path: "/",
      name: "main",
      component: ViewMain,
    },
    {
      path: "/specialities",
      name: "specialities",
      component: ViewSpecialities2,
      children: [{ path: ":id", component: SpecialityDetails }],
    },
    {
      path: "/calculator",
      name: "calculator",
      component: CalculatorModal,
    },
    {
      path: "/result",
      name: "result",
      component: ResultPage,
    },
  ],
});

export default router;

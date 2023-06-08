import { createRouter, createWebHistory } from "vue-router";
import ViewCalculator from "@/views/ViewCalculator.vue";
import ViewSpecialities from "@/views/ViewSpecialities.vue";
import ViewUniversities from "@/views/ViewUniversities.vue";
import UniversityInfo from "@/components/university/UniversityInfoComponent.vue";
import CalculatorModal from "@/components/calculator/CalculatorModal.vue";
import ResultPage from "@/components/calculator/ResultPage.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "university",
      component: ViewUniversities,
      children: [
        { path: ":id", component: UniversityInfo },
        // { path: "calculator", component: CalculatorModal, name: "calculator" },
      ],
    },
    {
      path: "/specialities",
      name: "specialities",
      component: ViewSpecialities,
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

import PeopleListVue from "@/components/PeopleList/PeopleList.vue";
import PlanetsVue from "@/components/Planets/PlanetsList.vue";
import VehiclesVue from "@/components/Vehicles/VehiclesList.vue";
import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: PeopleListVue,
    },
    {
      path: "/planets",
      name: "planets",
      component: PlanetsVue,
    },
    {
      path: "/vehicles",
      name: "vehicles",
      component: VehiclesVue,
    },
  ],
});

export default router;

import { createApp } from "vue";
import { createPinia } from "pinia";

import App from "./App.vue";
import router from "./router";
import PrimeVue from "PrimeVue/config";
import Card from "primevue/card";
import ScrollPanel from "primevue/scrollpanel";
import PeopleListVue from "./components/PeopleList/PeopleList.vue";

const app = createApp(App);
import InputText from "primevue/inputtext";
import "vue-universal-modal/dist/index.css";

import VueUniversalModal from "vue-universal-modal";

import PlanetsListVue from "./components/Planets/PlanetsList.vue";
import VehiclesListVue from "./components/Vehicles/VehiclesList.vue";

app.use(createPinia());
app.use(router);
app.use(PrimeVue);

app.component("SwCard", Card);
app.component("PeopleList", PeopleListVue);
app.component("PlanetsList", PlanetsListVue);
app.use(VueUniversalModal, {
  teleportTarget: "#modals",
  modalComponent: "PopupModal",
});
app.component("VehiclesList", VehiclesListVue);
app.component("ScrollPanel", ScrollPanel);
app.component("InputText", InputText);

app.mount("#app");

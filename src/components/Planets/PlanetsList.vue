<script setup lang="ts">
import { getAllPlanets } from "@/services/DataService";
import { onMounted, reactive } from "vue";
import type StarWarsPlanet from "./StarWarsPlanet";

const store = reactive({
  dataLoaded: false,
  isListView: true,
  isGridView: false,
  columnElements: document.querySelectorAll<HTMLElement>(".column"),
  swPlanets: [] as StarWarsPlanet[],
  filteredSwPlanets: [] as StarWarsPlanet[],
  modalOpen: false,
  searchTerm: "",
  starWarsPlanet: {} as StarWarsPlanet,
  //

  updatePlanetList(list: StarWarsPlanet[]) {
    this.swPlanets = list;
    this.filteredSwPlanets = list;
    this.dataLoaded = true;
  },
  filterPlanetByName(searchTerm: string) {
    this.searchTerm = searchTerm;
    this.filteredSwPlanets = this.swPlanets.filter((el) =>
      el.name
        .toLowerCase()
        .replace(/\s/g, "")
        .includes(searchTerm.toLowerCase())
    );
  },
  toggleListView() {
    this.isListView = true;
    this.isGridView = false;
  },
  toggleGridView() {
    this.isGridView = true;
    this.isListView = true;
  },
  openPlanetModal(starWarsPlanet: StarWarsPlanet) {
    if (this.modalOpen == false) {
      this.modalOpen = true;
      store.starWarsPlanet = starWarsPlanet;
    }
  },
  closePlanetModal() {
    if (this.modalOpen == true) {
      this.modalOpen = false;
    }
  },
});

// const store = ref({ dataLoaded: false, swPeople: [] as StarWarsPeople[] });

onMounted(async () => {
  const Planets = await getAllPlanets();
  store.updatePlanetList(Planets.results as StarWarsPlanet[]);
});
</script>

<template>
  <ul :v-if="store.dataLoaded">
    <div @click="store.toggleListView()">Toggle List view</div>
    <div @click="store.toggleGridView()">Toggle Grid view</div>
    <InputText
      :oninput="store.filterPlanetByName(store.searchTerm)"
      type="text"
      v-model="store.searchTerm"
    >
    </InputText>
    <div>
      <ScrollPanel
        :class="{
          'justify-content: start; ': store.isListView,
          'justify-content: end;': store.isGridView,
        }"
      >
        <div class="row"></div>
        <div
          class="column"
          :class="{ list: store.isListView, grid: store.isGridView }"
          v-for="(sw, index) in store.filteredSwPlanets"
          :key="sw.name"
        >
          <SwCard @click="store.openPlanetModal(sw)">
            <template #title> Planet {{ index }}</template>
            <template #content>
              <div>{{ sw.name }}</div>
              <div>{{ sw.climate }}</div>
            </template>
          </SwCard>
        </div>
      </ScrollPanel>
    </div>
    <PopupModal
      style="z-index: 3"
      v-model="store.modalOpen"
      :close="store.closePlanetModal"
    >
      <div class="modal">
        <p>Name:{{ store.starWarsPlanet.name }}</p>
        <p>Population: {{ store.starWarsPlanet.population }}</p>
        <p>Climate: {{ store.starWarsPlanet.climate }}</p>
        <p>Diameter: {{ store.starWarsPlanet.diameter }}</p>
        <p>Rotation Period:{{ store.starWarsPlanet.rotation_period }}</p>
        <button @click="store.closePlanetModal">close</button>
      </div>
    </PopupModal>
  </ul>
</template>

<style scoped lang="scss">
.modal {
  width: 300px;
  padding: 30px;
  box-sizing: border-box;
  background-color: #fff;
  font-size: 20px;
  text-align: center;
}
/* Create two equal columns that floats next to each other */
.column {
  float: left;
  width: 50%;
  padding: 10px;
}

.list {
  width: 100%;
}

.grid {
  width: 50%;
}
/* Clear floats after the columns */
.row:after {
  content: "";
  display: table;
  clear: both;
}
</style>

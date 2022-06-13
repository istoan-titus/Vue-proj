<script setup lang="ts">
import { getAllVehicles } from "@/services/DataService";
import { onMounted, reactive } from "vue";
import type StarWarsVehicle from "./StarWarsVehicle";

const store = reactive({
  dataLoaded: false,
  isListView: true,
  isGridView: false,
  columnElements: document.querySelectorAll<HTMLElement>(".column"),
  swVehicles: [] as StarWarsVehicle[],
  filteredSwVehicles: [] as StarWarsVehicle[],
  modalOpen: false,
  searchTerm: "",
  starWarsVehicle: {} as StarWarsVehicle,
  //

  updateVehicleList(list: StarWarsVehicle[]) {
    this.swVehicles = list;
    this.filteredSwVehicles = list;
    this.dataLoaded = true;
  },
  filterVehicleByName(searchTerm: string) {
    this.searchTerm = searchTerm;
    this.filteredSwVehicles = this.swVehicles.filter((el) =>
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
  openVehicleModal(starWarsVehicle: StarWarsVehicle) {
    if (this.modalOpen == false) {
      this.modalOpen = true;
      store.starWarsVehicle = starWarsVehicle;
    }
  },
  closeVehicleModal() {
    if (this.modalOpen == true) {
      this.modalOpen = false;
    }
  },
});

// const store = ref({ dataLoaded: false, swPeople: [] as StarWarsPeople[] });

onMounted(async () => {
  const vehicles = await getAllVehicles();
  store.updateVehicleList(vehicles.results as StarWarsVehicle[]);
});
</script>

<template>
  <ul :v-if="store.dataLoaded">
    <div @click="store.toggleListView()">Toggle List view</div>
    <div @click="store.toggleGridView()">Toggle Grid view</div>
    <InputText
      :oninput="store.filterVehicleByName(store.searchTerm)"
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
          v-for="(sw, index) in store.filteredSwVehicles"
          :key="sw.name"
        >
          <SwCard @click="store.openVehicleModal(sw)">
            <template #title> Vehicle {{ index }}</template>
            <template #content>
              <div>{{ sw.name }}</div>
              <div>{{ sw.model }}</div>
              <div>{{ index }}</div>
            </template>
          </SwCard>
        </div>
      </ScrollPanel>
    </div>
    <!-- <b-modal id="popupModal" v-model="store.modalOpen">
      <div>
        {{ store.starWarsPerson.name }}
      </div>
    </b-modal> -->
    <PopupModal
      style="z-index: 3"
      v-model="store.modalOpen"
      :close="store.closeVehicleModal"
    >
      <div class="modal">
        <p>Name: {{ store.starWarsVehicle.name }}</p>
        <p>Model: {{ store.starWarsVehicle.model }}</p>
        <p>Manufacturer: {{ store.starWarsVehicle.manufacturer }}</p>
        <p>Length {{ store.starWarsVehicle.length }}</p>
        <p>Cost{{ store.starWarsVehicle.cost_in_credits }}</p>
        <button @click="store.closeVehicleModal">close</button>
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

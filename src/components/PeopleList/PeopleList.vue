<script setup lang="ts">
import { getAllPeople } from "@/services/DataService";
import { onMounted, reactive } from "vue";
import type StarWarsPeople from "./StarWarsPeople";

const store = reactive({
  dataLoaded: false,
  isListView: true,
  isGridView: false,
  columnElements: document.querySelectorAll<HTMLElement>(".column"),
  swPeople: [] as StarWarsPeople[],
  filteredSwPeople: [] as StarWarsPeople[],
  modalOpen: false,
  searchTerm: "",
  starWarsPerson: {} as StarWarsPeople,
  //

  updatePeopleList(list: StarWarsPeople[]) {
    this.swPeople = list;
    this.filteredSwPeople = list;
    this.dataLoaded = true;
  },
  filterPeopleByName(searchTerm: string) {
    this.searchTerm = searchTerm;
    this.filteredSwPeople = this.swPeople.filter((el) =>
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
  openPeopleModal(starWarsPerson: StarWarsPeople) {
    if (this.modalOpen == false) {
      this.modalOpen = true;
      store.starWarsPerson = starWarsPerson;
    }
  },
  closePeopleModal() {
    if (this.modalOpen == true) {
      this.modalOpen = false;
    }
  },
});

// const store = ref({ dataLoaded: false, swPeople: [] as StarWarsPeople[] });

onMounted(async () => {
  const people = await getAllPeople();
  store.updatePeopleList(people.results as StarWarsPeople[]);
});
</script>

<template>
  <ul :v-if="store.dataLoaded">
    <div @click="store.toggleListView()">Toggle List view</div>
    <div @click="store.toggleGridView()">Toggle Grid view</div>
    <InputText
      :oninput="store.filterPeopleByName(store.searchTerm)"
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
          v-for="(sw, index) in store.filteredSwPeople"
          :key="sw.name"
        >
          <SwCard @click="store.openPeopleModal(sw)">
            <template #title> Person {{ index }}</template>
            <template #content>
              <div>{{ sw.name }}</div>
              <div>{{ sw.height }} cm</div>
            </template>
          </SwCard>
        </div>
      </ScrollPanel>
    </div>
    <PopupModal
      style="z-index: 3"
      v-model="store.modalOpen"
      :close="store.closePeopleModal"
    >
      <div class="modal">
        <p>Name: {{ store.starWarsPerson.name }}</p>
        <p>Gender: {{ store.starWarsPerson.gender }}</p>
        <p>Height: {{ store.starWarsPerson.height }}</p>
        <p>Mass: {{ store.starWarsPerson.mass }}</p>
        <p>Birth_year: {{ store.starWarsPerson.birth_year }}</p>
        <button @click="store.closePeopleModal">close</button>
      </div>
    </PopupModal>
  </ul>
</template>

<style scoped lang="scss">
.modal {
  width: 100%;
  height: 100%;
  padding: 30px;
  box-sizing: border-box;
  background-color: #fff;
  font-size: 20px;
  text-align: center;
  z-index: 3;
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

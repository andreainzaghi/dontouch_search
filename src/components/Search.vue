<template>
  <div class="flex_cards">
    <div class="flex_cards_1">
      <div class="navigation-buttons">
        <div class="class_navbar_conteiner">
          <img src="../assets/img/logo.png" alt="" />
          <div style="display: flex; align-items: center" class="btn_btn_btn">
            <button @click="goBack" :disabled="isBackDisabled">
              <svg
                width="30px"
                height="30px"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M6 12H18M6 12L11 7M6 12L11 17"
                  stroke="#000000"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </button>
            <p style="padding: 0 1rem">
              Page {{ currentPage }} of {{ Math.ceil(totalImages / 6) }}
            </p>
            <button @click="goForward" :disabled="isForwardDisabled">
              <svg
                width="30px"
                height="30px"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M6 12H18M18 12L13 7M18 12L13 17"
                  stroke="#000000"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </button>
          </div>
          <p class="p_p">|||</p>
        </div>
      </div>
    </div>
    <div class="flex_card_i">
      <div class="search-container">
        <!-- Search Box -->
        <div class="search-box">
          <input
            class="search-input"
            v-model="searchQuery"
            placeholder="Search..."
          />
          <!-- <div>
            <select v-model="searchMethod">
              <option value="default">Ricerca standard</option>
              <option value="weighted">Ricerca ponderata</option>
              <option value="fuzzy">Ricerca fuzzy</option>
            </select>
          </div> -->
          <div class="input_btn_search">
            <!-- //scrivi una select option con 5 elementi -->
            <!-- <button class="search-btn" @click="search">...GDGD</button> -->

            <button @click="showFilterDropdown = !showFilterDropdown">
              FILTERS
            </button>
            <button class="search-btn" @click="startSpeechRecognition">
              <svg
                width="24px"
                height="24px"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M19 10V12C19 15.866 15.866 19 12 19M5 10V12C5 15.866 8.13401 19 12 19M12 19V22M8 22H16M12 15C10.3431 15 9 13.6569 9 12V5C9 3.34315 10.3431 2 12 2C13.6569 2 15 3.34315 15 5V12C15 13.6569 13.6569 15 12 15Z"
                  stroke="#000000"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </button>
          </div>
        </div>

        <!-- Filters Dropdown -->
        <div class="filters-dropdown" v-show="showFilterDropdown">
          <div class="slide_show_on_off_filters">
            <!-- Category Filter -->
            <div class="filter-category">
              <button
                @click="selectedCategory = ''"
                style="background-color: rgb(255, 124, 31)"
              >
                All Categories
              </button>
              <button
                v-for="category in uniqueCategories"
                :key="category"
                @click="selectedCategory = category"
                :class="{ active: selectedCategory === category }"
              >
                {{ category }}
              </button>
            </div>

            <!-- Status Filter -->
            <div class="filter-status">
              <button
                @click="selectedStatus = ''"
                style="background-color: rgb(255, 249, 62)"
              >
                All Statuses
              </button>
              <button
                v-for="status in uniqueStatuses"
                :key="status"
                @click="selectedStatus = status"
                :class="{ active: selectedStatus === status }"
              >
                {{ status }}
              </button>
            </div>

            <!-- Species Filter -->
            <div class="filter-species">
              <button
                @click="selectedSpecies = ''"
                style="background-color: rgb(127, 234, 33)"
              >
                All Species
              </button>
              <button
                v-for="species in uniqueSpecies"
                :key="species"
                @click="selectedSpecies = species"
                :class="{ active: selectedSpecies === species }"
              >
                {{ species }}
              </button>
            </div>

            <!-- Advanced Sorting -->
            <div class="sort-container">
              <select v-model="sortOption">
                <option value="">Sort by...</option>
                <option value="datePublished">Publication Date</option>
                <option value="views">Views</option>
                <option value="likes">Likes</option>
                <option value="comments">Comments</option>
              </select>
            </div>

            <!-- Date Range Selector -->
            <div class="date-range">
              <input
                type="date"
                v-model="startDate"
                :min="minDate"
                :max="endDate"
              />
              <input
                type="date"
                v-model="endDate"
                :min="startDate"
                :max="maxDate"
              />
            </div>
          </div>
        </div>
      </div>
      <!-- Cards Display -->
      <div class="card_cotainer_top">
        <transition-group name="shuffle" tag="div" class="cards-container">
          <div v-for="item in paginatedData" :key="item.id" class="card">
            <img :src="getImagePath(item.img)" class="card-image" />
            <div style="padding: 0.4rem 0 0 0.6rem">
              <h2 class="card-title">{{ item.title }}</h2>
              <b style="font-size: 12px">{{ item.category }}</b>
              <div
                style="
                  padding: 0px 12px;
                  background-color: rgb(209, 241, 255);
                  border-radius: 98px;
                  width: 80px;
                  border: 1px solid rgb(158, 158, 158);
                "
              >
                {{ item.status }}
              </div>
              <p class="card-description">{{ item.description }}</p>

              <!-- Display statistics related to sorting -->
              <div class="stats">
                <p class="date-published">
                  <i class="fas fa-calendar-alt"></i> {{ item.datePublished }}
                </p>
                <p class="views">
                  <i class="fas fa-eye"></i> {{ item.views }} views
                </p>
                <p class="likes">
                  <i class="fas fa-thumbs-up"></i> {{ item.likes }} likes
                </p>
                <p class="comments">
                  <i class="fas fa-comment"></i> {{ item.comments }} comments
                </p>
              </div>
            </div>
          </div>
        </transition-group>
      </div>
    </div>
  </div>
</template>

    
    <script lang="ts">
import { ref, computed, onMounted, watch } from "vue";
// import jsonData from "../assets/json/data.json";

/* eslint-disable no-unused-vars */
declare global {
  interface Window {
    SpeechRecognition: any;
    webkitSpeechRecognition: any;
  }
}
/* eslint-enable no-unused-vars */
interface DataItem {
  category: string;
  comments: number;
  datePublished: string;
  description: string;
  id: number;
  img: string;
  likes: number;
  species: string;
  status: string;
  title: string;
  views: number;
}

type SortKeys = "views" | "likes" | "comments" | "datePublished";

function isSortKey(key: string): key is SortKeys {
  return ["views", "likes", "comments", "datePublished"].includes(key);
}

export default {
  name: "SearchComponent",
  setup() {
    const searchQuery = ref("");
    const selectedCategory = ref("");
    const sortOption = ref<SortKeys>("views");
    const selectedStatus = ref("");
    const selectedSpecies = ref("");
    const data = ref<DataItem[]>([]);
    const currentPage = ref(1);
    const itemsPerPage = ref(6);
    const startDate = ref("2022-01-01");
    const endDate = ref("2023-12-31");
    const showFilterDropdown = ref(false);
    const searchMethod = ref("default");

    // Fetch data from backend when component is mounted
    const fetchData = async () => {
      try {
        const response = await fetch(
          `http://127.0.0.1:5000/data?page=${currentPage.value}&items_per_page=${itemsPerPage.value}&search_query=${searchQuery.value}&selected_category=${selectedCategory.value}&sort_option=${sortOption.value}`
        );

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const jsonData = await response.json();
        data.value = jsonData;
      } catch (error) {
        console.error("There was a problem with the fetch operation:", error);
      }
    };

    // Watchers to update data when a reactive property changes
    watch(
      [
        currentPage,
        searchQuery,
        selectedCategory,
        selectedStatus,
        selectedSpecies,
        sortOption,
        startDate,
        endDate,
        searchMethod,
      ],
      fetchData
    );

    // Ensure fetchData is called when the component is mounted
    onMounted(fetchData);

    const goBack = () => {
      if (currentPage.value > 1) {
        currentPage.value -= 1;
      }
    };

    const goForward = () => {
      if (currentPage.value < totalPages.value) {
        currentPage.value += 1;
      }
    };
    const standardSearch = () => {
      const results = data.value.filter(
        (item) =>
          item.title.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
          item.description
            .toLowerCase()
            .includes(searchQuery.value.toLowerCase())
      );
      console.log("Standard Search Results:", results);
      return results;
    };

    const weightedSearch = () => {
      const filteredResults = data.value.filter((item) =>
        item.title.toLowerCase().includes(searchQuery.value.toLowerCase())
          ? true
          : item.description
              .toLowerCase()
              .includes(searchQuery.value.toLowerCase())
          ? true
          : false
      );
      const sortedResults = filteredResults.sort((a, b) => {
        const aMatch = a.title
          .toLowerCase()
          .includes(searchQuery.value.toLowerCase())
          ? 1
          : 0;
        const bMatch = b.title
          .toLowerCase()
          .includes(searchQuery.value.toLowerCase())
          ? 1
          : 0;
        return bMatch - aMatch;
      });
      console.log("Weighted Search Filtered Results:", filteredResults);
      console.log("Weighted Search Sorted Results:", sortedResults);
      return sortedResults;
    };

    const fuzzySearch = () => {
      const results = data.value.filter(
        (item) =>
          item.title.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
          item.description
            .toLowerCase()
            .includes(searchQuery.value.toLowerCase())
      );
      console.log(
        "Fuzzy Search Results (currently same as standard):",
        results
      );
      return results;
    };

    const search = () => {
      console.log("Search method selected:", searchMethod.value);
      switch (searchMethod.value) {
        case "default":
          return standardSearch();
        case "weighted":
          return weightedSearch();
        case "fuzzy":
          return fuzzySearch();
        default:
          return standardSearch();
      }
    };

    const minDate = computed(() => {
      return data.value.reduce((acc, item) => {
        return item.datePublished < acc ? item.datePublished : acc;
      }, "9999-12-31");
    });

    const maxDate = computed(() => {
      return data.value.reduce((acc, item) => {
        return item.datePublished > acc ? item.datePublished : acc;
      }, "0000-01-01");
    });

    const uniqueStatuses = computed(() => {
      return [...new Set(data.value.map((item) => item.status))];
    });

    const uniqueSpecies = computed(() => {
      return [...new Set(data.value.map((item) => item.species))];
    });
    const startSpeechRecognition = () => {
      let SpeechRecognition =
        window.SpeechRecognition || window.webkitSpeechRecognition;
      if (!SpeechRecognition) {
        console.error("SpeechRecognition API not supported in this browser.");
        return;
      }

      const recognition = new SpeechRecognition();
      recognition.lang = "it-IT";

      recognition.onresult = (event: any) => {
        searchQuery.value = event.results[0][0].transcript;
      };

      recognition.start();
    };

    const uniqueCategories = computed(() => {
      return [...new Set(data.value.map((item) => item.category))];
    });
    const getImagePath = (imageName: any) => {
      return require(`@/assets/img/${imageName}`);
    };
    const sortedAndFilteredData = computed(() => {
      let result = data.value.filter((item) => {
        const matchesCategory =
          !selectedCategory.value || item.category === selectedCategory.value;
        const matchesStatus =
          !selectedStatus.value || item.status === selectedStatus.value;
        const matchesSpecies =
          !selectedSpecies.value || item.species === selectedSpecies.value;
        const matchesQuery =
          item.title.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
          item.description
            .toLowerCase()
            .includes(searchQuery.value.toLowerCase());

        return (
          matchesCategory && matchesQuery && matchesStatus && matchesSpecies
        );
      });

      if (sortOption.value && isSortKey(sortOption.value)) {
        result.sort(
          (a, b) =>
            ((b[sortOption.value] as number) || 0) -
            ((a[sortOption.value] as number) || 0)
        );
      }

      return result.filter((item) => {
        const itemDate = new Date(item.datePublished);
        return (
          itemDate >= new Date(startDate.value) &&
          itemDate <= new Date(endDate.value)
        );
      });
    });
    const totalImages = computed(() => {
      return data.value.length;
    });
    const totalPages = computed(() => {
      return Math.ceil(sortedAndFilteredData.value.length / itemsPerPage.value);
    });

    const paginatedData = computed(() => {
      const start = (currentPage.value - 1) * itemsPerPage.value;
      const end = start + itemsPerPage.value;
      return sortedAndFilteredData.value.slice(start, end);
    });

    const isBackDisabled = computed(() => currentPage.value === 1);
    const isForwardDisabled = computed(
      () => currentPage.value === totalPages.value
    );

    return {
      searchQuery,
      sortedAndFilteredData,
      selectedCategory,
      uniqueCategories,
      sortOption,
      startSpeechRecognition,
      startDate,
      endDate,
      minDate,
      maxDate,
      totalImages,
      getImagePath,
      selectedStatus,
      uniqueStatuses,
      selectedSpecies,
      uniqueSpecies,
      currentPage,
      totalPages,
      paginatedData,
      goBack,
      goForward,
      isBackDisabled,
      isForwardDisabled,
      searchMethod,
      search,
      showFilterDropdown,
    };
  },
};
</script>
    
    <style scoped>
.card {
  margin-bottom: 15px;
  border: 1px solid #ddd;
  padding: 1px;
  border-radius: 5px;
  background-color: #f9f9f9;
  transition: background-color 0.3s ease;
}
.card:hover {
  background-color: #e9e9e9;
}
.stats {
  margin-top: 8px;
  font-size: 0.85em;
  color: #555;
}
.input_btn_search {
  display: flex;
}
.p_p {
  transform: rotate(90deg);
  transform: scale(1.1);
}
.input_btn_search button:nth-child(2) {
  border-left: 1px solid grey;
  border-right: 1px solid grey;
  height: 100%;
  border-top-right-radius: 350px;
  border-bottom-right-radius: 350px;
  color: rgb(0, 0, 0);
  cursor: pointer;
  transition: background-color 0.3s;
}
.input_btn_search button:nth-child(1) {
  height: 100%;
  background-color: #fff;
  color: rgb(0, 0, 0);
  cursor: pointer;
  transition: background-color 0.3s;
}
select,
input {
  margin-bottom: 10px;
  margin-right: 10px;
  padding: 5px;
  border-radius: 3px;
}
body {
  background-color: #f4f4f4;
  margin: 0 !important;
}
.date-range {
  display: flex;
  justify-content: space-between;
  width: 100%;
  padding: 10px 0;
}

.date-range input[type="date"] {
  padding: 5px;
  border-radius: 4px;
  background-color: #f9f9f9;
}

.card {
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition: box-shadow 0.3s ease;
}

/* Flex container to hold the cards */
.cards-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  width: 80%;
  margin: 0 auto;
}

/* Individual card styles */
.card {
  width: 31%;
  margin: 1rem auto;
  box-sizing: border-box;
  overflow: hidden;
  color: #24292e;
}
.search-btn svg{
  margin: 0 0.25rem;
}

.search-btn{
  background-color: #61daff;

}
/* Hover effect inspired by GitHub's buttons */
.card:hover .card-header {
  background-color: #f6f8fa;
}

/* Card header with a darker background */
.card-header {
  background-color: #e1e4e8;
  padding: 10px;
  border-bottom: 1px solid #d1d5da;
  transition: background-color 0.3s ease;
}

.card-title {
  margin: 0;
  font-weight: bold;
}

/* For icons or thumbnails */
.card-image {
  width: 100%;
  display: block;
}

.card-body {
  padding: 10px;
}

.card-description {
  margin-top: 10px;
  font-size: 0.8em;
  color: #586069;
}

.flex_cards {
  display: flex;
  flex-direction: column;
  width: 100%;
  margin: 0 auto;
}
.flex_cards_1 {
  width: 80%;
  display: flex;
  margin: 0 auto;
}
.stats span {
  margin-right: 8px;
}
.class_navbar_conteiner button {
  display: flex !important;
}
#app
  > div
  > div.flex_cards
  > div.flex_card_i
  > div.card_cotainer_top
  > div
  > div:nth-child(3)
  > div {
  position: relative;
}

.stats p {
  padding: 0px;
  font-weight: bold;
  color: rgb(66, 66, 66);
  margin: 1px 0;
  font-size: 0.75rem;
}
.class_navbar_conteiner {
  align-items: center;
  justify-content: space-between;
  height: 90px;
}
/* Additional buttons, if any */
.card-btn {
  display: inline-block;
  margin-top: 10px;
  padding: 5px 15px;
  background-color: #0366d6;
  color: #fff;
  text-decoration: none;
  border-radius: 4px;
  transition: background-color 0.3s ease;
}

.card-btn:hover {
  background-color: #005cc5;
}

/* Card footer for additional information */
.card-footer {
  background-color: #fafbfc;
  border-top: 1px solid #d1d5da;
  padding: 10px;
  font-size: 0.8em;
  color: #586069;
}

/* Helper class to visually separate the elements inside the cards */
.card-divider {
  margin: 10px 0;
  border-bottom: 1px solid #d1d5da;
}

/* Making the search bar resemble GitHub's */
input {
  border-radius: 6px;
  padding: 5px 12px;
  font-size: 14px;
  width: 100%;
  box-sizing: border-box;
}
.card_cotainer_top {
  width: 100%;
  background: rgb(236, 230, 228);
  padding-top: 50px;
  margin-top: -20px;
  background: linear-gradient(
    0deg,
    rgba(236, 230, 228, 0.10127801120448177) 0%,
    rgba(0, 215, 255, 0.3561799719887955) 250%
  );
}
input:focus {
}

button {
  vertical-align: top;
}

/* Making select dropdown resemble GitHub's dropdowns */
select {
  border: 1px solid #d1d5da;
  border-radius: 6px;
  padding: 5px;
  font-size: 14px;
  background-color: #fafbfc;
  transition: background-color 0.3s ease;
}

select:hover {
  background-color: #f6f8fa;
}
.shuffle-move {
  transition: transform 1s;
}

/* Definizione delle animazioni */
@keyframes slideIn {
  from {
    transform: translateY(-100%);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
}

@keyframes slideOut {
  from {
    transform: translateY(0);
    opacity: 1;
  }
  to {
    transform: translateY(-100%);
    opacity: 0;
  }
}

.card-enter-active,
.card-leave-active {
  transition: transform 0.5s ease-out, opacity 0.5s ease-out;
}

.card-enter, .card-leave-to /* .card-leave-active in <2.1.8 */ {
  transform: translateY(-100%);
  opacity: 0;
}
.show-dropdown {
  max-height: 500px; /* You can adjust this value based on content */
}
/* Base and Reset styles */
body {
  background-color: #f4f4f4;
  font-family: "Arial", sans-serif;
}

button,
select,
input {
  outline: none;
  border: none;
}

/* Search Container */
.search-container {
  position: relative;
  margin-bottom: 1rem;
  background-color: #ffffff;
  width: 80%;
  border-radius: 50px;
  margin: 0 auto;
}
.class_navbar_conteiner {
  display: flex !important;
  align-items: center;
  justify-content: space-between;
  width: 99%;
}
.search-box {
  display: flex;
  gap: 0.5rem;
  border-radius: 50px;
  height: 40px;
  width:100%;
  z-index: 999995;
  position: relative;
  background: #fff;
  border: 1px solid grey;
}

.search-input {
  flex-grow: 1;
  padding: 10px 15px;
  border-radius: 50px;
  border: none;

  height: 100%;
  width: 100%;
}

/* .search-input:focus {
  border-color: #0366d6;
} */
.flex_card_i {
  width: 100%;

  margin: 0 auto;
  height: 100%;
}
.filters-btn {
  padding: 10px 15px;
  border-radius: 25px;
  background-color: #0366d6;
  color: white;
  cursor: pointer;
  transition: background-color 0.3s;
}

.filters-btn:hover {
  background-color: #005cc5;
}

.filters-dropdown {
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  background: rgb(255, 255, 255);
  z-index: 99999;
  border-radius: 10px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  padding: 1rem;
  overflow: hidden;
  transition: max-height 0.5s ease-in-out;
}

/* Stile base per la dropdown */
.filters-dropdown {
  background-color: rgba(
    0,
    0,
    0,
    0.809
  ); /* Colore di sfondo simile a quello di GitHub */
  border: 2px solid #ffffff; /* Colore del bordo */
  border-radius: 5px; /* Angoli arrotondati */
  box-shadow: 0 1px 5px rgba(0, 0, 0, 0.15); /* Leggera ombra */
  padding: 15px;
  width: auto;
  margin: 10px 0;
  position: absolute;
  top: 20px;
  padding-top: 60px;
}

/* Stile per i bottoni */
.filters-dropdown button {
  background-color: #f0f0f0;
  border: 1px solid #979797;
  border-radius: 20px;
  color: #24292e; /* Colore testo */
  cursor: pointer;
  margin: 5px;
  padding: 8px 15px;
  transition: background-color 0.2s;
}

.filters-dropdown button:hover {
  background-color: rgb(209, 241, 255);
}

/* Stile per bottoni attivi */
.filters-dropdown button.active {
  background-color: #0366d6;
  color: #ffffff;
}

/* Stile per contenitori dei filtri */
.filters-dropdown .filter-category,
.filters-dropdown .filter-status,
.filters-dropdown .filter-species {
  margin-bottom: 15px;
}
.btn_btn_btn button {
  border-radius: 80px;
  border: 1px solid lightgrey;
}
/* Stile per il selettore di ordinamento e il selettore della data */
.filters-dropdown .sort-container,
.filters-dropdown .date-range {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 15px;
}
.filters-dropdown .sort-container[data-v-7cb41050],
.filters-dropdown .date-range[data-v-7cb41050] {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0px !important;
}

.filters-dropdown select[data-v-7cb41050],
.filters-dropdown input[type="date"][data-v-7cb41050] {
  margin: 0 !important;
}
.filters-dropdown select,
.filters-dropdown input[type="date"] {
  background-color: #fafbfc;
  border: 1px solid #e1e4e8;
  border-radius: 5px;
  color: #24292e;
  padding: 8px;
  width: 100%; /* Per fare in modo che si adattino affianco */
  transition: border-color 0.2s;
}
#app
  > div
  > div.flex_cards
  > div.flex_card_i
  > div.search-container
  > div.filters-dropdown
  > div
  > div.date-range
  > input[type="date"]:nth-child(2) {
  margin: 0 0 0 10px !important;
}
.filters-dropdown select:hover,
.filters-dropdown input[type="date"]:hover {
  border-color: #0366d6;
}
#app > div > div > div.navigation-buttons > div {
  display: flex !important;
  align-items: center;
  /* justify-content: space-between; */
}
#app > div > div > div.flex_cards_1 > div {
  width: 100%;
}

.stats {
  border-top: 1px solid lightgrey;
  padding-top: 0.3rem;
}
@media screen and (max-width: 768px) {
  .cards-container[data-v-7cb41050] {
    display: flex;
    flex-wrap: wrap;
    flex-direction: column;
    justify-content: space-between;
    width: 90%;
    margin: 0 auto;
  }

  .card {
    width: 100%;
  }

  .filters-dropdown {
    border: 1px solid #e1e4e8; /* Colore del bordo */
    border-radius: 5px; /* Angoli arrotondati */
    box-shadow: 0 1px 5px rgba(0, 0, 0, 0.15); /* Leggera ombra */
    padding: 15px;
    margin: 10px 0;
    position: absolute;
    top: 20px;
    padding-top: 60px;
  }
  /* Adatta il contenitore della navbar */
  .class_navbar_conteiner {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 10px; /* Aggiunge un po' di spazio attorno */
  }

  /* Stilizzazione della prima sezione con i tre elementi */
  .class_navbar_conteiner > div:first-child {
    display: flex;
    width: 100%;
    justify-content: space-between; /* Distribuisce gli elementi uniformemente */
    align-items: center; /* Allinea gli elementi verticalmente al centro */
    margin-bottom: 10px; /* Spazio tra la prima e la seconda sezione */
  }

  /* Posiziona l'icona della ricerca di FontAwesome */
  .class_navbar_conteiner div:first-child:before {
    content: "\f002"; /* Icona di ricerca di FontAwesome */
    font-family: FontAwesome;
    font-size: 24px; /* Aumenta o riduci per adattare le dimensioni dell'icona */
  }

  /* Stile per l'immagine del logo */
  .class_navbar_conteiner > div:first-child > img {
    width: 50px; /* Modifica per adattare le dimensioni del logo */
    height: auto;
  }

  /* Stile per le tre stangatte (|||) */
  .class_navbar_conteiner > div:first-child > p {
    font-size: 24px; /* Modifica per adattare le dimensioni delle stangatte */
    margin: 0; /* Rimuove margini aggiuntivi */
  }
  .p_p {
    display: none;
  }
  /* Stilizzazione della seconda sezione con il paginator */
  .class_navbar_conteiner > div:nth-child(2) {
    display: flex;
    align-items: center; /* Allinea gli elementi verticalmente al centro */
  }

  /* Stile per il testo del paginator (page 1 of 2) */
  .class_navbar_conteiner div:nth-child(2) p {
    margin: 0 10px; /* Aggiunge spazio ai lati del testo */
    font-size: 16px; /* Modifica per adattare le dimensioni del testo */
  }
}
</style>
    
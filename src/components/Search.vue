<template>
  <div class="flex_cards">
    
    <!-- Back and Forward Buttons -->
    <div>
      <button @click="goBack" :disabled="isBackDisabled">Back</button>
      <button @click="goForward" :disabled="isForwardDisabled">Forward</button>
    </div>
    <div style="display: flex">
      <!-- Text Search -->
      <input v-model="searchQuery" placeholder="Search..." />
      <button @click="startSpeechRecognition">Voice Search</button>
    </div>

    <div class="slide_show_on_off_filters">
      <!-- Category Filter -->
      <div>
        <button @click="selectedCategory = ''">All Categories</button>
        <button
          v-for="category in uniqueCategories"
          :key="category"
          @click="selectedCategory = category"
          :class="{ 'active': selectedCategory === category }"
        >
          {{ category }}
        </button>
      </div>

      <!-- Status Filter -->
      <div>
        <button @click="selectedStatus = ''">All Statuses</button>
        <button
          v-for="status in uniqueStatuses"
          :key="status"
          @click="selectedStatus = status"
          :class="{ 'active': selectedStatus === status }"
        >
          {{ status }}
        </button>
      </div>

      <!-- Species Filter -->
      <div>
        <button @click="selectedSpecies = ''">All Species</button>
        <button
          v-for="species in uniqueSpecies"
          :key="species"
          @click="selectedSpecies = species"
          :class="{ 'active': selectedSpecies === species }"
        >
          {{ species }}
        </button>
      </div>

      <!-- Advanced Sorting -->
      <select v-model="sortOption">
        <option value="">Sort by...</option>
        <option value="datePublished">Publication Date</option>
        <option value="views">Views</option>
        <option value="likes">Likes</option>
        <option value="comments">Comments</option>
      </select>

      <!-- Date Range Selector with two date inputs -->
      <div class="date-range">
        <input type="date" v-model="startDate" :min="minDate" :max="endDate" />
        <input type="date" v-model="endDate" :min="startDate" :max="maxDate" />
      </div>
    </div>

    <!-- Cards Display -->
    <transition-group name="shuffle" tag="div" class="cards-container">
      <div v-for="item in paginatedData" :key="item.id" class="card">
        <img :src="getImagePath(item.img)" class="card-image" />
        <h2>{{ item.title }}</h2>
        <p>{{ item.description }}</p>
        <!-- Display statistics related to sorting -->
        <div class="stats">
          <span>{{ item.datePublished }}</span>
          <span>{{ item.views }} views</span>
          <span>{{ item.likes }} likes</span>
          <span>{{ item.comments }} comments</span>
        </div>
      </div>
    </transition-group>

  </div>
</template>

    
    <script lang="ts">
import { ref, computed } from "vue";
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

    // Fetch data from backend when component is mounted
    const totalPages = ref(0);

const fetchData = async (page: number) => {
    try {
        const response = await fetch(`http://127.0.0.1:5000/data?page=${page}&items_per_page=${itemsPerPage.value}&search_query=${searchQuery.value}&selected_category=${selectedCategory.value}&sort_option=${sortOption.value}`);
        
        if (!response.ok) {
            throw new Error("Network response was not ok");
        }
        
        const jsonData = await response.json();
        data.value = jsonData.data;
        totalPages.value = jsonData.total_pages;
    } catch (error) {
        console.error("There was a problem with the fetch operation:", error);
    }
};


fetchData(currentPage.value);

const goBack = () => {
    if (currentPage.value > 1) {
        currentPage.value -= 1;
        fetchData(currentPage.value);
    }
};

const goForward = () => {
    if (currentPage.value < totalPages.value) {
        currentPage.value += 1;
        fetchData(currentPage.value);
    }
};


// Use this for displaying your data
const paginatedData = computed(() => {
    return data.value;
});


// Since your server-side script is sending only 6 items per page, we just need to check if we received 6 items to decide if there's a "next page"
const isForwardDisabled = computed(() => paginatedData.value.length < itemsPerPage.value);

  
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
    }
    const sortedAndFilteredData = computed(() => {
      let result = data.value.filter((item) => {
        const matchesCategory = !selectedCategory.value || item.category === selectedCategory.value;
        const matchesStatus = !selectedStatus.value || item.status === selectedStatus.value;
        const matchesSpecies = !selectedSpecies.value || item.species === selectedSpecies.value;
        const matchesQuery = item.title.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
          item.description.toLowerCase().includes(searchQuery.value.toLowerCase());

        return matchesCategory && matchesQuery && matchesStatus && matchesSpecies;
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

  


    const isBackDisabled = computed(() => currentPage.value === 1);

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
      
      

    };
  },
};
</script>
    
    <style scoped>
.card {
  margin-bottom: 15px;
  border: 1px solid #ddd;
  padding: 10px;
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
select,
input {
  margin-bottom: 10px;
  margin-right: 10px;
  padding: 5px;
  border-radius: 3px;
  border: 1px solid #ccc;
}
body {
  background-color: #f4f4f4;
}
.date-range {
  display: flex;
  justify-content: space-between;
  width: 100%;
  padding: 10px 0;
}

.date-range input[type="date"] {
  padding: 5px;
  border: 1px solid #ccc;
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
  gap: 3%;
}

/* Individual card styles */
.card {
  width: 31%;
  margin: 1rem auto;
  box-sizing: border-box;
  overflow: hidden;
  color: #24292e;
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
  font-size: 0.9em;
  color: #586069;
}

.flex_cards {
  display: flex;
  flex-direction: column;
  width: 90%;
  margin: 0 auto;
}

.stats span {
  margin-right: 8px;
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
  border: 1px solid #d1d5da;
  border-radius: 6px;
  padding: 5px 12px;
  font-size: 14px;
  width: 100%;
  box-sizing: border-box;
}

input:focus {
  border-color: #0366d6;
  box-shadow: 0 0 5px rgba(3, 102, 214, 0.3);
  outline: none;
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
</style>
    
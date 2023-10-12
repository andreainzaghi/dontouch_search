<template>
  

<div class="flex_cards">
   <div style="display:flex;">
    <input v-model="searchQuery" placeholder="Search..." />
    <button @click="startSpeechRecognition">Voice Search</button>
   </div>
          <!-- Category Filter -->
          <select v-model="selectedCategory">
        <option value="">All Categories</option>
        <option v-for="category in uniqueCategories" :key="category">{{ category }}</option>
      </select>
  
      <!-- Text Search -->
      
  
      <!-- Advanced Sorting -->
      <select v-model="sortOption">
        <option value="">Sort by...</option>
        <option value="datePublished">Publication Date</option>
        <option value="views">Views</option>
        <option value="likes">Likes</option>
        <option value="comments">Comments</option>
      </select>

        <!-- Selettore di intervallo di date con due input date -->
        <div class="date-range">
            <input type="date" v-model="startDate" :min="minDate" :max="endDate">
<input type="date" v-model="endDate" :min="startDate" :max="maxDate">

</div>

  
      <transition-group name="shuffle" tag="div" class="cards-container">
        <div v-for="item in sortedAndFilteredData" :key="item.id" class="card">
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
  import { ref, computed } from 'vue';
  import jsonData from '../assets/json/data.json';

  
  /* eslint-disable no-unused-vars */
declare global {
  interface Window {
    SpeechRecognition: any;
    webkitSpeechRecognition: any;
  }
}
/* eslint-enable no-unused-vars */


  type SortKeys = 'views' | 'likes' | 'comments' | 'datePublished';
 
  function isSortKey(key: string): key is SortKeys {
    return ['views', 'likes', 'comments', 'datePublished'].includes(key);
  }
  
  export default {
    name: 'SearchComponent',
    setup() {
      const searchQuery = ref('');
      const selectedCategory = ref('');
      const sortOption = ref<SortKeys>('views');
        const data = ref(jsonData);

      
      const startDate = ref('2022-01-01');  // puoi impostare una data di default
    const endDate = ref('2023-12-31');    // puoi impostare una data di default

    const minDate = computed(() => {
      return data.value.reduce((acc, item) => {
        return item.datePublished < acc ? item.datePublished : acc;
      }, '9999-12-31');
    });

    const maxDate = computed(() => {
      return data.value.reduce((acc, item) => {
        return item.datePublished > acc ? item.datePublished : acc;
      }, '0000-01-01');
    });
      const startSpeechRecognition = () => {
        let SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        if (!SpeechRecognition) {
          console.error("SpeechRecognition API not supported in this browser.");
          return;
        }
  
        const recognition = new SpeechRecognition();
        recognition.lang = 'it-IT';
  
        recognition.onresult = (event: any) => {
  searchQuery.value = event.results[0][0].transcript;
};

  
        recognition.start();
      };
      
  
      const uniqueCategories = computed(() => {
      return [...new Set(data.value.map(item => item.category))];
    });

    const sortedAndFilteredData = computed(() => {
      let result = data.value.filter(item => {
        const matchesCategory = !selectedCategory.value || item.category === selectedCategory.value;
        const matchesQuery = item.title.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
                             item.description.toLowerCase().includes(searchQuery.value.toLowerCase());
        return matchesCategory && matchesQuery;
      });

      if (sortOption.value && isSortKey(sortOption.value)) {
          result.sort((a, b) => ((b[sortOption.value] as number) || 0) - ((a[sortOption.value] as number) || 0));
      }

      return result.filter(item => {
        const itemDate = new Date(item.datePublished);
        return itemDate >= new Date(startDate.value) && itemDate <= new Date(endDate.value);
      });
  
    });
  
    return {
  searchQuery,
  sortedAndFilteredData,
  selectedCategory,
  uniqueCategories,
  sortOption,
  startSpeechRecognition,
  startDate,  // aggiunto
  endDate,    // aggiunto
  minDate,    // aggiunto
  maxDate     // aggiunto
};

    }
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
  select, input {
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

.flex_cards{
    display:flex;
    flex-direction: column;
    width:30%;
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

.card-enter-active, .card-leave-active {
  transition: transform 0.5s ease-out, opacity 0.5s ease-out;
}

.card-enter, .card-leave-to /* .card-leave-active in <2.1.8 */ {
  transform: translateY(-100%);
  opacity: 0;
}

  </style>
  
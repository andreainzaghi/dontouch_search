<template>
    <div class="flex_cards_1">
      <!-- Navigation Buttons -->
      <div class="navigation-buttons">
        <div class="class_navbar_conteiner">
          <!-- logo// -->
          <img src="../assets/img/logo.png" alt="">
          <div style="display:flex;align-items: center;" class="btn_btn_btn">
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
            <p style="padding:0 1rem;">
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
  </template>
  
  <script lang="ts">
  import { ref, computed } from "vue";
  
  export default {
    name: "NavbarDontouch",
    setup() {
      const currentPage = ref(1);
      const totalImages = ref(0); // You might want to update this from parent or API
  
      const isBackDisabled = computed(() => currentPage.value === 1);
      const isForwardDisabled = computed(
        () => currentPage.value === Math.ceil(totalImages.value / 6)
      );
  
      const goBack = () => {
        if (currentPage.value > 1) {
          currentPage.value -= 1;
        }
      };
  
      const goForward = () => {
        if (currentPage.value < Math.ceil(totalImages.value / 6)) {
          currentPage.value += 1;
        }
      };
  
      return {
        currentPage,
        totalImages,
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
  padding: 1px;
  border-radius: 5px;
  background-color: #f9f9f9;
  transition: background-color 0.3s ease;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  width: 31%;
  margin: 1rem auto;
  box-sizing: border-box;
  overflow: hidden;
  color: #24292e;
}

.card:hover {
  background-color: #e9e9e9;
}

.card:hover .card-header {
  background-color: #f6f8fa;
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

.date-range {
  display: flex;
  justify-content: space-between;
  width: 100%;
  padding: 10px 0;
}

.cards-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  width: 80%;
  margin: 0 auto;
}

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
  display: flex !important;
  align-items: center;
  justify-content: space-between;
  width: 99%;
}

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

.card-footer {
  background-color: #fafbfc;
  border-top: 1px solid #d1d5da;
  padding: 10px;
  font-size: 0.8em;
  color: #586069;
}

.card-divider {
  margin: 10px 0;
  border-bottom: 1px solid #d1d5da;
}

.card-enter-active, .card-leave-active {
  transition: transform 0.5s ease-out, opacity 0.5s ease-out;
}

.card-enter, .card-leave-to {
  transform: translateY(-100%);
  opacity: 0;
}

.show-dropdown {
  max-height: 500px;
}

body {
  background-color: #f4f4f4;
  margin: 0 !important;
  background-color: #f4f4f4;
  font-family: "Arial", sans-serif;
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

.btn_btn_btn button {
  border-radius: 80px;
  border: 1px solid lightgrey;
}

.search-container {
  position: relative;
  margin-bottom: 1rem;
  background-color: #ffffff;
  width: 80%;
  border-radius: 50px;
  margin: 0 auto;
}

.search-box {
  display: flex;
  justify-content: space-between;
  width: 100%;
}

.search-box-input {
  width: 100%;
  padding: 15px 20px;
  border: none;
  border-radius: 50px;
  outline: none;
}

.search-box-btn {
  padding: 15px 15px;
  background-color: #0366d6;
  border: none;
  color: #ffffff;
  border-top-right-radius: 50px;
  border-bottom-right-radius: 50px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.search-box-btn:hover {
  background-color: #005cc5;
}

.dropdown-content {
  display: none;
  position: absolute;
  top: 60px;
  left: 0;
  z-index: 2;
  width: 100%;
  background-color: #ffffff;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.dropdown-content.show {
  display: block;
}

.select_container select {
  background-color: #0366d6;
  color: white;
  width: 100%;
  height: 2rem;
  border: none;
  padding: 0.5rem;
  border-radius: 8px;
  outline: none;
}

.filters-btn-container {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 0;
  width: 100%;
}

input[type="date"] {
  border: none;
  padding: 10px;
  border-radius: 4px;
  outline: none;
}

select, input {
  border: none;
  padding: 10px;
  border-radius: 4px;
  outline: none;
}

.filters-btn-container .btn_btn_btn {
  flex-basis: 70%;
  display: flex;
  justify-content: space-between;
}

.dropdown {
  position: relative;
}

.dropdown-btn {
  padding: 10px 15px;
  background-color: #0366d6;
  color: white;
  border: none;
  cursor: pointer;
  transition: background-color 0.3s;
}

.dropdown-btn:hover {
  background-color: #005cc5;
}

.date-range input[type="date"] {
  margin-right: 10px;
}

.date-range input[type="date"]:last-child {
  margin-right: 0;
}

</style>
```
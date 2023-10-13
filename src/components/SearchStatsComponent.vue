<template>
    <!-- This is a dummy component. It doesn't render anything visible. -->
    <div></div>
  </template>
  
  <script lang="ts">
  import { defineComponent, ref, watch } from 'vue';
  
  export default defineComponent({
    name: 'SearchStatsComponent',
    props: {
      searchQuery: String,
      sortedAndFilteredData: Array,
      selectedCategory: String,
      uniqueCategories: Array,
      sortOption: String,
      startDate: String,
      endDate: String,
      totalImages: Number,
      selectedStatus: String,
      uniqueStatuses: Array,
      selectedSpecies: String,
      uniqueSpecies: Array,
      currentPage: Number,
      totalPages: Number,
      searchMethod: String,
      showFilterDropdown: Boolean,
      isRecording: Boolean,
    },
    setup(props) {
      // Watch for changes in the entire props object and log them.
      watch(
        () => props,
        (newVal) => {
          console.log("Data from SearchComponent:", newVal);
        },
        { deep: true }
      );
    },
  });
  </script>
  
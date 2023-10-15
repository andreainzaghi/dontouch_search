import { createStore } from 'vuex';
import { fetchData } from '../dataFetch'; // Assumendo che il percorso sia corretto

export default createStore({
  state: {
    searchQuery: "",
    selectedCategory: "",
    sortOption: "views",
    selectedStatus: "",
    selectedSpecies: "",
    currentPage: 1,
    itemsPerPage: 6,
    startDate: "2022-01-01",
    endDate: "2023-12-31",
    showFilterDropdown: false,
    searchMethod: "default",
    isRecording: false,
    showDropdown: false,
    fetchedData: [], // Per memorizzare i dati ottenuti
  },
  mutations: {
    setSearchQuery(state, value) { state.searchQuery = value; },
    setSelectedCategory(state, value) { state.selectedCategory = value; },
    setSortOption(state, value) { state.sortOption = value; },
    setSelectedStatus(state, value) { state.selectedStatus = value; },
    setSelectedSpecies(state, value) { state.selectedSpecies = value; },
    setCurrentPage(state, value) { state.currentPage = value; },
    setItemsPerPage(state, value) { state.itemsPerPage = value; },
    setStartDate(state, value) { state.startDate = value; },
    setEndDate(state, value) { state.endDate = value; },
    setShowFilterDropdown(state, value) { state.showFilterDropdown = value; },
    setSearchMethod(state, value) { state.searchMethod = value; },
    setIsRecording(state, value) { state.isRecording = value; },
    setShowDropdown(state, value) { state.showDropdown = value; },
    setFetchedData(state, data) { state.fetchedData = data; },
  },
  actions: {
    async fetchData({ commit, state }) {
      const data = await fetchData(
        state.currentPage,
        state.itemsPerPage,
        state.searchQuery,
        state.selectedCategory,
        state.sortOption
      );
      commit('setFetchedData', data);
    },
    // ... altre actions se necessario ...
  },
  getters: {
    sortedAndFilteredData: state => {
      let filteredData = state.fetchedData;

      // Filtra in base alla query di ricerca (se presente)
      if (state.searchQuery) {
        filteredData = filteredData.filter(item =>
          item.title.toLowerCase().includes(state.searchQuery.toLowerCase()) || 
          item.description.toLowerCase().includes(state.searchQuery.toLowerCase())
        );
      }

      // Filtra in base alla categoria selezionata (se presente)
      if (state.selectedCategory) {
        filteredData = filteredData.filter(item => 
          item.category === state.selectedCategory
        );
      }

      // Filtra in base allo stato selezionato (se presente)
      if (state.selectedStatus) {
        filteredData = filteredData.filter(item => 
          item.status === state.selectedStatus
        );
      }

      // Filtra in base alla specie selezionata (se presente)
      if (state.selectedSpecies) {
        filteredData = filteredData.filter(item => 
          item.species === state.selectedSpecies
        );
      }

      // Filtra in base alla data di inizio e fine
      filteredData = filteredData.filter(item => {
        const itemDate = new Date(item.datePublished);
        return (
          itemDate >= new Date(state.startDate) &&
          itemDate <= new Date(state.endDate)
        );
      });

      // Ordina i dati in base all'opzione di ordinamento
      if (state.sortOption && isSortKey(state.sortOption)) {
        filteredData.sort((a, b) => {
            const aValue = b[state.sortOption];
            const bValue = a[state.sortOption];
            return (typeof aValue === 'number' ? aValue : 0) - (typeof bValue === 'number' ? bValue : 0);
        });
    }
    

      return filteredData;
    },

    // Calcola il numero totale di pagine
    totalPages: (state, getters) => {
      return Math.ceil(getters.sortedAndFilteredData.length / state.itemsPerPage);
    },

    // Restituisce i dati paginati per la pagina corrente
    paginatedData: (state, getters) => {
      const start = (state.currentPage - 1) * state.itemsPerPage;
      const end = start + state.itemsPerPage;
      return getters.sortedAndFilteredData.slice(start, end);
    }
    }
});

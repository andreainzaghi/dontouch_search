
import { defineComponent } from 'vue'
import { ref, computed, onMounted, watch } from 'vue';
import { DataItem, SortKeys } from '../../types';  // Assicurati che il percorso sia corretto
import { data as fetchedData, fetchData } from '../../dataFetch';

/* eslint-disable no-unused-vars */
declare global {
  interface Window {
    SpeechRecognition: any;
    webkitSpeechRecognition: any;
  }
}

function isSortKey(key: string): key is SortKeys {
  return ["views", "likes", "comments", "datePublished"].includes(key);
}

export default defineComponent({
  name: "SearchComponent",
  setup() {
    const searchQuery = ref(""); // Query di ricerca inserita dall'utente
    const selectedCategory = ref(""); // Categoria selezionata per filtrare i risultati
    const sortOption = ref<SortKeys>("views"); // Opzione per ordinare i risultati
    const selectedStatus = ref(""); // Stato selezionato per filtrare i risultati
    const selectedSpecies = ref(""); // Specie selezionata per filtrare i risultati
    // const data = ref<DataItem[]>([]); // Dati recuperati dal backend
    const currentPage = ref(1); // Pagina corrente per la paginazione
    const itemsPerPage = ref(6); // Numero di elementi per pagina
    const startDate = ref("2022-01-01"); // Data di inizio per filtrare i risultati
    const endDate = ref("2023-12-31"); // Data di fine per filtrare i risultati
    const showFilterDropdown = ref(false); // Mostra o nasconde il menu a discesa dei filtri
    const searchMethod = ref("default"); // Metodo di ricerca selezionato
    const isRecording = ref(false); // Indica se la registrazione vocale è attiva

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
      () => {
        fetchData(
          currentPage.value,
          itemsPerPage.value,
          searchQuery.value,
          selectedCategory.value,
          sortOption.value
        );
      }
    );

    // Ensure fetchData is called when the component is mounted
    onMounted(() => {
      fetchData(
        currentPage.value,
        itemsPerPage.value,
        searchQuery.value,
        selectedCategory.value,
        sortOption.value
      );
    });


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

    const minDate = computed(() => {
      return fetchedData.value.reduce((acc, item) => {
        return item.datePublished < acc ? item.datePublished : acc;
      }, "9999-12-31");
    });

    const maxDate = computed(() => {
      return fetchedData.value.reduce((acc, item) => {
        return item.datePublished > acc ? item.datePublished : acc;
      }, "0000-01-01");
    });

    const uniqueStatuses = computed(() => {
      return [...new Set(fetchedData.value.map((item) => item.status))];
    });

    const uniqueSpecies = computed(() => {
      return [...new Set(fetchedData.value.map((item) => item.species))];
    });

    const startSpeechRecognition = () => {
      const SpeechRecognition =
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

      recognition.onstart = () => {
        isRecording.value = true;
      };

      recognition.onend = () => {
        isRecording.value = false;
      };

      recognition.start();
    };


    const uniqueCategories = computed(() => {
      return [...new Set(fetchedData.value.map((item) => item.category))];
    });
    const getImagePath = (imageName: any) => {
      return require(`@/assets/img/${imageName}`);
    };
    const sortedAndFilteredData = computed(() => {
      const result = fetchedData.value.filter((item) => {
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
      return fetchedData.value.length;
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
      showFilterDropdown,
      isRecording,

    };
  },
});
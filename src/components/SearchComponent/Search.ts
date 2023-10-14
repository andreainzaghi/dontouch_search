// Importa le funzionalità di Vue necessarie
import { defineComponent, ref, computed, onMounted, watch } from 'vue';

// Importa i tipi e i dati necessari
import { DataItem, SortKeys } from '../../types';
import { data as fetchedData, fetchData } from '../../dataFetch';
import Documentazione from '../Documentazione.vue';  // Assicurati che il percorso sia corretto

// Estensione delle dichiarazioni globali per supportare SpeechRecognition
declare global {
  interface Window {
    SpeechRecognition: any;
    webkitSpeechRecognition: any;
  }
}

// Funzione di utilità per verificare se una chiave è una chiave di ordinamento valida
function isSortKey(key: string): key is SortKeys {
  return ["views", "likes", "comments", "datePublished"].includes(key);
}

// Definizione del componente Vue
export default defineComponent({
  name: "SearchComponent",
  components: {
    Documentazione,  // Assicurati che il percorso sia corretto
  },

  setup() {
    // --- Stato del componente ---

    // Query di ricerca inserita dall'utente
    const searchQuery = ref("");

    // Categoria selezionata per filtrare i risultati
    const selectedCategory = ref("");

    // Opzione selezionata per ordinare i risultati
    const sortOption = ref<SortKeys>("views");

    // Stato selezionato per filtrare i risultati
    const selectedStatus = ref("");

    // Specie selezionata per filtrare i risultati
    const selectedSpecies = ref("");

    // Pagina corrente per la paginazione
    const currentPage = ref(1);

    // Numero di elementi per pagina
    const itemsPerPage = ref(6);

    // Data di inizio per filtrare i risultati
    const startDate = ref("2022-01-01");

    // Data di fine per filtrare i risultati
    const endDate = ref("2023-12-31");

    // Stato per mostrare/nascondere il menu a discesa dei filtri
    const showFilterDropdown = ref(false);

    // Metodo di ricerca selezionato
    const searchMethod = ref("default");

    // Indica se la registrazione vocale è attiva
    const isRecording = ref(false);

    const showDropdown = ref(false); // Utilizza 'ref' per le variabili reattive


    // Osserva le variazioni di determinate proprietà e aggiorna i dati di conseguenza
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

    // Assicurati che fetchData venga chiamato quando il componente viene montato
    onMounted(() => {
      fetchData(
        currentPage.value,
        itemsPerPage.value,
        searchQuery.value,
        selectedCategory.value,
        sortOption.value
      );
    });

    // --- Funzioni del componente ---

    // Naviga alla pagina precedente
    const goBack = () => {
      if (currentPage.value > 1) {
        currentPage.value -= 1;
      }
    };

    // Naviga alla pagina successiva
    const goForward = () => {
      if (currentPage.value < totalPages.value) {
        currentPage.value += 1;
      }
    };

    // Ottieni la data minima tra i dati recuperati
    const minDate = computed(() => {
      return fetchedData.value.reduce((acc, item) => {
        return item.datePublished < acc ? item.datePublished : acc;
      }, "9999-12-31");
    });

    // Ottieni la data massima tra i dati recuperati
    const maxDate = computed(() => {
      return fetchedData.value.reduce((acc, item) => {
        return item.datePublished > acc ? item.datePublished : acc;
      }, "0000-01-01");
    });

    // Ottieni un array di stati unici tra i dati recuperati
    const uniqueStatuses = computed(() => {
      return [...new Set(fetchedData.value.map((item) => item.status))];
    });

    // Ottieni un array di specie uniche tra i dati recuperati
    const uniqueSpecies = computed(() => {
      return [...new Set(fetchedData.value.map((item) => item.species))];
    });

    // Inizia la registrazione vocale e assegna il risultato alla query di ricerca
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

    // Ottieni un array di categorie uniche tra i dati recuperati
    const uniqueCategories = computed(() => {
      return [...new Set(fetchedData.value.map((item) => item.category))];
    });

    // Ottieni il percorso dell'immagine a partire dal suo nome
    const getImagePath = (imageName: any) => {
      return require(`@/assets/img/${imageName}`);
    };

    // Filtra e ordina i dati in base ai criteri selezionati
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

    // Calcola il numero totale di immagini
    const totalImages = computed(() => {
      return fetchedData.value.length;
    });

    // Calcola il numero totale di pagine
    const totalPages = computed(() => {
      return Math.ceil(sortedAndFilteredData.value.length / itemsPerPage.value);
    });

    // Ottieni i dati paginati in base alla pagina corrente
    const paginatedData = computed(() => {
      const start = (currentPage.value - 1) * itemsPerPage.value;
      const end = start + itemsPerPage.value;
      return sortedAndFilteredData.value.slice(start, end);
    });
    
    const closeDropdown = () => {
      showDropdown.value = false;
      console.log(showDropdown.value)
  };
  
    
    // Calcola se il pulsante "Indietro" dovrebbe essere disabilitato
    const isBackDisabled = computed(() => currentPage.value === 1);

    // Calcola se il pulsante "Avanti" dovrebbe essere disabilitato
    const isForwardDisabled = computed(
      () => currentPage.value === totalPages.value
    );

    // Restituisci le variabili e le funzioni per essere utilizzate nel template del componente
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
      closeDropdown,
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
      showDropdown
      
    };
  },
});

<template>
  <div class="documentation-container">
    <div
      class="relative flex w-[calc(100%-50px)] flex-col gizmo:w-full lg:w-[calc(100%-115px)] agent-turn"
    >
      <div class="flex-col gap-1 md:gap-3">
        <div class="flex flex-grow flex-col gap-3 max-w-full">
          <div
            class="min-h-[20px] flex flex-col items-start gap-3 whitespace-pre-wrap break-words overflow-x-auto"
          >
            <div
              class="markdown prose w-full break-words dark:prose-invert dark"
            >
              <h2>Documentazione Coding Challenge Front End Vue3</h2>
              <h3>Introduzione</h3>
              <p>
                Il programma fornisce
                un'interfaccia per la ricerca, il filtraggio e l'ordinamento di
                un insieme di dati basato su personaggi. Ogni personaggio ha
                diverse proprietà come:
               
                <ul>
                  <li>nome</li>
                  <li>descrizione</li>
                  <li>categoria</li>
                  <li>data di pubblicazione</li>
                  <li>visualizzazioni</li>
                  <li>mi piace</li>
                  <li>commenti</li>
                  <li>stato</li>
                  <li>specie</li>

                </ul>
              </p>

              <div>
                <p>Json Structure:</p>
                <pre>
                  <code>
  [
    {
      "id": 1,
      "img": "rick.png",
      "title": "Rick Sanches",
      "description": "Rick è uno scienziato geniale
      ma anche un nonno cinico. Conduce spesso suo 
      nipote Morty in pericolose avventure interdimensionali.",
      "category": "MALE",
      "datePublished": "2023-01-15",
      "views": 500,
      "likes": 1200,
      "comments": 79,
      "status": "ALIVE",
      "species": "HUMAN"
    }
  ]
                  </code>
                </pre>
              </div>
              <h3>Stato del componente SearchComponent.vue</h3>
              <ol>
                <li>
                  <strong>searchQuery</strong>: Una stringa inserita dall'utente
                  per effettuare ricerche sui personaggi.
                </li>
                <li>
                  <strong>selectedCategory</strong>: Categoria del personaggio
                  selezionata per filtrare i risultati.
                </li>
                <li>
                  <strong>sortOption</strong>: Opzione utilizzata per ordinare i
                  risultati in base a visualizzazioni, mi piace, commenti o data
                  di pubblicazione.
                </li>
                <li>
                  <strong>selectedStatus</strong>: Stato del personaggio (es.
                  "VIVO", "DECEDUTO") selezionato per filtrare i risultati.
                </li>
                <li>
                  <strong>selectedSpecies</strong>: Specie del personaggio
                  selezionata per filtrare i risultati.
                </li>
                <li>
                  <strong>currentPage</strong>: Numero di pagina corrente per la
                  paginazione dei risultati.
                </li>
                <li>
                  <strong>itemsPerPage</strong>: Numero di elementi mostrati per
                  pagina.
                </li>
                <li>
                  <strong>startDate</strong>: Data di inizio selezionata per
                  filtrare i risultati.
                </li>
                <li>
                  <strong>endDate</strong>: Data di fine selezionata per
                  filtrare i risultati.
                </li>
                <li>
                  <strong>showFilterDropdown</strong>: Stato booleano per
                  mostrare o nascondere il menu a discesa dei filtri.
                </li>
                <li>
                  <strong>searchMethod</strong>: Metodo di ricerca selezionato.
                </li>
                <li>
                  <strong>isRecording</strong>: Indica se la registrazione
                  vocale è attiva o meno.
                </li>
                <li>
                  <strong>showDropdown</strong>: Stato booleano per mostrare o
                  nascondere un menu a discesa generico.
                </li>
              </ol>
              <div>
                <pre>
                  <code>
                    // Query di ricerca inserita dall'utente
    const searchQuery = ref("");

    // Categoria selezionata per filtrare i risultati
    const selectedCategory = ref("");

    // Opzione selezionata per ordinare i risultati
    const sortOption = ref("views");

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
                  </code>
                </pre>
              </div>
              <h3>Methods :</h3>
              <ol>
                
                   <!-- Metodo goBack() -->
    <li>
        <strong>goBack()</strong>
        <ul>
            <li><strong>Descrizione</strong>: Naviga alla pagina precedente.</li>
            <li>
                <strong>Logic</strong>: Decrementa il valore di <code>currentPage</code> se questo è maggiore di 1.
                <pre><code>if (currentPage > 1) currentPage--;</code></pre>
            </li>
        </ul>
    </li>

    <!-- Metodo goForward() -->
    <li>
        <strong>goForward()</strong>
        <ul>
            <li><strong>Descrizione</strong>: Naviga alla pagina successiva.</li>
            <li>
                <strong>Logic</strong>: Incrementa il valore di <code>currentPage</code> se questo è minore di <code>totalPages</code>.
                <pre><code>if (currentPage  totalPages) currentPage++;</code></pre>
            </li>
        </ul>
    </li>

    <!-- Metodo startSpeechRecognition() -->
    <li>
        <strong>startSpeechRecognition()</strong>
        <ul>
            <li><strong>Descrizione</strong>: Inizia la registrazione vocale e assegna il risultato alla query di ricerca.</li>
            <li>
                <strong>Logic</strong>: Utilizza le API <code>SpeechRecognition</code> o <code>webkitSpeechRecognition</code> per avviare la registrazione vocale. Assegna il risultato trascritto a <code>searchQuery</code> quando la registrazione è completata.
                <pre><code>let recognition = new SpeechRecognition();
recognition.onresult = (event) => {
    searchQuery = event.results[0][0].transcript;
};
recognition.start();</code></pre>
            </li>
        </ul>
    </li>

    <!-- Metodo closeDropdown() -->
    <li>
        <strong>closeDropdown()</strong>
        <ul>
            <li><strong>Descrizione</strong>: Chiude il menu a discesa generico.</li>
            <li><strong>Logic</strong>: Imposta <code>showDropdown</code> su <code>false</code>.
                <pre><code>showDropdown = false;</code></pre>
            </li>
        </ul>
    </li>

    <!-- Metodo getImagePath() -->
    <li>
        <strong>getImagePath(imageName)</strong>
        <ul>
            <li><strong>Descrizione</strong>: Ottiene il percorso dell'immagine in base al suo nome.</li>
            <li><strong>Logic</strong>: Ritorna il percorso dell'immagine dalla cartella <code>assets/img</code> utilizzando la funzione <code>require</code>.
                <pre><code>return require(`assets/img/${imageName}`);</code></pre>
            </li>
        </ul>
    </li>
              <!-- Metodo sortedAndFilteredData -->
<li>
    <strong>sortedAndFilteredData</strong>
    <ul>
        <li><strong>Descrizione</strong>: Filtra e ordina i dati in base ai criteri selezionati.</li>
        <li><strong>Logic</strong>: 
            <pre><code>
let results = fetchedData.filter(data => 
    data.name.includes(searchQuery) && 
    data.category === selectedCategory &&
    data.status === selectedStatus &&
    data.species === selectedSpecies
);
results.sort((a, b) => {
    // Implementa la logica di ordinamento basata su sortOption
});
// ulteriore filtraggio basato sulle date...
return results;
            </code></pre>
        </li>
    </ul>
</li>

<!-- Metodo minDate e maxDate -->
<li>
    <strong>minDate e maxDate</strong>
    <ul>
        <li><strong>Descrizione</strong>: Calcola le date minima e massima tra i dati recuperati, rispettivamente.</li>
        <li><strong>Logic</strong>: 
            <pre><code>
const minDate = fetchedData.reduce((min, data) => data.date  min ? data.date : min, fetchedData[0].date);
const maxDate = fetchedData.reduce((max, data) => data.date > max ? data.date : max, fetchedData[0].date);
            </code></pre>
        </li>
    </ul>
</li>

<!-- Metodo uniqueCategories, uniqueStatuses e uniqueSpecies -->
<li>
    <strong>uniqueCategories, uniqueStatuses e uniqueSpecies</strong>
    <ul>
        <li><strong>Descrizione</strong>: Ritorna array di categorie, stati e specie uniche tra i dati recuperati, rispettivamente.</li>
        <li><strong>Logic</strong>: 
            <pre><code>
const uniqueCategories = [...new Set(fetchedData.map(data => data.category))];
const uniqueStatuses = [...new Set(fetchedData.map(data => data.status))];
const uniqueSpecies = [...new Set(fetchedData.map(data => data.species))];
            </code></pre>
        </li>
    </ul>
</li>

<!-- Metodo totalImages -->
<li>
    <strong>totalImages</strong>
    <ul>
        <li><strong>Descrizione</strong>: Calcola il numero totale di immagini.</li>
        <li><strong>Logic</strong>: 
            <pre><code>
const totalImages = fetchedData.length;
            </code></pre>
        </li>
    </ul>
</li>

<!-- Metodo totalPages -->
<li>
    <strong>totalPages</strong>
    <ul>
        <li><strong>Descrizione</strong>: Calcola il numero totale di pagine.</li>
        <li><strong>Logic</strong>: 
            <pre><code>
const totalPages = Math.ceil(sortedAndFilteredData.length / itemsPerPage);
            </code></pre>
        </li>
    </ul>
</li>

<!-- Metodo paginatedData -->
<li>
    <strong>paginatedData</strong>
    <ul>
        <li><strong>Descrizione</strong>: Ritorna i dati paginati in base alla pagina corrente.</li>
        <li><strong>Logic</strong>: 
            <pre><code>
const start = (currentPage - 1) * itemsPerPage;
const end = currentPage * itemsPerPage;
return sortedAndFilteredData.slice(start, end);
            </code></pre>
        </li>
    </ul>
</li>

<!-- Metodo isBackDisabled e isForwardDisabled -->
<li>
    <strong>isBackDisabled e isForwardDisabled</strong>
    <ul>
        <li><strong>Descrizione</strong>: Calcola se i pulsanti "Indietro" e "Avanti" dovrebbero essere disabilitati, rispettivamente.</li>
        <li><strong>Logic</strong>: 
            <pre><code>
const isBackDisabled = currentPage === 1;
const isForwardDisabled = currentPage === totalPages;
            </code></pre>
        </li>
    </ul>
</li>
              </ol>
        
            </div>
          </div>
        </div>
        <div
          class="flex justify-between empty:hidden gizmo:justify-start gizmo:gap-3 lg:block"
        >
   
        </div>
      </div>
    </div>
    <div class="p-4 justify-center text-base md:gap-6 md:py-6 m-auto">
      <div
        class="flex flex-1 gap-4 text-base mx-auto md:gap-6 gizmo:gap-3 gizmo:md:px-5 gizmo:lg:px-1 gizmo:xl:px-5 md:max-w-2xl lg:max-w-[38rem] gizmo:md:max-w-3xl gizmo:lg:max-w-[40rem] gizmo:xl:max-w-[48rem] xl:max-w-3xl }"
      >
        <div class="flex-shrink-0 flex flex-col relative items-end">
          <div></div>
          <div
            class="text-xs flex items-center justify-center gap-1 absolute left-0 top-2 -ml-4 -translate-x-full gizmo:top-1 gizmo:-ml-6 invisible"
          ></div>
        </div>
        <div
          class="relative flex w-[calc(100%-50px)] flex-col gizmo:w-full lg:w-[calc(100%-115px)] agent-turn"
        >
          <div class="flex-col gap-1 md:gap-3">
            <div class="flex flex-grow flex-col gap-3 max-w-full">
              <div
                class="min-h-[20px] flex flex-col items-start gap-3 whitespace-pre-wrap break-words overflow-x-auto"
              >
                <div
                  class="markdown prose w-full break-words dark:prose-invert dark"
                >
                 
                  <h4><strong>1. Struttura Generale del Componente</strong></h4>
                  <p>
                    Il componente è una rappresentazione di una UI (Interfaccia
                    Utente) che permette agli utenti di cercare, filtrare e
                    visualizzare una serie di schede (o "cards"). Il layout di
                    questo componente utilizza un approccio flexbox e offre
                    funzionalità di paginazione, ricerca, filtraggio e
                    ordinamento.
                  </p>
                  <h4><strong>2. Navbar di Paginazione</strong></h4>
                  <p>
                    All'inizio, vediamo una barra di navigazione (navbar) che
                    fornisce bottoni di paginazione per andare avanti e indietro
                    tra le pagine di schede:
                  </p>
                  <pre><div class="bg-black rounded-md mb-4"><div class="flex items-center relative text-gray-200 bg-gray-800 gizmo:dark:bg-token-surface-primary px-4 py-2 text-xs font-sans justify-between rounded-t-md"></div><div class="p-4 overflow-y-auto"><code class="!whitespace-pre hljs language-html"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"navigation-buttons"</span>&gt;</span>
  ...
  <span class="hljs-tag">&lt;<span class="hljs-name">button</span> @<span class="hljs-attr">click</span>=<span class="hljs-string">"goBack"</span> <span class="hljs-attr">:disabled</span>=<span class="hljs-string">"isBackDisabled"</span>&gt;</span>...<span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span>
  ...
  <span class="hljs-tag">&lt;<span class="hljs-name">button</span> @<span class="hljs-attr">click</span>=<span class="hljs-string">"goForward"</span> <span class="hljs-attr">:disabled</span>=<span class="hljs-string">"isForwardDisabled"</span>&gt;</span>...<span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span>
  ...
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
</code></div></div></pre>
                  <p>
                    Le funzioni <code>goBack</code> e
                    <code>goForward</code> sono responsabili per cambiare la
                    pagina corrente. I bottoni sono disabilitati quando l'utente
                    è alla prima o all'ultima pagina, rispettivamente.
                  </p>
                  <h4><strong>3. Ricerca e Filtraggio</strong></h4>
                  <h5><strong>3.1 Barra di Ricerca</strong></h5>
                  <p>
                    Il componente offre una barra di ricerca che permette agli
                    utenti di inserire una query di ricerca:
                  </p>
                  <pre><div class="bg-black rounded-md mb-4"><div class="flex items-center relative text-gray-200 bg-gray-800 gizmo:dark:bg-token-surface-primary px-4 py-2 text-xs font-sans justify-between rounded-t-md"></div><div class="p-4 overflow-y-auto"><code class="!whitespace-pre hljs language-html"><span class="hljs-tag">&lt;<span class="hljs-name">input</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"search-input"</span> <span class="hljs-attr">v-model</span>=<span class="hljs-string">"searchQuery"</span> <span class="hljs-attr">placeholder</span>=<span class="hljs-string">"Search a character"</span> /&gt;</span>
</code></div></div></pre>
                  <p>
                    Il modello <code>searchQuery</code> tiene traccia di ciò che
                    l'utente ha inserito nella barra di ricerca.
                  </p>
                  <h5><strong>3.2 Pulsante di Filtraggio</strong></h5>
                  <p>
                    C'è un pulsante "FILTERS" che, quando cliccato, mostra o
                    nasconde un menu a discesa di filtri:
                  </p>
                  <pre><div class="bg-black rounded-md mb-4"><div class="flex items-center relative text-gray-200 bg-gray-800 gizmo:dark:bg-token-surface-primary px-4 py-2 text-xs font-sans justify-between rounded-t-md"></div><div class="p-4 overflow-y-auto"><code class="!whitespace-pre hljs language-html"><span class="hljs-tag">&lt;<span class="hljs-name">button</span> @<span class="hljs-attr">click</span>=<span class="hljs-string">"showFilterDropdown = !showFilterDropdown"</span>&gt;</span>FILTERS<span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span>
</code></div></div></pre>
                  <p>
                    Il modello <code>showFilterDropdown</code> determina se il
                    menu a discesa dei filtri è visibile o no.
                  </p>
                  <h5><strong>3.3 Filtri Dropdown</strong></h5>
                  <p>
                    Dentro il menu a discesa, ci sono tre sezioni principali di
                    filtri: Genere, Status e Specie. Gli utenti possono
                    selezionare una di queste opzioni per filtrare le schede
                    visualizzate:
                  </p>
                  <pre><div class="bg-black rounded-md mb-4"><div class="flex items-center relative text-gray-200 bg-gray-800 gizmo:dark:bg-token-surface-primary px-4 py-2 text-xs font-sans justify-between rounded-t-md"></div><div class="p-4 overflow-y-auto"><code class="!whitespace-pre hljs language-html"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"filter-category"</span>&gt;</span>...<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"filter-status"</span>&gt;</span>...<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"filter-species"</span>&gt;</span>...<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
</code></div></div></pre>
                  <p>
                    Ogni filtro ha una serie di bottoni. Ad esempio, nel filtro
                    Genere:
                  </p>
                  <pre><div class="bg-black rounded-md mb-4"><div class="flex items-center relative text-gray-200 bg-gray-800 gizmo:dark:bg-token-surface-primary px-4 py-2 text-xs font-sans justify-between rounded-t-md"></div><div class="p-4 overflow-y-auto"><code class="!whitespace-pre hljs language-html"><span class="hljs-tag">&lt;<span class="hljs-name">button</span> <span class="hljs-attr">v-for</span>=<span class="hljs-string">"category in uniqueCategories"</span> <span class="hljs-attr">:key</span>=<span class="hljs-string">"category"</span> @<span class="hljs-attr">click</span>=<span class="hljs-string">"selectedCategory = category"</span>&gt;</span>...<span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span>
</code></div></div></pre>
                  <p>
                    Il ciclo <code>v-for</code> genera un pulsante per ogni
                    categoria unica nel set di dati. Quando un pulsante viene
                    cliccato, il modello <code>selectedCategory</code> viene
                    aggiornato con il valore della categoria selezionata.
                  </p>
                  <h5>
                    <strong
                      >3.4 Ordinamento Avanzato e Selettore di Data</strong
                    >
                  </h5>
                  <p>
                    Gli utenti possono anche ordinare le schede in base a varie
                    metriche come "Data di pubblicazione", "Visualizzazioni",
                    "Mi piace" e "Commenti". Questo è reso possibile dal
                    seguente codice:
                  </p>
                  <pre><div class="bg-black rounded-md mb-4"><div class="flex items-center relative text-gray-200 bg-gray-800 gizmo:dark:bg-token-surface-primary px-4 py-2 text-xs font-sans justify-between rounded-t-md"></div><div class="p-4 overflow-y-auto"><code class="!whitespace-pre hljs language-html"><span class="hljs-tag">&lt;<span class="hljs-name">select</span> <span class="hljs-attr">v-model</span>=<span class="hljs-string">"sortOption"</span>&gt;</span>
  ...
<span class="hljs-tag">&lt;/<span class="hljs-name">select</span>&gt;</span>
</code></div></div></pre>
                  <p>
                    Gli utenti possono anche filtrare le schede per una gamma di
                    date usando i selettori di data:
                  </p>
                  <pre><div class="bg-black rounded-md mb-4"><div class="flex items-center relative text-gray-200 bg-gray-800 gizmo:dark:bg-token-surface-primary px-4 py-2 text-xs font-sans justify-between rounded-t-md"></div><div class="p-4 overflow-y-auto"><code class="!whitespace-pre hljs language-html"><span class="hljs-tag">&lt;<span class="hljs-name">input</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"date"</span> <span class="hljs-attr">v-model</span>=<span class="hljs-string">"startDate"</span> <span class="hljs-attr">:min</span>=<span class="hljs-string">"minDate"</span> <span class="hljs-attr">:max</span>=<span class="hljs-string">"endDate"</span> /&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">input</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"date"</span> <span class="hljs-attr">v-model</span>=<span class="hljs-string">"endDate"</span> <span class="hljs-attr">:min</span>=<span class="hljs-string">"startDate"</span> <span class="hljs-attr">:max</span>=<span class="hljs-string">"maxDate"</span> /&gt;</span>
</code></div></div></pre>
                  <h4><strong>4. Visualizzazione delle Schede</strong></h4>
                  <p>
                    Le schede vengono visualizzate in un contenitore e sono
                    paginate in base alla pagina corrente:
                  </p>
                  <pre><div class="bg-black rounded-md mb-4"><div class="flex items-center relative text-gray-200 bg-gray-800 gizmo:dark:bg-token-surface-primary px-4 py-2 text-xs font-sans justify-between rounded-t-md"></div><div class="p-4 overflow-y-auto"><code class="!whitespace-pre hljs language-html"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">v-for</span>=<span class="hljs-string">"item in paginatedData"</span> <span class="hljs-attr">:key</span>=<span class="hljs-string">"item.id"</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"card"</span>&gt;</span>...<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
</code></div></div></pre>
                  <p>
                    Ogni scheda mostra un'immagine, un titolo, una categoria,
                    uno status, una descrizione e alcune statistiche.
                  </p>
                  <p>
                    Il componente utilizza una diretiva personalizzata
                    <code>v-lazy</code> per caricare le immagini delle schede in
                    modo "pigro", migliorando le prestazioni:
                  </p>
                  <pre><div class="bg-black rounded-md mb-4"><div class="flex items-center relative text-gray-200 bg-gray-800 gizmo:dark:bg-token-surface-primary px-4 py-2 text-xs font-sans justify-between rounded-t-md"></div><div class="p-4 overflow-y-auto"><code class="!whitespace-pre hljs language-html"><span class="hljs-tag">&lt;<span class="hljs-name">img</span> <span class="hljs-attr">v-lazy</span> <span class="hljs-attr">:data-lazy</span>=<span class="hljs-string">"getImagePath(item.img)"</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"card-image"</span> /&gt;</span>
</code></div></div></pre>
                </div>
              </div>
            </div>
            <div
              class="flex justify-between empty:hidden gizmo:justify-start gizmo:gap-3 lg:block"
            >
              <div
                class="text-gray-400 flex self-end lg:self-center justify-center gizmo:lg:justify-start mt-2 gizmo:mt-0 visible lg:gap-1 lg:absolute lg:top-0 lg:translate-x-full lg:right-0 lg:mt-0 lg:pl-2 gap-2 md:gap-3"
              >
                <div class="flex gap-1 gizmo:gap-3"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>


<style scoped>
.documentation-container {
  padding: 2rem;
  border: 1px solid #ccc;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  max-width: 84%;
  margin: 5rem auto;
}

h1 {
  font-size: 28px;
  margin-bottom: 20px;
}

h2 {
  font-size: 24px;
  margin-top: 15px;
  margin-bottom: 15px;
}

h3 {
  font-size: 20px;
  margin-top: 10px;
  margin-bottom: 10px;
}

p {
  font-size: 18px;
  line-height: 1.5;
  margin-bottom: 20px;
}

ul {
  margin-left: 40px;
  margin-bottom: 20px;
}

pre {
  padding: 10px 1rem;
  border-radius: 8px;
  color: #ccc;
  background-color: #2b2c30;
  overflow: auto;     /* Aggiungere scroll se necessario */
  word-wrap: break-word; /* Questa proprietà permette di andare a capo */
  white-space: pre-wrap; /* Mantiene i whitespaces e va a capo */
}

</style>


<script lang="ts">
import { Options, Vue } from "vue-class-component";

@Options({
  name: "Documentazione",
  props: {
    msg: String,
  },
})
export default class HelloWorld extends Vue {
  msg!: string;
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.documentation-container {
  overflow: scroll;
  
}
</style>

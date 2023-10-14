<template>
  <div class="documentation-container">
    <h1>Documentazione Metodologia di Ricerca</h1>

    <p>
      La seguente documentazione descrive in modo dettagliato il metodo di
      ricerca e filtraggio utilizzato nella componente Vue.js. La combinazione
      di ricerca testuale e filtri multipli offre un'esperienza utente potente e
      intuitiva.
    </p>

    <h2>1. Panoramica Generale</h2>
    <p>
      Il programma utilizza un sistema di ricerca avanzato basato su Vue 3, che
      consente all'utente di filtrare e ordinare i dati in base a vari criteri
      come categoria, status, specie e opzioni di ordinamento. Gli utenti
      possono anche paginare tra i risultati di ricerca e utilizzare la
      funzionalità di ricerca vocale.
    </p>

    <h2>2. Filtraggio e Ordinamento</h2>
    <h3>2.1. Filtraggio</h3>
    <p>
      La logica di base per il filtraggio avviene attraverso la manipolazione
      dell'array di dati basato su determinate condizioni. Gli utenti possono
      selezionare specifici criteri dai seguenti:
    </p>
    <ul>
      <li>
        Categoria: Gli utenti possono selezionare una categoria specifica dai
        dati disponibili. Se non viene selezionata alcuna categoria, vengono
        mostrati tutti i dati.
      </li>
      <li>
        Status: Allo stesso modo, gli utenti possono filtrare i risultati in
        base allo status.
      </li>
      <li>
        Specie: Gli utenti possono filtrare i risultati in base alle specie.
      </li>
      <li>
        Intervallo di date: Gli utenti possono filtrare i risultati in base a un
        intervallo di date specificato.
      </li>
    </ul>

    <h3>2.2. Ordinamento</h3>
    <p>
      Gli utenti possono ordinare i risultati in base a varie metriche come data
      di pubblicazione, visualizzazioni, mi piace e commenti. Questo ordinamento
      può essere effettuato utilizzando la funzione <code>sort()</code> in
      JavaScript.
    </p>

    <h2>3. Paginazione</h2>
    <p>
      Gli utenti possono navigare tra le pagine dei risultati di ricerca
      utilizzando i pulsanti Indietro e Avanti. La logica di paginazione è
      basata sul numero totale di risultati e sul numero di elementi per pagina.
      Inoltre, l'implementazione di funzionalità aggiuntive come paginazione,
      ricerca full-text o caching può ulteriormente migliorare l'esperienza
      dell'utente e l'efficienza dell'applicazione.
    </p>

    <h2>4. Ricerca Vocale</h2>
    <p>
      Il sistema integra un modulo di riconoscimento vocale che permette agli
      utenti di effettuare ricerche vocalmente. Questa funzione aggiunge
      ulteriore comodità e funzionalità, soprattutto in ambienti in cui la
      digitazione potrebbe non essere pratica o desiderabile.
    </p>

    <h2>5. Descrizione Matematica e Programmazione</h2>

    <h3>5.1. Descrizione Matematica</h3>
    <p>Siano:</p>
    <ul>
      <li><strong>N</strong> il numero totale di elementi.</li>
      <li><strong>P</strong> il numero di pagine totali.</li>
      <li><strong>E</strong> il numero di elementi per pagina.</li>
      <li><strong>C</strong> la pagina corrente.</li>
    </ul>
    <p>Allora:</p>
    <p><strong>P = ⌈N/E⌉</strong></p>
    <p>
      Il range di elementi visualizzati per la pagina corrente è dato da
      <strong>(C−1)×E</strong> (inclusivo) a <strong>C×E</strong> (esclusivo).
    </p>

    <h3>5.2. Programmazione Vue.js</h3>
    <p>
      La componente fa uso delle seguenti funzioni e caratteristiche di Vue.js:
    </p>
    <ul>
      <li>
        <strong>computed()</strong>: Questa funzione viene utilizzata per
        calcolare proprietà reattive basate su altre proprietà reattive. Nel
        nostro caso, viene utilizzata per calcolare le opzioni uniche per i
        filtri, le date minime e massime, e i dati paginati.
      </li>
      <li>
        <strong>watch()</strong>: Questa funzione consente di "osservare" le
        modifiche a una proprietà reattiva e di eseguire una funzione quando
        tale proprietà cambia. Nel nostro caso, viene utilizzata per ricaricare
        i dati ogni volta che un filtro o un'opzione di ordinamento cambia.
      </li>
      <li>
        <strong>onMounted()</strong>: Questa funzione viene eseguita quando la
        componente viene montata (inserita nel DOM). Nel nostro caso, viene
        utilizzata per caricare i dati iniziali.
      </li>
      <li>
        <strong>methods()</strong>: Vari metodi custom sono definiti all'interno
        di questa sezione per gestire funzionalità come il filtraggio,
        l'ordinamento e la paginazione.
      </li>
      <li>
        <strong>props()</strong>: Gli attributi passati come input alla
        componente sono definiti in questa sezione.
      </li>
    </ul>

    <h2>6. Conclusioni</h2>
    <p>
      Il sistema di ricerca e filtraggio presentato è estremamente flessibile e
      potente, consentendo agli utenti di filtrare, ordinare, paginare e cercare
      vocalmente i risultati in base a vari criteri. Grazie alla sua costruzione
      basata su Vue.js, è anche reattivo e scalabile, rendendolo adatto a
      qualsiasi applicazione moderna che richieda capacità di ricerca avanzata.
    </p>
    <div>
      Documento Tecnico: Analisi del Componente Vue.js Il codice fornisce
      un'analisi di un componente Vue.js. In questo documento, esploreremo come
      il componente funziona, quali sono le sue funzionalità e come queste sono
      implementate nel template e nella logica del componente. 1. Struttura
      Generale del Componente Il componente è una rappresentazione di una UI
      (Interfaccia Utente) che permette agli utenti di cercare, filtrare e
      visualizzare una serie di schede (o "cards"). Il layout di questo
      componente utilizza un approccio flexbox e offre funzionalità di
      paginazione, ricerca, filtraggio e ordinamento. 2. Navbar di Paginazione
      All'inizio, vediamo una barra di navigazione (navbar) che fornisce bottoni
      di paginazione per andare avanti e indietro tra le pagine di schede: Le
      funzioni goBack e goForward sono responsabili per cambiare la pagina
      corrente. I bottoni sono disabilitati quando l'utente è alla prima o
      all'ultima pagina, rispettivamente. 3. Ricerca e Filtraggio 3.1 Barra di
      Ricerca Il componente offre una barra di ricerca che permette agli utenti
      di inserire una query di ricerca: Il modello searchQuery tiene traccia di
      ciò che l'utente ha inserito nella barra di ricerca. 3.2 Pulsante di
      Filtraggio C'è un pulsante "FILTERS" che, quando cliccato, mostra o
      nasconde un menu a discesa di filtri: Il modello showFilterDropdown
      determina se il menu a discesa dei filtri è visibile o no. 3.3 Filtri
      Dropdown Dentro il menu a discesa, ci sono tre sezioni principali di
      filtri: Genere, Status e Specie. Gli utenti possono selezionare una di
      queste opzioni per filtrare le schede visualizzate: Ogni filtro ha una
      serie di bottoni. Ad esempio, nel filtro Genere: Il ciclo v-for genera un
      pulsante per ogni categoria unica nel set di dati. Quando un pulsante
      viene cliccato, il modello selectedCategory viene aggiornato con il valore
      della categoria selezionata. 3.4 Ordinamento Avanzato e Selettore di Data
      Gli utenti possono anche ordinare le schede in base a varie metriche come
      "Data di pubblicazione", "Visualizzazioni", "Mi piace" e "Commenti".
      Questo è reso possibile dal seguente codice: Gli utenti possono anche
      filtrare le schede per una gamma di date usando i selettori di data: 4.
      Visualizzazione delle Schede Le schede vengono visualizzate in un
      contenitore e sono paginate in base alla pagina corrente: Ogni scheda
      mostra un'immagine, un titolo, una categoria, uno status, una descrizione
      e alcune statistiche. Il componente utilizza una diretiva personalizzata
      v-lazy per caricare le immagini delle schede in modo "pigro", migliorando
      le prestazioni: 5. Conclusione In sintesi, il componente Vue.js fornito è
      un potente strumento di UI per visualizzare, cercare, filtrare e paginare
      un set di schede. Utilizza vari modelli, direttive e funzioni di Vue.js
      per fornire un'esperienza utente fluida e reattiva. La combinazione di una
      barra di ricerca avanzata, filtri, ordinamento e paginazione rende questo
      componente estremamente versatile per visualizzare qualsiasi tipo di dato
      in un formato di scheda.
    </div>
    <div class="p-4 justify-center text-base md:gap-6 md:py-6 m-auto">
      <div
        class="flex flex-1 gap-4 text-base mx-auto md:gap-6 gizmo:gap-3 gizmo:md:px-5 gizmo:lg:px-1 gizmo:xl:px-5 md:max-w-2xl lg:max-w-[38rem] gizmo:md:max-w-3xl gizmo:lg:max-w-[40rem] gizmo:xl:max-w-[48rem] xl:max-w-3xl }"
      >
        <div class="flex-shrink-0 flex flex-col relative items-end">
          <div>
           
          </div>
          <div
            class="text-xs flex items-center justify-center gap-1 absolute left-0 top-2 -ml-4 -translate-x-full gizmo:top-1 gizmo:-ml-6 invisible"
          >
          
          </div>
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
                  <h3>Documento Tecnico: Analisi del Componente Vue.js</h3>
                  <p>
                    Il codice fornisce un'analisi di un componente Vue.js. In
                    questo documento, esploreremo come il componente funziona,
                    quali sono le sue funzionalità e come queste sono
                    implementate nel template e nella logica del componente.
                  </p>
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
                  <pre><div class="bg-black rounded-md mb-4"><div class="flex items-center relative text-gray-200 bg-gray-800 gizmo:dark:bg-token-surface-primary px-4 py-2 text-xs font-sans justify-between rounded-t-md"><span>html</span><button class="flex ml-auto gizmo:ml-0 gap-2 items-center"><svg stroke="currentColor" fill="none" stroke-width="2" viewBox="0 0 24 24" stroke-linecap="round" stroke-linejoin="round" class="icon-sm" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"></path><rect x="8" y="2" width="8" height="4" rx="1" ry="1"></rect></svg>Copy code</button></div><div class="p-4 overflow-y-auto"><code class="!whitespace-pre hljs language-html"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"navigation-buttons"</span>&gt;</span>
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
                  <pre><div class="bg-black rounded-md mb-4"><div class="flex items-center relative text-gray-200 bg-gray-800 gizmo:dark:bg-token-surface-primary px-4 py-2 text-xs font-sans justify-between rounded-t-md"><span>html</span><button class="flex ml-auto gizmo:ml-0 gap-2 items-center"><svg stroke="currentColor" fill="none" stroke-width="2" viewBox="0 0 24 24" stroke-linecap="round" stroke-linejoin="round" class="icon-sm" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"></path><rect x="8" y="2" width="8" height="4" rx="1" ry="1"></rect></svg>Copy code</button></div><div class="p-4 overflow-y-auto"><code class="!whitespace-pre hljs language-html"><span class="hljs-tag">&lt;<span class="hljs-name">input</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"search-input"</span> <span class="hljs-attr">v-model</span>=<span class="hljs-string">"searchQuery"</span> <span class="hljs-attr">placeholder</span>=<span class="hljs-string">"Search a character"</span> /&gt;</span>
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
                  <pre><div class="bg-black rounded-md mb-4"><div class="flex items-center relative text-gray-200 bg-gray-800 gizmo:dark:bg-token-surface-primary px-4 py-2 text-xs font-sans justify-between rounded-t-md"><span>html</span><button class="flex ml-auto gizmo:ml-0 gap-2 items-center"><svg stroke="currentColor" fill="none" stroke-width="2" viewBox="0 0 24 24" stroke-linecap="round" stroke-linejoin="round" class="icon-sm" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"></path><rect x="8" y="2" width="8" height="4" rx="1" ry="1"></rect></svg>Copy code</button></div><div class="p-4 overflow-y-auto"><code class="!whitespace-pre hljs language-html"><span class="hljs-tag">&lt;<span class="hljs-name">button</span> @<span class="hljs-attr">click</span>=<span class="hljs-string">"showFilterDropdown = !showFilterDropdown"</span>&gt;</span>FILTERS<span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span>
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
                  <pre><div class="bg-black rounded-md mb-4"><div class="flex items-center relative text-gray-200 bg-gray-800 gizmo:dark:bg-token-surface-primary px-4 py-2 text-xs font-sans justify-between rounded-t-md"><span>html</span><button class="flex ml-auto gizmo:ml-0 gap-2 items-center"><svg stroke="currentColor" fill="none" stroke-width="2" viewBox="0 0 24 24" stroke-linecap="round" stroke-linejoin="round" class="icon-sm" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"></path><rect x="8" y="2" width="8" height="4" rx="1" ry="1"></rect></svg>Copy code</button></div><div class="p-4 overflow-y-auto"><code class="!whitespace-pre hljs language-html"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"filter-category"</span>&gt;</span>...<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"filter-status"</span>&gt;</span>...<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"filter-species"</span>&gt;</span>...<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
</code></div></div></pre>
                  <p>
                    Ogni filtro ha una serie di bottoni. Ad esempio, nel filtro
                    Genere:
                  </p>
                  <pre><div class="bg-black rounded-md mb-4"><div class="flex items-center relative text-gray-200 bg-gray-800 gizmo:dark:bg-token-surface-primary px-4 py-2 text-xs font-sans justify-between rounded-t-md"><span>html</span><button class="flex ml-auto gizmo:ml-0 gap-2 items-center"><svg stroke="currentColor" fill="none" stroke-width="2" viewBox="0 0 24 24" stroke-linecap="round" stroke-linejoin="round" class="icon-sm" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"></path><rect x="8" y="2" width="8" height="4" rx="1" ry="1"></rect></svg>Copy code</button></div><div class="p-4 overflow-y-auto"><code class="!whitespace-pre hljs language-html"><span class="hljs-tag">&lt;<span class="hljs-name">button</span> <span class="hljs-attr">v-for</span>=<span class="hljs-string">"category in uniqueCategories"</span> <span class="hljs-attr">:key</span>=<span class="hljs-string">"category"</span> @<span class="hljs-attr">click</span>=<span class="hljs-string">"selectedCategory = category"</span>&gt;</span>...<span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span>
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
                  <pre><div class="bg-black rounded-md mb-4"><div class="flex items-center relative text-gray-200 bg-gray-800 gizmo:dark:bg-token-surface-primary px-4 py-2 text-xs font-sans justify-between rounded-t-md"><span>html</span><button class="flex ml-auto gizmo:ml-0 gap-2 items-center"><svg stroke="currentColor" fill="none" stroke-width="2" viewBox="0 0 24 24" stroke-linecap="round" stroke-linejoin="round" class="icon-sm" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"></path><rect x="8" y="2" width="8" height="4" rx="1" ry="1"></rect></svg>Copy code</button></div><div class="p-4 overflow-y-auto"><code class="!whitespace-pre hljs language-html"><span class="hljs-tag">&lt;<span class="hljs-name">select</span> <span class="hljs-attr">v-model</span>=<span class="hljs-string">"sortOption"</span>&gt;</span>
  ...
<span class="hljs-tag">&lt;/<span class="hljs-name">select</span>&gt;</span>
</code></div></div></pre>
                  <p>
                    Gli utenti possono anche filtrare le schede per una gamma di
                    date usando i selettori di data:
                  </p>
                  <pre><div class="bg-black rounded-md mb-4"><div class="flex items-center relative text-gray-200 bg-gray-800 gizmo:dark:bg-token-surface-primary px-4 py-2 text-xs font-sans justify-between rounded-t-md"><span>html</span><button class="flex ml-auto gizmo:ml-0 gap-2 items-center"><svg stroke="currentColor" fill="none" stroke-width="2" viewBox="0 0 24 24" stroke-linecap="round" stroke-linejoin="round" class="icon-sm" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"></path><rect x="8" y="2" width="8" height="4" rx="1" ry="1"></rect></svg>Copy code</button></div><div class="p-4 overflow-y-auto"><code class="!whitespace-pre hljs language-html"><span class="hljs-tag">&lt;<span class="hljs-name">input</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"date"</span> <span class="hljs-attr">v-model</span>=<span class="hljs-string">"startDate"</span> <span class="hljs-attr">:min</span>=<span class="hljs-string">"minDate"</span> <span class="hljs-attr">:max</span>=<span class="hljs-string">"endDate"</span> /&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">input</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"date"</span> <span class="hljs-attr">v-model</span>=<span class="hljs-string">"endDate"</span> <span class="hljs-attr">:min</span>=<span class="hljs-string">"startDate"</span> <span class="hljs-attr">:max</span>=<span class="hljs-string">"maxDate"</span> /&gt;</span>
</code></div></div></pre>
                  <h4><strong>4. Visualizzazione delle Schede</strong></h4>
                  <p>
                    Le schede vengono visualizzate in un contenitore e sono
                    paginate in base alla pagina corrente:
                  </p>
                  <pre><div class="bg-black rounded-md mb-4"><div class="flex items-center relative text-gray-200 bg-gray-800 gizmo:dark:bg-token-surface-primary px-4 py-2 text-xs font-sans justify-between rounded-t-md"><span>html</span><button class="flex ml-auto gizmo:ml-0 gap-2 items-center"><svg stroke="currentColor" fill="none" stroke-width="2" viewBox="0 0 24 24" stroke-linecap="round" stroke-linejoin="round" class="icon-sm" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"></path><rect x="8" y="2" width="8" height="4" rx="1" ry="1"></rect></svg>Copy code</button></div><div class="p-4 overflow-y-auto"><code class="!whitespace-pre hljs language-html"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">v-for</span>=<span class="hljs-string">"item in paginatedData"</span> <span class="hljs-attr">:key</span>=<span class="hljs-string">"item.id"</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"card"</span>&gt;</span>...<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
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
                  <pre><div class="bg-black rounded-md mb-4"><div class="flex items-center relative text-gray-200 bg-gray-800 gizmo:dark:bg-token-surface-primary px-4 py-2 text-xs font-sans justify-between rounded-t-md"><span>html</span><button class="flex ml-auto gizmo:ml-0 gap-2 items-center"><svg stroke="currentColor" fill="none" stroke-width="2" viewBox="0 0 24 24" stroke-linecap="round" stroke-linejoin="round" class="icon-sm" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"></path><rect x="8" y="2" width="8" height="4" rx="1" ry="1"></rect></svg>Copy code</button></div><div class="p-4 overflow-y-auto"><code class="!whitespace-pre hljs language-html"><span class="hljs-tag">&lt;<span class="hljs-name">img</span> <span class="hljs-attr">v-lazy</span> <span class="hljs-attr">:data-lazy</span>=<span class="hljs-string">"getImagePath(item.img)"</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"card-image"</span> /&gt;</span>
</code></div></div></pre>
                  <h4><strong>5. Conclusione</strong></h4>
                  <p>
                    In sintesi, il componente Vue.js fornito è un potente
                    strumento di UI per visualizzare, cercare, filtrare e
                    paginare un set di schede. Utilizza vari modelli, direttive
                    e funzioni di Vue.js per fornire un'esperienza utente fluida
                    e reattiva. La combinazione di una barra di ricerca
                    avanzata, filtri, ordinamento e paginazione rende questo
                    componente estremamente versatile per visualizzare qualsiasi
                    tipo di dato in un formato di scheda.
                  </p>
                </div>
              </div>
            </div>
            <div
              class="flex justify-between empty:hidden gizmo:justify-start gizmo:gap-3 lg:block"
            >
              <div
                class="text-gray-400 flex self-end lg:self-center justify-center gizmo:lg:justify-start mt-2 gizmo:mt-0 visible lg:gap-1 lg:absolute lg:top-0 lg:translate-x-full lg:right-0 lg:mt-0 lg:pl-2 gap-2 md:gap-3"
              >
                <button
                  class="flex ml-auto gizmo:ml-0 gap-2 items-center rounded-md p-1 text-xs gizmo:gap-1.5 gizmo:pl-0 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-200 disabled:dark:hover:text-gray-400 hover:bg-gray-100 hover:text-gray-700"
                >
                  <svg
                    stroke="currentColor"
                    fill="none"
                    stroke-width="2"
                    viewBox="0 0 24 24"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    class="icon-sm"
                    height="1em"
                    width="1em"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"
                    ></path>
                    <rect x="8" y="2" width="8" height="4" rx="1" ry="1"></rect>
                  </svg>
                </button>
                <div class="flex gap-1 gizmo:gap-3">
                  <button
                    class="p-1 gizmo:pl-0 rounded-md disabled:dark:hover:text-gray-400 dark:hover:text-gray-200 dark:text-gray-400 hover:bg-gray-100 hover:text-gray-700 dark:hover:bg-gray-700"
                  >
                    <svg
                      stroke="currentColor"
                      fill="none"
                      stroke-width="2"
                      viewBox="0 0 24 24"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      class="icon-sm"
                      height="1em"
                      width="1em"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3"
                      ></path>
                    </svg></button
                  ><button
                    class="p-1 gizmo:pl-0 rounded-md disabled:dark:hover:text-gray-400 dark:hover:text-gray-200 dark:text-gray-400 hover:bg-gray-100 hover:text-gray-700 dark:hover:bg-gray-700"
                  >
                    <svg
                      stroke="currentColor"
                      fill="none"
                      stroke-width="2"
                      viewBox="0 0 24 24"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      class="icon-sm"
                      height="1em"
                      width="1em"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M10 15v4a3 3 0 0 0 3 3l4-9V2H5.72a2 2 0 0 0-2 1.7l-1.38 9a2 2 0 0 0 2 2.3zm7-13h2.67A2.31 2.31 0 0 1 22 4v7a2.31 2.31 0 0 1-2.33 2H17"
                      ></path>
                    </svg>
                  </button>
                </div>
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
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  max-width: 76%;
  margin: 20px auto;
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
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>

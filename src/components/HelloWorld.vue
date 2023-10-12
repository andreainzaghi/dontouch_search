<template>
  <div class="documentation-container">

    <h1>Documentazione Metodologia di Ricerca</h1>
    
    <p>La seguente documentazione descrive in modo dettagliato il metodo di ricerca utilizzato nella componente Vue.js presentato precedentemente.</p>
    
    <h2>1. Panoramica Generale</h2>
    <p>Il programma utilizza un sistema di ricerca avanzato basato su Vue 3, che consente all'utente di filtrare e ordinare i dati in base a vari criteri come categoria, status, specie e opzioni di ordinamento. Gli utenti possono anche paginare tra i risultati di ricerca.</p>

    <h2>2. Filtraggio e Ordinamento</h2>
    <h3>2.1. Filtraggio</h3>
    <ul>
      <li>Categoria: Gli utenti possono selezionare una categoria specifica dai dati disponibili. Se non viene selezionata alcuna categoria, vengono mostrati tutti i dati.</li>
      <li>Status: Allo stesso modo, gli utenti possono filtrare i risultati in base allo status.</li>
      <li>Specie: Gli utenti possono filtrare i risultati in base alle specie.</li>
      <li>Intervallo di date: Gli utenti possono filtrare i risultati in base a un intervallo di date specificato.</li>
    </ul>

    <h3>2.2. Ordinamento</h3>
    <p>Gli utenti possono ordinare i risultati in base a varie metriche come data di pubblicazione, visualizzazioni, mi piace e commenti.</p>

    <h2>3. Paginazione</h2>
    <p>Gli utenti possono navigare tra le pagine dei risultati di ricerca utilizzando i pulsanti Indietro e Avanti. La logica di paginazione è basata sul numero totale di risultati e sul numero di elementi per pagina.</p>

    <h2>4. Ricerca Vocale</h2>
    <p>Il sistema integra un modulo di riconoscimento vocale che permette agli utenti di effettuare ricerche vocalmente.</p>

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
  <p>Il range di elementi visualizzati per la pagina corrente è dato da <strong>(C−1)×E</strong> (inclusivo) a <strong>C×E</strong> (esclusivo).</p>

  <h3>5.2. Programmazione Vue.js</h3>
  <ul>
    <li><strong>computed()</strong>: Questa funzione viene utilizzata per calcolare proprietà reattive basate su altre proprietà reattive. Nel nostro caso, viene utilizzata per calcolare le opzioni uniche per i filtri, le date minime e massime, e i dati paginati.</li>
    <li><strong>watch()</strong>: Questa funzione consente di "osservare" le modifiche a una proprietà reattiva e di eseguire una funzione quando tale proprietà cambia. Nel nostro caso, viene utilizzata per ricaricare i dati ogni volta che un filtro o un'opzione di ordinamento cambia.</li>
    <li><strong>onMounted()</strong>: Questa funzione viene eseguita quando la componente viene montata (inserita nel DOM). Nel nostro caso, viene utilizzata per caricare i dati iniziali.</li>
  </ul>

    <h2>6. Conclusioni</h2>
    <p>Il sistema di ricerca presentato è flessibile e potente, consentendo agli utenti di filtrare, ordinare e paginare i risultati in base a vari criteri. L'integrazione della ricerca vocale aggiunge ulteriore funzionalità e comodità per l'utente.</p>

  </div>
</template>


<style scoped>
.documentation-container {
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
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
import { Options, Vue } from 'vue-class-component';

@Options({
  props: {
    msg: String
  }
})
export default class HelloWorld extends Vue {
  msg!: string
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

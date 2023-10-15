import { createApp } from 'vue';
import App from './App.vue';
import lazyDirective from './lazyDirective';  // importa la direttiva da lazyDirective.ts
import router from './router';
import store from './store/index'; // Assicurati che il percorso sia corretto
import { Store } from 'vuex';

const app = createApp(App);
app.directive('lazy', lazyDirective); 
app.use(router);
app.use(store); // Assicurati che il percorso sia corretto
console.log(store) // utilizza la direttiva importata
app.mount('#app');

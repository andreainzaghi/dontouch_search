import { createApp } from 'vue';
import App from './App.vue';
import lazyDirective from './lazyDirective';  // importa la direttiva da lazyDirective.ts
import router from './router';

const app = createApp(App);
app.directive('lazy', lazyDirective); 
app.use(router);
console.log(app) // utilizza la direttiva importata
app.mount('#app');

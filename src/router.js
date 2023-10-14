import { createRouter, createWebHistory } from 'vue-router';

// Importa i componenti delle tue pagine
import SearchComponent from './components/SearchComponent/SearchComponent.vue';
import DrawAi from './components/DrawAi.vue';

const routes = [
    {
        path: '/', // Imposta questo come path principale per visualizzarlo come homepage
        name: 'SearchComponent',
        component: SearchComponent
      },
       {
        path: '/draw', // Imposta questo come path principale per visualizzarlo come homepage
        name: 'draw',
        component: DrawAi
      },

];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;

export default {
    mounted(el: Element) {
      const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const img = entry.target;
            const src = img.getAttribute('data-lazy');
              
            if (src) {  // verifica che src non sia null
              img.setAttribute('src', src);
              img.classList.add('loaded');  // opzionale: aggiungi una classe una volta caricato
              observer.disconnect();
            }
          }
        });
      });
  
      observer.observe(el);
    }
  };
  
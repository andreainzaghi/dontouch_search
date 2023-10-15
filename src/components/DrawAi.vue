<template>
    <div class="draw_container">
      <div class="controls">
       <div class="despai">
        <input type="color" v-model="color" title="Scegli colore" />
        <button @click="clearCanvas">Cancella</button>
        <button @click="sendImage">Invia</button>
       </div>
       <div>
        <input type="text" v-model="prompt" placeholder="Enter your prompt here">
       </div>
       <div>
        <label for="lineWidth">Line Thickness:</label>
        <input type="range" id="lineWidth" v-model="lineWidth" min="1" max="20">
       </div>
      </div>

      <div class="canvas-container">
        <canvas ref="drawingCanvas" />
        <div class="image_from_backend">
          <img :src="imageSrc" alt="Processed Image" v-if="imageSrc" />
        </div>
      </div>
      
      <div class="saved-images-container" v-if="savedImages.sketches.length || savedImages.generated.length">
        <h2>Immagini salvate</h2>
        <div v-for="(sketch, index) in savedImages.sketches" :key="index" class="image-container">
          <div class="sketch-image">
            <img :src="'http://127.0.0.1:5000/saved_images/' + sketch" alt="Sketch">
          </div>
          <div v-if="index < savedImages.generated.length">
            <img :src="'http://127.0.0.1:5000/saved_images/' + savedImages.generated[index]" alt="Generated Image">
          </div>
        </div>
      </div>

    </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import * as paper from 'paper';

export default defineComponent({
  name: 'DrawAi',

  data() {
    return {
      color: 'black',
      path: null as paper.Path | null,
      canvasElement: null as HTMLCanvasElement | null,
      imageSrc: '' ,
      prompt: '',
      lineWidth: 5,
      savedImages: {
        sketches: [],
        generated: []
      }
    };
  },

  methods: {
    onMouseDown(event: paper.ToolEvent) {
      this.path = new paper.Path({
        segments: [event.point],
        strokeColor: this.color,
        strokeWidth: this.lineWidth,
      });
    },

    onMouseDrag(event: paper.ToolEvent) {
      if (this.path) {
        this.path.add(event.point);
      }
    },

    clearCanvas() {
      paper.project.activeLayer.removeChildren();
    },

    async sendImage() {
      let canvasData = this.canvasElement?.toDataURL('image/png');
      try {
        let response = await fetch('http://127.0.0.1:5000/image', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ image: canvasData, prompt: this.prompt })
        });

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const data = await response.json();
        this.imageSrc = data.imageBase64;
        console.log(data.message);
        this.fetchSavedImages();

      } catch (error) {
        console.log('There was a problem with the fetch operation:', error);
      }
    },

    async fetchSavedImages() {
      try {
        let response = await fetch('http://127.0.0.1:5000/saved-images');
        if (response.ok) {
          this.savedImages = await response.json();
        } else {
          console.error("Failed to fetch saved images");
        }
      } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
      }
    },
  },

  mounted() {
    this.canvasElement = (this.$refs as { drawingCanvas: HTMLCanvasElement }).drawingCanvas;
    paper.setup(this.canvasElement);

    const textItem = new paper.PointText({
      content: 'Click and drag to draw a line.',
      point: new paper.Point(20, 30),
      fillColor: 'black',
    });

    paper.view.on('mousedown', this.onMouseDown);
    paper.view.on('mousedrag', this.onMouseDrag);
    this.fetchSavedImages();
  },
});

</script>

  
  
  <style scoped>
  /* Global Styles */
  body {
    font-family: 'Arial', sans-serif;
    background-color: #f7f9fc;
  }
.despai{
    display:flex;align-items:center;
}
  /* Controls Styles */
  .controls {
    display: flex;
    align-items: center;
    gap: 20px;
  
    padding: 10px;
    background-color: #fff;
    border-radius: 10px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    margin-bottom: 20px;
  }
.draw_container{
    width:80%;margin:0 auto;
}
  .controls input[type="color"] {
    width: 40px;
    height: 40px;
    border: none;
    cursor: pointer;
    border-radius: 50%;
  }
  canvas, .image_from_backend{
  margin:0.5rem;
  }
  .controls button {
    padding: 10px 20px;
    border: none;
    border-radius: 5px;
    background-color: #007bff;
    color: #fff;
    cursor: pointer;
    transition: background-color 0.2s ease;
  }

  .controls button:hover {
    background-color: #0056b3;
  }

  /* Canvas Container Styles */
  .canvas-container {
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #fff;
    border-radius: 10px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    padding: 1rem 0;
    width: 100%;  /* increased width to accommodate padding */
    height: 512px; /* increased height to accommodate padding */
  }
button{
    margin:0 0.5rem;
}

/* Aggiungi questo stile per le immagini salvate */
.saved-images-container {
  margin-top: 20px;
}

.image-container {
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;

}

.sketch-image, .generated-image {
  width: 48%; /* Adatta la larghezza come preferisci */
  border: 1px solid #007bff;
  padding: 10px;
}

  .image_from_backend{
    width:50%;
    border: 1px solid #007bff;

    height:100%;
  }

  canvas {
    border: 1px solid #007bff;
    border-radius: 5px;
    width:50%;
    height:100%;

  }
  img{
    width:100%;
    height:100%;
  }

  @media screen and (max-width: 768px) {
.despai{
    justify-content: space-evenly
}
    .controls {
    flex-direction: column;
    width:100%;
    justify-content: space-between ;
  }
    .canvas-container {
        flex-direction: column;
        height:85vh;
        width:100%;
        margin-left: 10px;        }
    
  canvas, .image_from_backend{
    border: 2px solid #007bff;
    border-radius: 5px;
    width:95%;
    margin:0 auto;
    height:50%;
  }
  .draw_container{
    width:100%;margin:0 auto;
}
  canvas{
    margin-bottom:1rem;
  }
  }
</style>
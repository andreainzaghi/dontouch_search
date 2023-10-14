<template>
    <div>
      <div class="controls">
        <input type="color" v-model="color" title="Scegli colore" />
        <button @click="clearCanvas">Cancella</button>
        <button @click="sendImage">Invia</button>
        <input type="text" v-model="prompt" placeholder="Enter your prompt here">

      </div>
      <div class="canvas-container">
        <canvas ref="drawingCanvas" />
        <div class="image_from_backend">
          <img :src="imageSrc" alt="Processed Image" v-if="imageSrc" />
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
      imageSrc: '' , // Added the imageSrc data property
      prompt: ''
    };
  },

  methods: {
    onMouseDown(event: paper.ToolEvent) {
      this.path = new paper.Path({
        segments: [event.point],
        strokeColor: this.color,
        strokeWidth: 5,
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
      body: JSON.stringify({ image: canvasData, prompt: this.prompt }) // Send prompt as well
    });

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const data = await response.json();
    this.imageSrc = data.imageBase64; // Use the base64 encoded image data to set the imageSrc property
    console.log(data.message);

  } catch (error) {
    console.log('There was a problem with the fetch operation:', error);
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
  },
});
</script>

  
  
  <style scoped>
  /* Global Styles */
  body {
    font-family: 'Arial', sans-serif;
    background-color: #f7f9fc;
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

  .controls input[type="color"] {
    width: 40px;
    height: 40px;
    border: none;
    cursor: pointer;
    border-radius: 50%;
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
    width: 98%;  /* increased width to accommodate padding */
    height: 512px; /* increased height to accommodate padding */
  }

  .image_from_backend{
    WIDTH:50%;
    border: 2px solid #007bff;

    height:100%;
  }

  canvas {
    border: 2px solid #007bff;
    border-radius: 5px;
    width:50%;
    height:100%;

  }

  @media screen and (max-width: 768px) {
    .canvas-container {
        flex-direction: column;
        height:85vh;
        }
    
  canvas ,.image_from_backend{
    border: 2px solid #007bff;
    border-radius: 5px;
    width:94%;
    margin:0 auto;
    height:50%;
  }

  canvas{
    margin-bottom:1rem;
  }
  }
</style>
import {hello} from './modules/gameClasses.js';
const canvas = document.getElementById('snake');

document.onload = setup();

function setup() {
  canvas.height = window.innerHeight / 2;
  canvas.width = window.innerHeight / 2;

  console.log(canvas.width);
  console.log(canvas.height);
}

import Random = require('../../node_modules/tiny-random/src/random');
import TinyVector = require('../../src/js/tinyvector');
import Mover = require('./mover');

class App {
  ctx: CanvasRenderingContext2D;
  w: number
  h: number
  rnd: Random;
  tv: {};
  movers: Array<Mover>;
  constructor(){
    this.rnd = new Random();
    this.tv = TinyVector;
    this.ctx = document.createElement('canvas').getContext('2d');
    document.body.appendChild(this.ctx.canvas);
    this.resize();
    window.requestAnimationFrame(t=>this.draw(t));
    window.addEventListener('resize', e=>this.resize() );
    this.movers = [];
    for (let i = 0; i < 100; i++) {
        this.movers.push(new Mover(this));
    }
  }
  resize(){
    this.w = this.ctx.canvas.width = window.innerWidth;
    this.h = this.ctx.canvas.height = window.innerHeight;
  }
  clear(){
    this.ctx.clearRect(0,0,this.w,this.h);
  }
  draw(t){
    window.requestAnimationFrame(t=>this.draw(t));
    this.clear();
    this.movers.forEach( mvr=>mvr.draw() );
  }
}

const app = new App();

// <reference path="./app" />
import TinyVector = require('../../src/js/tinyvector');
import Random = require('../../node_modules/tiny-random/src/random');

class Mover {
  pos: TinyVector;
  vel: TinyVector;
  acc: TinyVector;
  rnd: Random;
  app: any;
  constructor(app) {
    this.rnd = new Random();
    this.app = app;
    this.reset();
  }
  reset(){
    this.pos = new TinyVector(this.rnd.int(this.app.w),this.rnd.int(this.app.h));
    this.vel = new TinyVector(this.rnd.real(-10,10),this.rnd.real(-10,10));
    this.acc = new TinyVector();
  }
  update(){
    this.vel.add(this.acc);
    this.pos.add(this.vel);
    this.acc.zero();
    if(this.pos.x > this.app.w){
      this.vel.mul( new TinyVector(-1,1) );
    } else if (this.pos.x < 0){
      this.vel.mul( new TinyVector(-1,1) );
    } else if(this.pos.y > this.app.h){
      this.vel.mul( new TinyVector(1,-1) );
    } else if (this.pos.y < 0){
      this.vel.mul( new TinyVector(1,-1) );
    }
  }
  draw(){
    const ctx: CanvasRenderingContext2D = this.app.ctx;

    this.update();
    ctx.save();
    ctx.translate( this.pos.x, this.pos.y );
    ctx.fillStyle = 'rgba(255,255,255,0.25)';
    ctx.fillRect(0,0,5,5);
    ctx.restore();
  }
}

export = Mover;

/******/!function(t){/******/
/******/
// The require function
/******/
function i(e){/******/
/******/
// Check if module is in cache
/******/
if(n[e])/******/
return n[e].exports;/******/
/******/
// Create a new module (and put it into the cache)
/******/
var r=n[e]={/******/
exports:{},/******/
id:e,/******/
loaded:!1};/******/
/******/
// Return the exports of the module
/******/
/******/
/******/
// Execute the module function
/******/
/******/
/******/
// Flag the module as loaded
/******/
return t[e].call(r.exports,r,r.exports,i),r.loaded=!0,r.exports}// webpackBootstrap
/******/
// The module cache
/******/
var n={};/******/
/******/
// Load entry module and return exports
/******/
/******/
/******/
/******/
// expose the modules object (__webpack_modules__)
/******/
/******/
/******/
// expose the module cache
/******/
/******/
/******/
// __webpack_public_path__
/******/
return i.m=t,i.c=n,i.p="",i(0)}([/* 0 */
/***/
function(t,i,n){"use strict";var e=n(1),r=n(2),s=n(3),o=function(){function t(){var t=this;this.rnd=new e,this.tv=r,this.ctx=document.createElement("canvas").getContext("2d"),document.body.appendChild(this.ctx.canvas),this.resize(),window.requestAnimationFrame(function(i){return t.draw(i)}),window.addEventListener("resize",function(i){return t.resize()}),this.movers=[];for(var i=0;i<100;i++)this.movers.push(new s(this))}return t.prototype.resize=function(){this.w=this.ctx.canvas.width=window.innerWidth,this.h=this.ctx.canvas.height=window.innerHeight},t.prototype.clear=function(){this.ctx.clearRect(0,0,this.w,this.h)},t.prototype.draw=function(t){var i=this;window.requestAnimationFrame(function(t){return i.draw(t)}),this.clear(),this.movers.forEach(function(t){return t.draw()})},t}();new o},/* 1 */
/***/
function(t,i){/*!
	 * Random JavaScript Library v1.0.0
	 * Jeremy Zevin
	 *
	 * Released under the MIT license
	 * http://opensource.org/licenses/MIT
	 *
	 * Date: 7/8/16
	 *
	 */
"use strict";var n=function(){function t(){this["native"]=Math.random}return t.prototype["int"]=function(t,i){return void 0===t&&(t=0),void 0===i&&(i=1),Math.floor(this["native"]()*(i-t+1)+t)},t.prototype.real=function(t,i){return void 0===t&&(t=0),void 0===i&&(i=1),this["native"]()*(i-t)+t},t.prototype.pick=function(t){return t[this["int"](0,t.length-1)]},t.prototype.chance=function(t){return void 0===t&&(t=10),t/100>this["native"]()},t.prototype.color=function(t){if(void 0===t&&(t="rgb"),"hex"===t){for(var i="#",n=0;n<=5;n++)i+=this.pick([0,1,2,3,4,5,6,7,8,9,"a","b","c","d","e","f"]);return i}return"rgba"===t?"rgba("+this["int"](0,255)+","+this["int"](0,255)+","+this["int"](0,255)+","+this["native"]()+")":"hsl"===t?"hsl("+this["int"](0,360)+","+this["int"](0,100)+"%,"+this["int"](0,100)+"%)":"hsla"===t?"hsla("+this["int"](0,360)+","+this["int"](0,100)+"%,"+this["int"](0,100)+"%,"+this["native"]()+")":"rgb("+this["int"](0,255)+","+this["int"](0,255)+","+this["int"](0,255)+")"},t}();t.exports=n},/* 2 */
/***/
function(t,i){/*!
	 * tinyvector 2D JavaScript Lib
	 * Jeremy Zevin
	 *
	 * Released under the MIT license
	 * http://opensource.org/licenses/MIT
	 *
	 * Date: 7/16/16
	 *
	 */
"use strict";var n=function(){function t(t,i){void 0===t&&(t=0),void 0===i&&(i=0),this.x=t,this.y=i}return t.prototype.add=function(t){return this.x+=t.x,this.y+=t.y,this},t.prototype.sub=function(t){return this.x-=t.x,this.y-=t.y,this},t.prototype.mul=function(t){return this.x*=t.x,this.y*=t.y,this},t.prototype.div=function(t){return this.x/=t.x,this.y/=t.y,this},t.prototype.limit=function(t){return void 0===t&&(t=1),this.x>t&&(this.x=t),this.y>t&&(this.y=t),this},t.prototype.zero=function(){return this.x=0,this.y=0,this},t.prototype.clone=function(){return new t(this.x,this.y)},t.prototype.rotate=function(t){var i=this.x*Math.cos(t)-this.y*Math.sin(t),n=this.x*Math.sin(t)+this.y*Math.cos(t);return this.x=i,this.y=n,this},t.prototype.rotateDeg=function(t){return this.rotate(this._degrees2radian(t))},t.prototype._radian2degrees=function(t){return t*(180/Math.PI)},t.prototype._degrees2radian=function(t){return t/(180/Math.PI)},t}();t.exports=n},/* 3 */
/***/
function(t,i,n){"use strict";var e=n(2),r=n(1),s=function(){function t(t){this.rnd=new r,this.app=t,this.reset()}return t.prototype.reset=function(){this.pos=new e(this.rnd["int"](this.app.w),this.rnd["int"](this.app.h)),this.vel=new e(this.rnd.real(-10,10),this.rnd.real(-10,10)),this.acc=new e},t.prototype.update=function(){this.vel.add(this.acc),this.pos.add(this.vel),this.acc.zero(),this.pos.x>this.app.w?this.vel.mul(new e((-1),1)):this.pos.x<0?this.vel.mul(new e((-1),1)):this.pos.y>this.app.h?this.vel.mul(new e(1,(-1))):this.pos.y<0&&this.vel.mul(new e(1,(-1)))},t.prototype.draw=function(){var t=this.app.ctx;this.update(),t.save(),t.translate(this.pos.x,this.pos.y),t.fillStyle="rgba(255,255,255,0.25)",t.fillRect(0,0,5,5),t.restore()},t}();t.exports=s}]);
//# sourceMappingURL=app.bundle.js.map
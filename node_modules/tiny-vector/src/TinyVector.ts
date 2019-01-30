
/*!
 * tinyvector 2D JavaScript Lib
 * Jeremy Zevin
 *
 * Released under the MIT license
 * http://opensource.org/licenses/MIT
 */

export class TinyVector {
  x: number;
  y: number;
  constructor(x: number = 0, y: number = 0) {
    this.x = x;
    this.y = y;
  }
  add(tv: TinyVector): TinyVector {
    this.x += tv.x;
    this.y += tv.y;
    return this;
  }
  sub(tv: TinyVector): TinyVector {
    this.x -= tv.x;
    this.y -= tv.y;
    return this;
  }
  mult(n): TinyVector {
    this.x *= n;
    this.y *= n;
    return this;
  }
  div(n): TinyVector {
    this.x /= n;
    this.y /= n;
    return this;
  }
  mag(): number {
    return Math.sqrt((this.x * this.x) + (this.y * this.y));
  }
  normalize(): TinyVector {
    const m = this.mag();
    if (m !== 0) {
      this.div(m);
    }
    return this;
  }
  limit(h, l): TinyVector {
    const high = h || null,
      low = l || null;
    if (high && this.mag() > high) {
      this.normalize();
      this.mult(high);
    }
    if (low && this.mag() < low) {
      this.normalize();
      this.mult(low);
    }
    return this;
  }
  zero(): TinyVector {
    this.x = 0;
    this.y = 0;
    return this;
  }
  copy(): TinyVector {
    return new TinyVector(this.x, this.y);
  }
  rotate(angle: number): TinyVector {
    const nx = this.x * Math.cos(angle) - this.y * Math.sin(angle);
    const ny = this.x * Math.sin(angle) + this.y * Math.cos(angle);
    this.x = nx;
    this.y = ny;
    return this;
  }
  rotateDeg(angle: number): TinyVector {
    return this.rotate(this._degrees2radian(angle));
  }
  heading(): number {
    return Math.atan2(this.y, this.x);
  }
  angleBetween(tv: TinyVector) {
    var dotmagmag = this.dot(tv) / (this.mag() * tv.mag());
    var angle = Math.acos(Math.min(1, Math.max(-1, dotmagmag)));
    return angle;
  }
  angleTo(tv: TinyVector, angleOffset: number=0): number{
    return Math.atan2(tv.y - this.y, tv.x - this.x) + angleOffset;
  }
  dot(tv: TinyVector): number {
    return this.x * (tv.x || 0) + this.y * (tv.y || 0);
  };
  lerp(tv: TinyVector, amt: number): TinyVector {
    this.x += (tv.x - this.x) * amt || 0;
    this.y += (tv.y - this.y) * amt || 0;
    return this;
  };

  private _radian2degrees(rad: number): number {
    return rad * (180 / Math.PI);
  }
  private _degrees2radian(deg: number): number {
    return deg / (180 / Math.PI);
  }
}

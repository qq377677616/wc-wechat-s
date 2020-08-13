class Scrape{
  constructor(page, opts){
    opts = opts || {};
    this.page = page;
    this.opts = opts;
    this.canvasId = opts.canvasId || 'luck';
    this.width = opts.width || 300;
    this.height = opts.height || 150;
    this.maskColor = opts.maskColor || '#dddddd';
    this.size = opts.size || 8;
    this.r = this.size * 2;
    this.area = this.r * this.r; 
    this.range = parseFloat(opts.range)/100 || 0.75;
    this.totalArea = this.width * this.height;
    this.init();
  }
  init(){
    this.show = false;
    this.clearPoints = [];
    this.ctx = wx.createCanvasContext(this.canvasId, this);
    this.drawMask();
    this.bindTouch();
  }
  drawMask(){
    if (this.opts.layer_img) {
      try {
        this.ctx.drawImage(this.opts.layer_img, 0, 0, this.width, this.height);
      }
      catch(err) {
        console.log("err", err)
        this.ctx.setFillStyle(this.maskColor);
        this.ctx.fillRect(0, 0, this.width, this.height);
      }
    } else {
      this.ctx.setFillStyle(this.maskColor);
      this.ctx.fillRect(0, 0, this.width, this.height);
    }
    this.ctx.draw(); 
    this.page[this.opts.initOk]();
  }
  eraser(e,bool){
    let len = this.clearPoints.length;
    let count = 0
    let x = e.touches[0].x, y = e.touches[0].y;
    let x1 = x - this.size;
    let y1 = y - this.size;
    if(bool){
      this.clearPoints.push({
        x1: x1,
        y1: y1,
        x2: x1 + this.r,
        y2: y1 + this.r
      })
    }
    for (let val of this.clearPoints){
      if(val.x1 > x || val.y1 > y || val.x2 < x || val.y2 < y){
        count++;
      }else{
        break;
      }
    }
    if(len === count){
      this.clearPoints.push({
        x1: x1,
        y1: y1,
        x2: x1 + this.r,
        y2: y1 + this.r
      })
    }
    if (this.clearPoints.length && this.r * this.r * this.clearPoints.length > this.range * this.totalArea){
      this.show = true;
    }
    this.ctx.clearRect(x1, y1, this.r, this.r);
    this.ctx.draw(true);
  }
  bindTouch(){
    const _this = this;
    _this.page.onTouchStart = function(e){
      _this.eraser(e,true);
      _this.page[_this.opts.scrapeStart]();
    }
    _this.page.onTouchMove = function (e) {
      _this.eraser(e);
    }
    _this.page.onTouchEnd = function (e) {
      if(_this.show){
        _this.ctx.clearRect(0, 0, _this.width, _this.height);
        _this.ctx.draw();
        _this.page[_this.opts.scrapeOk]();
      }
    }
  }
}
module.exports = Scrape;
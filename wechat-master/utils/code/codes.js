
import barcode from './barcode'
import QR from './qrcode.js'

//条形码
function toBarcode(canvasId, code, width, height) {
  barcode.code128(wx.createCanvasContext(canvasId), code, width, height);
}
//二维码
function toQrcode(canvasId, content, cavW, cavH) {
  QR.api.draw(content, canvasId, cavW, cavH);
}

export {
  toBarcode,
  toQrcode
}
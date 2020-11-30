import tool from '../../../utils/publics/tool'
const modelUrl = 'https://img.vrupup.com/web/szq/images/gltf/gltf4/scene.gltf';//3D模型文件
var listener = null;//监听相机帧
import * as THREE from '../miniProgram-three-3d/libs/three.weapp.js'
import animate from '../miniProgram-three-3d/animate'

Page({
  data: {
    devicePosition: 'back',//默认摄像头（后置） 
  },
  onLoad() {
    this.three3dInit() 
  },
  three3dInit() {
    tool.loading("加载中")
    wx.createSelectorQuery().select('#canvas1').node().exec((res) => {
      const canvas = new THREE.global.registerCanvas(res[0].node)
      animate(canvas, THREE, modelUrl, () => {
        tool.loading_h()
      })
    })
  },
  onUnload() {
    // isDeviceMotion = false;
    // modelBusiness.stopAnimate();
    // modelBusiness.stopDeviceMotion();
    // this.stopTacking();
    // console.log('onUnload', 'listener is stop');
  },
  //监听/停止设备方向的变化
  toggleDeviceMotion() {
    if (isDeviceMotion) {
      modelBusiness.stopDeviceMotion();
    } else {
      modelBusiness.startDeviceMotion(isAndroid);
    }
    isDeviceMotion = !isDeviceMotion;
  },
  //创建小程序AR（相机camera上下文）监听帧数据
  startTacking() {
    var _that = this;
    const context = wx.createCameraContext();

    if (!context.onCameraFrame) {
      var message = 'Does not support the new api "Camera.onCameraFrame".';
      console.log(message);
      wx.showToast({
        title: message,
        icon: 'none'
      });
      return;
    }

    // real-time
    listener = context.onCameraFrame(async function (res) {
      console.log('onCameraFrame:', res.width, res.height);
      const cameraFrame = {
        data: new Uint8Array(res.data),
        width: res.width,
        height: res.height,
      };
      modelBusiness.setCameraFrame(cameraFrame);
    });
    // start
    listener.start();
    console.log('startTacking', 'listener is start');
  },
  //停止监听小程序AR帧数据
  stopTacking() {
    if (listener) {
      listener.stop();
    }
  },
  //切换前、后摄像头
  changeDirection() {
    var status = this.data.devicePosition;
    if (status === 'back') {
      status = 'front';
    } else {
      status = 'back';
    }
    this.setData({
      devicePosition: status,
    });
  },
  touchStart(e) {
		THREE.global.touchEventHandlerFactory('canvas', 'touchstart')(e)
	},
	touchMove(e) {
		THREE.global.touchEventHandlerFactory('canvas', 'touchmove')(e)
	},
	touchEnd(e) {
		THREE.global.touchEventHandlerFactory('canvas', 'touchend')(e)
	},
	touchCancel(e) {
		// console.log('canvas', e)
	},
	longTap(e) {
		// console.log('canvas', e)
	},
	tap(e) {
		// console.log('canvas', e)
	}
});

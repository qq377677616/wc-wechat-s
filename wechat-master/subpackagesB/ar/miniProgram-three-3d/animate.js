import getSkeletonUtils from './jsm/SkeletonUtils.js';
import getGLTFLoader from './jsm/loaders/GLTFLoader'
import { OrbitControls } from './jsm/controls/OrbitControls'

export default function (canvas, THREE , url, callback) {
  let GLTFLoader = getGLTFLoader(THREE);
  let {
    SkeletonUtils
  } = getSkeletonUtils(THREE);
  let window = THREE.global;

  var renderer, scene, camera, controls, clock, mixer , action;

  initRenderer()
  initScene()
  initControls()
  initModel()

  animate()

  function initModel(){
    var loader = new GLTFLoader();

    loader.load(url, function(gltf) {
      gltf.scene.traverse(function (child) {
        if (child.isMesh) {
            child.frustumCulled = false;
            child.castShadow = true
        }
      })
      gltf.scene.rotation.x = -50
      gltf.scene.rotation.y = 500
      scene.add(gltf.scene)
      var obj = gltf.scene
      mixer = new THREE.AnimationMixer(obj)  //通过当前模型创建混合器
      action = mixer.clipAction(gltf.animations[0])//通过动画数据创建播放器
      action.play()
      callback()
    })
  }

  function initRenderer() {
    renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true,
      alpha: true
    });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.gammaOutput = true;
    renderer.gammaFactor = 2.2;
    renderer.shadowMap.enabled = true;
    renderer.setClearColor(0xeeeeee);
    renderer.setClearAlpha(0);
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
  }

  function initScene() {
    camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 10000);
    camera.position.set(3, 6, -10);
    camera.lookAt(0, 1, 0);

    clock = new THREE.Clock();

    scene = new THREE.Scene();
    // scene.background = new THREE.Color(0xa0a0a0);
    scene.fog = new THREE.Fog(0xa0a0a0, 10, 22);

    var hemiLight = new THREE.HemisphereLight(0xffffff, 0x444444);
    hemiLight.position.set(0, 20, 0);
    scene.add(hemiLight);

    var dirLight = new THREE.DirectionalLight(0xffffff);
    dirLight.position.set(-3, 10, -10);
    dirLight.castShadow = true;
    dirLight.shadow.camera.top = 10;
    dirLight.shadow.camera.bottom = -10;
    dirLight.shadow.camera.left = -10;
    dirLight.shadow.camera.right = 10;
    dirLight.shadow.camera.near = 0.1;
    dirLight.shadow.camera.far = 40;
    scene.add(dirLight);

    // 添加平面
    // var groundMesh = new THREE.Mesh(
    //   new THREE.PlaneBufferGeometry(40, 40),
    //   new THREE.MeshPhongMaterial({
    //     color: 0x999999,
    //     depthWrite: false
    //   })
    // );

    // groundMesh.rotation.x = -Math.PI / 2;
    // groundMesh.receiveShadow = true;
    // scene.add(groundMesh);
    window.addEventListener('resize', onWindowResize, false)
  }

  function render() {
    controls.update()

    var mixerUpdateDelta = clock.getDelta();

    if(mixer){
      mixer.update(mixerUpdateDelta)
    }

    renderer.render(scene, camera);

  }

  function animate(){
    render()
    canvas.requestAnimationFrame(animate);
  }

  function initControls() {
    controls = new OrbitControls(camera, renderer.domElement)

    // 如果使用animate方法时，将此函数删除
    //controls.addEventListener( 'change', render );
    // 使动画循环使用时阻尼或自转 意思是否有惯性
    controls.enableDamping = true;
    //动态阻尼系数 就是鼠标拖拽旋转灵敏度
    //controls.dampingFactor = 0.25;
    //是否可以缩放
    controls.enableZoom = true;
    //是否自动旋转
    controls.autoRotate = false;
    controls.autoRotateSpeed = 0.5;
    //设置相机距离原点的最远距离
    controls.minDistance = 1;
    //设置相机距离原点的最远距离
    controls.maxDistance = 2000;
    //是否开启右键拖拽
    controls.enablePan = true;
  }

  function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  }


}
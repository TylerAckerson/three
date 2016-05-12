(function() {
  'use strict';

  var scene, camera, light, renderer, theLogo;

  init();

  // ONE-TIME CONTROLS

  // lighting
    // lightsOut();
    // lightsOn();
    // clapClap();

  // color
    // changeColor("red");
    // changeColor("green");
    // changeColor("blue");

  animate();

  function init() {
    scene = new THREE.Scene();

    renderer = new THREE.WebGLRenderer({ antialias: true });

    var WIDTH = window.innerWidth * 1/2,
        HEIGHT = window.innerHeight;

    renderer.setSize(WIDTH, HEIGHT);

    document.body.appendChild(renderer.domElement);

    camera = new THREE.PerspectiveCamera(45, WIDTH / HEIGHT, 0.1, 20000);
    // camera.position.set(0, 6, 0);
    camera.position.set(6, 6, 65);
    scene.add(camera);

    window.addEventListener('resize', function() {
      var WIDTH = window.innerWidth,
          HEIGHT = window.innerHeight;

      renderer.setSize(WIDTH, HEIGHT);
      camera.aspect = WIDTH / HEIGHT;

      camera.updateProjectionMatrix();
    });

    renderer.setClearColor(0x333F47, 1);

    light = new THREE.PointLight(0xffffff);
    light.position.set(-100, 200, 100);
    scene.add(light);

    var controls = new THREE.OrbitControls(camera, renderer.domElement);

    // hackpack
    var hackpack = new THREE.Object3D();
    // var logoMaterialRed = new THREE.MeshPhongMaterial( { color: 0xFF0000 } );
    var logoMaterialGray = new THREE.MeshPhongMaterial( { color: 0xA9A9A9} );

    var geometry = new THREE.BoxGeometry(10, 12, 6);
    var body = new THREE.Mesh( geometry, logoMaterialGray );
    hackpack.add( body )

    var geometry = new THREE.BoxGeometry(10, 6, 1.5);
    var flap = new THREE.Mesh( geometry, logoMaterialGray );
    flap.position.z = 3.5;
    flap.position.y = 3;
    hackpack.add( flap )

    scene.add(hackpack);

  }

  // repeated methods --> must be called in animate()
  // function spinObject(direction, speed){
  //   var speed = 0.75;
  //
  //   if (direction === "right"){
  //     theLogo.rotation.y += speed * Math.PI/180;
  //   } else if (direction === "left"){
  //     theLogo.rotation.y -= speed * Math.PI/180;
  //   }
  // }

  // function rollObject(direction, speed){
  //   var speed = 0.75;
  //
  //   if (direction === "clockwise"){
  //     theLogo.rotation.z -= speed * Math.PI/180;
  //   } else if (direction === "counter-clockwise") {
  //     theLogo.rotation.z += speed * Math.PI/180;
  //   }
  // }

  // one-time methods --> call outside of animate()
  function lightsOut(){
    console.log("lights out");
    light.intensity = 0.2;
  }

  function lightsOn(){
    console.log("lights on");
    light.intensity = 1.0;
  }

  function clapClap(){
    if (light.intensity === 0.2){
      light.intensity = 1.0;
    } else {
      light.intensity = 0.2;
    }
  }
  //
  // function changeColor(color){
  //
  //   switch (color) {
  //     case "blue":
  //       theLogo.children.forEach(function(mesh){
  //         mesh.material.color.setRGB(0, 0, 1)
  //       })
  //       break;
  //     case "red":
  //       theLogo.children.forEach(function(mesh){
  //         mesh.material.color.setRGB(1, 0, 0)
  //       })
  //       break;
  //     case "green":
  //       theLogo.children.forEach(function(mesh){
  //         mesh.material.color.setRGB(0, 1, 0)
  //       })
  //       break;
  //   }
  // }

  function animate() {
    requestAnimationFrame(animate);

  // REPEATED CONTROLS

  // spinning: left || right
    // spinObject("right");
    // spinObject("left");

  // rolling: clockwise || counter-clockwise
    // rollObject("counter-clockwise");
    // rollObject("clockwise");


    renderer.render(scene, camera);
    // controls.update();
  }

}());
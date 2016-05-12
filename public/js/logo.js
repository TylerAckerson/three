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

    // logo
    theLogo = new THREE.Object3D();
    var logoMaterialRed = new THREE.MeshPhongMaterial( { color: 0xFF0000 } );
    var logoMaterialDarkGray = new THREE.MeshPhongMaterial( { color: 0x808080 } );

    var geometry = new THREE.TorusGeometry(12, 3, 16, 100);
    var torus = new THREE.Mesh( geometry, logoMaterialDarkGray );
    theLogo.add( torus )

    for (var i = 0; i < 4; i++) {
      var geometry = new THREE.SphereGeometry(3.25, 32, 16);
      var sphere = new THREE.Mesh( geometry, logoMaterialRed );

      var offset = 3.5;

      switch (i) {
        case 0:
          sphere.position.x = -offset;
          sphere.position.y = offset;
          break;
        case 1:
          sphere.position.x = offset;
          sphere.position.y = offset;
          sphere.material = new THREE.MeshPhongMaterial( { color: 0xFFFFFF } );
          break;
        case 2:
          sphere.position.x = -offset;
          sphere.position.y = -offset;
          sphere.material = new THREE.MeshPhongMaterial( { color: 0xFFFFFF } );
          break;
        case 3:
          sphere.position.x = offset;
          sphere.position.y = -offset;
          break;
        default:
      }

      theLogo.add( sphere )
    }

    scene.add(theLogo);

  }

  // repeated methods --> must be called in animate()
  function spinObject(direction, speed){
    var speed = 0.75;

    if (direction === "right"){
      theLogo.rotation.y += speed * Math.PI/180;
    } else if (direction === "left"){
      theLogo.rotation.y -= speed * Math.PI/180;
    }
  }

  function rollObject(direction, speed){
    var speed = 0.75;

    if (direction === "clockwise"){
      theLogo.rotation.z -= speed * Math.PI/180;
    } else if (direction === "counter-clockwise") {
      theLogo.rotation.z += speed * Math.PI/180;
    }
  }

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

  function changeColor(color){

    switch (color) {
      case "blue":
        theLogo.children.forEach(function(mesh){
          mesh.material.color.setRGB(0, 0, 1)
        })
        break;
      case "red":
        theLogo.children.forEach(function(mesh){
          mesh.material.color.setRGB(1, 0, 0)
        })
        break;
      case "green":
        theLogo.children.forEach(function(mesh){
          mesh.material.color.setRGB(0, 1, 0)
        })
        break;
    }
  }

  function animate() {
    requestAnimationFrame(animate);

  // REPEATED CONTROLS

  // spinning: left || right
    // spinObject("right");
    spinObject("left");

  // rolling: clockwise || counter-clockwise
    // rollObject("counter-clockwise");
    // rollObject("clockwise");


    renderer.render(scene, camera);
    // controls.update();
  }

}());
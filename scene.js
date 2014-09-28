///////////////////////////////////////////////////////
// Scene class                                       //
//   Primary manager and holder of THREE.js objects  //
///////////////////////////////////////////////////////
scene = function() {
    THREE.Scene.call( this );
}
//
// Class builder functions
/////////////////////////////
scene.prototype = Object.create( THREE.Scene.prototype );
scene.prototype.init = function() {
    // Timing device
    this.clock = new THREE.Clock();

    // Camera
    var camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
        camera.position.set(300,300,150);
        camera.lookAt(new THREE.Vector3(0,0,0));
    this.camera = camera;

    // Renderer
    var renderer = new THREE.WebGLRenderer();
        renderer.setSize( window.innerWidth, window.innerHeight );
        document.body.appendChild( renderer.domElement );
    this.renderer = renderer;

    // Ambient light
    var light = new THREE.AmbientLight( 0x666699 );
    this.add(light);

    var directionalLight = new THREE.PointLight( 0xffffff, 4, 500 );
    directionalLight.position.set( 0, 0, 0 );
    this.add(directionalLight);

    this.controls = new THREE.TrackballControls(this.camera);

    this.planets = [];
}

scene.prototype.setBackground = function(map) {
    // create the geometry sphere
    var geometry  = new THREE.SphereGeometry(400, 32, 32);
    // create the material, using a texture of startfield
    var material  = new THREE.MeshBasicMaterial({
//                            wireframe:true,
                            map: THREE.ImageUtils.loadTexture(map),
                            side: THREE.BackSide
                        });


    var mesh  = new THREE.Mesh(geometry, material);
    this.add(mesh);
}

scene.prototype.render = function() {
    requestAnimationFrame ( this.render.bind(this) );
    this.controls.update();
    delta = this.clock.getDelta();
    for (var a = 0; a < this.planets.length; a++) {
        this.planets[a].update(delta);
    }

    this.renderer.render( this, this.camera );
}

scene.prototype.addObj = function(obj) {
    this.add( obj );
    this.planets.push(obj);
}

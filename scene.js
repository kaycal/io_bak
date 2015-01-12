// TODO Changes;
/*
    - Change options based on defaults or options
        + Galaxy default
    -
*/

///////////////////////////////////////////////////////
// Scene class                                       //
//   Primary manager and holder of THREE.js objects  //
///////////////////////////////////////////////////////
Scene = function(input) {
    THREE.Scene.call( this );


    // Renderer
    var renderer = new THREE.WebGLRenderer();
        renderer.setSize( window.innerWidth, window.innerHeight );
        document.body.appendChild( renderer.domElement );
    this.renderer = renderer;


    // input device
    this.input = input;
    this.camera =  input.camera;

    var objects = input.init();
    for (i = 0; i < objects.length; i++) { 
        this.add(objects[i]);
    }

    // Timing device
    this.clock = new THREE.Clock();

    console.log("Pre-rendering");

    // Controls
    this.controls = new THREE.TrackballControls(this.camera);

    console.log("Rendering");
    this.render();
}
//
// Class builder functions
/////////////////////////////
Scene.prototype = Object.create( THREE.Scene.prototype );

Scene.prototype.render = function() {
    requestAnimationFrame ( this.render.bind(this) );
    this.controls.update(); // phase controls into input
    delta = this.clock.getDelta();

    this.input.update(delta);

    this.renderer.render( this, this.camera );
}

Scene.prototype.playToggle = function(play) {
    this.render();
}

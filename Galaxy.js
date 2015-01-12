///////////////////////////////////////////////////////
// Galaxy class                                      //
//   Primary manager and holder of THREE.js objects  //
///////////////////////////////////////////////////////
Galaxy = function() {
    THREE.Scene.call( this );

    // Set up the renderer
    var renderer = new THREE.WebGLRenderer();
        renderer.setSize( window.innerWidth, window.innerHeight );
        document.body.appendChild( renderer.domElement );
    this.renderer = renderer;

    // Set up the camera

    // Timing device
    this.clock = new THREE.Clock();

    // Controls
    this.controls = new THREE.TrackballControls(this.camera);

    /*
        Add planets, and call back to renderer when done
    */
    this.updater = []
    this.updater.push(new Planet({}));

}
//
// Class builder functions
/////////////////////////////
Galaxy.prototype = Object.create( THREE.Scene.prototype );

Galaxy.prototype.render = function() {
    requestAnimationFrame ( this.render.bind(this) );
    this.controls.update(); // phase controls into input
    delta = this.clock.getDelta();
    this.renderer.render( this, this.camera );
}

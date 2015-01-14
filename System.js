System = function(url) {
    /*
        Set up the basics for the scene, including;
            - Parent call
            - Camera
            - Renderer
            - Clock
    */
    THREE.Scene.call( this );

    // Change this to fit out skybox; 2200 for 1000 skybubble seems good
    var camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 ); // Holes appear just outside of skybubble
        camera.position.set(300,300,150);
        camera.lookAt(new THREE.Vector3(0,0,0));
    this.camera = camera;

    var renderer = new THREE.WebGLRenderer();
        renderer.setSize( window.innerWidth, window.innerHeight );
    document.body.appendChild( renderer.domElement );
    this.renderer = renderer;

    this.clock = new THREE.Clock();
    this.controls = new THREE.TrackballControls(this.camera);

    this.planets = [];

    $.getJSON(url, this.loadSystem.bind(this));

    // Get vital stats
    //  Planets
}



//
// Class builder functions
/////////////////////////////
System.prototype = Object.create( THREE.Scene.prototype );

System.prototype.loadSystem = function(stats) {

    var pl = new THREE.PointLight( 0xffffff, 4, 1000 );
    pl.position.set( 0, 0, 0);
    this.add(pl); // set position.set( 0, 0, 0 );

    p = new Planet(this.add.bind(this)); // Create new planet w/ added "add me" callback
    this.planets.push(p);
}

System.prototype.render = function() {
    requestAnimationFrame ( this.render.bind(this) );
    this.controls.update()
    delta = this.clock.getDelta();
    for (i=0;i<this.planets.length;i++) {
        this.planets[i].update(delta);
    }
    this.renderer.render( this, this.camera );
}

System.prototype.playToggle = function(playBool, timeFrame) { // This should eventually switch out to an actual toggle
    this.render();
}

Galaxy = function(url) {
    THREE.Scene.call( this );
    // Set default values and standards;
    //  Camera
    var camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 2300 ); // Holes appear just outside of skybubble
        camera.position.set(300,300,150);
        camera.lookAt(new THREE.Vector3(0,0,0));
    this.camera = camera;

    //  Renderer
    var renderer = new THREE.WebGLRenderer();
        renderer.setSize( window.innerWidth, window.innerHeight );
        document.body.appendChild( renderer.domElement );
    this.renderer = renderer;

    //  Clock & Controls
    this.clock = new THREE.Clock();
    this.controls = new THREE.TrackballControls(this.camera);

    // Get vital stats
    //  Planets
    
    $.getJSON(url, function(data) {
        console.log(data);
    })

    // ambient light
    this.add(new THREE.AmbientLight( 0x666699 ));

    // Point light
    var pl = new THREE.PointLight( 0xffffff, 4, 1000 );
    pl.position.set( 0, 0, 0);
    this.add(pl); // set position.set( 0, 0, 0 );



    this.planets = [];
    p = new Planet(this.add.bind(this));
    this.planets.push(p);
/*
    for (i=0;i<this.planets.length;i++) {
        this.add(this.planets[i]);
    } */
//    console.log(this.planets[0]);
}
//
// Class builder functions
/////////////////////////////
Galaxy.prototype = Object.create( THREE.Scene.prototype );

Galaxy.prototype.render = function() {
    requestAnimationFrame ( this.render.bind(this) );
    this.controls.update()
    delta = this.clock.getDelta();
    for (i=0;i<this.planets.length;i++) {
        this.planets[i].update(delta);
    }
    this.renderer.render( this, this.camera );
}

Galaxy.prototype.playToggle = function(playBool, timeFrame) {
    this.render();
}

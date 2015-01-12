Galaxy = function() {
                //    THREE.PerspectiveCamera()
    this.camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 2300 ); // Holes appear just outside of skybubble
    this.camera.position.set(300,300,150);
    this.camera.lookAt(new THREE.Vector3(0,0,0));

    // Add planets to update list
    // Later, do a for-in, referring to creation function or something
    this.updater = []
    this.updater.push(new Planet({}));
};

//Galaxy.prototype = Object.create( Galaxy.prototype ); // THIS THINGS TODO
Galaxy.prototype.init = function() {
    var objects = [];
    // for item in this.updater, add to objects list
    for (i=0;i<this.updater.length;i++) {
        this.updater[i].init();
        objects.push(this.updater[i]);
    }

    // Add background
    var geometry  = new THREE.SphereGeometry(1000, 32, 32);
    // create the material, using a texture of startfield
    var material  = new THREE.MeshBasicMaterial({
                            wireframe:true,
//                            map: THREE.ImageUtils.loadTexture("starfield.png"),
                            side: THREE.BackSide
                        });
    objects.push(new THREE.Mesh(geometry, material));

    // ambient light
    objects.push(new THREE.AmbientLight( 0x666699 ));

    // Point light
    objects.push(new THREE.PointLight( 0xffffff, 4, 1000 )) // set position.set( 0, 0, 0 );
    objects[objects.length-1].position.set( 0, 0, 0 );

    return objects;
};

Galaxy.prototype.update = function(delta) {
// update each of the plnets in turn
    // for each in this.objects, object.update(delta);
    for (var a = 0; a < this.updater.length; a++) {
        try {
            this.updater[a].update(delta);
        } catch(err) {
            console.log(err);
        }
    }
};

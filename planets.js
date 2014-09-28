// If called without arguments, present a blank, basic "test" object
Planet = function(args) {
    THREE.Object3D.call( this );
    this.pName = args.pName || "earth";
    this.pSize = args.pSize || 30;
    this.effects = {
        core:null,
        atmo:null,
        sea:null,
        orbit:null,
    }
}

Planet.prototype = Object.create( THREE.Object3D.prototype );

Planet.prototype.update = function() {
    this.rotation.x+=0.01;
    this.atmo.rotation.y+=0.01;
    this.atmo.rotation.x-=0.02;
}


//
// Aesthetic functions
//////////////////////
Planet.prototype.addCore = function(cMap) {
    var geometry = new THREE.SphereGeometry(this.pSize,30,30);
    var material = new THREE.MeshPhongMaterial( {
                            map: THREE.ImageUtils.loadTexture(cMap)
                        } );
    var earth = new THREE.Mesh( geometry, material );
    this.core = earth;
    this.add(this.core);
}

Planet.prototype.addAtmo = function(cMap) {
    var geometry = new THREE.SphereGeometry(this.pSize+0.5,30,30);
    var material = new THREE.MeshPhongMaterial( {
                            map: THREE.ImageUtils.loadTexture(cMap),
                            side: THREE.DoubleSide,
                            transparent: true,
                            opacity: 0.3,
                        } );
    var earth = new THREE.Mesh( geometry, material );
    this.atmo = earth;
    this.add(this.atmo);
}

Planet.prototype.addSea = function() {

}

Planet.prototype.addOrbit = function() {

}

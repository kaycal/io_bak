// If called without arguments, present a blank, basic "test" object
Planet = function(args) {
    THREE.Object3D.call( this );

    this.description = {
        name:args.name,
    }

    this.positional = {
        size: args.size || 20,
        asympX: args.aX || 0,
        asympY: args.aY || 0,
        zTilt: args.zT  || 0,
        period: args.oP || 1,
        rad: 1.5 * Math.PI // Change this to birthday
    }
    
    this.effects = {
        core:null,
        atmo:null,
        sea:null,
    }
}

Planet.prototype = Object.create( THREE.Object3D.prototype );


//
// Aesthetic functions
//////////////////////
Planet.prototype.addCore = function(map) {
    var geometry = new THREE.SphereGeometry(this.positional.size,30,30);
    var material = new THREE.MeshPhongMaterial( {
                            map: THREE.ImageUtils.loadTexture(map.cMap),
                            emissive:map.emissive || null,
                            specularMap: THREE.ImageUtils.loadTexture(map.sMap) || null,
                            shininess: 100
                        } );
    var core = new THREE.Mesh( geometry, material );
    this.core = core;
    this.add(this.core);
}

Planet.prototype.addAtmo = function(cMap) {
    var geometry = new THREE.SphereGeometry(this.positional.size+1,30,30);
    var material = new THREE.MeshPhongMaterial( {
                            map: THREE.ImageUtils.loadTexture(cMap),
                            side: THREE.DoubleSide,
                            transparent: true,
                            opacity: 0.3,
                            shininess:0,
                        } );
    var earth = new THREE.Mesh( geometry, material );
    this.atmo = earth;
    this.add(this.atmo);
}

Planet.prototype.addSea = function() {

}


//
// Utility functions
/////////////////////
Planet.prototype.update = function(delta) {
    this.rotation.y+=0.01;

//  for prop in this.effects:
//    this.atmo.rotation.y+=0.01;
//    this.atmo.rotation.x-=0.02;
    this.positional.rad = this.positional.rad + (delta*2*Math.PI)/this.positional.period;
    // theta = theta % (Math.PI*2)
    this.position = this.getPos(this.positional.rad);
}

Planet.prototype.getPos = function(theta) {
    var x, y, z; // Coordinates
    var r,
        a = this.positional.asympX,
        b = this.positional.asympX; // Units for calculating position
    r = (a*b)/Math.sqrt(
                        Math.pow(a,2)*Math.pow(Math.sin(theta),2) + 
                        Math.pow(b,2)*Math.pow(Math.cos(theta),2)
                        )
    x = r*Math.sin(theta);
    y = r*Math.cos(theta);
    z = 0;
    return new THREE.Vector3(x,0,y);
}

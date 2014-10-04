// If called without arguments, present a blank, basic "test" object
Planet = function(args) {
    THREE.Object3D.call( this );

    this.description = {
        name:args.name,
    };

    this.positional = {
        size: args.size || 20,
        asympX: args.aX || 0,
        asympY: args.aY || 0,
        zTilt: args.zT  || 0,
        period: args.oP || 1,
        rad: 1.5 * Math.PI // Change this to birthday
    };
    
    this.effects = [];
}

Planet.prototype = Object.create( THREE.Object3D.prototype );


//
// Aesthetic functions
//////////////////////
Planet.prototype.addCore = function(maps,cRate) {
    var geometry = new THREE.SphereGeometry(this.positional.size,30,30);
    var material = new THREE.MeshPhongMaterial( {
                            map: THREE.ImageUtils.loadTexture(maps.cMap),
                            emissive:maps.emissive || null,
//                            specularMap: THREE.ImageUtils.loadTexture(maps.sMap) || null,
//                            shininess: 100
                        } );
    var core = new THREE.Mesh( geometry, material );
    core.cRate = cRate; // Rate of change
    this.effects.push(core);
    this.add(core);
}

Planet.prototype.addAtmo = function(maps,cRate) {
    var geometry = new THREE.SphereGeometry(this.positional.size+1,30,30);
    var material = new THREE.MeshPhongMaterial( {
                            map: THREE.ImageUtils.loadTexture(maps.cMap),
                            side: THREE.DoubleSide,
                            transparent: true,
                            opacity: 0.3,
                            shininess:0,
                        } );
    var atmo = new THREE.Mesh( geometry, material );
    atmo.cRate = cRate; // Rate of change
    this.effects.push(atmo);
    this.add(atmo);
}

Planet.prototype.addSea = function() {
    // this is going to be fun to do but a pain in the ass
    // check out custom shaders later. should be more interesting
    //   than just a specmap or something
}

Planet.prototype.addeffect = function(type,cRate) {
    // match type against sea/core/atmo
    // set custom rate of change
    // Above named functions (addatmo/sea/etc) should ideally return their respective effects;
    //   addeffect will then add them, like this.<type> = addAtmo(args)
}

//
// Utility functions
/////////////////////
Planet.prototype.update = function(delta) {
    this.rotation.y+=0.01;

//  for prop in this.effects:
//    this.prop.rotation.y+=0.01;
//    this.prop.rotation.x-=0.02;
    for (prop in this.effects) {
    	var p = this.effects[prop];
    	p.rotation.y+=0.01*p.cRate*delta;
    	p.rotation.x-=0.02*p.cRate*delta;
    }
    


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

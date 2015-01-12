Planet = function() {
    THREE.Object3D.call( this );

    // Change this to new shader types
    this.tex2 = THREE.ImageUtils.loadTexture( "nightlights.jpg" );
    this.tex = THREE.ImageUtils.loadTexture( "mainmap.jpg" );
};

Planet.prototype = Object.create( THREE.Object3D.prototype );

Planet.prototype.init = function() {
    // Create Ball
    var vertShader = document.getElementById('defaultVertexShader').innerHTML;
    var fragShader = document.getElementById('defaultFragmentShader').innerHTML;

    var uniforms = THREE.UniformsUtils.merge([
    THREE.UniformsLib["lights"],
    {
        texture: { type: 't', value: this.tex },
        texture2: { type: 't', value: this.tex2 },
        time: { type: 'f', value: 1.0 },
    }]);

    var material = new THREE.ShaderMaterial({
        uniforms: uniforms,
        vertexShader: vertShader,
        fragmentShader: fragShader,
        lights: true,
    });

    // Problem area?
    
    material.uniforms.texture.value.needsUpdate = true;
    material.uniforms.texture2.value.needsUpdate = true;
    material.uniforms.time.value.needsUpdate = true;

    //



    this.add(new THREE.Mesh(new THREE.SphereGeometry(30, 30, 30), material));
    console.log("Race conditions?");
}

Planet.prototype.update = function(delta) {
    this.position.set(150,0,0);
    this.rotation.y +=0.5 * delta;
};

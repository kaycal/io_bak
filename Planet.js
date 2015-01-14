Planet = function(callback) {
    THREE.Object3D.call( this );

    var tex2 = THREE.ImageUtils.loadTexture( "nightlights.jpg");
        tex2.needsUpdate = true;
    var tex = THREE.ImageUtils.loadTexture( "mainmap.jpg");
        tex.needsUpdate = true;

    var vertShader = document.getElementById('defaultVertexShader').text;
    var fragShader = document.getElementById('defaultFragmentShader').text;

    var uniforms = THREE.UniformsUtils.merge([
            THREE.UniformsLib["lights"],
                            {
                                texture: { type: 't', value: tex },
                                texture2: { type: 't', value: tex2 },
                                time: { type: 'f', value: 1.0 },
                            }
        ]);

    material = new THREE.ShaderMaterial({
        uniforms: uniforms,
        vertexShader: vertShader,
        fragmentShader: fragShader,
        lights: true,
    });

    material.uniforms.texture.value.needsUpdate = true;
    material.uniforms.texture2.value.needsUpdate = true;
    material.uniforms.time.value.needsUpdate = true;

    this.add(new THREE.Mesh(new THREE.SphereGeometry(30, 30, 30), material));
    callback(this);
};

Planet.prototype = Object.create( THREE.Object3D.prototype );

Planet.prototype.update = function(delta) {
    this.position.set(150,0,0);
    this.rotation.y +=0.5 * delta;
};

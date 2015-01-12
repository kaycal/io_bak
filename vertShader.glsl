varying vec2 vUv;
varying vec3 vNormal;
varying vec3 vPos;

void main() {
    vUv = uv;
    vPos = (modelMatrix * vec4(position, 1.0 )).xyz;
    vNormal = (modelMatrix * vec4(normal, 0.0)).xyz;

    gl_Position = projectionMatrix *
        modelViewMatrix *
        vec4(position,1.0);
}

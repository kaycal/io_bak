
        uniform sampler2D texture;
        uniform sampler2D texture2;
        uniform float time;
        varying vec3 vNormal;
        varying vec2 vUv;

        varying vec3 vPos;
        uniform vec3 pointLightColor[MAX_POINT_LIGHTS];
        uniform vec3 pointLightPosition[MAX_POINT_LIGHTS];
        uniform float pointLightDistance[MAX_POINT_LIGHTS];

        void main() {

                // Spawn the lights that will be used later in calcs
                vec3 lightDirection;
                vec4 addedLights = vec4(0.0,0.0,0.0, 1.0);
                for(int l = 0; l < MAX_POINT_LIGHTS; l++) {
                    lightDirection = normalize(vPos
                                          -pointLightPosition[l]);
                    addedLights.rgb += clamp(dot(-lightDirection,
                                             vNormal), 0.0, 1.0)
                                       * pointLightColor[l];

                }

                // Construct the lights
                vec4 lights = clamp(addedLights,0.1,1.0);

                // Set up our base-layer w/ light
                vec3 dayComponent = texture2D( texture, vUv ).rgb;
                vec4 dayColors = vec4( dayComponent, 1.0 ) * lights;

                // Set up the night lights
                vec3 nightComponent = texture2D( texture2, vUv ).rgb;
                vec4 nightColors = vec4(nightComponent,1.0) * (1.0 - lights);

                // Add the results;
                gl_FragColor = dayColors + nightColors;

        }

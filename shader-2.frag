precision highp float;
    //varying vec2 vUv;
    uniform float time;
    uniform float scale;
    uniform vec2 resolution;
    uniform vec3 color1, color2, color3, color4;
    uniform int numOctaves;
    const float PI = 3.141592654;
    uniform float ax, ay, az, aw;
    uniform float bx, by;
    
    // just a bunch of sin & cos to generate an interesting pattern
    float cheapNoise(vec3 stp) {
      vec3 p = vec3(stp.st, stp.p);
      vec4 a = vec4(ax, ay, az, aw);
      return mix(
        sin(p.z + p.x * a.x + cos(p.x * a.x - p.z)) * 
        cos(p.z + p.y * a.y + cos(p.y * a.x + p.z)),
        sin(1. + p.x * a.z + p.z + cos(p.y * a.w - p.z)) * 
        cos(1. + p.y * a.w + p.z + cos(p.x * a.x + p.z)), 
        .436
      );
    }
    
    void main() {
      
      vec2 aR = vec2(resolution.x/resolution.y, 1.);
      //vec2 st = vUv * aR * scale;
      //vec2 st = aR * scale;
      float S = sin(time * .005);
      float C = cos(time * .005);
      vec2 v1 = vec2(cheapNoise(vec3(st, 2.)), cheapNoise(vec3(st, 1.)));
      vec2 v2 = vec2(
        cheapNoise(vec3(st + bx*v1 + vec2(C * 1.7, S * 9.2), 0.15 * time)),
        cheapNoise(vec3(st + by*v1 + vec2(S * 8.3, C * 2.8), 0.126 * time))
      );
      float n = .5 + .5 * cheapNoise(vec3(st + v2, 0.));
      
      vec3 color = mix(color1,
        color2,
        clamp((n*n)*8.,0.0,1.0));

      color = mix(color,
        color3,
        clamp(length(v1),0.0,1.0));

      color = mix(color,
                color4,
                clamp(length(v2.x),0.0,1.0));
      
      //       color *= n * n * n + .6  * n * n + .5 * n;
      color /= n*n + n * 7.;
      gl_FragColor = vec4(color,1.);
    }
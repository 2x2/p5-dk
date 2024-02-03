#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform float u_time;

void main(void) {
    vec2 coord = gl_FragCoord.xy / u_resolution;
    
    vec3 line = vec3(0.0);
    
    coord *= 4.5;
    
    float len;
    
    for (int i = 0; i < 3; i++) {
        len = length(vec2(coord.x, coord.y));
        
        coord.x +=  sin(coord.y + u_time * 0.3)*5.;
        coord.y +=  cos(coord.x + u_time * 0.1 + cos(len * 2.0))*2.;
    }
    
    vec3 color = vec3(cos(len + 0.3), cos(len + 0.1), cos(len - 0.1));
    
    gl_FragColor = vec4(color, 1.0);
}
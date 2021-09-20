#define PI 3.1415926538
uniform float uTime;

varying vec2 vUv;
  
 

void main() {

  vec4 modelPosition = modelMatrix * vec4(position, 1.0);
    
    vec4 viewPosition = viewMatrix * modelPosition;
    vec4 projectionPosition = projectionMatrix * viewPosition;

    gl_Position = projectionPosition;

    gl_PointSize = 10.0;

    vUv = uv;
}
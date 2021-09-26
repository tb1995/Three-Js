#define PI 3.1415926538
uniform float uTime;
uniform float uSize;

attribute float aScale;


varying vec2 vUv;
  
 

void main() {

  vec4 modelPosition = modelMatrix * vec4(position, 1.0);
    

    float angle = atan(modelPosition.x, modelPosition.z);
    float distance = length(modelPosition.xz);

    float angleOffset = (1.0 / distance) * uTime * 10.0;
    angle += angleOffset;

    modelPosition.x = cos(angle) * distance;
    modelPosition.y = sin(angle) * distance;

    vec4 viewPosition = viewMatrix * modelPosition;
    vec4 projectionPosition = projectionMatrix * viewPosition;

    gl_Position = projectionPosition;

    //  gl_PointSize = aScale * uSize;
    // gl_PointSize *= (1.0 / - viewPosition.z);

    gl_PointSize = 2.0;
    vUv = uv;
}
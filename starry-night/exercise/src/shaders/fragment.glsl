#define PI 3.1415926538
precision mediump float;

varying vec2 vUv;
float strength;

void main() {

    //  vec2 newUV = vec2(vUv.x-0.5, vUv.y-0.5);
         vec2 newUV = vec2(vUv.x, vUv.y);

    // horizontal gradient
    // strength = vUv.x;

    // vertical gradient
    // strength = vUv.y;

    // reverse vertical gradient
    // strength = 1.0-vUv.y;
    
    // weird vertical pattern, lil black but mostly white
    //strength = vUv.y * 10.0;

    // higher frequency. looks a bit like horizontal blinds
    // strength = mod(vUv.y * 10.0, 1.0);

    // looks more like a zebra crossing now, because it's not a smooth drop off
    // strength = step(mod(vUv.y * 10.0, 1.0), 0.5);

    // same as above, but thinner white lines
    // strength = step(mod(vUv.y * 10.0, 1.0), 0.2);

    strength = step(mod(vUv.x * 10.0, 1.0), 0.2);

    gl_FragColor = vec4(strength, strength, strength, 1.0);



}
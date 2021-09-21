#define PI 3.1415926538
precision mediump float;

varying vec2 vUv;
float strength;
float strength2;

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

    // same as above, but lines are vertical instead of horizontal
    // strength = step(mod(vUv.x * 10.0, 1.0), 0.2);

    // combining the two, kind of makes it a waffle. If you check later to see that it doesn't match the exact pattern in the exercise, it's because you need to flip the arguments in step
    // strength = step(mod(vUv.x * 10.0, 1.0), 0.2);
    // strength = strength + (step(mod(vUv.y * 10.0, 1.0), 0.2));

    // square grid
    // strength = step(mod(vUv.x * 10.0, 1.0), 0.2);
    // strength = strength * step(mod(vUv.y * 10.0, 1.0), 0.2);

    // horizontal dashed pattern
     strength2 = step(mod(vUv.x * 10.0, 1.0), 0.3);
     strength2 = strength2 * (step(mod(vUv.y * 10.0, 1.0), 0.7));


    strength = step(mod(vUv.x * 10.0, 1.0), 0.7);
    strength = (strength * step(mod(vUv.y * 10.0, 1.0), 0.3));// * strength2;
    strength = strength2 + strength;
    // strength = 1.0 - strength;




    gl_FragColor = vec4(strength, strength, strength, 1.0);




}
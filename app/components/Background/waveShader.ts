// /app/components/Background/shaders/waveShader.ts

export const vertexShader = `
  uniform float time;
  uniform vec2 mouse;
  varying vec2 vUv;
  
  void main() {
    vUv = uv;
    vec3 pos = position;
    // Вычисляем расстояние от uv до положения мыши
    float dist = distance(uv, mouse);
    // Добавляем волновое искажение: синус + локальное влияние мыши
    pos.z += sin(pos.x * 2.0 + time) * 0.3 + exp(-dist * 10.0) * 0.5;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
  }
`;

export const fragmentShader = `
  precision mediump float;
  varying vec2 vUv;
  
  void main() {
    // Просто раскрашиваем плоскость по UV
    gl_FragColor = vec4(vUv, 1.0, 1.0);
  }
`;
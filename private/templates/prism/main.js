(() => {
  const el = document.getElementById('clock');
  function tick() {
    el.textContent = new Date().toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit', timeZoneName: 'short' }).replace(',', '');
  }
  tick(); setInterval(tick, 30000);
})();

/* spectral wash — light through a prism on a dark wall, very low key */
(() => {
  if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  const canvas = document.getElementById('glc');
  const gl = canvas.getContext('webgl', { antialias: false, premultipliedAlpha: true });
  if (!gl) return;

  const VS = 'attribute vec2 p;void main(){gl_Position=vec4(p,0.,1.);}';
  const FS = `
precision highp float;
uniform vec2 R;uniform float T;
float h(vec2 p){return fract(sin(dot(p,vec2(127.1,311.7)))*43758.5453);}
float n(vec2 p){vec2 i=floor(p),f=fract(p);f=f*f*(3.-2.*f);
return mix(mix(h(i),h(i+vec2(1,0)),f.x),mix(h(i+vec2(0,1)),h(i+vec2(1,1)),f.x),f.y);}
float fbm(vec2 p){float v=0.,a=.5;for(int i=0;i<4;i++){v+=a*n(p);p=p*2.07+13.;a*=.5;}return v;}
vec3 hsv(float hu,float s,float v){
  vec3 k=fract(vec3(5.,3.,1.)+hu*6.)*6.;
  return v-v*s*clamp(min(k,4.-k),0.,1.);
}
void main(){
  vec2 uv=gl_FragCoord.xy/R;
  vec2 p=uv*vec2(R.x/R.y,1.)*1.2;
  float t=T*.03;
  vec2 q=vec2(fbm(p+t),fbm(p+vec2(4.7,2.1)-t*.6));
  vec2 w=p+2.2*q;
  float band=fbm(w*1.5+vec2(t*.8,0.));
  float i=smoothstep(.48,.9,band);
  float hu=fract(fbm(w*.7)+t*.15);
  vec3 col=hsv(hu,.7,1.);
  float corner=smoothstep(1.5,.2,distance(uv,vec2(.85,.8)))*.7+smoothstep(1.6,.1,distance(uv,vec2(.1,.15)))*.5;
  float a=i*corner*.12;
  gl_FragColor=vec4(col*a,a);
}`;
  function sh(type, src) {
    const s = gl.createShader(type);
    gl.shaderSource(s, src); gl.compileShader(s);
    return gl.getShaderParameter(s, gl.COMPILE_STATUS) ? s : null;
  }
  const vs = sh(gl.VERTEX_SHADER, VS), fs = sh(gl.FRAGMENT_SHADER, FS);
  if (!vs || !fs) return;
  const pr = gl.createProgram();
  gl.attachShader(pr, vs); gl.attachShader(pr, fs); gl.linkProgram(pr);
  if (!gl.getProgramParameter(pr, gl.LINK_STATUS)) return;
  gl.useProgram(pr);
  gl.bindBuffer(gl.ARRAY_BUFFER, gl.createBuffer());
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1,-1, 3,-1, -1,3]), gl.STATIC_DRAW);
  const loc = gl.getAttribLocation(pr, 'p');
  gl.enableVertexAttribArray(loc);
  gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);
  const uR = gl.getUniformLocation(pr, 'R'), uT = gl.getUniformLocation(pr, 'T');

  function resize() {
    const s = 0.3;
    canvas.width = Math.max(2, canvas.clientWidth * s);
    canvas.height = Math.max(2, canvas.clientHeight * s);
    gl.viewport(0, 0, canvas.width, canvas.height);
  }
  resize();
  addEventListener('resize', resize);

  (function frame(t) {
    gl.uniform2f(uR, canvas.width, canvas.height);
    gl.uniform1f(uT, t / 1000);
    gl.drawArrays(gl.TRIANGLES, 0, 3);
    requestAnimationFrame(frame);
  })(0);
})();

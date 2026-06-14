/* the ember flows — warm noise field inside a feathered disc */
(() => {
  if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  const canvas = document.getElementById('emberGl');
  const gl = canvas.getContext('webgl', { antialias: false, premultipliedAlpha: true });
  if (!gl) return;

  const css = getComputedStyle(document.documentElement);
  const hex = v => {
    const h = css.getPropertyValue(v).trim().replace('#', '');
    return [0, 2, 4].map(i => parseInt(h.slice(i, i + 2), 16) / 255);
  };

  const VS = 'attribute vec2 p;void main(){gl_Position=vec4(p,0.,1.);}';
  const FS = `
precision highp float;
uniform vec2 R;uniform float T;
uniform vec3 A,B,C,D;
float h(vec2 p){return fract(sin(dot(p,vec2(127.1,311.7)))*43758.5453);}
float n(vec2 p){vec2 i=floor(p),f=fract(p);f=f*f*(3.-2.*f);
return mix(mix(h(i),h(i+vec2(1,0)),f.x),mix(h(i+vec2(0,1)),h(i+vec2(1,1)),f.x),f.y);}
float fbm(vec2 p){float v=0.,a=.5;for(int i=0;i<4;i++){v+=a*n(p);p=p*2.05+7.;a*=.5;}return v;}
void main(){
  vec2 uv=gl_FragCoord.xy/R;
  vec2 p=uv*2.2;
  float t=T*.05;
  vec2 q=vec2(fbm(p+t),fbm(p+vec2(3.7,1.9)-t*.8));
  vec2 w=p+2.0*q;
  float n1=fbm(w+t*.4);
  float n2=fbm(w*1.3+vec2(6.1,2.4)-t*.3);
  vec3 col=mix(mix(A,B,smoothstep(.25,.75,n1)),mix(C,D,smoothstep(.3,.7,n2)),smoothstep(.35,.65,fbm(w+vec2(2.2,5.5))));
  float a=smoothstep(1.,.35,distance(uv,vec2(.5))*2.);
  a*=.9;
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
  [['A','--e1'],['B','--e2'],['C','--e3'],['D','--e4']].forEach(([u, v]) =>
    gl.uniform3fv(gl.getUniformLocation(pr, u), hex(v)));

  document.body.classList.add('gl-on');

  function resize() {
    const s = 0.25;
    canvas.width = Math.max(2, canvas.clientWidth * s);
    canvas.height = Math.max(2, canvas.clientHeight * s);
    gl.viewport(0, 0, canvas.width, canvas.height);
  }
  resize();
  addEventListener('resize', resize);

  let on = false, raf = 0;
  function frame(t) {
    gl.uniform2f(uR, canvas.width, canvas.height);
    gl.uniform1f(uT, t / 1000);
    gl.drawArrays(gl.TRIANGLES, 0, 3);
    if (on) raf = requestAnimationFrame(frame);
  }
  new IntersectionObserver(es => {
    const vis = es.some(e => e.isIntersecting);
    if (vis && !on) { on = true; raf = requestAnimationFrame(frame); }
    if (!vis && on) { on = false; cancelAnimationFrame(raf); }
  }).observe(canvas);
})();

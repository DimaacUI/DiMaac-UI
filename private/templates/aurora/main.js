(() => {
  if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  const canvas = document.getElementById('glow');
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
float fbm(vec2 p){float v=0.,a=.5;for(int i=0;i<4;i++){v+=a*n(p);p=p*2.03+11.;a*=.5;}return v;}
/* smooth cyclic palette across x — the vertical color bands */
vec3 pal(float u){
  u=fract(u);
  vec3 c=mix(A,B,smoothstep(.0,.27,u));
  c=mix(c,C,smoothstep(.27,.54,u));
  c=mix(c,D,smoothstep(.54,.8,u));
  c=mix(c,A,smoothstep(.8,1.,u));
  return c;
}
void main(){
  vec2 uv=gl_FragCoord.xy/R;
  float ar=R.x/R.y;
  float t=T*.14;

  /* curtains sway: x displaced by layered waves that depend on height */
  float sway = sin(uv.y*2.6+t)*.05
             + sin(uv.y*5.7-t*1.35+1.7)*.028
             + (fbm(vec2(uv.x*1.4+t*.12,uv.y*.8))-.5)*.16;
  float x = uv.x + sway;

  /* slow sideways drift so the bands migrate like a wave train */
  vec3 col = pal(x*.85 + t*.045);
  col = mix(col, vec3(1.), .08);

  /* vertical filaments — fine streaks rising through the curtains */
  float fil = n(vec2(x*ar*26., uv.y*2.2 - t*.5));
  float fil2= n(vec2(x*ar*9. + 4.2, uv.y*1.2 + t*.3));
  float curtain = .62 + .38*smoothstep(.25,.8,fbm(vec2(x*5.,t*.35)));
  col *= .88 + .12*fil;

  float glow = .8 + .2*fil2;
  float a = smoothstep(1.,.58,uv.y);       /* melt into the page above */
  a *= curtain*glow;
  a = clamp(a,0.,1.);
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
  [['A','--g1'],['B','--g2'],['C','--g3'],['D','--g4']].forEach(([u, v]) =>
    gl.uniform3fv(gl.getUniformLocation(pr, u), hex(v)));

  document.body.classList.add('gl-on');

  function resize() {
    const s = 0.4; // render low-res; the blur upscales it for free
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

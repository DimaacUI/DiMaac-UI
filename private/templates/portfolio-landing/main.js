/* Mara Vance — portfolio landing */
(function () {
  "use strict";

  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const isTouch = window.matchMedia("(hover: none), (pointer: coarse)").matches;
  const hasGSAP = typeof gsap !== "undefined";

  if (hasGSAP && typeof ScrollTrigger !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
  }

  /* ============ WebGL background (Three.js shader plane) ============ */
  function initGL() {
    const canvas = document.getElementById("gl");
    if (typeof THREE === "undefined" || prefersReducedMotion) {
      if (canvas) canvas.style.background =
        "radial-gradient(80% 60% at 70% 20%, rgba(200,240,74,0.08), transparent), #0b0b0d";
      return;
    }

    const renderer = new THREE.WebGLRenderer({ canvas, antialias: false });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, isTouch ? 1.5 : 2));
    renderer.setSize(window.innerWidth, window.innerHeight);

    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);

    const uniforms = {
      uTime: { value: 0 },
      uRes: { value: new THREE.Vector2(window.innerWidth, window.innerHeight) },
      uMouse: { value: new THREE.Vector2(0.5, 0.5) },
      uScroll: { value: 0 },
    };

    const material = new THREE.ShaderMaterial({
      uniforms,
      vertexShader: `
        void main() { gl_Position = vec4(position, 1.0); }
      `,
      fragmentShader: `
        precision highp float;
        uniform float uTime;
        uniform vec2 uRes;
        uniform vec2 uMouse;
        uniform float uScroll;

        // 2D simplex-style noise
        vec3 permute(vec3 x) { return mod(((x*34.0)+1.0)*x, 289.0); }
        float snoise(vec2 v) {
          const vec4 C = vec4(0.211324865405187, 0.366025403784439, -0.577350269189626, 0.024390243902439);
          vec2 i = floor(v + dot(v, C.yy));
          vec2 x0 = v - i + dot(i, C.xx);
          vec2 i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
          vec4 x12 = x0.xyxy + C.xxzz;
          x12.xy -= i1;
          i = mod(i, 289.0);
          vec3 p = permute(permute(i.y + vec3(0.0, i1.y, 1.0)) + i.x + vec3(0.0, i1.x, 1.0));
          vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy), dot(x12.zw,x12.zw)), 0.0);
          m = m*m; m = m*m;
          vec3 x = 2.0 * fract(p * C.www) - 1.0;
          vec3 h = abs(x) - 0.5;
          vec3 ox = floor(x + 0.5);
          vec3 a0 = x - ox;
          m *= 1.79284291400159 - 0.85373472095314 * (a0*a0 + h*h);
          vec3 g;
          g.x = a0.x * x0.x + h.x * x0.y;
          g.yz = a0.yz * x12.xz + h.yz * x12.yw;
          return 130.0 * dot(m, g);
        }

        void main() {
          vec2 uv = gl_FragCoord.xy / uRes;
          vec2 p = uv;
          p.x *= uRes.x / uRes.y;

          float t = uTime * 0.08;
          float drift = uScroll * 0.6;

          // layered flowing noise
          float n1 = snoise(p * 1.2 + vec2(t, -t * 0.7) + drift);
          float n2 = snoise(p * 2.4 - vec2(t * 0.6, t) + n1 * 0.45);
          float n = n1 * 0.65 + n2 * 0.35;

          // mouse glow
          vec2 m = uMouse;
          m.x *= uRes.x / uRes.y;
          float md = distance(p, m);
          float glow = smoothstep(0.65, 0.0, md) * 0.5;

          vec3 base = vec3(0.043, 0.043, 0.051);          // #0b0b0d
          vec3 deep = vec3(0.07, 0.09, 0.06);             // moss shadow
          vec3 lime = vec3(0.784, 0.941, 0.290);          // #c8f04a
          vec3 violet = vec3(0.23, 0.21, 0.36);

          vec3 col = base;
          col = mix(col, deep, smoothstep(-0.4, 0.8, n));
          col = mix(col, violet, smoothstep(0.35, 0.95, n2) * 0.35);
          col += lime * smoothstep(0.55, 1.0, n) * 0.16;
          col += lime * glow * 0.22;

          // vignette
          float vig = smoothstep(1.25, 0.35, distance(uv, vec2(0.5)));
          col *= mix(0.75, 1.0, vig);

          gl_FragColor = vec4(col, 1.0);
        }
      `,
    });

    scene.add(new THREE.Mesh(new THREE.PlaneGeometry(2, 2), material));

    const mouse = { x: 0.5, y: 0.5, tx: 0.5, ty: 0.5 };
    window.addEventListener("pointermove", (e) => {
      mouse.tx = e.clientX / window.innerWidth;
      mouse.ty = 1 - e.clientY / window.innerHeight;
    });

    window.addEventListener("resize", () => {
      renderer.setSize(window.innerWidth, window.innerHeight);
      uniforms.uRes.value.set(window.innerWidth, window.innerHeight);
    });

    const clock = new THREE.Clock();
    (function loop() {
      mouse.x += (mouse.tx - mouse.x) * 0.05;
      mouse.y += (mouse.ty - mouse.y) * 0.05;
      uniforms.uMouse.value.set(mouse.x, mouse.y);
      uniforms.uTime.value = clock.getElapsedTime();
      uniforms.uScroll.value = window.scrollY / window.innerHeight;
      renderer.render(scene, camera);
      requestAnimationFrame(loop);
    })();
  }

  /* ============ Preloader ============ */
  function initPreloader(onDone) {
    const pre = document.getElementById("preloader");
    const counter = document.getElementById("preloaderCounter");
    let revealed = false;
    const reveal = (skipped) => {
      if (revealed) return;
      revealed = true;
      onDone(skipped);
    };
    // rAF is throttled in background tabs — never gate content on the animation there
    if (!pre || !hasGSAP || prefersReducedMotion || document.hidden) {
      if (pre) pre.remove();
      reveal(true);
      return;
    }
    const state = { n: 0 };
    const tl = gsap.timeline({
      // hero intro starts only after the preloader has fully left the screen
      onComplete: () => { pre.remove(); reveal(false); },
    })
      .to(state, {
        n: 100, duration: 1.6, ease: "power2.inOut",
        onUpdate: () => { counter.textContent = String(Math.round(state.n)).padStart(2, "0"); },
      })
      .to(pre, { yPercent: -100, duration: 0.9, ease: "power4.inOut" }, "+=0.15");
    const bail = () => {
      if (revealed) return;
      tl.kill();
      pre.remove();
      reveal(true);
    };
    setTimeout(bail, 5000);
    document.addEventListener("visibilitychange", () => {
      if (document.hidden) bail();
    });
  }

  /* ============ Hero entrance ============ */
  // hide the hero title before the preloader can reveal the page,
  // so it never flashes visible and re-animates
  function heroPrepare() {
    if (hasGSAP && !prefersReducedMotion) {
      gsap.set(".hero__line-inner", { yPercent: 110 });
    }
  }

  function heroIntro(skip) {
    if (!hasGSAP || prefersReducedMotion || skip) {
      if (hasGSAP) gsap.set(".hero__line-inner", { yPercent: 0 });
      document.querySelectorAll(".hero [data-fade]").forEach((el) => {
        el.style.opacity = 1; el.style.transform = "none";
      });
      return;
    }
    gsap.timeline()
      .to(".hero__line-inner", {
        yPercent: 0, duration: 1.2, ease: "power4.out", stagger: 0.12,
      })
      .to(".hero [data-fade]", {
        opacity: 1, y: 0, duration: 0.9, ease: "power3.out", stagger: 0.08,
      }, "-=0.7");
  }

  /* ============ Scroll animations ============ */
  function initScrollAnimations() {
    if (!hasGSAP || typeof ScrollTrigger === "undefined" || prefersReducedMotion) {
      document.querySelectorAll("[data-fade]").forEach((el) => {
        el.style.opacity = 1; el.style.transform = "none";
      });
      return;
    }

    // generic fades (outside hero — hero handles its own)
    document.querySelectorAll("[data-fade]").forEach((el) => {
      if (el.closest(".hero")) return;
      gsap.to(el, {
        opacity: 1, y: 0, duration: 1, ease: "power3.out",
        scrollTrigger: { trigger: el, start: "top 88%" },
      });
    });

    // split headings into masked words
    document.querySelectorAll("[data-split]").forEach((h) => {
      const lines = h.innerHTML.split(/<br\s*\/?>/i);
      h.innerHTML = lines.map((line) =>
        line.trim().split(/\s+/).map((w) =>
          `<span class="word"><span class="word-inner">${w}</span></span>`
        ).join(" ")
      ).join("<br/>");
      gsap.from(h.querySelectorAll(".word-inner"), {
        yPercent: 110, duration: 1, ease: "power4.out", stagger: 0.06,
        scrollTrigger: { trigger: h, start: "top 85%" },
      });
    });

    // about paragraph — word-by-word color scrub
    const about = document.getElementById("aboutText");
    if (about) {
      about.innerHTML = about.textContent.trim().split(/\s+/)
        .map((w) => `<span class="w">${w}</span>`).join(" ");
      gsap.to(about.querySelectorAll(".w"), {
        color: "#ebe9e4", stagger: 0.06, ease: "none",
        scrollTrigger: {
          trigger: about, start: "top 75%", end: "bottom 45%", scrub: 0.5,
        },
      });
    }

    // stat counters
    document.querySelectorAll(".stat__num").forEach((el) => {
      const target = parseInt(el.dataset.count, 10) || 0;
      const state = { n: 0 };
      gsap.to(state, {
        n: target, duration: 1.6, ease: "power2.out",
        onUpdate: () => { el.textContent = Math.round(state.n); },
        scrollTrigger: { trigger: el, start: "top 88%" },
      });
    });

    // project rows: clip-reveal visuals + parallax art
    document.querySelectorAll("[data-project]").forEach((item) => {
      const visual = item.querySelector(".work__visual");
      gsap.from(visual, {
        clipPath: "inset(0 100% 0 0)", duration: 1.1, ease: "power4.out",
        scrollTrigger: { trigger: item, start: "top 82%" },
      });
      gsap.fromTo(visual.querySelector(".work__visual-art"),
        { yPercent: -8 }, {
          yPercent: 8, ease: "none",
          scrollTrigger: { trigger: item, start: "top bottom", end: "bottom top", scrub: true },
        });
      gsap.from(item.querySelector(".work__info"), {
        opacity: 0, y: 30, duration: 0.9, ease: "power3.out",
        scrollTrigger: { trigger: item, start: "top 80%" },
      });
    });

    // services rows slide in
    gsap.utils.toArray("[data-service]").forEach((row) => {
      gsap.from(row, {
        opacity: 0, y: 40, duration: 0.9, ease: "power3.out",
        scrollTrigger: { trigger: row, start: "top 88%" },
      });
    });

    // footer big title
    gsap.from(".footer__line-inner", {
      yPercent: 110, duration: 1.1, ease: "power4.out", stagger: 0.1,
      scrollTrigger: { trigger: ".footer__title", start: "top 85%" },
    });

    // marquee: constant drift + scroll-velocity boost
    const track = document.getElementById("marqueeTrack");
    if (track) {
      const tween = gsap.to(track, { xPercent: -50, ease: "none", duration: 22, repeat: -1 });
      ScrollTrigger.create({
        onUpdate: (self) => {
          const v = Math.min(Math.abs(self.getVelocity()) / 280, 7);
          gsap.to(tween, { timeScale: 1 + v, duration: 0.3, overwrite: true });
        },
      });
    }
  }

  /* ============ Custom cursor + magnetic ============ */
  function initCursor() {
    if (isTouch || prefersReducedMotion || !hasGSAP) return;
    const ring = document.getElementById("cursor");
    const dot = document.getElementById("cursorDot");
    const pos = { x: innerWidth / 2, y: innerHeight / 2 };
    const target = { x: pos.x, y: pos.y };

    window.addEventListener("pointermove", (e) => {
      target.x = e.clientX; target.y = e.clientY;
      gsap.set(dot, { x: e.clientX, y: e.clientY });
    });
    gsap.ticker.add(() => {
      pos.x += (target.x - pos.x) * 0.16;
      pos.y += (target.y - pos.y) * 0.16;
      gsap.set(ring, { x: pos.x, y: pos.y });
    });

    document.querySelectorAll("a, button").forEach((el) => {
      el.addEventListener("mouseenter", () => ring.classList.add("cursor--hover"));
      el.addEventListener("mouseleave", () => ring.classList.remove("cursor--hover"));
    });

    // magnetic pull
    document.querySelectorAll("[data-magnetic], [data-magnetic-strong]").forEach((el) => {
      const strength = el.hasAttribute("data-magnetic-strong") ? 0.35 : 0.5;
      el.addEventListener("mousemove", (e) => {
        const r = el.getBoundingClientRect();
        gsap.to(el, {
          x: (e.clientX - r.left - r.width / 2) * strength,
          y: (e.clientY - r.top - r.height / 2) * strength,
          duration: 0.4, ease: "power3.out",
        });
      });
      el.addEventListener("mouseleave", () => {
        gsap.to(el, { x: 0, y: 0, duration: 0.6, ease: "elastic.out(1, 0.4)" });
      });
    });
  }

  /* ============ Mobile menu ============ */
  function initMenu() {
    const toggle = document.getElementById("menuToggle");
    const menu = document.getElementById("mobileMenu");
    if (!toggle || !menu) return;
    let open = false;

    const setOpen = (next) => {
      open = next;
      toggle.classList.toggle("is-open", open);
      toggle.setAttribute("aria-expanded", String(open));
      toggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
      menu.setAttribute("aria-hidden", String(!open));
      document.body.style.overflow = open ? "hidden" : "";

      if (hasGSAP && !prefersReducedMotion) {
        if (open) {
          gsap.set(menu, { visibility: "visible" });
          gsap.timeline()
            .to(menu, { clipPath: "inset(0 0 0% 0)", duration: 0.7, ease: "power4.inOut" })
            .from(menu.querySelectorAll(".mobile-menu__link"), {
              yPercent: 60, opacity: 0, duration: 0.6, ease: "power3.out", stagger: 0.06,
            }, "-=0.25");
        } else {
          gsap.to(menu, {
            clipPath: "inset(0 0 100% 0)", duration: 0.55, ease: "power4.inOut",
            onComplete: () => gsap.set(menu, { visibility: "hidden" }),
          });
        }
      } else {
        menu.style.visibility = open ? "visible" : "hidden";
        menu.style.clipPath = open ? "inset(0 0 0% 0)" : "inset(0 0 100% 0)";
      }
    };

    toggle.addEventListener("click", () => setOpen(!open));
    menu.querySelectorAll("a").forEach((a) =>
      a.addEventListener("click", () => setOpen(false))
    );
  }

  /* ============ Misc ============ */
  function initMisc() {
    // local time (Lisbon)
    const timeEl = document.getElementById("localTime");
    if (timeEl) {
      const tick = () => {
        timeEl.textContent = new Date().toLocaleTimeString("en-GB", {
          timeZone: "Europe/Lisbon", hour12: false,
        }) + " WET";
      };
      tick();
      setInterval(tick, 1000);
    }

    const top = document.getElementById("backToTop");
    if (top) top.addEventListener("click", () =>
      window.scrollTo({ top: 0, behavior: prefersReducedMotion ? "auto" : "smooth" })
    );
  }

  /* ============ Boot ============ */
  document.addEventListener("DOMContentLoaded", () => {
    heroPrepare();
    initGL();
    initCursor();
    initMenu();
    initMisc();
    initScrollAnimations();
    initPreloader((skipped) => heroIntro(skipped));
  });
})();

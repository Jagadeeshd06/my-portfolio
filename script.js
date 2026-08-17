/* ============================================================
   JAGADEESH D — PORTFOLIO SCRIPT
   Vanilla JS. No external dependencies. Respects prefers-reduced-motion.
   ============================================================ */
(function(){
  "use strict";

  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------------- CONTACT DELIVERY CONFIG ----------------
     TODO: replace these with your real email and WhatsApp number
     (WhatsApp number = country code + number, digits only, no + or spaces,
     e.g. "919876543210" for a +91 98765 43210 India number). */
  const CONTACT_EMAIL = "jagadeesh901@gmail.com";
  const WHATSAPP_NUMBER = "+91 8019401692";

  /* ---------------- LOADER ---------------- */
  const loader = document.getElementById("loader");
  const loaderProgress = document.getElementById("loaderProgress");
  let pct = 0;
  const loadTimer = setInterval(() => {
    pct += Math.random() * 18;
    if (pct >= 100) { pct = 100; clearInterval(loadTimer); }
    loaderProgress.style.width = pct + "%";
  }, 120);

  window.addEventListener("load", () => {
    setTimeout(() => {
      loaderProgress.style.width = "100%";
      setTimeout(() => {
        loader.classList.add("hidden");
        document.body.classList.remove("lock-scroll");
        playHeroReveal();
      }, 350);
    }, 300);
  });

  /* ---------------- CUSTOM CURSOR ---------------- */
  const cursorDot = document.getElementById("cursorDot");
  const cursorRing = document.getElementById("cursorRing");
  if (!("ontouchstart" in window)) {
    let mx = -100, my = -100, rx = -100, ry = -100;
    window.addEventListener("mousemove", (e) => {
      mx = e.clientX; my = e.clientY;
      cursorDot.style.transform = `translate(${mx}px, ${my}px) translate(-50%,-50%)`;
    });
    function ringLoop(){
      rx += (mx - rx) * 0.18;
      ry += (my - ry) * 0.18;
      cursorRing.style.transform = `translate(${rx}px, ${ry}px) translate(-50%,-50%)`;
      requestAnimationFrame(ringLoop);
    }
    ringLoop();
    document.querySelectorAll("a, button, .skill-orb, .creative-item, [data-flip-card]").forEach(el => {
      el.addEventListener("mouseenter", () => cursorRing.classList.add("hovering"));
      el.addEventListener("mouseleave", () => cursorRing.classList.remove("hovering"));
    });
  }

  /* ---------------- NAVBAR ---------------- */
  const navbar = document.getElementById("navbar");
  const navToggle = document.getElementById("navToggle");
  const navLinks = document.getElementById("navLinks");

  window.addEventListener("scroll", () => {
    navbar.classList.toggle("scrolled", window.scrollY > 40);
  }, { passive: true });

  navToggle.addEventListener("click", () => {
    const open = navLinks.classList.toggle("open");
    navToggle.classList.toggle("open", open);
    navToggle.setAttribute("aria-expanded", open);
  });
  navLinks.querySelectorAll("a").forEach(a => a.addEventListener("click", () => {
    navLinks.classList.remove("open");
    navToggle.classList.remove("open");
  }));

  /* active section indicator */
  const sections = document.querySelectorAll("main section[id]");
  const navLinkMap = {};
  document.querySelectorAll(".nav-link").forEach(l => navLinkMap[l.dataset.section] = l);

  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        Object.values(navLinkMap).forEach(l => l.classList.remove("active"));
        const link = navLinkMap[entry.target.id];
        if (link) link.classList.add("active");
      }
    });
  }, { rootMargin: "-45% 0px -50% 0px", threshold: 0 });
  sections.forEach(s => sectionObserver.observe(s));

  /* ---------------- SCROLL REVEAL ---------------- */
  const revealEls = document.querySelectorAll(".reveal-up");
  revealEls.forEach(el => {
    const delayAttr = el.dataset.delay;
    if (delayAttr !== undefined) el.style.setProperty("--d", delayAttr);
  });
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("in-view");
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15, rootMargin: "0px 0px -60px 0px" });
  revealEls.forEach(el => revealObserver.observe(el));

  function playHeroReveal(){
    document.querySelectorAll(".hero .reveal-up").forEach(el => el.classList.add("in-view"));
  }

  /* ---------------- HERO CANVAS PARTICLES ---------------- */
  const canvas = document.getElementById("heroCanvas");
  const ctx = canvas.getContext("2d");
  let particles = [];
  let cw, ch;
  let mouseX = -9999, mouseY = -9999;

  function resizeCanvas(){
    cw = canvas.width = canvas.offsetWidth * devicePixelRatio;
    ch = canvas.height = canvas.offsetHeight * devicePixelRatio;
  }
  function initParticles(){
    const count = reduceMotion ? 0 : Math.min(70, Math.floor((canvas.offsetWidth * canvas.offsetHeight) / 16000));
    particles = Array.from({length: count}, () => ({
      x: Math.random() * cw,
      y: Math.random() * ch,
      r: (Math.random() * 1.6 + 0.6) * devicePixelRatio,
      vx: (Math.random() - 0.5) * 0.25 * devicePixelRatio,
      vy: (Math.random() - 0.5) * 0.25 * devicePixelRatio,
      hue: Math.random() > 0.5 ? "124,108,255" : "255,155,84",
      alpha: Math.random() * 0.5 + 0.25
    }));
  }
  function drawParticles(){
    ctx.clearRect(0, 0, cw, ch);
    const mx = mouseX * devicePixelRatio, my = mouseY * devicePixelRatio;
    particles.forEach(p => {
      p.x += p.vx; p.y += p.vy;
      if (p.x < 0 || p.x > cw) p.vx *= -1;
      if (p.y < 0 || p.y > ch) p.vy *= -1;

      const dx = p.x - mx, dy = p.y - my;
      const dist = Math.sqrt(dx*dx + dy*dy);
      if (dist < 160 * devicePixelRatio) {
        const force = (1 - dist / (160 * devicePixelRatio)) * 0.6;
        p.x += (dx / (dist || 1)) * force;
        p.y += (dy / (dist || 1)) * force;
      }

      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${p.hue},${p.alpha})`;
      ctx.fill();
    });
    // connecting lines
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const a = particles[i], b = particles[j];
        const d = Math.hypot(a.x - b.x, a.y - b.y);
        if (d < 120 * devicePixelRatio) {
          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(b.x, b.y);
          ctx.strokeStyle = `rgba(156,150,220,${0.08 * (1 - d / (120*devicePixelRatio))})`;
          ctx.lineWidth = 1;
          ctx.stroke();
        }
      }
    }
    requestAnimationFrame(drawParticles);
  }

  if (canvas) {
    resizeCanvas();
    initParticles();
    if (!reduceMotion) requestAnimationFrame(drawParticles);
    else { drawParticlesStatic(); }
    window.addEventListener("resize", () => { resizeCanvas(); initParticles(); });
    document.querySelector(".hero").addEventListener("mousemove", (e) => {
      const rect = canvas.getBoundingClientRect();
      mouseX = e.clientX - rect.left;
      mouseY = e.clientY - rect.top;
    });
    document.querySelector(".hero").addEventListener("mouseleave", () => { mouseX = -9999; mouseY = -9999; });
  }
  function drawParticlesStatic(){ ctx.clearRect(0,0,cw,ch); }

  /* ---------------- COMPANION / GHIBLI-STYLE CHARACTER ---------------- */
  const blinkEl = document.getElementById("avatarBlink");
  const mouthEl = document.getElementById("avatarMouth");
  const armEl = document.getElementById("avatarArm");
  const speechBubble = document.getElementById("speechBubble");
  const speechText = document.getElementById("speechText");
  const playIntroBtn = document.getElementById("playIntroBtn");

  // idle blinking loop
  if (!reduceMotion) {
    function blinkLoop(){
      const wait = 2800 + Math.random() * 3200;
      setTimeout(() => {
        blinkEl.classList.add("blinking");
        setTimeout(() => blinkEl.classList.remove("blinking"), 140);
        blinkLoop();
      }, wait);
    }
    blinkLoop();
  }

  const introLine = "Hi! I'm Jagadeesh. I'm a Computer Science student who loves building software, exploring AI and creating visually engaging digital experiences.";
  let introPlaying = false;
  const canSpeak = "speechSynthesis" in window;

  function typeSpeech(text, onDone){
    speechText.textContent = "";
    speechBubble.classList.add("visible");
    let i = 0;
    const speed = reduceMotion ? 0 : 22;
    if (reduceMotion) { speechText.textContent = text; onDone && onDone(); return; }
    mouthEl.classList.add("talking");
    const timer = setInterval(() => {
      speechText.textContent += text[i];
      i++;
      if (i >= text.length) {
        clearInterval(timer);
        onDone && onDone();
      }
    }, speed);
  }

  function speakIntro(text, onDone){
    if (!canSpeak || reduceMotion) { onDone && onDone(); return; }
    try {
      window.speechSynthesis.cancel();
      const utter = new SpeechSynthesisUtterance(text);
      utter.rate = 0.98;
      utter.pitch = 1.05;
      utter.onend = () => onDone && onDone();
      utter.onerror = () => onDone && onDone();
      window.speechSynthesis.speak(utter);
    } catch (e) { onDone && onDone(); }
  }

  playIntroBtn.addEventListener("click", () => {
    if (introPlaying) return;
    introPlaying = true;
    armEl.classList.add("waving");
    setTimeout(() => armEl.classList.remove("waving"), 2200);

    let typingDone = false, speechDone = !canSpeak;
    function tryFinish(){
      if (typingDone && speechDone) {
        mouthEl.classList.remove("talking");
        setTimeout(() => {
          speechBubble.classList.remove("visible");
          introPlaying = false;
        }, 2600);
      }
    }
    // speak aloud in parallel with the typed subtitle
    speakIntro(introLine, () => { speechDone = true; tryFinish(); });
    typeSpeech(introLine, () => { typingDone = true; tryFinish(); });
  });

  /* ---------------- SKILL ORB MOUSE-REACT TILT ---------------- */
  if (!reduceMotion && !("ontouchstart" in window)) {
    document.querySelectorAll(".skill-orb").forEach(orb => {
      orb.addEventListener("mousemove", (e) => {
        const rect = orb.getBoundingClientRect();
        const cx = e.clientX - rect.left - rect.width / 2;
        const cy = e.clientY - rect.top - rect.height / 2;
        orb.style.transform = `perspective(600px) rotateX(${(-cy / 8)}deg) rotateY(${(cx / 8)}deg) translateY(-4px) scale(1.06)`;
      });
      orb.addEventListener("mouseleave", () => { orb.style.transform = ""; });
    });

  }

  /* ---------------- PROJECT FLIP CARDS ---------------- */
  const isTouch = "ontouchstart" in window;
  document.querySelectorAll("[data-flip-card]").forEach(card => {
    if (isTouch) {
      card.addEventListener("click", (e) => {
        // let real links/buttons inside the card work normally
        if (e.target.closest("a, button")) return;
        card.classList.toggle("flipped");
      });
    }
  });

  /* ---------------- TIMELINE SCROLL PROGRESS ---------------- */
  const timeline = document.querySelector(".timeline");
  const timelineProgress = document.getElementById("timelineProgress");
  if (timeline) {
    window.addEventListener("scroll", () => {
      const rect = timeline.getBoundingClientRect();
      const vh = window.innerHeight;
      const total = rect.height;
      let progressed = vh * 0.7 - rect.top;
      progressed = Math.max(0, Math.min(progressed, total));
      timelineProgress.style.height = (progressed / total * 100) + "%";
    }, { passive: true });
  }

  /* ---------------- ACHIEVEMENT COUNTERS ---------------- */
  const achieveNums = document.querySelectorAll(".achieve-num");
  const achieveObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const target = parseInt(el.dataset.target, 10);
        if (reduceMotion) { el.textContent = target; achieveObserver.unobserve(el); return; }
        let cur = 0;
        const step = Math.max(1, Math.round(target / 40));
        const t = setInterval(() => {
          cur += step;
          if (cur >= target) { cur = target; clearInterval(t); }
          el.textContent = cur;
        }, 30);
        achieveObserver.unobserve(el);
      }
    });
  }, { threshold: 0.5 });
  achieveNums.forEach(el => achieveObserver.observe(el));

  /* ---------------- CREATIVE LIGHTBOX ---------------- */
  const lightbox = document.getElementById("lightbox");
  const lightboxVisual = document.getElementById("lightboxVisual");
  const lightboxTitle = document.getElementById("lightboxTitle");
  const lightboxDesc = document.getElementById("lightboxDesc");
  const lightboxClose = document.getElementById("lightboxClose");

  document.querySelectorAll(".creative-item").forEach(item => {
    item.addEventListener("click", () => {
      lightboxTitle.textContent = item.dataset.title;
      lightboxDesc.textContent = item.dataset.desc;
      lightboxVisual.style.background = `linear-gradient(160deg, ${item.style.getPropertyValue("--tint")}55, var(--surface-2))`;
      lightbox.classList.add("open");
    });
  });
  function closeLightbox(){ lightbox.classList.remove("open"); }
  lightboxClose.addEventListener("click", closeLightbox);
  lightbox.addEventListener("click", (e) => { if (e.target === lightbox) closeLightbox(); });
  window.addEventListener("keydown", (e) => { if (e.key === "Escape") closeLightbox(); });

  /* ---------------- CONTACT FORM ---------------- */
  const contactForm = document.getElementById("contactForm");
  const formNote = document.getElementById("formNote");
  const whatsappBtn = document.getElementById("whatsappBtn");

  function getFormValues(){
    return {
      name: document.getElementById("cf-name").value.trim(),
      email: document.getElementById("cf-email").value.trim(),
      message: document.getElementById("cf-message").value.trim()
    };
  }

  contactForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const { name, email, message } = getFormValues();
    if (!name || !email || !message) return;

    const subject = `Portfolio contact from ${name}`;
    const body = `Name: ${name}\nEmail: ${email}\n\n${message}`;
    const mailtoLink = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

    window.location.href = mailtoLink;
    formNote.textContent = "Opening your email app with the message filled in — hit send there to deliver it.";
  });

  whatsappBtn.addEventListener("click", () => {
    const { name, email, message } = getFormValues();
    if (!name || !message) {
      formNote.textContent = "Add your name and a message first, then tap WhatsApp.";
      return;
    }
    const text = `Hi Jagadeesh, I'm ${name} (${email || "no email given"}).\n\n${message}`;
    const waLink = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;
    window.open(waLink, "_blank", "noopener");
    formNote.textContent = "Opening WhatsApp with your message filled in — hit send there to deliver it.";
  });

  /* ---------------- FOOTER YEAR ---------------- */
  document.getElementById("footerYear").textContent = new Date().getFullYear();

  /* fallback: reveal hero even if load event delays */
  setTimeout(playHeroReveal, 1800);

  /* hard fallback: never trap the visitor behind the loader */
  setTimeout(() => {
    loader.classList.add("hidden");
    document.body.classList.remove("lock-scroll");
  }, 3200);

})();

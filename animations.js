// ── REGISTO PRIMEIRO ─────────────────────────────────────
gsap.registerPlugin(ScrollTrigger);

// ── LENIS ────────────────────────────────────────────────
const lenis = new Lenis({
  duration: 1.4,
  easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
});

lenis.on("scroll", ScrollTrigger.update);

gsap.ticker.add((time) => {
  lenis.raf(time * 1000);
});

gsap.ticker.lagSmoothing(0);

// ── PAGE LOADER ──────────────────────────────────────────
const tl = gsap.timeline({
  onComplete: () => initScrollAnimations()
});

tl.to(".loader-text", {
  y: -30,
  opacity: 0,
  duration: 0.6,
  delay: 1,
  ease: "power3.in"
})
.to(".loader", {
  yPercent: -100,
  duration: 0.8,
  ease: "power4.inOut"
})
.set(".loader", { display: "none" })
.from(".navbar", {
  y: -40,
  opacity: 0,
  duration: 0.8,
  ease: "power3.out"
})
.from(".hero-title", {
  y: 120,
  opacity: 0,
  duration: 1.2,
  ease: "power4.out"
}, "-=0.4")
.from(".scroll-line-v, .scroll-arrow-text", {
  opacity: 0,
  y: 20,
  stagger: 0.15,
  duration: 0.6,
  ease: "power2.out"
}, "-=0.4");

// ── SCROLL SÓ DEPOIS DO LOADER ───────────────────────────
function initScrollAnimations() {

  // HERO SCROLL
  gsap.to(".hero-title", {
    scrollTrigger: {
      trigger: ".hero",
      start: "top top",
      end: "bottom top",
      scrub: 1.5
    },
    y: 150, opacity: 0, ease: "none"
  });

  gsap.to(".navbar", {
    scrollTrigger: {
      trigger: ".hero",
      start: "top top",
      end: "30% top",
      scrub: 1
    },
    y: -20, opacity: 0, ease: "none"
  });

  gsap.to(".scroll-line-v, .scroll-arrow-text", {
    scrollTrigger: {
      trigger: ".hero",
      start: "top top",
      end: "20% top",
      scrub: 1
    },
    opacity: 0, y: 20, ease: "none"
  });

  // ABOUT
  gsap.from(".label-tag", {
    scrollTrigger: {
      trigger: ".about",
      start: "top 80%",
      toggleActions: "play reverse play reverse"
    },
    x: -60, opacity: 0, duration: 0.8, ease: "power3.out"
  });

  gsap.from(".about-title", {
    scrollTrigger: {
      trigger: ".about",
      start: "top 75%",
      toggleActions: "play reverse play reverse"
    },
    y: 70, opacity: 0, filter: "blur(8px)",
    duration: 1.1, ease: "power3.out", clearProps: "filter"
  });

  gsap.fromTo(".about-photo",
    { x: -150, opacity: 0, rotation: -10 },
    {
      scrollTrigger: {
        trigger: ".about-photo",
        start: "top 90%",
        end: "top 40%",
        scrub: 1.5
      },
      x: 0, opacity: 1, rotation: 0, ease: "none"
    }
  );

  gsap.from(".about-text", {
    scrollTrigger: {
      trigger: ".about-text-col",
      start: "top 80%",
      toggleActions: "play reverse play reverse"
    },
    y: 50, opacity: 0,
    stagger: 0.25, duration: 1, ease: "power2.out"
  });

  gsap.from(".skill-badge", {
    scrollTrigger: {
      trigger: ".skills",
      start: "top 90%",
      toggleActions: "play reverse play reverse"
    },
    y: 30, opacity: 0, scale: 0.6,
    stagger: 0.1, duration: 0.5, ease: "back.out(2)"
  });

const navItems = document.querySelectorAll(".project-nav-item");
const projectImg = document.getElementById("projectImg");
const activeTitle = document.getElementById("activeTitle");
const activeDesc = document.getElementById("activeDesc");
const activeTags = document.getElementById("activeTags");

function changeProject(item) {
  navItems.forEach(i => i.classList.remove("active"));
  item.classList.add("active");

  const img = item.dataset.img;
  const title = item.dataset.title;
  const desc = item.dataset.desc;
  const tags = item.dataset.tags.split(",");

  gsap.to(projectImg, {
    y: 20, opacity: 0, duration: 0.2, ease: "power2.in",
    onComplete: () => {
      projectImg.src = img;
      gsap.fromTo(projectImg,
        { y: -20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.3, ease: "power2.out" }
      );
    }
  });

  gsap.to([activeTitle, activeDesc, activeTags], {
    y: 8, opacity: 0, duration: 0.15, ease: "power2.in",
    onComplete: () => {
      activeTitle.textContent = title;
      activeDesc.textContent = desc;
      activeTags.innerHTML = tags.map(t => `<span class="tag">${t}</span>`).join("");
      gsap.fromTo([activeTitle, activeDesc, activeTags],
        { y: -8, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.25, stagger: 0.05, ease: "power2.out" }
      );
    }
  });
}


navItems.forEach(item => {
  item.addEventListener("click", () => changeProject(item));
});



  // TILT CARDS
  document.querySelectorAll(".project-card").forEach(card => {
    card.addEventListener("mousemove", (e) => {
      const rect = card.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      gsap.to(card, {
        rotationY: x * 15, rotationX: -y * 15,
        duration: 0.4, ease: "power2.out", transformPerspective: 800
      });
    });

    card.addEventListener("mouseleave", () => {
      gsap.to(card, { rotationY: 0, rotationX: 0, duration: 0.6, ease: "power2.out" });
    });
  });
}

// PROJECTS — entrada
gsap.from(".section-label, .section-title", {
  scrollTrigger: {
    trigger: "#projects",
    start: "top 75%",
    toggleActions: "play reverse play reverse"
  },
  y: 50,
  opacity: 0,
  stagger: 0.15,
  duration: 1,
  ease: "power3.out"
});

gsap.from(".project-active-info", {
  scrollTrigger: {
    trigger: "#projects",
    start: "top 65%",
    toggleActions: "play reverse play reverse"
  },
  y: 40,
  opacity: 0,
  duration: 1,
  ease: "power3.out"
});

gsap.from(".projects-visual", {
  scrollTrigger: {
    trigger: "#projects",
    start: "top 75%",
    toggleActions: "play reverse play reverse"
  },
  x: -80,
  opacity: 0,
  duration: 1.2,
  ease: "power3.out"
});

gsap.from(".project-nav-item", {
  scrollTrigger: {
    trigger: ".project-nav",
    start: "top 85%",
    toggleActions: "play reverse play reverse"
  },
  x: 40,
  clearProps: "opacity",
  stagger: 0.15,
  duration: 0.8,
  ease: "power3.out"
});


// ── CURSOR ───────────────────────────────────────────────
const cursor = document.querySelector(".cursor");

window.addEventListener("mousemove", (e) => {
  gsap.to(cursor, {
    x: e.clientX,
    y: e.clientY,
    duration: 0.35,
    ease: "power2.out"
  });
});

document.querySelectorAll("a, .btn, .project-card").forEach(el => {
  el.addEventListener("mouseenter", () =>
    gsap.to(cursor, { scale: 2.5, duration: 0.3 })
  );
  el.addEventListener("mouseleave", () =>
    gsap.to(cursor, { scale: 1, duration: 0.3 })
  );
});

/* ═══════════════════════════════════════════════
   OLAMZY_GRAPHICS PORTFOLIO — script.js
   Author: Quam Oyekan Alani
   Version: 1.2 (Projects grid + multi-image modal)
═══════════════════════════════════════════════ */

/* ─── 1. PAGE LOADER ────────────────────────── */
window.addEventListener("load", () => {
  setTimeout(() => {
    document.getElementById("loader").classList.add("hidden");
  }, 1800);
});

/* ─── 2. THEME TOGGLE ───────────────────────── */
const themeToggle = document.getElementById("themeToggle");
const html = document.documentElement;

const savedTheme = localStorage.getItem("theme") || "dark";
html.setAttribute("data-theme", savedTheme);

themeToggle.addEventListener("click", () => {
  const current = html.getAttribute("data-theme");
  const next = current === "dark" ? "light" : "dark";
  html.setAttribute("data-theme", next);
  localStorage.setItem("theme", next);
});

/* ─── 3. NAVBAR ─────────────────────────────── */
const navbar = document.getElementById("navbar");
const hamburger = document.getElementById("hamburger");
const navLinks = document.getElementById("navLinks");
const navLinkItems = document.querySelectorAll(".nav-link");

window.addEventListener("scroll", () => {
  if (window.scrollY > 50) {
    navbar.classList.add("scrolled");
  } else {
    navbar.classList.remove("scrolled");
  }
  updateScrollProgress();
  updateActiveNav();
  toggleScrollTop();
  triggerAOS();
  animateSkillBars();
  animateCounters();
});

hamburger.addEventListener("click", () => {
  hamburger.classList.toggle("open");
  navLinks.classList.toggle("open");
});

navLinkItems.forEach((link) => {
  link.addEventListener("click", () => {
    hamburger.classList.remove("open");
    navLinks.classList.remove("open");
  });
});

function updateActiveNav() {
  const sections = document.querySelectorAll("section[id]");
  const scrollPos = window.scrollY + 100;

  sections.forEach((section) => {
    const top = section.offsetTop;
    const bottom = top + section.offsetHeight;
    const id = section.getAttribute("id");
    const link = document.querySelector(`.nav-link[href="#${id}"]`);

    if (link) {
      if (scrollPos >= top && scrollPos < bottom) {
        navLinkItems.forEach((l) => l.classList.remove("active"));
        link.classList.add("active");
      }
    }
  });
}

/* ─── 4. SCROLL PROGRESS ────────────────────── */
function updateScrollProgress() {
  const bar = document.getElementById("scrollProgress");
  const total = document.body.scrollHeight - window.innerHeight;
  const percent = (window.scrollY / total) * 100;
  bar.style.width = percent + "%";
}

/* ─── 5. CURSOR GLOW ────────────────────────── */
const cursorGlow = document.getElementById("cursorGlow");

document.addEventListener("mousemove", (e) => {
  cursorGlow.style.left = e.clientX + "px";
  cursorGlow.style.top = e.clientY + "px";
});

/* ─── 6. TYPING ANIMATION ───────────────────── */
const roles = [
  "Graphic Designer",
  "Frontend Developer",
  "Web Developer",
  "Creative Thinker",
  "Brand Creator",
];

let roleIndex = 0;
let charIndex = 0;
let isDeleting = false;
const typingEl = document.getElementById("typingText");

function type() {
  const currentRole = roles[roleIndex];

  if (!isDeleting) {
    typingEl.textContent = currentRole.slice(0, charIndex + 1);
    charIndex++;
    if (charIndex === currentRole.length) {
      setTimeout(() => {
        isDeleting = true;
        type();
      }, 1800);
      return;
    }
  } else {
    typingEl.textContent = currentRole.slice(0, charIndex - 1);
    charIndex--;
    if (charIndex === 0) {
      isDeleting = false;
      roleIndex = (roleIndex + 1) % roles.length;
    }
  }

  const speed = isDeleting ? 60 : 100;
  setTimeout(type, speed);
}

setTimeout(type, 2000);

/* ─── 7. PARTICLES CANVAS ───────────────────── */
const canvas = document.getElementById("particlesCanvas");
const ctx = canvas.getContext("2d");

let particles = [];

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener("resize", resizeCanvas);

class Particle {
  constructor() {
    this.reset();
  }
  reset() {
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * canvas.height;
    this.size = Math.random() * 2 + 0.5;
    this.speedX = (Math.random() - 0.5) * 0.4;
    this.speedY = (Math.random() - 0.5) * 0.4;
    this.opacity = Math.random() * 0.5 + 0.1;
    this.color = Math.random() > 0.5 ? "124,58,237" : "221,174,5";
  }
  update() {
    this.x += this.speedX;
    this.y += this.speedY;
    if (
      this.x < 0 ||
      this.x > canvas.width ||
      this.y < 0 ||
      this.y > canvas.height
    ) {
      this.reset();
    }
  }
  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(${this.color},${this.opacity})`;
    ctx.fill();
  }
}

const PARTICLE_COUNT = 80;
for (let i = 0; i < PARTICLE_COUNT; i++) {
  particles.push(new Particle());
}

function animateParticles() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  particles.forEach((p) => {
    p.update();
    p.draw();
  });

  particles.forEach((a, i) => {
    particles.slice(i + 1).forEach((b) => {
      const dist = Math.hypot(a.x - b.x, a.y - b.y);
      if (dist < 100) {
        ctx.beginPath();
        ctx.strokeStyle = `rgba(124,58,237,${0.08 * (1 - dist / 100)})`;
        ctx.lineWidth = 0.5;
        ctx.moveTo(a.x, a.y);
        ctx.lineTo(b.x, b.y);
        ctx.stroke();
      }
    });
  });

  requestAnimationFrame(animateParticles);
}
animateParticles();

/* ─── 8. AOS-LIKE SCROLL ANIMATIONS ─────────── */
function triggerAOS() {
  const elements = document.querySelectorAll("[data-aos]");
  const triggerBottom = window.innerHeight * 0.88;

  elements.forEach((el) => {
    const top = el.getBoundingClientRect().top;
    if (top < triggerBottom) {
      const delay = el.getAttribute("data-aos-delay") || 0;
      setTimeout(() => {
        el.classList.add("aos-animate");
      }, parseInt(delay));
    }
  });
}

triggerAOS();

/* ─── 9. SKILL BAR ANIMATIONS ───────────────── */
let skillsAnimated = false;

function animateSkillBars() {
  const skillsSection = document.getElementById("skills");
  if (!skillsSection || skillsAnimated) return;

  const top = skillsSection.getBoundingClientRect().top;
  if (top < window.innerHeight * 0.85) {
    skillsAnimated = true;
    document.querySelectorAll(".skill-fill").forEach((fill) => {
      const width = fill.getAttribute("data-width");
      fill.style.width = width + "%";
    });
  }
}

/* ─── 10. COUNTER ANIMATION ─────────────────── */
let countersAnimated = false;

function animateCounters() {
  const aboutSection = document.getElementById("about");
  if (!aboutSection || countersAnimated) return;

  const top = aboutSection.getBoundingClientRect().top;
  if (top < window.innerHeight * 0.85) {
    countersAnimated = true;
    document.querySelectorAll(".stat-number[data-count]").forEach((el) => {
      const target = parseInt(el.getAttribute("data-count"));
      let current = 0;
      const step = Math.ceil(target / 60);
      const timer = setInterval(() => {
        current = Math.min(current + step, target);
        el.textContent = current;
        if (current >= target) clearInterval(timer);
      }, 25);
    });
  }
}

/* ─── 11. PROJECT FILTER ────────────────────── */
const filterBtns = document.querySelectorAll(".filter-btn");
const projectCards = document.querySelectorAll(".project-card");

filterBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    // Update active button
    filterBtns.forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");

    const filter = btn.getAttribute("data-filter");

    projectCards.forEach((card) => {
      const category = card.getAttribute("data-category");
      if (filter === "all" || category === filter) {
        card.classList.remove("hidden");
        card.style.animation = "none";
        card.offsetHeight; // reflow
        card.style.animation = "";
      } else {
        card.classList.add("hidden");
      }
    });
  });
});

/* Populate the "All / Web Dev / Graphic Design / UI/UX" counts
   shown next to each filter tab, based on how many project
   cards exist in each category. */
function updateFilterCounts() {
  const counts = { all: 0, web: 0, design: 0, uiux: 0 };
  projectCards.forEach((card) => {
    const cat = card.getAttribute("data-category");
    counts.all++;
    if (counts[cat] !== undefined) counts[cat]++;
  });

  const setCount = (id, val) => {
    const el = document.getElementById(id);
    if (el) el.textContent = val;
  };
  setCount("count-all", counts.all);
  setCount("count-web", counts.web);
  setCount("count-design", counts.design);
  setCount("count-uiux", counts.uiux);
}
updateFilterCounts();

/* ─── 12. TESTIMONIALS SLIDER ───────────────── */
const track = document.getElementById("testimonialsTrack");
const dotsWrap = document.getElementById("sliderDots");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");

const cards = track ? track.querySelectorAll(".testimonial-card") : [];
let currentSlide = 0;
let autoSlide;

function buildDots() {
  if (!dotsWrap) return;
  cards.forEach((_, i) => {
    const dot = document.createElement("button");
    dot.className = "slider-dot" + (i === 0 ? " active" : "");
    dot.setAttribute("aria-label", `Slide ${i + 1}`);
    dot.addEventListener("click", () => goToSlide(i));
    dotsWrap.appendChild(dot);
  });
}

function goToSlide(n) {
  currentSlide = (n + cards.length) % cards.length;
  if (track) track.style.transform = `translateX(-${currentSlide * 100}%)`;
  document.querySelectorAll(".slider-dot").forEach((d, i) => {
    d.classList.toggle("active", i === currentSlide);
  });
}

function startAutoSlide() {
  autoSlide = setInterval(() => goToSlide(currentSlide + 1), 5000);
}

if (prevBtn)
  prevBtn.addEventListener("click", () => {
    clearInterval(autoSlide);
    goToSlide(currentSlide - 1);
    startAutoSlide();
  });

if (nextBtn)
  nextBtn.addEventListener("click", () => {
    clearInterval(autoSlide);
    goToSlide(currentSlide + 1);
    startAutoSlide();
  });

buildDots();
startAutoSlide();

/* ─── 13. CONTACT FORM — Formspree ──────────── */
const FORMSPREE_URL = "https://formspree.io/f/xaqkbzdb";

const sendBtn = document.getElementById("sendBtn");
const formSuccess = document.getElementById("formSuccess");
const formError = document.getElementById("formError");
const charCountEl = document.getElementById("charCount");
const messageArea = document.getElementById("senderMessage");

// Live character counter
if (messageArea) {
  messageArea.addEventListener("input", () => {
    const len = messageArea.value.length;
    charCountEl.textContent = len;
    const wrap = charCountEl.closest(".char-count");
    wrap.className =
      "char-count" + (len > 900 ? " over" : len > 700 ? " warn" : "");
  });
}

// Validate a single field
function validateField(inputId, checkFn) {
  const input = document.getElementById(inputId);
  const group = input?.closest(".form-group");
  if (!input || !group) return true;
  const ok = checkFn(input.value.trim());
  group.classList.toggle("has-error", !ok);
  group.classList.toggle("valid", ok);
  return ok;
}

function validateAll() {
  const n = validateField("senderName", (v) => v.length >= 2);
  const e = validateField("senderEmail", (v) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v),
  );
  const s = validateField("senderSubject", (v) => v !== "");
  const m = validateField("senderMessage", (v) => v.length >= 20);
  return n && e && s && m;
}

// Clear error styling as user types
["senderName", "senderEmail", "senderSubject", "senderMessage"].forEach(
  (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.addEventListener("input", () => {
        el.closest(".form-group")?.classList.remove("has-error");
      });
    }
  },
);

// Send button
if (sendBtn) {
  sendBtn.addEventListener("click", async () => {
    formSuccess?.classList.remove("show");
    formError?.classList.remove("show");

    if (!validateAll()) {
      document
        .querySelector(".form-group.has-error")
        ?.scrollIntoView({ behavior: "smooth", block: "center" });
      return;
    }

    // Loading state
    sendBtn.disabled = true;
    sendBtn.classList.add("loading");
    document.getElementById("sendBtnText").textContent = "Sending…";
    if (!sendBtn.querySelector(".btn-spinner")) {
      sendBtn.insertAdjacentHTML(
        "afterbegin",
        '<span class="btn-spinner"></span>',
      );
    }

    const data = {
      name: document.getElementById("senderName").value.trim(),
      email: document.getElementById("senderEmail").value.trim(),
      phone:
        document.getElementById("senderPhone")?.value.trim() || "Not provided",
      subject: document.getElementById("senderSubject").value,
      message: document.getElementById("senderMessage").value.trim(),
    };

    try {
      const res = await fetch(FORMSPREE_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await res.json();

      if (res.ok) {
        // ✅ Success
        formSuccess?.classList.add("show");
        formSuccess?.scrollIntoView({ behavior: "smooth", block: "center" });
        [
          "senderName",
          "senderEmail",
          "senderPhone",
          "senderSubject",
          "senderMessage",
        ].forEach((id) => {
          const el = document.getElementById(id);
          if (el) {
            el.value = "";
            el.closest(".form-group")?.classList.remove("valid");
          }
        });
        if (charCountEl) charCountEl.textContent = "0";
      } else {
        // ❌ Formspree error
        const errMsg =
          result?.errors?.map((e) => e.message).join(", ") ||
          "Something went wrong. Please try again.";
        const msgEl = document.getElementById("formErrorMsg");
        if (msgEl) msgEl.textContent = errMsg;
        formError?.classList.add("show");
        formError?.scrollIntoView({ behavior: "smooth", block: "center" });
      }
    } catch (err) {
      // ❌ Network error
      const msgEl = document.getElementById("formErrorMsg");
      if (msgEl)
        msgEl.textContent =
          "Network error — check your connection and try again.";
      formError?.classList.add("show");
      formError?.scrollIntoView({ behavior: "smooth", block: "center" });
    } finally {
      sendBtn.disabled = false;
      sendBtn.classList.remove("loading");
      document.getElementById("sendBtnText").textContent = "Send Message";
    }
  });
}

/* ─── 14. PROJECT MODAL (multi-image lightbox gallery) ───────
   Each "Preview" button carries:
     data-title  → project title
     data-desc   → project description
     data-tags   → comma-separated tags
     data-imgs   → comma-separated image path(s). One path =
                   single image, no arrows. Multiple paths =
                   gallery with prev/next + counter.
   The parent .project-card's data-category ("web" / "design" /
   "uiux") drives the badge shown in the modal, and any <a>
   links inside that same card's .project-overlay (Live Demo,
   GitHub, View Full, Prototype) are cloned into the modal's
   action row so the modal is fully self-contained.
─────────────────────────────────────────────────────────── */

const modalOverlay = document.getElementById("projectModalOverlay");
const modalImgEl = document.getElementById("modalImg");
const modalImgPlaceholder = document.getElementById("modalImgPlaceholder");
const modalPrevBtn = document.getElementById("modalPrevBtn");
const modalNextBtn = document.getElementById("modalNextBtn");
const modalImgCounter = document.getElementById("modalImgCounter");
const modalTitleEl = document.getElementById("modalTitle");
const modalDescEl = document.getElementById("modalDesc");
const modalTagsEl = document.getElementById("modalTags");
const modalBadgeEl = document.getElementById("modalBadge");
const modalActionsEl = document.getElementById("modalActions");

const CATEGORY_BADGES = {
  web: { label: "Web Dev", icon: "ri-code-s-slash-fill", cls: "web-badge" },
  design: {
    label: "Graphic Design",
    icon: "ri-palette-fill",
    cls: "design-badge",
  },
  uiux: { label: "UI/UX", icon: "ri-layout-fill", cls: "uiux-badge" },
};

let galleryImgs = [];
let galleryIndex = 0;

function renderModalImage() {
  const src = galleryImgs[galleryIndex] || "";

  if (modalImgPlaceholder) modalImgPlaceholder.style.display = "none";
  if (modalImgEl) modalImgEl.style.display = "block";

  if (!src) {
    if (modalImgEl) modalImgEl.style.display = "none";
    if (modalImgPlaceholder) modalImgPlaceholder.style.display = "flex";
  } else if (modalImgEl) {
    modalImgEl.src = src;
    modalImgEl.onerror = () => {
      modalImgEl.style.display = "none";
      if (modalImgPlaceholder) modalImgPlaceholder.style.display = "flex";
    };
  }

  const multi = galleryImgs.length > 1;
  modalPrevBtn?.classList.toggle("show", multi);
  modalNextBtn?.classList.toggle("show", multi);
  modalImgCounter?.classList.toggle("show", multi);
  if (modalImgCounter && multi) {
    modalImgCounter.textContent = `${galleryIndex + 1} / ${galleryImgs.length}`;
  }
}

function nextModalImg() {
  if (galleryImgs.length < 2) return;
  galleryIndex = (galleryIndex + 1) % galleryImgs.length;
  renderModalImage();
}

function prevModalImg() {
  if (galleryImgs.length < 2) return;
  galleryIndex = (galleryIndex - 1 + galleryImgs.length) % galleryImgs.length;
  renderModalImage();
}

function openProjectModal(btn) {
  const card = btn.closest(".project-card");
  const category = card?.getAttribute("data-category") || "";

  // Parse image list (supports data-imgs="a,b,c" or legacy data-img="a")
  const rawImgs =
    btn.getAttribute("data-imgs") || btn.getAttribute("data-img") || "";
  galleryImgs = rawImgs
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);
  galleryIndex = 0;
  renderModalImage();

  // Title / description
  if (modalTitleEl)
    modalTitleEl.textContent = btn.getAttribute("data-title") || "";
  if (modalDescEl)
    modalDescEl.textContent = btn.getAttribute("data-desc") || "";

  // Tags
  const tags = (btn.getAttribute("data-tags") || "")
    .split(",")
    .map((t) => t.trim())
    .filter(Boolean);
  if (modalTagsEl) {
    modalTagsEl.innerHTML = tags.map((t) => `<span>${t}</span>`).join("");
  }

  // Category badge
  if (modalBadgeEl) {
    const badge = CATEGORY_BADGES[category];
    if (badge) {
      modalBadgeEl.className = "project-modal-badge " + badge.cls;
      modalBadgeEl.innerHTML = `<i class="${badge.icon}"></i> ${badge.label}`;
      modalBadgeEl.style.display = "inline-flex";
    } else {
      modalBadgeEl.style.display = "none";
    }
  }

  // Action buttons — clone whatever links live in this card's
  // overlay (Live Demo / GitHub / View Full / Prototype) so the
  // modal always matches the card without duplicating data.
  if (modalActionsEl) {
    modalActionsEl.innerHTML = "";
    card?.querySelectorAll(".project-overlay a").forEach((a) => {
      const clone = document.createElement("a");
      clone.href = a.getAttribute("href") || "#";
      clone.target = a.getAttribute("target") || "_self";
      clone.className = "btn btn-primary";
      clone.innerHTML = a.innerHTML;
      modalActionsEl.appendChild(clone);
    });
  }

  modalOverlay?.classList.add("open");
  document.body.style.overflow = "hidden";
}

function closeProjectModal() {
  modalOverlay?.classList.remove("open");
  document.body.style.overflow = "";
}

// Keyboard support: Esc to close, arrow keys to navigate
document.addEventListener("keydown", (e) => {
  if (!modalOverlay?.classList.contains("open")) return;
  if (e.key === "Escape") closeProjectModal();
  if (e.key === "ArrowRight") nextModalImg();
  if (e.key === "ArrowLeft") prevModalImg();
});

// Expose to inline onclick="" handlers in index.html
window.openProjectModal = openProjectModal;
window.closeProjectModal = closeProjectModal;
window.nextModalImg = nextModalImg;
window.prevModalImg = prevModalImg;

/* ─── 15. SCROLL TO TOP ─────────────────────── */
const scrollTopBtn = document.getElementById("scrollTop");

function toggleScrollTop() {
  if (window.scrollY > 400) {
    scrollTopBtn.classList.add("visible");
  } else {
    scrollTopBtn.classList.remove("visible");
  }
}

if (scrollTopBtn) {
  scrollTopBtn.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
}

/* ─── 16. SMOOTH ANCHOR SCROLLING ───────────── */
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", (e) => {
    const target = document.querySelector(anchor.getAttribute("href"));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  });
});

/* ─── 17. INITIAL TRIGGER ───────────────────── */
setTimeout(() => {
  triggerAOS();
  animateSkillBars();
  animateCounters();
}, 500);

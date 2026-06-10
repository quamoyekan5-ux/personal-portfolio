/* ═══════════════════════════════════════════════
   OLAMZY_GRAPHICS PORTFOLIO — main.js
   Author: Quam Oyekan Alani
   Version: 1.0
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

// Load saved theme
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

// Sticky + scroll effects
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

// Hamburger menu
hamburger.addEventListener("click", () => {
  hamburger.classList.toggle("open");
  navLinks.classList.toggle("open");
});

// Close nav on link click
navLinkItems.forEach((link) => {
  link.addEventListener("click", () => {
    hamburger.classList.remove("open");
    navLinks.classList.remove("open");
  });
});

// Active nav highlight
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
    // Typing forward
    typingEl.textContent = currentRole.slice(0, charIndex + 1);
    charIndex++;
    if (charIndex === currentRole.length) {
      // Pause before deleting
      setTimeout(() => {
        isDeleting = true;
        type();
      }, 1800);
      return;
    }
  } else {
    // Deleting
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

// Start typing after loader
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

// Create particles
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

  // Draw connecting lines
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

// Run on load and scroll
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

//* ─── 13. CONTACT FORM — Formspree ──────────── */
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
/* ─── 14. GALLERY IMAGE UPLOAD ───────────────── */
function loadGalleryImage(event, input) {
  const file = event.target.files[0];
  if (!file) return;

  const card = input.closest(".gallery-card");
  const img = card.querySelector(".gallery-img");

  const reader = new FileReader();
  reader.onload = (e) => {
    img.src = e.target.result;
    card.classList.add("loaded");
  };
  reader.readAsDataURL(file);
}

// Make function globally accessible
window.loadGalleryImage = loadGalleryImage;

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
// Run on page ready
setTimeout(() => {
  triggerAOS();
  animateSkillBars();
  animateCounters();
}, 500);

/* ═══════════════════════════════════════════════
   EDIT MODE SYSTEM — main.js additions
═══════════════════════════════════════════════ */

/* ─── TOAST ─────────────────────────────────── */
function showToast(message, type = "success", duration = 3500) {
  const container = document.getElementById("toast-container");
  const icons = {
    success: "ri-checkbox-circle-fill",
    error: "ri-error-warning-fill",
    info: "ri-information-fill",
    warning: "ri-alert-fill",
  };
  const toast = document.createElement("div");
  toast.className = `toast toast-${type}`;
  toast.innerHTML = `<i class="ri ${icons[type] || icons.info}"></i><span>${message}</span><button class="toast-close" aria-label="Close">✕</button>`;
  container.appendChild(toast);
  requestAnimationFrame(() => {
    requestAnimationFrame(() => toast.classList.add("show"));
  });
  const dismiss = () => {
    toast.classList.remove("show");
    toast.classList.add("hide");
    setTimeout(() => toast.remove(), 400);
  };
  toast.querySelector(".toast-close").addEventListener("click", dismiss);
  setTimeout(dismiss, duration);
}

/* ─── FAKE PROGRESS BAR ─────────────────────── */
function fakeProgress(fillEl, textEl, wrapEl, onDone) {
  wrapEl.classList.add("show");
  let pct = 0;
  const iv = setInterval(() => {
    pct = Math.min(pct + Math.random() * 18 + 4, 95);
    fillEl.style.width = pct + "%";
    textEl.textContent = Math.round(pct) + "%";
  }, 80);
  setTimeout(() => {
    clearInterval(iv);
    fillEl.style.width = "100%";
    textEl.textContent = "100%";
    setTimeout(() => {
      wrapEl.classList.remove("show");
      fillEl.style.width = "0%";
      if (onDone) onDone();
    }, 500);
  }, 900);
}

/* ─── PANEL OPEN / CLOSE ────────────────────── */
const editFab = document.getElementById("editFab");
const editPanel = document.getElementById("editPanel");
const editOverlay = document.getElementById("editOverlay");
const editClose = document.getElementById("editPanelClose");

function openEditPanel() {
  editPanel.classList.add("open");
  editOverlay.classList.add("show");
  document.body.classList.add("edit-mode");
  document.body.style.overflow = "hidden";
  showToast("Edit Mode activated — make your changes below!", "info", 2800);
}
function closeEditPanel() {
  editPanel.classList.remove("open");
  editOverlay.classList.remove("show");
  document.body.classList.remove("edit-mode");
  document.body.style.overflow = "";
}

editFab.addEventListener("click", openEditPanel);
editClose.addEventListener("click", closeEditPanel);
editOverlay.addEventListener("click", closeEditPanel);
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") closeEditPanel();
});

/* ─── TABS ──────────────────────────────────── */
document.querySelectorAll(".edit-tab").forEach((tab) => {
  tab.addEventListener("click", () => {
    document
      .querySelectorAll(".edit-tab")
      .forEach((t) => t.classList.remove("active"));
    document
      .querySelectorAll(".edit-tab-pane")
      .forEach((p) => p.classList.remove("active"));
    tab.classList.add("active");
    document.getElementById(tab.dataset.tab).classList.add("active");
  });
});

/* ─── DRAG & DROP HELPER ────────────────────── */
function enableDragDrop(zone) {
  zone.addEventListener("dragover", (e) => {
    e.preventDefault();
    zone.classList.add("drag-over");
  });
  zone.addEventListener("dragleave", () => zone.classList.remove("drag-over"));
  zone.addEventListener("drop", (e) => {
    e.preventDefault();
    zone.classList.remove("drag-over");
    const input = zone.querySelector('input[type="file"]');
    if (input && e.dataTransfer.files.length) {
      const dt = new DataTransfer();
      Array.from(e.dataTransfer.files).forEach((f) => dt.items.add(f));
      input.files = dt.files;
      input.dispatchEvent(new Event("change", { bubbles: true }));
    }
  });
}
enableDragDrop(document.getElementById("profileUploadZone"));
enableDragDrop(document.getElementById("designUploadZone"));

/* ─── PROFILE PHOTO UPLOAD ──────────────────── */
const profileInput = document.getElementById("profileInput");

profileInput.addEventListener("change", () => {
  const file = profileInput.files[0];
  if (!file) return;
  if (!file.type.startsWith("image/")) {
    showToast("Please upload an image file.", "error");
    return;
  }
  if (file.size > 8 * 1024 * 1024) {
    showToast("File too large — max 8 MB.", "warning");
    return;
  }

  fakeProgress(
    document.getElementById("profileProgressFill"),
    document.getElementById("profileProgressText"),
    document.getElementById("profileProgress"),
    () => {
      const reader = new FileReader();
      reader.onload = (e) => {
        // Apply to hero profile area
        const profileHolder = document.querySelector(".profile-placeholder");
        if (profileHolder) {
          profileHolder.innerHTML = `<img src="${e.target.result}" alt="Profile Photo" style="width:100%;height:100%;object-fit:cover;border-radius:50%;" />`;
        }
        // Apply to about section
        const aboutHolder = document.querySelector(".about-img-placeholder");
        if (aboutHolder) {
          aboutHolder.innerHTML = `<img src="${e.target.result}" alt="Profile" style="width:100%;height:100%;object-fit:cover;border-radius:18px;" />`;
        }
        // Strip preview
        const strip = document.getElementById("profilePreviewStrip");
        strip.innerHTML = "";
        const thumb = document.createElement("div");
        thumb.className = "preview-thumb";
        thumb.innerHTML = `<img src="${e.target.result}" alt="Preview" /><button class="preview-thumb-del" title="Remove">✕</button>`;
        thumb
          .querySelector(".preview-thumb-del")
          .addEventListener("click", () => {
            thumb.remove();
            profileInput.value = "";
            const ph = document.querySelector(".profile-placeholder");
            if (ph)
              ph.innerHTML = `<div class="profile-initials">QA</div><p class="profile-hint">Add your photo here</p>`;
            showToast("Profile photo removed.", "warning");
          });
        strip.appendChild(thumb);
        showToast("Profile photo uploaded! ✓", "success");
      };
      reader.readAsDataURL(file);
    },
  );
});

/* ─── PROFILE INFO APPLY ────────────────────── */
document.getElementById("applyProfile").addEventListener("click", () => {
  const name = document.getElementById("editName").value.trim();
  const brand = document.getElementById("editBrand").value.trim();
  const bio = document.getElementById("editBio").value.trim();
  const status = document.getElementById("editStatus").value;

  if (name) {
    document
      .querySelectorAll(".hero-name .line-1")
      .forEach(
        (el) =>
          (el.textContent = name.split(" ").slice(0, -1).join(" ") || name),
      );
    document
      .querySelectorAll(".hero-name .line-2")
      .forEach((el) => (el.textContent = name.split(" ").slice(-1)[0] || ""));
  }
  if (brand) {
    document.querySelectorAll(".hero-brand strong, .nav-logo").forEach((el) => {
      if (el.classList.contains("nav-logo")) return;
    });
    document
      .querySelectorAll(".hero-brand strong")
      .forEach((el) => (el.textContent = brand));
    document
      .querySelectorAll(".footer-logo")
      .forEach(
        (el) =>
          (el.innerHTML = `<span class="logo-bracket">&lt;</span>${brand.slice(0, 8)}<span class="logo-bracket">/&gt;</span>`),
      );
  }
  if (bio) {
    document
      .querySelectorAll(".hero-bio")
      .forEach((el) => (el.textContent = bio));
  }
  const badgeEl = document.querySelector(".hero-badge");
  if (badgeEl) {
    const labels = {
      available: "Available for freelance",
      busy: "Currently busy",
      open: "Open to opportunities",
    };
    badgeEl.innerHTML = `<span class="badge-dot"></span> ${labels[status]}`;
  }

  // Social links
  const socials = [
    { id: "editGithub", sel: ".ri-github-fill" },
    { id: "editLinkedin", sel: ".ri-linkedin-box-fill" },
    { id: "editInstagram", sel: ".ri-instagram-fill" },
    { id: "editBehance", sel: ".ri-behance-fill" },
  ];
  socials.forEach((s) => {
    const val = document.getElementById(s.id).value.trim();
    if (val) {
      document.querySelectorAll(`.social-icon .${s.sel}`).forEach((icon) => {
        icon.closest("a").href = val;
      });
      document.querySelectorAll(`.footer-socials .${s.sel}`).forEach((icon) => {
        icon.closest("a").href = val;
      });
    }
  });

  showToast("Profile updated on your portfolio! ✓", "success");
});

/* ─── CV UPLOAD ─────────────────────────────── */
document.getElementById("cvInput").addEventListener("change", function () {
  const file = this.files[0];
  if (!file) return;
  const nameEl = document.getElementById("cvFileName");
  nameEl.style.display = "block";
  nameEl.innerHTML = `<i class="ri-file-pdf-2-fill"></i> ${file.name} (${(file.size / 1024).toFixed(0)} KB)`;
  const cvBtn = document.querySelector(".download-cv");
  if (cvBtn) {
    const url = URL.createObjectURL(file);
    cvBtn.href = url;
    cvBtn.download = file.name;
  }
  showToast(`CV "${file.name}" ready to download! ✓`, "success");
});

/* ─── DESIGN GALLERY UPLOAD ─────────────────── */
const designInput = document.getElementById("designInput");
let designImages = [];

designInput.addEventListener("change", () => {
  const files = Array.from(designInput.files);
  if (!files.length) return;
  const valid = files.filter((f) => f.type.startsWith("image/"));
  if (valid.length < files.length)
    showToast(
      `${files.length - valid.length} non-image file(s) skipped.`,
      "warning",
    );
  if (!valid.length) return;

  fakeProgress(
    document.getElementById("designProgressFill"),
    document.getElementById("designProgressText"),
    document.getElementById("designProgress"),
    () => {
      let loaded = 0;
      valid.forEach((file) => {
        const reader = new FileReader();
        reader.onload = (e) => {
          designImages.push({ src: e.target.result, name: file.name });
          // Add thumb
          const strip = document.getElementById("designPreviewStrip");
          const thumb = document.createElement("div");
          thumb.className = "preview-thumb";
          const idx = designImages.length - 1;
          thumb.innerHTML = `<img src="${e.target.result}" alt="${file.name}" /><button class="preview-thumb-del" title="Remove">✕</button>`;
          thumb
            .querySelector(".preview-thumb-del")
            .addEventListener("click", () => {
              designImages.splice(idx, 1);
              thumb.remove();
              showToast("Design removed from queue.", "warning");
            });
          strip.appendChild(thumb);
          loaded++;
          if (loaded === valid.length)
            showToast(`${valid.length} design(s) ready to apply!`, "success");
        };
        reader.readAsDataURL(file);
      });
    },
  );
});

/* Apply designs to gallery */
document.getElementById("applyDesigns").addEventListener("click", () => {
  if (!designImages.length) {
    showToast("No designs uploaded yet.", "warning");
    return;
  }
  const galleryCards = document.querySelectorAll(".gallery-card");
  let applied = 0;
  designImages.forEach((img, i) => {
    if (i < galleryCards.length) {
      const card = galleryCards[i];
      const cardImg = card.querySelector(".gallery-img");
      const ph = card.querySelector(".gallery-placeholder");
      cardImg.src = img.src;
      cardImg.style.display = "block";
      if (ph) ph.style.display = "none";
      card.classList.add("loaded");
      applied++;
    }
  });
  showToast(`${applied} design(s) applied to the gallery! ✓`, "success");
});

/* ─── PROJECT EDITOR ────────────────────────── */
const projectEditorList = document.getElementById("projectEditorList");
let projectEditors = [];

// Initialize from existing static project cards
function initProjectEditors() {
  const existingCards = document.querySelectorAll(".project-card");
  existingCards.forEach((card, i) => {
    const title = card.querySelector("h3")?.textContent || `Project ${i + 1}`;
    const desc = card.querySelector("p")?.textContent || "";
    const tags = Array.from(card.querySelectorAll(".project-tags span")).map(
      (s) => s.textContent,
    );
    const cat = card.dataset.category || "web";
    projectEditors.push({
      id: i,
      title,
      desc,
      tags,
      cat,
      imgSrc: null,
      liveUrl: "",
      githubUrl: "",
    });
  });
  renderProjectEditors();
}

function renderProjectEditors() {
  projectEditorList.innerHTML = "";
  projectEditors.forEach((proj, i) => renderProjectEditorCard(proj, i));
}

function renderProjectEditorCard(proj, i) {
  const card = document.createElement("div");
  card.className = "project-editor-card";
  card.dataset.editorIdx = i;
  card.innerHTML = `
    <div class="project-editor-card-header">
      <span class="project-editor-card-title">${proj.title || "Untitled Project"}</span>
      <div class="pec-actions">
        <button class="pec-btn danger pec-delete" title="Delete project"><i class="ri-delete-bin-fill"></i></button>
      </div>
    </div>
    <div class="pec-img-upload" id="pecImgZone-${i}">
      <input type="file" accept="image/*" class="pec-img-input" />
      <img class="pec-img-preview" src="${proj.imgSrc || ""}" alt="" />
      <div class="pec-upload-hint">
        <i class="ri-image-add-line"></i>
        <span>Upload screenshot / preview</span>
      </div>
    </div>
    <div class="edit-field"><label>Project Title</label>
      <input class="edit-input pec-title" value="${proj.title}" placeholder="Project name" />
    </div>
    <div class="edit-field"><label>Description</label>
      <textarea class="edit-input edit-textarea pec-desc" style="min-height:60px;" placeholder="What this project is about…">${proj.desc}</textarea>
    </div>
    <div class="edit-field"><label>Category</label>
      <select class="edit-input edit-select pec-cat">
        <option value="web"    ${proj.cat === "web" ? "selected" : ""}>Web Development</option>
        <option value="design" ${proj.cat === "design" ? "selected" : ""}>Graphic Design</option>
        <option value="uiux"   ${proj.cat === "uiux" ? "selected" : ""}>UI/UX</option>
      </select>
    </div>
    <div class="edit-field"><label>Tags (press Enter or comma to add)</label>
      <div class="tag-input-wrap" id="tagWrap-${i}">
        ${proj.tags.map((t) => `<span class="tag-chip">${t}<button type="button" data-tag="${t}">✕</button></span>`).join("")}
        <input class="tag-real-input" placeholder="Add tag…" />
      </div>
    </div>
    <div class="edit-field"><label><i class="ri-external-link-line"></i> Live Demo URL</label>
      <input class="edit-input pec-live" value="${proj.liveUrl}" placeholder="https://yourproject.com" />
    </div>
    <div class="edit-field"><label><i class="ri-github-fill"></i> GitHub URL</label>
      <input class="edit-input pec-github" value="${proj.githubUrl}" placeholder="https://github.com/user/repo" />
    </div>
  `;

  // Image upload
  const imgZone = card.querySelector(".pec-img-upload");
  const imgInput = card.querySelector(".pec-img-input");
  const imgPrev = card.querySelector(".pec-img-preview");
  if (proj.imgSrc) {
    imgZone.classList.add("has-img");
    imgPrev.style.display = "block";
  }
  imgInput.addEventListener("change", () => {
    const file = imgInput.files[0];
    if (!file || !file.type.startsWith("image/")) {
      showToast("Image files only.", "error");
      return;
    }
    const reader = new FileReader();
    reader.onload = (e) => {
      proj.imgSrc = e.target.result;
      imgPrev.src = e.target.result;
      imgZone.classList.add("has-img");
      showToast(
        `Screenshot uploaded for "${proj.title || "project"}"! ✓`,
        "success",
      );
    };
    reader.readAsDataURL(file);
  });
  enableDragDrop(imgZone);

  // Tag input
  const tagWrap = card.querySelector(`#tagWrap-${i}`);
  const tagInput = tagWrap.querySelector(".tag-real-input");
  function addTag(val) {
    const v = val.trim().replace(/,/g, "");
    if (!v || proj.tags.includes(v)) return;
    proj.tags.push(v);
    const chip = document.createElement("span");
    chip.className = "tag-chip";
    chip.innerHTML = `${v}<button type="button" data-tag="${v}">✕</button>`;
    chip.querySelector("button").addEventListener("click", () => {
      proj.tags = proj.tags.filter((t) => t !== v);
      chip.remove();
    });
    tagWrap.insertBefore(chip, tagInput);
    tagInput.value = "";
  }
  tagInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault();
      addTag(tagInput.value);
    }
  });
  tagInput.addEventListener("blur", () => {
    if (tagInput.value.trim()) addTag(tagInput.value);
  });
  // Delete existing tag chips
  card.querySelectorAll(".tag-chip button").forEach((btn) => {
    btn.addEventListener("click", () => {
      const tag = btn.dataset.tag;
      proj.tags = proj.tags.filter((t) => t !== tag);
      btn.closest(".tag-chip").remove();
    });
  });

  // Live sync title
  card.querySelector(".pec-title").addEventListener("input", (e) => {
    proj.title = e.target.value;
    card.querySelector(".project-editor-card-title").textContent =
      e.target.value || "Untitled";
  });
  card.querySelector(".pec-desc").addEventListener("input", (e) => {
    proj.desc = e.target.value;
  });
  card.querySelector(".pec-cat").addEventListener("change", (e) => {
    proj.cat = e.target.value;
  });
  card.querySelector(".pec-live").addEventListener("input", (e) => {
    proj.liveUrl = e.target.value;
  });
  card.querySelector(".pec-github").addEventListener("input", (e) => {
    proj.githubUrl = e.target.value;
  });

  // Delete card
  card.querySelector(".pec-delete").addEventListener("click", () => {
    if (confirm(`Delete project "${proj.title}"?`)) {
      projectEditors.splice(i, 1);
      renderProjectEditors();
      showToast("Project removed.", "warning");
    }
  });

  projectEditorList.appendChild(card);
}

/* Add new blank project */
document.getElementById("addProjectBtn").addEventListener("click", () => {
  projectEditors.push({
    id: Date.now(),
    title: "New Project",
    desc: "",
    tags: [],
    cat: "web",
    imgSrc: null,
    liveUrl: "",
    githubUrl: "",
  });
  renderProjectEditors();
  projectEditorList.lastElementChild.scrollIntoView({
    behavior: "smooth",
  });
  showToast("New project card added!", "info");
});

/* Apply projects to live portfolio */
document.getElementById("applyProjects").addEventListener("click", () => {
  const grid = document.getElementById("projectsGrid");
  if (!grid) return;
  grid.innerHTML = "";

  projectEditors.forEach((proj, i) => {
    const card = document.createElement("div");
    card.className = "project-card";
    card.dataset.category = proj.cat;
    card.setAttribute("data-aos", "fade-up");
    card.setAttribute("data-aos-delay", (i * 50 + 100).toString());

    const imgContent = proj.imgSrc
      ? `<img src="${proj.imgSrc}" alt="${proj.title}" style="width:100%;height:100%;object-fit:cover;" />`
      : `<div class="project-img-placeholder"><i class="ri-window-fill"></i></div>`;

    const liveBtn = proj.liveUrl
      ? `<a href="${proj.liveUrl}" target="_blank" rel="noopener" class="btn btn-sm btn-primary"><i class="ri-external-link-line"></i> Live Demo</a>`
      : "";
    const ghBtn = proj.githubUrl
      ? `<a href="${proj.githubUrl}" target="_blank" rel="noopener" class="btn btn-sm btn-ghost"><i class="ri-github-fill"></i> GitHub</a>`
      : "";

    const tagsHtml = proj.tags.map((t) => `<span>${t}</span>`).join("");

    card.innerHTML = `
      <div class="project-img-wrap">
        ${imgContent}
        <div class="project-overlay">${liveBtn}${ghBtn}</div>
      </div>
      <div class="project-info">
        <h3>${proj.title}</h3>
        <p>${proj.desc || "No description added yet."}</p>
        <div class="project-tags">${tagsHtml}</div>
      </div>`;

    grid.appendChild(card);
  });

  // Re-init filter
  const filterBtnsLive = document.querySelectorAll(".filter-btn");
  const allCards = document.querySelectorAll(".project-card");
  filterBtnsLive.forEach((btn) => {
    btn.addEventListener("click", () => {
      filterBtnsLive.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");
      const f = btn.dataset.filter;
      allCards.forEach((c) =>
        c.classList.toggle("hidden", f !== "all" && c.dataset.category !== f),
      );
    });
  });

  triggerAOS();
  showToast(
    `${projectEditors.length} project(s) applied to your portfolio! ✓`,
    "success",
  );
});

/* ─── WEBSITE LINK SLOTS ────────────────────── */
document.getElementById("applyWebsite").addEventListener("click", () => {
  const slots = document.querySelectorAll(".site-link-input");
  const projectCards = document.querySelectorAll(".project-card");
  let applied = 0;
  slots.forEach((input, i) => {
    const url = input.value.trim();
    if (url && projectCards[i]) {
      const demoBtn = projectCards[i].querySelector(".btn-primary");
      if (demoBtn) {
        demoBtn.href = url;
        demoBtn.target = "_blank";
        applied++;
      }
    }
  });
  showToast(
    applied
      ? `${applied} link(s) wired to project cards! ✓`
      : "Enter at least one URL first.",
    applied ? "success" : "warning",
  );
});

/* ─── SITE PREVIEW ──────────────────────────── */
document.getElementById("previewSiteBtn").addEventListener("click", () => {
  const url = document.getElementById("siteUrl").value.trim();
  if (!url) {
    showToast("Enter a URL first!", "warning");
    return;
  }
  let finalUrl = url;
  if (!/^https?:\/\//i.test(url)) finalUrl = "https://" + url;

  const frame = document.getElementById("sitePreviewFrame");
  const iframe = document.getElementById("sitePreviewIframe");
  const overlay = document.getElementById("sitePreviewOverlay");

  frame.classList.add("show");
  overlay.style.display = "flex";
  overlay.innerHTML =
    '<i class="ri-loader-4-line" style="animation:spin 0.8s linear infinite;font-size:2rem;color:var(--gold);"></i><span>Loading preview…</span>';

  iframe.src = finalUrl;
  iframe.onload = () => {
    overlay.style.display = "none";
    showToast("Website preview loaded! ✓", "success");
  };
  iframe.onerror = () => {
    overlay.innerHTML =
      '<i class="ri-error-warning-fill" style="font-size:2rem;color:#ef4444;"></i><span>Could not load preview (CORS or invalid URL)</span>';
    showToast(
      "Could not load preview. Try opening the link directly.",
      "error",
    );
  };
  setTimeout(() => {
    if (overlay.style.display !== "none") {
      overlay.innerHTML = `<i class="ri-error-warning-fill" style="font-size:2rem;color:var(--gold);opacity:0.5;"></i><span>Preview blocked by site. <a href="${finalUrl}" target="_blank" rel="noopener" style="color:var(--gold);">Open in new tab ↗</a></span>`;
    }
  }, 5000);
});

/* ─── INIT ──────────────────────────────────── */
initProjectEditors();

/* ─── PROJECT FILTER COUNT BADGES ─── */
function updateFilterCounts() {
  const allCards = document.querySelectorAll(".project-card");
  const total = allCards.length;
  const webCount = document.querySelectorAll(
    '.project-card[data-category="web"]',
  ).length;
  const designCount = document.querySelectorAll(
    '.project-card[data-category="design"]',
  ).length;
  const uiuxCount = document.querySelectorAll(
    '.project-card[data-category="uiux"]',
  ).length;

  const countAll = document.getElementById("count-all");
  const countWeb = document.getElementById("count-web");
  const countDesign = document.getElementById("count-design");
  const countUiux = document.getElementById("count-uiux");

  if (countAll) countAll.textContent = total;
  if (countWeb) countWeb.textContent = webCount;
  if (countDesign) countDesign.textContent = designCount;
  if (countUiux) countUiux.textContent = uiuxCount;
}
updateFilterCounts();

/* ─── SYNC project-real-img src → modal data-img ─── */
function syncModalImageSrc() {
  document.querySelectorAll(".project-card").forEach((card) => {
    const img = card.querySelector(".project-real-img");
    const previewBtn = card.querySelector(".btn-preview-img");
    if (img && previewBtn && img.src && !img.src.endsWith("/")) {
      previewBtn.dataset.img = img.src;
    }
  });
}
syncModalImageSrc();

/* ─── PROJECT MODAL ─── */
function openProjectModal(btn) {
  const overlay = document.getElementById("projectModalOverlay");
  const modalImg = document.getElementById("modalImg");
  const modalImgPlaceholder = document.getElementById("modalImgPlaceholder");
  const modalTitle = document.getElementById("modalTitle");
  const modalDesc = document.getElementById("modalDesc");
  const modalTags = document.getElementById("modalTags");
  const modalBadge = document.getElementById("modalBadge");
  const modalActions = document.getElementById("modalActions");

  const title = btn.dataset.title || "";
  const desc = btn.dataset.desc || "";
  const tags = btn.dataset.tags ? btn.dataset.tags.split(",") : [];
  const imgSrc = btn.dataset.img || "";

  // Get the card's category for badge
  const card = btn.closest(".project-card");
  const category = card?.dataset.category || "web";
  const badgeMap = {
    web: '<span class="project-category-badge web-badge"><i class="ri-code-s-slash-fill"></i> Web Dev</span>',
    design:
      '<span class="project-category-badge design-badge"><i class="ri-palette-fill"></i> Graphic Design</span>',
    uiux: '<span class="project-category-badge uiux-badge"><i class="ri-layout-fill"></i> UI/UX</span>',
  };
  modalBadge.innerHTML = badgeMap[category] || "";

  // Image
  if (imgSrc && imgSrc.length > 5) {
    modalImg.src = imgSrc;
    modalImg.style.display = "block";
    modalImgPlaceholder.style.display = "none";
  } else {
    modalImg.src = "";
    modalImg.style.display = "none";
    modalImgPlaceholder.style.display = "flex";
  }

  modalTitle.textContent = title;
  modalDesc.textContent = desc;

  // Tags
  modalTags.innerHTML = tags.map((t) => `<span>${t.trim()}</span>`).join("");

  // Action buttons from card overlay
  const overlayBtns = card?.querySelectorAll(".project-overlay a") || [];
  modalActions.innerHTML = "";
  overlayBtns.forEach((a) => {
    const clone = a.cloneNode(true);
    clone.style.cssText = "";
    modalActions.appendChild(clone);
  });

  overlay.classList.add("open");
  document.body.style.overflow = "hidden";
}

function closeProjectModal() {
  document.getElementById("projectModalOverlay").classList.remove("open");
  document.body.style.overflow = "";
}

// Close modal on Escape key
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") closeProjectModal();
});

// Make functions global
window.openProjectModal = openProjectModal;
window.closeProjectModal = closeProjectModal;

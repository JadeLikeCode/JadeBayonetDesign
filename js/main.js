/* ─────────────────────────────────────────────────────────────
   Jade Bayonet — behaviour
   - Renders the project rows + drawers from js/projects.js
   - Opening a project updates the URL to /slug/ (shareable link)
   - Visiting /slug/ directly loads the page with that drawer open
   - Ticker loops left and pauses on hover
   - Press L (or tap the footer hint) to spread some love
   ───────────────────────────────────────────────────────────── */
(function () {
  "use strict";

  const PROJECTS = window.PROJECTS || [];
  const TICKER = window.TICKER || [];
  const SITE_TITLE = "Jade Bayonet";
  const DEFAULT_TITLE = document.title;

  const pad = (n) => String(n).padStart(2, "0");
  const esc = (s = "") =>
    String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const isPlaceholder = (s = "") => /^\[.*\]$/.test(String(s).trim());
  // Where the site lives: "https://jadebayonet.com/", a GitHub project path,
  // or a folder on your computer when index.html is opened directly.
  const ROOT = new URL("..", document.currentScript.src);
  const LOCAL = location.protocol === "file:"; // opened by double-clicking → use #links
  const HOME = LOCAL ? new URL("index.html", ROOT).href : ROOT.pathname;
  const asset = (src) => new URL(src, ROOT).href;
  const urlFor = (slug) => (LOCAL ? `${HOME}#${slug}` : `${ROOT.pathname}${slug}/`);
  const bySlug = (slug) => PROJECTS.find((p) => p.slug === slug);

  /* ── Media ────────────────────────────────────────────── */
  const marks = () =>
    ["tl", "tr", "bl", "br"].map((c) => `<span class="slide__mark slide__mark--${c}" aria-hidden="true">+</span>`).join("");

  const isVideo = (item) => item.type === "video" || item.video === true || /\.(mp4|webm|mov|m4v)$/i.test(item.src || "");

  // Video shapes: "wide" = 1920×1080 (16:9), "square" = 1:1
  const VIDEO_RATIO = { wide: "16 / 9", square: "1 / 1" };

  function slide(item, ratio, color) {
    const video = isVideo(item);
    const r = ratio || item.ratio || (video ? VIDEO_RATIO[item.shape || "wide"] : "1400 / 820");
    const style = `--ratio:${r};--slide-color:${color}`;

    if (video && item.src) {
      // Loads + plays only when on screen (see setupVideos)
      const poster = item.poster ? ` poster="${esc(asset(item.poster))}"` : "";
      return `<div class="slide slide--video" style="${style}"><video data-src="${esc(asset(item.src))}"${poster} muted loop playsinline preload="none" aria-label="${esc(item.alt || "")}"></video></div>`;
    }
    if (item.src) {
      return `<figure class="slide" style="${style};margin:0"><img src="${esc(asset(item.src))}" alt="${esc(item.alt)}" loading="lazy" decoding="async" /></figure>`;
    }
    const label = item.label || (video ? (item.shape === "square" ? "Square video" : "Video — 1920 × 1080") : "");
    return `<div class="slide${video ? " slide--video" : ""}" style="${style}">${marks()}<span class="slide__label">${video ? "▶&nbsp; " : ""}${esc(label)}</span></div>`;
  }

  function block(b, p) {
    switch (b.type) {
      case "full":
        return slide(b, b.ratio, p.color);
      case "video":
        // square on its own sits centred at half width; wide is full width
        return b.shape === "square"
          ? `<div class="solo-square">${slide(b, null, p.color)}</div>`
          : slide(b, null, p.color);
      case "pair":
        return `<div class="pair">${(b.items || [])
          .map((i) => slide(i, i.ratio || b.ratio || (isVideo(i) ? VIDEO_RATIO[i.shape || "square"] : "1 / 1"), p.color))
          .join("")}</div>`;
      case "note":
        return `<div class="note"><p class="note__label">${esc(b.label || "")}</p><p class="note__text">${esc(b.text || "")}</p></div>`;
      default:
        return "";
    }
  }

  /* ── Drawer ───────────────────────────────────────────── */
  function credits(p) {
    const people = (p.contributors || [])
      .map((c) => (typeof c === "string" ? c : [c.name, c.role].filter(Boolean).join(" — ")))
      .map((c) => `<li>${esc(c)}</li>`)
      .join("");
    if (!p.role && !people) return "";
    return `
      <div class="credits">
        <p class="credits__label">Credits</p>
        ${p.role ? `<div class="credits__role"><p class="credits__k">My role</p><p>${esc(p.role)}</p></div>` : ""}
        ${people ? `<div class="credits__people"><p class="credits__k">Contributors</p><ul>${people}</ul></div>` : ""}
      </div>`;
  }

  function drawer(p, next) {
    const intro = p.overview || p.year
      ? `<div class="overview"><p class="overview__label">${esc(p.year || "")}</p><p class="overview__text">${esc(p.overview || "")}</p></div>`
      : "";

    return `
      <div class="drawer" id="drawer-${p.slug}" role="region" aria-label="${esc(p.title)}">
        <div class="drawer__clip">
          <div class="drawer__inner">
            ${intro}
            ${(p.blocks || []).map((b) => block(b, p)).join("")}
            ${credits(p)}
            <div class="drawer__footer">
              <a class="btn" href="${HOME}" data-close>Close project <span aria-hidden="true">↑</span></a>
              ${next ? `<a href="${urlFor(next.slug)}" data-open="${next.slug}">Next: ${esc(next.title)} ↓</a>` : ""}
            </div>
          </div>
        </div>
      </div>`;
  }

  /* ── Rows ─────────────────────────────────────────────── */
  function toggleButton(p) {
    return `<a class="btn" href="${urlFor(p.slug)}" data-toggle="${p.slug}" aria-expanded="false" aria-controls="drawer-${p.slug}"><span class="btn__label">See the project</span> <span class="btn__icon" aria-hidden="true">↓</span></a>`;
  }

  function selectedRow(p, n, next) {
    const tags = (p.tags || [])
      .map((t) => `<span class="tag${isPlaceholder(t) ? " tag--placeholder" : ""}">${esc(t)}</span>`)
      .join("");
    return `
      <article class="project" id="${p.slug}" data-slug="${p.slug}">
        <div class="project__head">
          <div class="project__title-row">
            <h3 class="project__title" data-toggle="${p.slug}">${esc(p.title)}</h3>
            <span class="project__num">${pad(n)}</span>
          </div>
          <div class="project__details">
            <div class="tags">${tags}</div>
            ${toggleButton(p)}
          </div>
        </div>
        ${drawer(p, next)}
      </article>`;
  }

  function earlierRow(p, n, next) {
    return `
      <article class="project project--earlier" id="${p.slug}" data-slug="${p.slug}">
        <div class="project__head">
          <h3 class="project__title" data-toggle="${p.slug}">${esc(p.title)}</h3>
          <span class="project__num">${pad(n)}  ·  ${esc(p.year || "")}</span>
          ${toggleButton(p)}
        </div>
        ${drawer(p, next)}
      </article>`;
  }

  function renderWork() {
    const selected = PROJECTS.filter((p) => p.group !== "earlier");
    const earlier = PROJECTS.filter((p) => p.group === "earlier");
    const ordered = [...selected, ...earlier];
    const nextOf = (p) => ordered[(ordered.indexOf(p) + 1) % ordered.length];

    document.getElementById("selected-list").innerHTML = selected
      .map((p, i) => selectedRow(p, i + 1, nextOf(p)))
      .join("");
    document.getElementById("earlier-list").innerHTML = earlier
      .map((p, i) => earlierRow(p, selected.length + i + 1, nextOf(p)))
      .join("");

    const range = (a, b) => (b >= a ? `${pad(a)}–${pad(b)}` : "");
    document.getElementById("selected-range").textContent = range(1, selected.length);
    document.getElementById("earlier-range").textContent = range(selected.length + 1, ordered.length);
  }

  /* ── Ticker ───────────────────────────────────────────── */
  function renderTicker() {
    const track = document.getElementById("ticker");
    if (!track || !TICKER.length) return;

    const scale = () => (window.innerWidth <= 640 ? 0.55 : window.innerWidth <= 1024 ? 0.78 : 1);
    const tile = (t, hidden) => {
      const s = scale();
      const tag = t.project ? "a" : "div";
      const href = t.project ? ` href="${urlFor(t.project)}" data-open="${t.project}"` : "";
      const aria = hidden ? ' aria-hidden="true" tabindex="-1"' : "";
      let inner = "";
      if (t.src && t.inset) {
        const r = t.inset;
        inner = `<span class="tile__inset" style="left:${r.x * s}px;top:${r.y * s}px;width:${r.w * s}px;height:${r.w * s}px"><img src="${esc(asset(t.src))}" alt="${hidden ? "" : esc(t.alt)}" /></span>`;
      } else if (t.src) {
        inner = `<img src="${esc(asset(t.src))}" alt="${hidden ? "" : esc(t.alt)}" loading="lazy" />`;
      } else {
        inner = `<span class="tile__label">${esc(t.label || "")}</span>`;
      }
      return `<${tag} class="tile${t.dark ? " tile--dark" : ""}"${href}${aria} style="width:${t.w * s}px;height:${t.h * s}px;background:${t.color}">${inner}</${tag}>`;
    };

    const set = (hidden) => `<div class="ticker__set">${TICKER.map((t) => tile(t, hidden)).join("")}</div>`;
    track.innerHTML = set(false) + set(true);

    const width = track.firstElementChild.getBoundingClientRect().width;
    track.style.setProperty("--ticker-duration", `${Math.round(width / 45)}s`); // ~45px per second
  }

  /* ── Open / close + URL ───────────────────────────────── */
  let current = null;

  function setButton(row, open) {
    row.querySelectorAll(".project__head [data-toggle].btn").forEach((btn) => {
      btn.classList.toggle("btn--active", open);
      btn.setAttribute("aria-expanded", String(open));
      btn.querySelector(".btn__label").textContent = open ? "Close project" : "See the project";
      btn.querySelector(".btn__icon").textContent = open ? "↑" : "↓";
    });
  }

  function closeRow(row, instant) {
    if (!row) return;
    const d = row.querySelector(".drawer");
    if (instant) d.style.transition = "none";
    row.classList.remove("is-open");
    setButton(row, false);
    if (instant) {
      void d.offsetHeight;
      d.style.transition = "";
    }
  }

  function scrollToRow(row, smooth) {
    const y = row.getBoundingClientRect().top + window.scrollY - 12;
    window.scrollTo({ top: y, behavior: smooth ? "smooth" : "auto" });
  }

  function open(slug, { push = true, smooth = true } = {}) {
    const p = bySlug(slug);
    const row = p && document.getElementById(slug);
    if (!row) return close({ push });

    if (current && current !== row) closeRow(current, true);
    row.classList.add("is-open");
    setButton(row, true);
    current = row;

    document.title = `${p.title} — ${SITE_TITLE}`;
    if (push) setUrl(urlFor(slug), { slug });
    requestAnimationFrame(() => scrollToRow(row, smooth));
  }

  function close({ push = true } = {}) {
    closeRow(current, false);
    current = null;
    document.title = DEFAULT_TITLE;
    if (push) setUrl(LOCAL ? HOME : ROOT.pathname, {});
  }

  function setUrl(url, state) {
    const here = location.href.replace(location.origin, "");
    if (here === url || location.href === url) return;
    try {
      history.pushState(state, "", url);
    } catch (err) {
      // Some browsers block history changes on local files — fall back to the hash.
      if (LOCAL) location.hash = state.slug || "";
    }
  }

  function slugFromPath() {
    const hash = decodeURIComponent(location.hash.slice(1));
    if (hash && bySlug(hash)) return hash;
    const seg = location.pathname.replace(/\/index\.html$/, "").replace(/\/+$/, "").split("/").pop();
    return seg && bySlug(seg) ? seg : null;
  }

  function route({ smooth }) {
    const slug = slugFromPath();
    if (slug) open(slug, { push: false, smooth });
    else if (current) close({ push: false });
  }

  /* ── Hearts (press L) ─────────────────────────────────── */
  const HEARTS = ["❤️", "💖", "💗", "💕", "💘", "🩷", "❤️", "❤️"];
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
  const pointer = { x: null, y: null };
  window.addEventListener("pointermove", (e) => { pointer.x = e.clientX; pointer.y = e.clientY; }, { passive: true });

  function hearts(x, y) {
    const w = window.innerWidth;
    const h = window.innerHeight;
    if (x == null) { x = w / 2; y = h / 2; }
    const count = reduceMotion.matches ? 12 : w < 640 ? 28 : 44;
    const parts = [];

    for (let i = 0; i < count; i++) {
      const el = document.createElement("span");
      el.className = "heart";
      el.setAttribute("aria-hidden", "true");
      el.textContent = HEARTS[(Math.random() * HEARTS.length) | 0];
      const size = 18 + Math.random() * 30;
      el.style.fontSize = `${size}px`;
      document.body.appendChild(el);

      const angle = Math.random() * Math.PI * 2;
      const speed = reduceMotion.matches ? 0 : 6 + Math.random() * 12;
      parts.push({
        el,
        x: x - size / 2,
        y: y - size / 2,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed - 6, // a little upward kick
        rot: (Math.random() - 0.5) * 40,
        vr: (Math.random() - 0.5) * 14,
        life: 0,
        max: 70 + Math.random() * 40,
      });
    }

    let last = performance.now();
    (function tick(now) {
      const dt = Math.min((now - last) / 16.67, 3); // frame-rate independent
      last = now;
      let alive = 0;
      for (const p of parts) {
        if (!p.el) continue;
        p.life += dt;
        p.vy += 0.35 * dt;          // gravity
        p.vx *= Math.pow(0.985, dt); // air
        p.x += p.vx * dt;
        p.y += p.vy * dt;
        p.rot += p.vr * dt;
        const t = p.life / p.max;
        const scale = t < 0.15 ? t / 0.15 : 1;
        p.el.style.opacity = String(t > 0.7 ? Math.max(0, 1 - (t - 0.7) / 0.3) : 1);
        p.el.style.transform = `translate(${p.x}px, ${p.y}px) rotate(${p.rot}deg) scale(${scale})`;
        if (t >= 1 || p.y > h + 80) { p.el.remove(); p.el = null; } else alive++;
      }
      if (alive) requestAnimationFrame(tick);
    })(last);
  }

  /* ── Events ───────────────────────────────────────────── */
  document.addEventListener("click", (e) => {
    if (e.detail > 0) e.target.closest("a, button")?.blur(); // mouse click → no lingering focus ring
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.button === 1) return; // let new-tab clicks through

    const toggle = e.target.closest("[data-toggle]");
    if (toggle) {
      e.preventDefault();
      const slug = toggle.dataset.toggle;
      current && current.id === slug ? close() : open(slug);
      return;
    }
    const opener = e.target.closest("[data-open]");
    if (opener) {
      e.preventDefault();
      open(opener.dataset.open);
      return;
    }
    if (e.target.closest("[data-close]")) {
      e.preventDefault();
      const row = current;
      close();
      if (row) scrollToRow(row, true);
      return;
    }
    if (e.target.closest("[data-home]")) {
      e.preventDefault();
      if (current) close();
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }
    const love = e.target.closest("[data-love]");
    if (love) {
      const r = love.getBoundingClientRect();
      hearts(r.left + r.width / 2, r.top);
      return;
    }
    if (e.target.closest("[data-top]")) {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  });

  window.addEventListener("popstate", () => route({ smooth: true }));
  window.addEventListener("hashchange", () => route({ smooth: true }));

  document.addEventListener("keydown", (e) => {
    if (e.target.closest("input, textarea, [contenteditable]") || e.metaKey || e.ctrlKey || e.altKey) return;
    if (e.key === "l" || e.key === "L") hearts(pointer.x, pointer.y);
    if (e.key === "Escape" && current) close();
  });

  let resizeTimer;
  let lastWidth = window.innerWidth;
  window.addEventListener("resize", () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
      if (window.innerWidth !== lastWidth) {
        lastWidth = window.innerWidth;
        renderTicker();
      }
    }, 200);
  });

  /* ── Videos: load + play only while on screen ─────────── */
  function setupVideos() {
    const videos = document.querySelectorAll("video[data-src]");
    if (!("IntersectionObserver" in window)) {
      videos.forEach((v) => { v.src = v.dataset.src; v.autoplay = true; });
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        for (const { target: v, isIntersecting } of entries) {
          if (isIntersecting) {
            if (!v.src) { v.src = v.dataset.src; v.load(); }
            if (!reduceMotion.matches) v.play().catch(() => {});
          } else if (v.src) {
            v.pause();
          }
        }
      },
      { rootMargin: "200px 0px" }
    );
    videos.forEach((v) => io.observe(v));
  }

  /* ── Init ─────────────────────────────────────────────── */
  const y = document.getElementById("year");
  if (y) y.textContent = new Date().getFullYear();

  renderWork();
  renderTicker();
  setupVideos();
  if ("scrollRestoration" in history) history.scrollRestoration = "manual";
  route({ smooth: false });
})();

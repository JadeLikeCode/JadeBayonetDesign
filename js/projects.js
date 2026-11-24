/*
  ─────────────────────────────────────────────────────────────
  PROJECT CONTENT — this is the only file you need to edit.
  ─────────────────────────────────────────────────────────────

  Each project gets its own URL from its `slug`:
    slug: "nothing-ice-cream"  →  jadebayonet.com/nothing-ice-cream
  After adding a project or changing a slug/title, run:  node build.js

  What shows where:
    Closed row   →  title, tags, "See the project"
    Drawer top   →  year (left) + overview (right)
    Drawer body  →  your `blocks`, top to bottom
    Drawer end   →  credits: `role` + `contributors`

  ── Blocks ──────────────────────────────────────────────────

  IMAGES
    { type: "full", src: "images/x.jpg", alt: "…", ratio: "1400/820" }
        one full-width image. `ratio` = width/height (optional).

    { type: "pair", ratio: "1/1", items: [ {src, alt}, {src, alt} ] }
        two side by side, 50/50. "1/1" square, "690/880" portrait.

  VIDEO  (muted, looping, plays when scrolled into view)
    { type: "video", src: "images/x.mp4", poster: "images/x.jpg" }
        full width, 1920 × 1080.

    Square videos always go in a pair, next to an image or another square video:
    { type: "pair", ratio: "1/1", items: [
        { type: "video", src: "images/x.mp4" },
        { src: "images/y.jpg", alt: "…" },
    ] }

  TEXT BREAK
    { type: "note", label: "Social", text: "This was a social execution…" }

  Leave `src: ""` to show a placeholder box.
  `poster` (optional) is the still shown before a video loads.
  Export videos as H.264 .mp4, ideally under ~10 MB each.
*/

window.PROJECTS = [
  {
    slug: "nothing-ice-cream",
    title: "Nothing Ice Cream",
    group: "selected",
    tags: ["[Category]", "[Category]", "[Category]"],
    role: "[Your role]",
    year: "[Year]",
    overview:
      "[Project overview. The brief, the problem and the idea — a short paragraph that sets up everything below it.]",
    contributors: [
      { name: "[Name]", role: "[Role]" },
      { name: "[Name]", role: "[Role]" },
    ],
    color: "#f2dbd6",
    blocks: [
      { type: "full", src: "", alt: "", label: "Nothing Ice Cream — hero image, full width", ratio: "1400/820" },
      {
        type: "pair",
        ratio: "690/880",
        items: [
          { src: "", alt: "", label: "Detail (portrait)" },
          { src: "", alt: "", label: "Detail (portrait)" },
        ],
      },
      { type: "note", label: "Social", text: "[This was a social execution — a line or two on what it was and how it ran.]" },
      { type: "video", src: "" },
      {
        type: "pair",
        ratio: "1/1",
        items: [
          { type: "video", src: "", label: "Square video" },
          { src: "", alt: "", label: "Square image" },
        ],
      },
      {
        type: "pair",
        ratio: "1/1",
        items: [
          { src: "", alt: "", label: "Square" },
          { src: "", alt: "", label: "Square" },
        ],
      },
    ],
  },
  {
    slug: "tough-talks",
    title: "Tough Talks",
    group: "selected",
    tags: ["[Category]", "[Category]", "[Category]"],
    role: "[Your role]",
    year: "[Year]",
    overview: "[Project overview.]",
    color: "#deddee",
    blocks: [
      {
        type: "video",
        src: "tough-talks/TT_Hero_Logo_video.mp4",
        poster: "tough-talks/assets/TT_Hero_poster.jpg",
        alt: "Tough Talks logo animation: “All views welcome.” resolving into the Tough Talks mark",
      },
      { type: "pair", ratio: "1/1", items: [{ src: "", label: "Square" }, { src: "", label: "Square" }] },
      {
        type: "full",
        src: "tough-talks/assets/1_Posters.png",
        alt: "Tough Talks poster series: ten posters on guns, foreign policy, gender, war and abortion, each reading “All views welcome”",
        ratio: "1920/1100",
      },
    ],
  },
  {
    slug: "climb-financial",
    title: "Climb Financial",
    group: "selected",
    tags: ["[Category]", "[Category]", "[Category]"],
    role: "[Your role]",
    year: "[Year]",
    overview: "[Project overview.]",
    color: "#d6e8de",
    blocks: [
      { type: "full", src: "", alt: "", label: "Climb Financial — hero image", ratio: "1400/820" },
      { type: "pair", ratio: "1/1", items: [{ src: "", label: "Square" }, { src: "", label: "Square" }] },
    ],
  },
  {
    slug: "godaddy",
    title: "GoDaddy",
    group: "selected",
    tags: ["Rebrand", "Art direction", "[Category]"],
    role: "[Your role]",
    year: "[Year]",
    overview: "[Project overview.]",
    color: "#e8e7dc",
    blocks: [
      { type: "full", src: "", alt: "", label: "GoDaddy — hero image", ratio: "1400/820" },
      { type: "pair", ratio: "1/1", items: [{ src: "", label: "Square" }, { src: "", label: "Square" }] },
    ],
  },

  /* ── Earlier work ─────────────────────────────────────────── */
  {
    slug: "sour-bright-sneaks",
    title: "Sour Bright Sneaks",
    group: "earlier",
    year: "[Year]",
    role: "[Your role]",
    overview: "[Project overview.]",
    color: "#f0edd6",
    blocks: [{ type: "full", src: "", label: "Sour Bright Sneaks", ratio: "1400/820" }],
  },
  {
    slug: "trolley",
    title: "Trolley",
    group: "earlier",
    year: "[Year]",
    role: "[Your role]",
    overview: "[Project overview.]",
    color: "#e1e5ea",
    blocks: [{ type: "full", src: "", label: "Trolley", ratio: "1400/820" }],
  },
  {
    slug: "mokuyobi",
    title: "Mokuyobi",
    group: "earlier",
    year: "[Year]",
    role: "[Your role]",
    overview: "[Project overview.]",
    color: "#e9e1eb",
    blocks: [{ type: "full", src: "", label: "Mokuyobi", ratio: "1400/820" }],
  },
  {
    slug: "weirdly-woven",
    title: "Weirdly Woven",
    group: "earlier",
    year: "[Year]",
    role: "[Your role]",
    overview: "[Project overview.]",
    color: "#e8e7dc",
    blocks: [{ type: "full", src: "", label: "Weirdly Woven", ratio: "1400/820" }],
  },
];

/*
  TICKER — the strip of images under the intro. Loops left, pauses on hover.
  w/h are the display size in px on desktop (scaled down on smaller screens).
  `project` (optional) makes the image open that project when clicked.
*/
window.TICKER = [
  { src: "", label: "Work crop — Nothing Ice Cream", w: 420, h: 300, color: "#f2dcd6", project: "nothing-ice-cream" },
  { src: "assets/pin-great-job.png", alt: "“You’re doing a great job” pin", w: 240, h: 188, color: "transparent", project: "tough-talks", inset: { w: 148, x: 46, y: 8 } },
  { src: "", label: "B&W self-portrait — abstract", w: 200, h: 420, color: "#2a2a2a", dark: true },
  { src: "", label: "Work crop — Climb Financial", w: 360, h: 260, color: "#d6e8de", project: "climb-financial" },
  { src: "", label: "Work detail — GoDaddy", w: 260, h: 340, color: "#e8e7dc", project: "godaddy" },
  { src: "", label: "B&W — shadow / motion", w: 340, h: 230, color: "#8c8c8a", dark: true },
  { src: "", label: "Work crop — Mokuyobi", w: 300, h: 300, color: "#e9e1eb", project: "mokuyobi" },
  { src: "", label: "Work — Sour Bright Sneaks", w: 460, h: 280, color: "#f0edd6", project: "sour-bright-sneaks" },
  { src: "", label: "B&W self-portrait — crop", w: 170, h: 300, color: "#4a4a48", dark: true },
  { src: "", label: "Work detail — Trolley", w: 320, h: 220, color: "#e1e5ea", project: "trolley" },
];

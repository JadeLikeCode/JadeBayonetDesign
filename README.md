# jadebayonet.com

Plain HTML/CSS/JS, hosted free on GitHub Pages. No framework, no build tools to install beyond Node.

```
index.html          the page (nav, intro, info, footer)
css/styles.css      all styling — sizes, spacing, breakpoints
js/projects.js      ← ALL project content + ticker images. Edit this.
js/main.js          drawer, URLs, ticker, "press G" grid
assets/             site assets (dot, pin)
images/             put project images here (create per project, e.g. images/nothing-ice-cream/hero.jpg)
build.js            makes the /project-name/ pages for shareable links
<slug>/index.html   generated — don't edit by hand
404.html            generated
```

## Editing a project

Open `js/projects.js`. Each project has a `slug`, which becomes its URL:

```js
slug: "nothing-ice-cream"   →   jadebayonet.com/nothing-ice-cream
```

Closed row: title + tags. Drawer: **year + overview** → your `blocks` → **credits** (`role` + `contributors`).

Block types:

```js
{ type: "full", src: "images/nothing-ice-cream/hero.jpg", alt: "…", ratio: "1400/820" }
{ type: "pair", ratio: "1/1", items: [ { src: "…" }, { src: "…" } ] }          // 50/50 images
{ type: "video", src: "images/nothing-ice-cream/spot.mp4" }                  // full width, 1920×1080
{ type: "pair", ratio: "1/1", items: [ { type: "video", src: "loop.mp4" }, { src: "still.jpg" } ] } // square video + image
{ type: "note", label: "Social", text: "This was a social execution…" }      // text break
```

Videos are muted, loop, and only load/play when scrolled into view. Export as H.264 `.mp4`, ideally under ~10 MB. Add `poster: "…jpg"` for a still frame before it loads.

**After adding a project or changing a slug, title or blurb, run:**

```
node build.js
```

## Preview locally

Just double-click `index.html` — it opens in Safari/Chrome and everything works.
When opened from a file, project links look like `index.html#nothing-ice-cream`;
once it's online they become `jadebayonet.com/nothing-ice-cream`.

## Publish (GitHub Pages + your domain)

1. Push this folder to a GitHub repo.
2. Repo → **Settings → Pages** → Source: *Deploy from a branch* → `main` / `(root)`.
3. Same page → **Custom domain**: `jadebayonet.com` (already set in the `CNAME` file) → tick **Enforce HTTPS** once it's available.
4. At your domain registrar, add DNS records:
   - `A` records for `@` → `185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153`
   - `CNAME` for `www` → `<your-github-username>.github.io`

Links like `jadebayonet.com/nothing-ice-cream` only work once the site is on its own domain (not on `username.github.io/repo-name`).

## Extras

- Press **L** (or tap "Press L to spread some love" in the footer) for a burst of hearts. Press **Esc** to close an open project.
- The ticker pauses on hover. Clicking a ticker tile with a `project` opens that project.

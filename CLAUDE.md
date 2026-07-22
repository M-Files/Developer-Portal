# Working in this repo

The M-Files Developer Portal — a **Jekyll** site published to <https://developer.m-files.com>. Content is Markdown; there is no application code to run. Almost every task here is *adding or editing documentation pages*.

## Layout of the repo

- Content lives in top-level topic folders: `APIs/`, `Frameworks/`, `Getting-Started/`, etc. Each page is a **folder containing an `index.md`** (the URL comes from the folder path; `permalink: /:title/`).
- `_layouts/`, `_includes/` — HTML templates. `_data/` — data files (notably navigation). `styles/` — Sass. `scripts/` — JS.
- Markdown is Kramdown (GFM). Styling is applied with Kramdown **inline attribute lists (IAL)** — e.g. `{:.note}`, `{:.note.warning}`, `{:.description}`. Match the classes already used on sibling pages.

## The REST API reference (`APIs/REST-API/`)

- `APIs/REST-API/Reference/resources/<url-path>/index.md` — one folder per URL segment. **Path parameters use parentheses**, e.g. `/objects/(type)/(objectid)` → folder `objects/type/objectid/`.
- These pages use `layout: mfws` and a terse, structured style: `## /url/path` `{:.url-with-parameters}`, a `{:.description}` line, `### GET` `{:.method}`, an `Output: |` row linking a struct, and `Parameters: |` rows for query params. Optional `{:.remark}` notes and a `### Sub-Resources` table. **Copy the shape from an existing sibling page rather than inventing markup.**
- Response schemas are separate pages under `Reference/structs/<name>/index.md`.
- Longer prose guides (how-tos) live at `APIs/REST-API/<Topic>/index.md` with `layout: page` and a `breadcrumb:`.

Front matter for reference/struct pages: `layout`, `title`, `includeInSearch: true`, and a `redirect_from:` mapping the legacy `.html` URL.

## Navigation is hand-maintained (two separate systems)

Adding a page does **not** add it to any menu. You must edit the relevant nav by hand:

- **MFWS reference sidebar** — `_includes/navigation-mfws.html` (static HTML). Add an `<li class="nav-item" id="nav-resources-..." rel="resource">` linking `{{ site.baseurl }}/…/`, nested under the right parent `<ul class="nav-children">`.
- **Top-level portal menu** — `_data/navigation.json`. Add an entry (`Link`/`Title`, optionally nested `Items`) under the correct section. Keep it valid JSON.

## Conventions

- Reference internal links with `{{ site.baseurl }}/APIs/REST-API/...` and a trailing slash (not `.html`).
- Keep reference pages terse; put narrative, auth, and examples in a `layout: page` guide.
- Don't publish internal-only material (test paths, submodule internals, verification against specific live servers) on these public pages.

## Build / preview

- `bundle install` then `bundle exec jekyll serve` (local preview) or `bundle exec jekyll build` (output to `_site/`). Requires Ruby + Bundler.

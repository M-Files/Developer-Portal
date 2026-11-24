# Working in this repo

The M-Files Developer Portal — a **Jekyll** site published to <https://developer.m-files.com>. Content is Markdown; there is no application code to run. Almost every task here is *adding or editing documentation pages*.

## Layout of the repo

- Content lives in top-level topic folders: `APIs/`, `Frameworks/`, `Getting-Started/`, etc. Each page is a **folder containing an `index.md`** (the URL comes from the folder path; `permalink: /:title/`).
- `_layouts/`, `_includes/` — HTML templates. `_data/` — data files (notably navigation). `styles/` — Sass. `scripts/` — JS.
- Markdown is Kramdown (GFM). Styling is applied with Kramdown **inline attribute lists (IAL)** — e.g. `{:.note}`, `{:.note.warning}`, `{:.description}`. Match the classes already used on sibling pages.

## Generated content: don't edit it here

Some folders hold **generated output** from other repositories. Hand edits are overwritten at the next regeneration, and in the UIX build they don't even render fully. Each of these folders has a `_GENERATED.md` (not published, because of the leading `_`) that names the exact source files. Change the source and regenerate. If you can't, list the source changes that are needed instead of editing the output.

| Generated here | Generator | Source |
|---|---|---|
| `APIs/COM-API/Reference/**` (`MFilesAPI~*.html`, `webtoc.html`, `webindex.html`, `ftsindex.js`) | Document! X | M-Files Core (GitLab `m-files/m-files`): `src/Build/Doc/MFilesAPIDocs/MFilesAPI.dxc` for topic text; `src/Shared/MFilesAPI/PublishedInterface*.idl` for members and summaries |
| `Frameworks/User-Interface-Extensibility-Framework/Reference/**` (Docusaurus build; page text is also in `assets/js/*.js`) | M-Files Spec Collector (GitLab `R-n-D/utilities/m-files-spec-collector`); publish per its `RELEASING.md` | vNext (GitHub `M-Files-Cloud/m-files-vnext`) `MFCore/src/MFClientScript/` JSDoc for `UIExt2/**`; Spec Collector `test/source/mfiles.proto`, copied from Core `src/Build/IDL/gRPC/uiext/mfiles.combined.generated.proto` (from `src/Build/IDL/**/*.idl` comments), for `gRPC/**` |
| `APIs/REST-API/Reference/MFWS_Samples.zip` and the `APIs/REST-API/Reference/**/samples/**/*.md` code snippets | MFWS documentation Runner in classic web (GitLab `m-files/m-files-web`, `MFWS Documentation/`) | `Documentation/spec_structs.tex` (structs in the C#/Java utilities), `MFiles.MFWS.Sample/*.cs` and `Samples.js` (samples) |

Everything else in `APIs/REST-API/` (resource, struct and enum pages, and guides) is maintained by hand.

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

## Pushing changes / opening a PR

Contributions go through a fork → branch → PR flow (see [CONTRIBUTING.md](CONTRIBUTING.md)); the upstream is `M-Files/Developer-Portal`, default branch `main`.

Watch out for which account you're pushing as — if you have both an enterprise and a personal GitHub identity available, they behave differently:

- An **Enterprise Managed User (EMU) account** may be **blocked**: if it only has READ on the upstream repo, EMU policy also forbids forking (`gh repo fork` → `HTTP 403: As an Enterprise Managed User, you cannot access this content`). Don't push or PR through it.
- A **personal (non-EMU) account** with read access **works**: it can fork the public repo and push to its own fork. Note that `gh` and `git` may authenticate as different identities — `gh` uses its keyring login, while `git push` uses the stored github.com credential.

Working recipe when you must fork with a personal account whose token differs from the `gh` keyring login:

1. Pull the personal token from git's credential store and pass it explicitly so `gh` doesn't fall back to the keyring (EMU) login:
   `TOKEN=$(printf 'protocol=https\nhost=github.com\n\n' | git credential fill | sed -n 's/^password=//p')`
   `GH_TOKEN="$TOKEN" gh api -X POST repos/M-Files/Developer-Portal/forks -q .full_name`
2. Add the fork remote and push (plain `git push` uses the stored credential automatically):
   `git remote add fork https://github.com/<your-account>/Developer-Portal.git`
   `git push -u fork <branch>`
3. Open the PR with the same personal token:
   `GH_TOKEN="$TOKEN" gh pr create --repo M-Files/Developer-Portal --base main --head <your-account>:<branch> ...`

The PR is authored by whichever account owns the fork, not necessarily your M-Files identity. CONTRIBUTING.md also asks contributors to email devsupport@m-files.com before a content PR.

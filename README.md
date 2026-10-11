# Maison Braise demonstration

A static fictional restaurant demonstration. The names, menu, prices, address and hours are illustrative. Ordering and contact actions are disabled. The food image is AI-generated and represents no actual restaurant.

Six pages, 24 menu items and six categories. V2 adds category illustrations, search and filters, an accessible native dish dialog, and a pickup/delivery preview that preserves the selected dish. No accounts, payment, email submission, external fonts or analytics are configured. The legal page identifies GitHub Pages hosting and its technical logs.

`data/menu.json` and `data/business.json` are the content sources. Edit them and the renderer (`build.mjs`), then run:

```sh
node test-menu-model.mjs
node build.mjs
node verify.mjs
python3 -m http.server 4193 --bind 127.0.0.1 --directory dist
```

Serve `dist/` for preview: it contains only public website files. Developer direction/review files in `.impeccable/` and the generated `dist/` directory are ignored by Git. Generated root HTML is kept for the existing GitHub Pages publication path. Embedded JSON keeps the static menu available without a data request; filters and dish details require JavaScript.

Raster originals are retained. WebP assets have adjacent provenance sidecars. Category images illustrate a family of dishes rather than an exact photographed recipe; the UI labels this limitation.

Public demonstration: https://sofianbll.github.io/maison-braise-demo/. V2 includes the menu → dish details → fictional channel-choice journey described above. Running the local build does not publish changes; GitHub Pages updates only after a reviewed change reaches the configured `main` branch.

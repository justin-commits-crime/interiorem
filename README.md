# interiorem

Static frontend for **Dasigned**, a design & e-commerce studio: the header, the scroll-driven "Designed / Differently" slash hero and the "The idea" manifesto.

Unpacked from the Claude Design export *Dasigned — Header, hero & idea* into plain files. There's no build step.

```
index.html        page markup
css/styles.css    design tokens (colour, type, spacing) + section styles
js/main.js        scroll/pointer animations (slash reveal, manifesto word lighting, header)
assets/fonts/     Instrument Sans, Archivo, IBM Plex Mono (woff2, self-hosted)
assets/img/       logos and hero imagery
```

## Live site

https://instant-isibyydvsuka-dasigned-1408.wix-site-host.com/ (Wix project "Dasigned — Designed Differently", uploaded through Wix's drop page). Its domain is on the OAuth client's allowed list so the contact form can submit; add any new domain there too.

## Run locally

```sh
python3 -m http.server 8000   # then open http://localhost:8000
```

## Upload to Wix

Wix's drop page (wix.com/headless/drop) takes up to 3 MB per file and 20 MB in total. Zip only the site files, never the repo or `.git`:

```sh
zip -r dist/dasigned-site.zip index.html css js assets
```

## Notes

- `?hero=` in the URL selects a hero variant (`slash` is the only one with markup in `index.html`; the CSS for the other variants, `manifesto`, `editorial`, `index`, `annotated` and `signal`, is kept for when those sections are added).
- The fonts are Google Fonts stand-ins; the original brand fonts weren't supplied.
- The Services, Work, Shopify and WooCommerce nav links point at sections that aren't on the page. The Work, Services and Contact sections were removed; they're in git history before this change.
- The Dasigned Headless Wix project still has the "Website enquiry" form and the "Dasigned website" OAuth client from the removed contact form.

# interiorem

Static frontend for **Dasigned**, a design & Shopify studio: the header, the scroll-driven "Designed / Differently" slash hero, and the "The idea" manifesto.

Unpacked from the Claude Design export *Dasigned — Header, hero & idea* into plain files. There's no build step.

```
index.html        page markup
css/styles.css    design tokens (colour, type, spacing) + section styles
js/main.js        scroll/pointer animations (slash reveal, manifesto word lighting, header)
assets/fonts/     Instrument Sans, Archivo, IBM Plex Mono (woff2, self-hosted)
assets/img/       logos and hero imagery
```

## Run locally

```sh
python3 -m http.server 8000   # then open http://localhost:8000
```

## Notes

- `?hero=` in the URL selects a hero variant (`slash` is the only one with markup in `index.html`; the CSS for the other variants, `manifesto`, `editorial`, `index`, `annotated` and `signal`, is kept for when those sections are added).
- The fonts are Google Fonts stand-ins; the original brand fonts weren't supplied.
- Nav links (`#work`, `#services`, `#shopify`, `#contact`) point at sections that aren't built yet.

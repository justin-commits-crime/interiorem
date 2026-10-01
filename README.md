# interiorem

Static frontend for **Dasigned**, a design & Shopify studio: the header, the scroll-driven "Designed / Differently" slash hero, the "The idea" manifesto, and the Work, Services and Contact sections.

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
- The `#shopify` nav link points at a section that isn't built yet (its styles are in `.shop` in the CSS).
- Placeholder content to replace: the five Work projects (names, copy and the two "Imagery to come" tiles), and the contact details (`hello@dasigned.com`, studio location, booking note).
- The contact form submits to Wix: the **Dasigned Headless** project (site ID `0894e7cb-ad90-4d01-812c-294dd6eb27c2`), form **Website enquiry**. Submissions appear in that project's dashboard under Forms & Submissions, and each one creates or updates a contact. The site gets an anonymous visitor token with the OAuth client ID in `js/main.js` (public, no secret needed). If Wix can't be reached, the form falls back to opening the visitor's email app, addressed to the Contact section's email link (`#cMail`).

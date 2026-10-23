# Bhugol Quest (website version)

This folder is the whole game as a normal website. It has real satellite imagery
that stays sharp as you zoom, which the Claude artifact cannot do.

## Put it online (about 5 minutes)
Upload this folder to any static host:
- Netlify: open app.netlify.com/drop and drag the folder in.
- Vercel, Cloudflare Pages or GitHub Pages also work. No build step.
Open the link on your phone and zoom into a city to check the imagery.

## Imagery
The map loads satellite tiles from the address in `config.js`.
- Default is Esri World Imagery. It needs no key, so it is good for testing.
  Esri's terms require a licence and attribution for a public or commercial app. Read them first.
- For production use a provider you have an account with, for example MapTiler or Mapbox.
  Paste your key into the `url` line in `config.js` (examples are in the file).
- Keep the attribution text. Providers require it.
If tiles cannot load, the game falls back to the built-in map (zoom limited to 400x).

## Adding questions (owner only)
Open the game and tap **Owner login** at the bottom of the home screen. Sign in with the owner account
(amarbhardwaj61102@gmail.com, same password as your Supabase login for that email). You can then:
add questions (tap the globe or type coordinates), bulk import, edit, disable or delete your questions,
and hide built-in ones. Changes are live for all players the next time they open the game.
Only the owner account can change anything. This is enforced by the database, not just the page.
Tables: `bq_questions`, `bq_hidden`, `bq_owner` in Supabase project `jxgikzpfwihmpsdnunyf`.
To change who the owner is, edit the single row in `bq_owner` in the Supabase SQL editor.
If the Supabase connection is removed from `config.js`, the game falls back to `custom-questions.json`.

## Notes
- Progress and streaks are saved in the player's own browser only.
- Boundaries use the official Indian depiction, but check them against Survey of India before launch.
- Credits: NASA Blue Marble, Natural Earth, udit-001/india-maps-data (no licence file in that repo; confirm before launch).

# Wanderlogue

Wanderlogue is an interactive travel-memory editor concept. It turns photos, routes, short notes, food memories and questions from the road into a responsive editorial journal.

The included demo is an 18-day family road trip from Hailar to Xining. All published demo photographs exclude identifiable people and preserve their original aspect ratios.

## Features

- Interactive route map with an animated car and 18 selectable stops
- Five chronological terrain chapters
- Live magazine controls for visual theme, reading focus and content density
- Contextual learning cards derived from observations made during the trip
- Responsive editorial layout for desktop and mobile
- Data-driven content in `data.js`
- Static deployment with no build step or backend

## Run locally

Open `index.html` directly, or run a local server:

```bash
python3 -m http.server 4173 --bind 127.0.0.1
```

Then visit `http://127.0.0.1:4173/`.

## Deploy to GitHub Pages

1. Push this directory to a GitHub repository.
2. Open **Settings → Pages**.
3. Choose **Deploy from a branch**.
4. Select the repository's default branch and `/ (root)`.

## Reuse for another trip

Replace the trip, chapter, day and learning records in `data.js`, then place optimized photographs in `media/`. The rendering and interactions are handled by `app.js`.

## Privacy

The demo intentionally excludes identifiable portraits. For a production product, media should remain private by default, with explicit consent required before public publishing.

# boerdarija

Learning materials and datasets for Moroccan Arabic (Darija). The project bundles static lesson pages, vocabulary lists, and helper scripts used for the BoeR Darija course.

## Contents
- `index.html` ? main landing page with navigation to lessons and games.
- `courses-*.html`, `lesson*.html` ? structured lesson content for A1 to B1 levels.
- `dictionary.html`, `dictionary.json`, `dictionary-parser.js` ? interactive dictionary and parser assets.
- `darija_adjectives.csv`, `body-parts.csv` ? curated vocabulary datasets in CSV format.
- `css/`, `js/` ? shared styling and behaviour for the static pages.

## Getting Started
1. Clone the repository: `git clone https://github.com/wolfxxx/boerdarija.git`
2. Open `index.html` (or any lesson file) in your browser to explore the materials.
3. Edit CSV or JSON data with your preferred editor and refresh the relevant HTML page.

## Development Notes
- Keep CSV files encoded as UTF-8 to preserve special characters.
- `dictionary-parser.js` expects dictionary sources in `tmp_dict.json`; update it before regenerating `dictionary.json`.

## License
No explicit license is provided yet. If you intend to reuse the material, please contact the repository owner.

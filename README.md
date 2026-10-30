# Virtual Office Mini Player

[![GitHub stars](https://img.shields.io/github/stars/anditorx/virtual-office-mini-player?style=social)](https://github.com/anditorx/virtual-office-mini-player/stargazers)
[![License: MIT](https://img.shields.io/badge/license-MIT-green.svg)](LICENSE)
![No build step](https://img.shields.io/badge/build-not%20needed-blue)
![three.js](https://img.shields.io/badge/three.js-0.160-black)
[![PRs welcome](https://img.shields.io/badge/PRs-welcome-orange)](CONTRIBUTING.md)

A 3D virtual office that runs right in your browser. Step out of the elevator, walk to the IT room, check dashboards on the wall TVs, review merge requests at your desk, put out incident "fires" with an extinguisher, grab a drink at the water dispenser, buy snacks in the pantry with a QR payment, or dance with your coworkers. Project data (builds, merge requests, tasks, incidents) shows up as objects in the room.

![Floor plan: IT room, meeting rooms, lactation room, pantry](docs/screenshots/overview.jpg)

- **No build step.** One `index.html` plus two config files. No `npm install`.
- **Works out of the box with demo data.** No server, token, or account needed.
- **Can connect to real data** through your own endpoints, following [docs/API.md](docs/API.md).
- **Easy to make your own:** company name, logo, floor number, company values, and coworkers all live in one file, [`src/config.js`](src/config.js).

> ⭐ **If you like this project, please [star it on GitHub](https://github.com/anditorx/virtual-office-mini-player).** It helps other people find it and keeps the project going.

All people, companies, projects, and data in this repo are fictional. The in-game text is currently in Bahasa Indonesia; an English translation is a welcome contribution ([there's a prompt for that](#ready-to-use-prompts)).

## Contents

- [Features](#features)
- [Quick start](#quick-start)
- [Ways to use it](#ways-to-use-it)
- [Build with AI (vibe coding)](#build-with-ai-vibe-coding)
- [Controls](#controls)
- [Customization](#customization)
- [Data modes](#data-modes)
- [Project structure](#project-structure)
- [FAQ](#faq)
- [Contributing](#contributing)
- [Credits](#credits)
- [License](#license)

## Features

| | |
|---|---|
| ![Welcome menu in front of the elevator](docs/screenshots/welcome.jpg) | ![Characters in suits, vests, blazers, shirts](docs/screenshots/characters.jpg) |
| **Office tour & GPS.** A welcome menu, a 12-stop guided tour, and fast travel to any room or coworker. | **Cartoon-style characters.** Suits with ties, vests, blazers, shirts, many hairstyles, glasses, hijab. Skinned bodies, so elbows and knees bend smoothly. |

![Paying for a snack with a QR code](docs/screenshots/qris.jpg)

- **A complete office floor:** elevator lobby, reception, hallways, an IT room with 5 long desks, meeting rooms 2/3/5, a lactation room, and a pantry. Every room can be entered.
- **Data as objects:** 4 TVs (KPIs, builds, monitoring, incidents), whiteboards, a stack of folders for pending approvals, and fire on the floor for SEV-1/2 incidents.
- **Living coworkers:** they type at their own rhythm, glance around now and then, and show data-driven status bubbles.
- **Natural movement:** the walk cycle follows the distance traveled (no foot sliding), the body leans into turns, and turning in place uses small steps.
- **Dota-style click to move:** left- or right-click the floor, with an animated click marker.
- **Animated actions with arm IK:** take a cup, fill it, and drink at the water dispenser; pick a snack, take the phone out of your pocket, and scan the QR code in the pantry.
- **Quests, a GTA-style phone, day/dusk/night, and automatic High/Medium/Low graphics.**

## Quick start

```bash
git clone https://github.com/anditorx/virtual-office-mini-player.git
cd virtual-office-mini-player
python3 -m http.server 8080
```

Open http://localhost:8080. That's it.

## Ways to use it

### 1. Open the file directly

Double-click `index.html`. The browser loads three.js and fonts from a CDN, so you need an internet connection. Everything works except a custom dance song from the `assets/` folder (browsers block loading audio files from `file://`).

### 2. Local server

Pick one:

```bash
python3 -m http.server 8080      # Python 3
npx serve .                      # Node.js
php -S localhost:8080            # PHP
```

Or use the **Live Server** extension in VS Code: right-click `index.html` → *Open with Live Server*.

### 3. Free online hosting (static)

The folder can be hosted as is, with no build command.

- **GitHub Pages:** fork the repo, open *Settings → Pages → Build and deployment*, choose *Deploy from a branch*, branch `main`, folder `/ (root)`, then *Save*. After a minute or two the game is live at `https://<username>.github.io/virtual-office-mini-player/`.
- **Netlify Drop:** go to https://app.netlify.com/drop and drag the project folder onto the page.
- **Vercel / Cloudflare Pages:** import the repo, framework preset *Other*, leave the build command empty, output directory `.` (root).

### 4. Embed it in an existing web app

Copy the whole folder (at least `index.html` and `src/`) into your app's static folder, for example `public/office/` in Next.js, Vite, or Laravel. The game is then served at `/office/index.html`.

To show it inside another page:

```html
<iframe src="/office/index.html" title="Virtual Office" allow="fullscreen"
        style="width:100%;height:80vh;border:0;border-radius:12px"></iframe>
```

Click once inside the iframe so keyboard input (WASD, E, Tab) goes to the game.

### 5. Make it your office

Edit [`src/config.js`](src/config.js), save, and reload the browser. See [Customization](#customization).

### 6. Connect real data

1. Build endpoints that return JSON in the shapes described in [docs/API.md](docs/API.md). [`src/mock-data.js`](src/mock-data.js) is a complete example of every response.
2. In `src/config.js`, set `data.mode: 'api'` and `data.baseUrl` (leave it empty if the API is on the same origin as the game).
3. To allow merging MRs, triggering builds, and solving incidents from inside the game, set `data.allowWrites: true`.

A minimal backend (Node.js + Express) that serves both the game and one route, so you don't have to deal with CORS:

```js
// server.js — npm i express, then: node server.js
import express from 'express'
const app = express()
app.use(express.static('.'))   // game at http://localhost:8080
app.get('/api/incidents', (req, res) => res.json([
  { id: 'inc-1', incident_number: 'INC-0001', severity: 'SEV-2', title: 'Slow API', status: 'open', service: 'billing-api' },
]))
app.listen(8080)
```

Routes you haven't built yet are simply marked as errors in the **IT equipment cabinet** ("Lemari Perangkat IT") inside the game; everything else keeps working.

### 7. Build with AI

See the next section: you can change the game just by describing what you want to an AI assistant.

## Build with AI (vibe coding)

Use an AI assistant that can read and edit files, such as Claude Code, Cursor, Windsurf, or GitHub Copilot Chat (agent mode). Start with the **opening prompt**, then paste one of the task prompts. Replace anything in `[SQUARE BRACKETS]` with your own details. You can write to the assistant in any language.

### Start from zero (no copy on your computer yet)

```text
Clone https://github.com/anditorx/virtual-office-mini-player into a new folder called [FOLDER NAME],
start it with a local static server, and give me the URL to open in my browser.
Then explain in plain language what this project is and which file I should edit to rename the
company and the coworkers.
```

### Opening prompt (paste once at the start of the conversation)

```text
You are working on virtual-office-mini-player (https://github.com/anditorx/virtual-office-mini-player),
a 3D virtual office built with three.js and no build step.
If the project is not on this computer yet, clone it from that URL first.
Read README.md, src/config.js, and docs/API.md before changing anything.
Project rules:
1. Do not add a bundler, framework, or npm dependency. The game must still open by double-clicking index.html.
2. src/config.js and src/mock-data.js stay plain scripts (window.VO_CONFIG, window.VO_MOCK), not ES modules.
3. Data shapes follow docs/API.md. If you add a route, also add an example to src/mock-data.js and document it in docs/API.md.
4. Every person and company name in the repo must be fictional.
5. Match the existing code style: short comments in Bahasa Indonesia, no semicolons.
6. Add static decoration directly to the scene with the existing cbox/cyl helpers so it gets merged by the performance pass.
7. After changing things, run python3 -m http.server 8080, open the game, and make sure the browser console has no errors.
```

### Ready-to-use prompts

<details>
<summary><b>Run the project and explain how it works</b></summary>

```text
Using https://github.com/anditorx/virtual-office-mini-player (clone it if needed), run the game on a
local server and tell me the URL. Then briefly explain, in plain language, which parts of index.html
build the rooms, the characters, the data, and the panels, and which file I should edit to change
the company name and the coworkers.
```
</details>

<details>
<summary><b>Turn it into my company's office</b></summary>

```text
In virtual-office-mini-player (https://github.com/anditorx/virtual-office-mini-player), edit src/config.js
so the office belongs to [COMPANY NAME]:
- reception sign: [SHORT NAME], full name on the elevator wall: [LEGAL NAME], small label: [3-5 LETTERS]
- logo color: [COLOR CODE, e.g. #e4572e]
- floor number: [NUMBER]
- vision, mission, and 4 company values: [WRITE THEM]
Don't touch index.html unless it is really necessary. When you're done, take a screenshot of the
elevator lobby and the reception sign.
```
</details>

<details>
<summary><b>Replace the coworkers with my team</b></summary>

```text
In virtual-office-mini-player (https://github.com/anditorx/virtual-office-mini-player), replace the npcs list
in src/config.js with the team below. Keep the existing seat (n), id, and panel for similar roles;
new roles can be regular coworkers without a panel. Pick varied outfit, hairStyle, clothing colors,
and glasses that fit each role.
My team:
- [Name] — [Role]
- [Name] — [Role]
- ...
Also update dancers if the dancers' names change.
```
</details>

<details>
<summary><b>Use my own logo image</b></summary>

```text
In virtual-office-mini-player (https://github.com/anditorx/virtual-office-mini-player), I have a logo at
assets/logo.png. Change drawLogo() in index.html so every sign, poster, presentation screen, and QR card
uses that image. Canvas textures are drawn at load time, so load the image before the scene is built,
and fall back to the existing placeholder logo if the file is missing. Add a company.logo option to
src/config.js and document it in the README.
Note: assets/ is git-ignored, so tell me how to commit the logo if I need to.
```
</details>

<details>
<summary><b>Connect real data (GitHub, Jira, Jenkins, etc.)</b></summary>

```text
For virtual-office-mini-player (https://github.com/anditorx/virtual-office-mini-player), create a small
backend in a server/ folder that serves the routes in docs/API.md with real data from
[GitHub / GitLab / Jira / Jenkins / Asana / other source].
- Language: [Node.js / Python FastAPI]
- Store tokens in a .env file (never commit it) and add a .env.example
- Serve the game files from the same server so CORS isn't needed
- Routes my source can't support should just return 404
Then set data.mode = 'api' in src/config.js and add run instructions to the README.
```
</details>

<details>
<summary><b>Add a new room or interactive object</b></summary>

```text
In virtual-office-mini-player (https://github.com/anditorx/virtual-office-mini-player), add
[ROOM/OBJECT NAME, e.g. "a coffee machine in the pantry"] at [LOCATION].
When the player presses E near it: [WHAT HAPPENS, e.g. "a panel opens with a 4-item coffee menu"].
Follow the existing patterns: def() for interactive objects, PANELS for panel content, cbox/cyl for
shapes, and block() so it can't be walked through. Also add it to the "Tempat" (Places) tab of the in-game help (H).
```
</details>

<details>
<summary><b>Add a new animated action</b></summary>

```text
In virtual-office-mini-player (https://github.com/anditorx/virtual-office-mini-player), add a new animated
action: [DESCRIPTION, e.g. "at the photocopier, the character places paper, presses a button, waits,
then picks up the copies"]. Follow the drinkAct() and buyAct() pattern in index.html: keyframed hand
positions (IK), lean/crouch, head direction, and events that show held items and play sounds.
Make sure Esc cancels the action and held items are hidden when it ends.
```
</details>

<details>
<summary><b>Publish it on GitHub Pages</b></summary>

```text
I forked https://github.com/anditorx/virtual-office-mini-player to my own GitHub account.
Help me publish my fork on GitHub Pages from the main branch (root). First check that no absolute
paths break when the site lives under /virtual-office-mini-player/. Then list exactly what I need
to click in Settings → Pages, and add the demo link near the top of the README.
```
</details>

<details>
<summary><b>Translate the game to English</b></summary>

```text
In virtual-office-mini-player (https://github.com/anditorx/virtual-office-mini-player), add English support.
Move every player-facing string (HUD, panels, help, tour, toasts) into a single dictionary, add a
lang: 'id' | 'en' option to src/config.js, and keep 'id' as the default.
Don't rename variables or change code comments.
```
</details>

<details>
<summary><b>Fix an error or a black screen</b></summary>

```text
My copy of virtual-office-mini-player (https://github.com/anditorx/virtual-office-mini-player) has a problem:
[DESCRIBE IT, e.g. "black screen after loading" / "characters don't show up"].
Run it on a local server, open the browser console, find the error, fix the root cause,
and explain the cause in one or two sentences.
```
</details>

Tip: ask the AI to **take a screenshot** or tell you how to check the result. 3D changes are much easier to judge by eye than by reading code.

If you build something cool with these prompts, share it in a [GitHub issue](https://github.com/anditorx/virtual-office-mini-player/issues) and give the repo a ⭐.

## Controls

| Key | Action |
|---|---|
| WASD / arrow keys | Walk (Shift = run) |
| Left / right click on the floor | Walk there (Dota style). Click an object = walk to it and interact |
| Drag · scroll · + − | Rotate camera · zoom |
| E · F | Interact with the nearest / second-nearest object |
| Tab | Phone: maps, messages, quests, Ori (AI helper) |
| Ctrl/⌘ + K | Fast travel to any object |
| V · G · T · L | Follow/overhead camera · graphics · day/dusk/night · labels |
| O | Welcome menu (office tour, choose a destination) |
| J | Dance with a coworker (stand near a dancer first) |
| Esc | Close panel / cancel route or action |
| H | Full in-game help |

## Customization

Everything you usually want to change is in [`src/config.js`](src/config.js):

| Key | What it controls |
|---|---|
| `company` | `name` (reception sign & signposts), `legal` (elevator wall), `short` (posters, TVs, phone, QR card), `color` (logo) |
| `office.floor` | Floor number on the elevator wall and in the welcome text |
| `player` | The player's starting `name` and `look` (appearance) |
| `values` | Up to 5 vision, mission, and values posters in the hallway |
| `npcs` | Coworkers: `name`, `role`, `status`, seat `n`, the panel they open, and their appearance |
| `dancers` | Names of the two coworkers who can dance with you |
| `data` | Data mode, see [Data modes](#data-modes) |
| `links.grafana` | Link to a monitoring dashboard (optional) |
| `audio.jjSong` | Your own dance song, see [assets/README.md](assets/README.md) |

**Character appearance options** (for `npcs` and `player.look`):

| Option | Values |
|---|---|
| `outfit` | `'shirt'` · `'suit'` (closed jacket) · `'blazer'` (open blazer) · `'vest'` (vest over a long-sleeve shirt) |
| `hairStyle` | `'short'` · `'side'` · `'slick'` · `'bun'` · `'bob'` · `'cap'` · `'long'` |
| colors | `shirt` (outer garment), `inner` (shirt underneath), `tie`, `pants`, `hair`, `skin`, `eyes`, `cap`, `belt` |
| other | `glasses: true`, `hijab: '#color'` |

The logo is drawn in code, not loaded from an image. To use your own, change `drawLogo()` in `index.html`; every sign and poster uses it.

## Data modes

| `data.mode` | Source | Write actions (merge, trigger build, solve incident) |
|---|---|---|
| `'mock'` (default) | [`src/mock-data.js`](src/mock-data.js), in browser memory | Always on, only change the demo data. Reload = reset |
| `'api'` | `data.baseUrl` + routes in [docs/API.md](docs/API.md) | Off unless `data.allowWrites: true` |

Demo data uses times relative to when the page was opened, so the 12-hour build chart, overdue tasks, and active incidents always look alive. Tool names in the game (GitLab, Jenkins, Asana, Grafana, n8n) are only labels for kinds of data; demo mode never contacts those services.

## Project structure

```
index.html            the game: three.js scene, characters, animation, HUD, panels, quests, tour, actions
src/config.js         company, floor, values, coworkers, data mode
src/mock-data.js      demo data + demo write actions (JSON shapes = docs/API.md)
docs/API.md           endpoint contract for 'api' mode
docs/screenshots/     images used in this README
assets/               your own files (dance song, etc.); intentionally empty and git-ignored
.github/              issue & pull request templates
```

## FAQ

**The screen is black or stuck on loading.**
Make sure you're online (three.js is loaded from a CDN) and that your browser supports WebGL; check at https://get.webgl.org. Errors usually appear on the loading screen or in the browser console.

**It's slow on my laptop.**
Press G to lower the graphics to Medium or Low. Graphics also drop automatically when the frame rate is low.

**Does it work on phones?**
It opens and you can tap to walk and drag to rotate the camera, but it's best on a laptop or desktop with a keyboard.

**Is my data sent anywhere?**
No. Demo mode makes no network calls besides loading three.js and the fonts. Your player name and any dance song you pick are stored only in your own browser.

**Why is there no built-in dance song?**
To keep the repo free of copyrighted files. The default beat is generated with Web Audio, and you can pick your own song from the dance menu.

## Contributing

Contributions are very welcome: bug fixes, new rooms, new actions, translations, or docs.

1. Read [CONTRIBUTING.md](CONTRIBUTING.md) and the [Code of Conduct](CODE_OF_CONDUCT.md).
2. Open an [issue](https://github.com/anditorx/virtual-office-mini-player/issues) first for bigger changes so we can discuss them.
3. Fork, create a branch, and send a pull request with before/after screenshots if you change anything visual.

Found a security issue? Please don't open a public issue; follow [SECURITY.md](SECURITY.md). The change history is in [CHANGELOG.md](CHANGELOG.md).

## Credits

Created by **Andi Rustianto** ([@anditorx](https://github.com/anditorx)).

Built with [three.js](https://github.com/mrdoob/three.js) and the fonts Anton, Barlow, Barlow Condensed, and JetBrains Mono from [Google Fonts](https://fonts.google.com).

### ⭐ Support the project

If this project is useful or fun for you:

- **[Star the repo](https://github.com/anditorx/virtual-office-mini-player)** so more people can find it
- **[Follow @anditorx](https://github.com/anditorx)** on GitHub for updates and new projects
- Share what you build with it, or open an issue with ideas

## License

[MIT](LICENSE). You're free to use, modify, and sell it, as long as you include the license text.

Third-party libraries are loaded from a CDN under their own licenses: [three.js](https://github.com/mrdoob/three.js) (MIT) and the fonts above (SIL Open Font License).

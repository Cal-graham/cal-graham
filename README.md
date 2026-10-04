# Calum Graham — Portfolio

Personal portfolio site, live at **https://cal-graham.github.io/cal-graham/**.

Built with React 19, TypeScript, Vite and Tailwind CSS v4.

## Run locally

Prerequisite: Node.js 20+

```sh
npm install
npm run dev
```

Then open http://localhost:3000/cal-graham/.

## Editing content

Almost all site content lives in [`constants.ts`](constants.ts): the about text, experience, education, volunteering, skills and projects. Project images go in [`public/`](public/) and are referenced as `./filename.jpg`.

## Deploying

Pushing to `main` runs [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml), which builds the site and publishes `dist/` to the `gh-pages` branch.

To check a production build locally:

```sh
npm run build
npm run preview
```

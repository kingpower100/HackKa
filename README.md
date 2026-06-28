# ImpactFund

ImpactFund is an Expo Router app that targets web through Expo's static export pipeline.

## Stack

- Framework: Expo Router with React and React Native Web
- Build output: `dist`
- Package manager: npm (`package-lock.json`)
- App entry: `expo-router/entry`
- Route entry files: `src/app/**/*.tsx`

This repository is not a native Vite source tree. It is configured so Vercel can still deploy it with the requested `npm run build` command and `dist` output directory.

## Run Locally

Install dependencies:

```bash
npm install
```

Start the web dev server:

```bash
npm run dev
```

Build the production web output:

```bash
npm run build
```

Preview the production build locally:

```bash
npm run preview
```

The preview server uses `dist` and defaults to `http://localhost:3000`.

## Environment Variables

No environment variables are required for the current frontend.

Use `.env.example` as the template if new variables are added. Browser-exposed values must be explicitly public:

- Vite-style frontend variables: `VITE_*`
- Expo public variables: `EXPO_PUBLIC_*`

Never commit API keys, secrets, tokens, or private service credentials.

## Deploy To Vercel

Import the GitHub repository in Vercel and use these settings:

- Framework Preset: `Vite`
- Install Command: `npm install`
- Build Command: `npm run build`
- Output Directory: `dist`

The included `vercel.json` pins the same install/build/output settings and adds a rewrite fallback for client-side routes.

## Notes

Expo CLI may try to contact Expo services during startup. The npm scripts run Expo with `EXPO_OFFLINE=1` by default so local and Vercel builds do not fail if Expo metadata requests are unavailable.

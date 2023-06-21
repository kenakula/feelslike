# FeelsLike

## `[FE]` React PWA + MobX `[BE]` Firebase `(auth and database)`

## Project Structure

├── config
├── public/
│   ├── index.html
│   ├── browserconfig.xml
│   ├── favicon.ico
│   ├── robots.txt
│   └── site.webmanifest
├── scripts/
│   ├── build.js
│   ├── start.js
│   └── test.js
├── src/
│   ├── app/
│   │   ├── components/
│   │   │   ├── container/
│   │   │   │   └── container.tsx
│   │   │   └── index.ts
│   │   ├── models/
│   │   │   └── index.ts
│   │   ├── pages/
│   │   │   ├── home-page/
│   │   │   │   ├── components/
│   │   │   │   │   └── index.ts
│   │   │   │   └── home-page.tsx
│   │   │   └── index.ts
│   │   ├── router/
│   │   │   ├── private-route.tsx
│   │   │   ├── protected-route.tsx
│   │   │   ├── router-component.tsx
│   │   │   ├── routes.ts
│   │   │   └── index.ts
│   │   ├── shared/
│   │   │   ├── assets
│   │   │   ├── types
│   │   │   └── utils
│   │   ├── stores/
│   │   │   ├── mocks
│   │   │   └── index.ts
│   │   ├── app.tsx
│   │   └── firebase.ts
│   ├── assets/
│   │   ├── img
│   │   └── index.d.ts
│   ├── custom.d.ts
│   ├── index.css
│   ├── index.ts
│   ├── service-worker.ts
│   └── service-worker-registration.ts
├── .env
├── package-lock.json
├── package.json
└── tsconfig.md

## Available Scripts
### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000)
### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

### `npm run lint`
run eslint on ts files

### `npm run lint-fix`
run eslint on ts files and fixes them with prettier


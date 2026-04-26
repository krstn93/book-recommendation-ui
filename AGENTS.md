# Repository Guidelines

## Project Structure & Module Organization

This is an Angular 21 application. App source lives in `src/`, with the root standalone component in `src/app/app.component.ts`, its template in `src/app/app.component.html`, and component styles in `src/app/app.component.css`. Global styles belong in `src/styles.css`. Static assets are served from `public/` and are copied by the Angular build. TypeScript configuration is split across `tsconfig.json`, `tsconfig.app.json`, and `tsconfig.spec.json`; Angular CLI settings are in `angular.json`.

## Build, Test, and Development Commands

- `npm start`: runs `ng serve` for local development, usually at `http://localhost:4200/`.
- `npm run build`: creates a production build using Angular CLI settings and bundle budgets.
- `npm run watch`: builds continuously with the development configuration.
- `npm test`: runs the Karma/Jasmine test target configured in `angular.json`.
- `npm run ng -- <command>`: passes commands to Angular CLI, for example `npm run ng -- generate component books/book-card`.

## Coding Style & Naming Conventions

Use TypeScript and Angular standalone component patterns already present in `src/app/app.component.ts`. Keep indentation at two spaces in TypeScript, HTML, CSS, and JSON. Prefer single quotes in TypeScript imports and strings, and include trailing commas where the existing style uses them. Component selectors should use the `app-` prefix. Name components and classes in PascalCase, variables and methods in camelCase, and files in kebab-case such as `book-card.component.ts`.

## Testing Guidelines

Tests use Jasmine with Karma through the Angular test builder. Place component tests beside their implementation as `*.spec.ts` files, for example `src/app/book-card.component.spec.ts`. Cover user-visible behavior, component inputs/outputs, and important rendering states. Run `npm test` before opening a pull request; use focused tests only while developing and remove `fdescribe` or `fit` before committing.

## Commit & Pull Request Guidelines

Recent history uses short, imperative commit subjects such as `adding homepage and menu` and `Recreate project scaffold from scratch with Angular 21`. Keep commits focused and describe the user-facing change or maintenance task. Pull requests should include a concise summary, any linked issue, and testing notes such as `npm test` or `npm run build`. Include screenshots or short recordings for visible UI changes, especially changes to PrimeNG menus, layout, or styling.

## Security & Configuration Tips

Do not commit local secrets, environment-specific credentials, or generated build output. Keep dependency changes intentional and reflected in both `package.json` and `package-lock.json`. Static files in `public/` are publicly served, so avoid placing private data there.

# Week 11 — UX/UI Workshop

## Project: Attendance Control

Attendance Control is an application for managing student attendance using QR codes.

## Individual Scope

This workshop focuses on user authentication, registration, profiles, and attendance history.

Implemented screens:

- Login (`/login`)
- Register (`/register`)
- Profile (`/profile`)
- Attendance History (`/attendance`)

## Baseline

The official CORHUILA Ionic React starter was used because the Attendance Control documentation repository did not include an executable frontend.

Original starter:
https://github.com/code-corhuila/programacion-movil-2026-b-starter-react

The starter contains an unfinished product catalog. The Attendance Control screens were added during this workshop.

## Configuration

<!-- CONFIG-START -->
- FULL_NAME: Luis Fernando Perez Chala
- GITHUB_USER: luisfernando-77
- TEAM: Attendance Control
- DOCS_REPO: https://github.com/code-corhuila/att-book-docs.git
- CODE_REPO: Not available; official Ionic React starter used
- BASELINE: Official Ionic React starter, commit eb86696
- REFLECTION_DOC: https://docs.google.com/document/d/1dJBwUYgSwHgn28GI0CY8jEv6N-pZ4I8LU1flLwgs_-4/edit?usp=sharing
- MY_SCREENS: Login, Register, Profile, Attendance History
<!-- CONFIG-END -->

## Completed Checkpoints

| Checkpoint | Work completed |
|---|---|
| CP0 | Prepared the project and imported the starter. |
| CP1 | Reviewed Login, Register, and Profile wireframes. |
| CP2 | Implemented navigation and reusable design tokens. |
| CP3 | Implemented attendance list states and an automated test. |
| CP4 | Reviewed responsive layouts and improved accessibility. |
| CP5 | Submitted the required links in Moodle. |

## Attendance List

The `/attendance` screen uses simulated attendance records and supports:

- Loading, data, empty, and error states
- Retry button
- Pull-to-refresh using IonRefresher

Simulation URLs:

- `/attendance` — Data
- `/attendance?mode=empty` — Empty
- `/attendance?mode=error` — Error

## Testing and Accessibility

The automated test was executed using Vitest and React Testing Library.

- Test result: 1 passed
- Responsive viewports: 360 × 800 px and 768 × 800 px
- Lighthouse Accessibility before: 90/100
- Lighthouse Accessibility after: 100/100

## Running the Application

From the repository root:

```bash
cd 11-week/workshop/app
npm install
npm run dev
```

To run the automated test:

```bash
npx vitest run src/features/attendance/presentation/__tests__/AttendanceListPage.test.tsx
```

To verify the production build:

```bash
npm run build
```

## Documentation

- [CP1 — UX Audit](docs/01-ux-audit.md)
- [CP2 — Design Tokens](docs/02-design-tokens.md)
- [CP3 — List States](docs/03-states.md)
- [CP4 — Accessibility and Responsive Design](docs/04-a11y-responsive.md)

## Current Limitations

- Login and registration are not connected to the backend.
- Attendance records are simulated.
- Profile information is not loaded from the backend.
- Pull-to-refresh requires additional manual verification.
- Keyboard and screen-reader testing remain pending.

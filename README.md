# TaskManager
A React-based task management application.

## Progress Log

- **June 2, 2025**:
  - Started basic task list with add functionality using React `useState`.
  - Added initial UI with basic CSS for layout.
  - **Files**: `App.js`, `App.css`

- **June 3, 2025**:
  - Added theme toggle using `useContext` to manage light/dark themes.
  - Wrapped app in `ThemeProvider` for global theme state.
  - Implemented theme-based styling with CSS.
  - **Files**: `App.js`, `ThemeContext.js`, `index.js`

- **June 4, 2025**:
  - Styled app with Tailwind CSS for responsive design.
  - Fixed Tailwind setup issues (e.g., `index.css` directives, `tailwind.config.js` content path).
  - Centralized theme styles in `ThemeContext.js` using `themeStyles`.
  - **Files**: `App.js`, `index.css`, `tailwind.config.js`, `ThemeContext.js`

- **June 5, 2025**:
  - Enhanced TaskManager with task deletion functionality and UI improvements (hover effects, centered layout, borders).
  - Debugged and fixed Tailwind styling issues (corrected `index.css` and `tailwind.config.js`).
  - Addressed npm vulnerabilities using `npm audit fix`.
  - **Files**: `App.js`, `ThemeContext.js`, `index.css`, `index.js`, `tailwind.config.js`
 
- **June 9, 2025**:
  - Studied freeCodeCamp “Full-Stack Tutorial” (React-Express integration) (1 hour).
  - Integrated Axios into Task Manager’s React front-end to fetch and add tasks via API calls to `/tasks` endpoint (1 hour).
  - Troubleshot backend integration issues, including CORS configuration and API endpoint testing with Postman.
  - Committed Axios integration code and added server-side logging for debugging.

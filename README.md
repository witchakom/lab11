# Thai Todo (Vite + React + Tailwind)

แอปรายการงานภาษาไทย — React 18, Vite, Tailwind CSS v4, lucide-react
ข้อมูลเก็บใน React state เท่านั้น (รีเฟรชแล้วรีเซ็ต)

## Getting started

```bash
npm install
npm run dev       # http://localhost:5173
npm run build     # output in dist/
npm run preview   # preview the production build
```

## Features

- Add a todo with Enter or the button, with Low / Medium / High priority
- Complete (checkbox + strikethrough), delete (animated), edit inline (double-click or pencil icon)
- Filter tabs: All / Active / Completed, remaining counter, clear completed
- Click a priority badge to cycle its level
- Light and dark theme follow the system setting

## Structure

```
src/
  App.jsx                 state + layout
  constants.js            priorities, seed data
  components/TodoItem.jsx
  components/EditField.jsx
  index.css               Tailwind import + design tokens + component styles
```

Theme colors live as CSS variables at the top of `src/index.css`.

# Retrospective App

React + Vite приложение для проведения совместных обсуждений, ретроспектив и т.д.

**Коротко:** Vite + React (TypeScript), styled-components, Zustand, TanStack Query, D3 для графиков.

**Требования**
- Node.js 18+ (рекомендуется)
- npm или другой менеджер пакетов

## Быстрый старт

1. Установить зависимости:

```
npm install
```

2. Запустить в режиме разработки:

```
npm run start
```

3. Сборка приложения:

```
npm run build
```

## Архитектура и структура

- `src/` — основной код приложения
	- `src/app` — инициализация приложения, роутер
	- `src/pages` — страницы (Login, Register, Admin, Main)
	- `src/widgets` — крупные перерабатываемые виджеты (Board, AppBar, SideMenu и т.д.)
	- `src/shared` — общие утилиты, UI-компоненты, хуки и типы
	- `src/store` — zustand сторы

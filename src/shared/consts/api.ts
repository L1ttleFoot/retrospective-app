export const BASE_URL =
	import.meta.env.VITE_BASE_URL ??
	(import.meta.env.DEV ? 'http://localhost:8080' : 'https://retrospective-app-backend.vercel.app');

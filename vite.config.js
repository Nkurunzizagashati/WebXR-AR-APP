import { defineConfig } from 'vite';

export default defineConfig({
	preview: {
		allowedHosts: ['webxr-ar-app2.onrender.com', 'localhost'], // Add Render host and localhost
	},
});

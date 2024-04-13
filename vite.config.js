/** @format */

import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import eslint from 'vite-plugin-eslint';

import basicSsl from '@vitejs/plugin-basic-ssl';

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [
		react(),
		eslint(),
		basicSsl({ cert: './cert.pem', key: './key.pem' }),
	],
	'server.hmr.overlay': false,
	server: {
		https: true,
	},
});

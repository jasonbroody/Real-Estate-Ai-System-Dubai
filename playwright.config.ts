import { defineConfig } from '@playwright/test';
export default defineConfig({ testDir: './tests', timeout: 30000, workers: 1, use: { baseURL: 'http://localhost:3000', channel: 'msedge', headless: true, viewport: { width: 1440, height: 1000 }, reducedMotion: 'reduce' }, reporter: 'list' });

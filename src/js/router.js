// router.js
import { renderHome } from './ui.js';
import { initAuth } from './auth.js';

window.addEventListener('DOMContentLoaded', async () => {
  initAuth();
  await renderHome();
});

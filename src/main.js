import './scss/main.scss';
import { Tooltip } from 'bootstrap';
import { initTheme } from './js/theme.js';
import { initProductForm } from './js/product-form.js';

document.querySelectorAll('[data-bs-toggle="tooltip"]').forEach((element) => {
  new Tooltip(element);
});

initTheme();
initProductForm();

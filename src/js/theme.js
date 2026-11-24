const STORAGE_KEY = 'stocklab-theme';

export function initTheme() {
  const button = document.querySelector('#themeToggle');
  const icon = document.querySelector('#themeIcon');
  const root = document.documentElement;

  if (!button || !icon) return;

  function updateTheme(theme) {
    root.dataset.bsTheme = theme;
    localStorage.setItem(STORAGE_KEY, theme);

    const dark = theme === 'dark';
    icon.textContent = dark ? '☀' : '☾';
    button.setAttribute('aria-pressed', String(dark));
    button.setAttribute(
      'aria-label',
      dark ? 'Activar modo claro' : 'Activar modo oscuro'
    );
  }

  updateTheme(root.dataset.bsTheme || 'light');

  button.addEventListener('click', () => {
    const nextTheme = root.dataset.bsTheme === 'dark' ? 'light' : 'dark';
    updateTheme(nextTheme);
  });
}

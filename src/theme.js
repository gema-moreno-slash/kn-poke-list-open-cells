const rootEle = document.querySelector('html');

function detectSystemMode() {
  const isDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
  rootEle.setAttribute('data-theme', isDarkMode ? 'dark' : 'light');
}

function getMode() {
  const mode = rootEle.getAttribute('data-theme');
  return mode === 'dark' ? 'dark' : 'light';
}

function changeMode() {
  const mode = rootEle.getAttribute('data-theme');
  rootEle.setAttribute('data-theme', mode === 'dark' ? 'light' : 'dark');
}

export {
  detectSystemMode,
  getMode,
  changeMode
}
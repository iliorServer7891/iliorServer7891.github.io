window.switchTheme = async function(themeName) {
  if (!window.themes[themeName]) {
    return getTranslation('themesList');
  }
  localStorage.setItem('theme', themeName);
  window.applyTheme(window.themes[themeName]);
  return getTranslation('switchTheme', { theme: themeName });
};
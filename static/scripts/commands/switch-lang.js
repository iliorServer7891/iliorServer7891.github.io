async function switchLang() {
  const current = localStorage.getItem('language') || 'en';
  const newLang = current === 'en' ? 'ru' : 'en';
  localStorage.setItem('language', newLang);
  currentLang = newLang; // Update global currentLang
  return getTranslation('switchLang', { lang: newLang });
}
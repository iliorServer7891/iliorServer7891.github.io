const translations = {
  en: {
    greetingMorning: 'Good morning, {username}!',
    greetingAfternoon: 'Good afternoon, {username}!',
    greetingEvening: 'Good evening, {username}!',
    welcome: 'Welcome back to your {distro}! Write `help` to see commands',
    prompt: '{username}@{hostname}:~$',
    setupUsername: 'Please enter your username:',
    setupHostname: 'Please enter your hostname, {username}:',
    setupDistro: 'Select your distro (use arrow keys, press Enter):',
    setupRebooting: 'Setup complete. Rebooting...',
    switchLang: 'Language switched to {lang}',
    switchTheme: 'Theme switched to {theme}',
    invalidTheme: 'Invalid theme: {theme}',
    loadingModule: 'Loading module {module}... [OK]',
    commandNotFound: 'Command not found: {command}',
    errorExecuting: 'Error executing command: {command}',
    whoami: '{username}@{hostname}',
    themesList: 'Theme list: tokyo-night dracula solarized-dark solarized-light nord gruvbox-dark gruvbox-light monokai one-dark catppuccin-mocha catpuccin-latte everforest material-dark oceanic-next ayu-dark ayu-mirage horizon-dark palenight tommorow-night default',
    help: `Available commands:
- help: Show this message
- whoami: Display user info
- clear: Clear the terminal
- switch-lang: Switch language (en/ru)
- switch-theme: Switch theme (e.g., switch-theme tokyo-night, monokai, dracula)`
  },
  ru: {
    greetingMorning: 'Доброе утро, {username}!',
    greetingAfternoon: 'Добрый день, {username}!',
    greetingEvening: 'Добрый вечер, {username}!',
    welcome: 'Добро пожаловать обратно в ваш {distro}! Напишите `help` чтобы узнать команды',
    prompt: '{username}@{hostname}:~$',
    setupUsername: 'Пожалуйста, введите ваше имя пользователя:',
    setupHostname: 'Пожалуйста, введите имя хоста, {username}:',
    setupDistro: 'Выберите ваш дистрибутив (используйте стрелки, нажмите Enter):',
    setupRebooting: 'Настройка завершена. Перезагрузка...',
    switchLang: 'Язык переключён на {lang}',
    switchTheme: 'Тема переключена на {theme}',
    invalidTheme: 'Недопустимая тема: {theme}',
    loadingModule: 'Загрузка модуля {module}... [OK]',
    commandNotFound: 'Команда не найдена: {command}',
    errorExecuting: 'Ошибка выполнения команды: {command}',
    whoami: '{username}@{hostname}',
    themesList: 'Список тем: tokyo-night dracula solarized-dark solarized-light nord gruvbox-dark gruvbox-light monokai one-dark catppuccin-mocha catpuccin-latte everforest material-dark oceanic-next ayu-dark ayu-mirage horizon-dark palenight tommorow-night default',
    help: `Доступные команды:
- help: Показать это сообщение
- whoami: Показать информацию о пользователе
- clear: Очистить терминал
- switch-lang: Переключить язык (en/ru)
- switch-theme: Переключить тему (например, switch-theme tokyo-night, monokai, dracula)`
  }
};

let currentLang = localStorage.getItem('language') || 'en';

function getTranslation(key, params = {}) {
  let translation = translations[currentLang][key] || translations.en[key] || key;
  for (const [param, value] of Object.entries(params)) {
    translation = translation.replace(`{${param}}`, value);
  }
  return translation;
}
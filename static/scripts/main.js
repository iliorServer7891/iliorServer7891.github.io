const commands = {
  help: window.help,
  whoami: window.whoami,
  clear: window.clear,
  'switch-lang': window.switchLang,
  'switch-theme': window.switchTheme
};

async function init() {
  if (typeof window.getCurrentTheme === 'function') {
    window.applyTheme(window.themes[window.getCurrentTheme()] || window.themes['tokyo-night']);
  }
  clearOutput();
  const modules = [
    'localization.js',
    'utils.js',
    'themes.js',
    'setup.js',
    'fastfetch.js',
    'commands/help.js',
    'commands/whoami.js',
    'commands/clear.js',
    'commands/switch-lang.js'
  ];
  for (const module of modules) {
    await typeText(getTranslation('loadingModule', { module }));
    await new Promise(resolve => setTimeout(resolve, 300));
  }

  const userData = await window.runSetup();
  clearOutput();

  const hour = new Date().getHours();
  let greetingKey = hour < 12 ? 'greetingMorning' : hour < 18 ? 'greetingAfternoon' : 'greetingEvening';
  await typeText(getTranslation(greetingKey, { username: userData.username }));

  await window.displayFastfetch(userData);

  await typeText(getTranslation('welcome', { distro: userData.distro }));

  const promptText = getTranslation('prompt', { username: userData.username, hostname: userData.hostname });
  const lineDiv = document.createElement('div');
  lineDiv.classList.add('input-line');
  lineDiv.innerHTML = window.highlightText(promptText);
  output.appendChild(lineDiv);
  showInput();

  commandInput.addEventListener('input', () => {
    const input = commandInput.value.trim();
    const promptText = getTranslation('prompt', { username: userData.username, hostname: userData.hostname });
    const fullText = `${promptText}${input ? ` ${input}` : ''}`;
    const lastOutput = output.querySelector('.input-line:last-child');
    if (lastOutput) {
      lastOutput.innerHTML = window.highlightText(fullText);
    }
    output.scrollTop = output.scrollHeight;
  });

  commandInput.addEventListener('keydown', async (e) => {
    if (e.key === 'Enter') {
      const input = commandInput.value.trim();
      const promptText = getTranslation('prompt', { username: userData.username, hostname: userData.hostname });
      const lastOutput = output.querySelector('.input-line:last-child');
      if (lastOutput) {
        lastOutput.classList.remove('input-line');
        lastOutput.innerHTML = window.highlightText(`${promptText}${input ? ` ${input}` : ''}`);
      }
      if (input) {
        saveCommand(input);
        const [cmd, ...args] = input.toLowerCase().split(' ');
        if (commands[cmd]) {
          try {
            const result = await commands[cmd](...args);
            if (result) await typeText(result);
          } catch (err) {
            await typeText(getTranslation('errorExecuting', { command: cmd }));
          }
        } else {
          await typeText(getTranslation('commandNotFound', { command: cmd }));
        }
      }
      commandInput.value = '';
      const lineDiv = document.createElement('div');
      lineDiv.classList.add('input-line');
      lineDiv.innerHTML = window.highlightText(getTranslation('prompt', { username: userData.username, hostname: userData.hostname }));
      output.appendChild(lineDiv);
      output.scrollTop = output.scrollHeight;
      showInput();
    } else if (e.key === 'ArrowUp' || e.key === 'ArrowDown') {
      commandInput.value = getHistory(e.key === 'ArrowUp' ? 'up' : 'down');
      commandInput.dispatchEvent(new Event('input'));
    }
  });
}

init();
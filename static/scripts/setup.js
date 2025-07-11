// Setup process
const distros = ['Ubuntu', 'Arch Linux', 'Debian', 'Gentoo', 'Manjaro', 'Mint'];

async function runSetup() {
  const userData = loadUserData();
  if (userData.username && userData.hostname && userData.distro) {
    return userData; // Skip setup if data exists
  }

  clearOutput();
  // Simulate module loading
  const modules = [
    'localization.js',
    'utils.js',
    'themes.js',
    'setup.js',
    'fastfetch.js',
    'commands/help.js',
    'commands/whoami.js',
    'commands/clear.js',
    'commands/switch-lang.js',
    'commands/switch-theme.js'
  ];
  for (const module of modules) {
    await typeText(getTranslation('loadingModule', { module }), 20);
    await new Promise(resolve => setTimeout(resolve, 300)); // Simulate load time
  }

  await typeText('---Setup started---');

  // Username
  await typeText(getTranslation('setupUsername'));
  let username = await getUserInput();
  if (!username) username = 'user';

  // Hostname
  await typeText(getTranslation('setupHostname', { username }));
  let hostname = await getUserInput();
  if (!hostname) hostname = 'localhost';

  // Distro selection
  await typeText(getTranslation('setupDistro'));
  let distroIndex = 0;
  let selectedDistro = distros[distroIndex];
  await typeText(`> ${selectedDistro}`, 0);

  const handleKey = async (e) => {
    if (e.key === 'ArrowUp' && distroIndex > 0) {
      distroIndex--;
      selectedDistro = distros[distroIndex];
      output.textContent = output.textContent.slice(0, -selectedDistro.length - 2);
      await typeText(`> ${selectedDistro}`, 0);
    } else if (e.key === 'ArrowDown' && distroIndex < distros.length - 1) {
      distroIndex++;
      selectedDistro = distros[distroIndex];
      output.textContent = output.textContent.slice(0, -selectedDistro.length - 2);
      await typeText(`> ${selectedDistro}`, 0);
    } else if (e.key === 'Enter') {
      document.removeEventListener('keydown', handleKey);
      await typeText(getTranslation('setupRebooting'));
      saveUserData({ username, hostname, distro: selectedDistro });
      return selectedDistro;
    }
  };

  document.addEventListener('keydown', handleKey);
  return new Promise(resolve => {
    document.addEventListener('keydown', () => {
      if (selectedDistro) resolve({ username, hostname, distro: selectedDistro });
    }, { once: true });
  });
}

// Get user input
function getUserInput() {
  showInput();
  return new Promise(resolve => {
    commandInput.addEventListener('keydown', function handler(e) {
      if (e.key === 'Enter') {
        const value = commandInput.value.trim();
        output.textContent += value + '\n';
        commandInput.value = '';
        inputLine.classList.add('hidden');
        commandInput.removeEventListener('keydown', handler);
        resolve(value);
      }
    });
  });
}
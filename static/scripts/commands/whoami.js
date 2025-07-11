// Whoami command
function whoami() {
  const { username, hostname, distro } = loadUserData();
  return getTranslation('whoami', { username, hostname });
}
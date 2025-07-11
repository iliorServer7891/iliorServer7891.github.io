const output = document.getElementById('output');
const inputLine = document.getElementById('input-line');
const commandInput = document.getElementById('command-input');

let commandHistory = JSON.parse(localStorage.getItem('commandHistory')) || [];
let historyIndex = -1;

const textQueue = [];
let isTyping = false;

async function typeText(text, delay = 100) {
  textQueue.push(text);
  if (isTyping) return;

  isTyping = true;
  while (textQueue.length > 0) {
    const currentText = textQueue.shift();
    const lines = currentText.split('\n');

    for (const line of lines) {
      const lineDiv = document.createElement('div');
      lineDiv.innerHTML = line.includes('<span') ? line : window.highlightText(line);
      output.appendChild(lineDiv);
      output.appendChild(document.createTextNode('\n'));
      output.scrollTop = output.scrollHeight;
      await new Promise(resolve => setTimeout(resolve, delay));
    }
  }
  isTyping = false;
}

window.highlightText = function(text) {
  const promptMatch = text.match(/^(\w+)@(\w+):~\$(?:\s(.+))?$/);
  if (promptMatch) {
    const [, username, hostname, command] = promptMatch;
    return `<span class="username">${username}</span><span class="at">@</span><span class="hostname">${hostname}</span><span class="prompt">:~$</span>${command ? `<span class="input"> ${command}</span>` : ''}`;
  }
  return `<span class="cmd">${text}</span>`;
};

function clearOutput() {
  output.textContent = '';
}

function showInput() {
  inputLine.classList.remove('hidden');
  commandInput.focus();
}

function saveUserData({ username, hostname, distro }) {
  localStorage.setItem('username', username);
  localStorage.setItem('hostname', hostname);
  localStorage.setItem('distro', distro);
}

function loadUserData() {
  return {
    username: localStorage.getItem('username') || '',
    hostname: localStorage.getItem('hostname') || '',
    distro: localStorage.getItem('distro') || ''
  };
}

function saveCommand(command) {
  if (command) {
    commandHistory.unshift(command);
    if (commandHistory.length > 50) commandHistory.pop();
    localStorage.setItem('commandHistory', JSON.stringify(commandHistory));
    historyIndex = -1;
  }
}

function getHistory(direction) {
  if (direction === 'up' && historyIndex < commandHistory.length - 1) {
    historyIndex++;
    return commandHistory[historyIndex] || '';
  } else if (direction === 'down' && historyIndex >= 0) {
    historyIndex--;
    return historyIndex === -1 ? '' : commandHistory[historyIndex];
  }
  return commandInput.value;
}
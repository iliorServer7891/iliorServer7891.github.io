// Fastfetch-like output with random ASCII art
const asciiArts = [
  `
       .-""""""""-.
    .'  .-"""""-.  '.
   /   /   ***   \\   \\
  : , :   ***   : , :
 : : :         : : :
: : : ,     , : : :
: : : : , , : : : :
: : : : : : : : : :
: : : : : : : : : :
:_:_:_:_:_:_:_:_:_
`,
  `
    ^-^ 
   (o.o) 
    >o<
   / 0 \\
  ( === )
   '---'
`,
  `
   .-""""""""-.
 .'  .-"""""-.  '.
/   /_________\\   \\
|   |  ***  |   |
|   |  ***  |   |
|   |_______|   |
|_______________|
`,
  `
    .-""""""""-.
   /  .-"""""-.  \\
  /  /  ***  \\  \\
 :  :  ***  :  :
 :  :_______:  :
 :__________:
`
];

function getRandomAsciiArt() {
  return asciiArts[Math.floor(Math.random() * asciiArts.length)];
}

async function displayFastfetch({ username, hostname, distro }) {
  const asciiArt = getRandomAsciiArt();
  const info = [
    `${username}@${hostname}`,
    `---------------------------`,
    `OS: ${distro}`,
    `Kernel: 5.15.0-73-generic`,
    `Uptime: 1 hour 48 mins`,
    `Shell: bash 5.1.16`,
    `Github: <a href='https://github.com/iliorServer7891'>frembl</a>`,
  ];
  const lines = asciiArt.split('\n').map((line, i) => 
    `<span class="ascii">${line.padEnd(30)}</span><span class="info">${info[i] || ''}</span>`
  );
  await typeText(lines.join('\n'));
}

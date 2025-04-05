const term = new Terminal({
  cursorBlink: true,
});

term.open(document.getElementById('terminal'));

// Simulated "packages" and commands
const packages = {
  'apt-get': {
    install: (pkg) => `Simulated: Installing ${pkg}... Done!`,
    remove: (pkg) => `Simulated: Removing ${pkg}... Done!`,
  },
  'sudo': (command) => `Simulated sudo: Running "${command}" (no real root access)`,
};

term.write('Welcome to WebTerminal!\r\n');

term.onData((input) => {
  term.write(input); // Echo user input
});

term.onKey(({ key }) => {
  if (key === '\r') { // Enter key
    const command = term.buffer.active.getLine(term.buffer.active.cursorY).translateToString().trim();
    handleCommand(command);
    term.write('\r\n$ ');
  }
});

function handleCommand(command) {
  const [cmd, ...args] = command.split(' ');

  switch (cmd) {
    case 'sudo':
      term.write(packages.sudo(args.join(' ')) + '\r\n');
      break;
    case 'apt-get':
      const action = args[0];
      const pkg = args[1];
      if (packages['apt-get'][action]) {
        term.write(packages['apt-get'][action](pkg) + '\r\n');
      }
      break;
    case 'help':
      term.write('Supported commands: sudo, apt-get, help\r\n');
      break;
    default:
      term.write(`Command "${cmd}" not simulated.\r\n`);
  }
}

term.write('\r\n$ '); // Initial prompt

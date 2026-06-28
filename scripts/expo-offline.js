const { spawn } = require('child_process');
const path = require('path');

const expoCli = require.resolve('expo/bin/cli');
const env = {
  ...process.env,
  EXPO_OFFLINE: process.env.EXPO_OFFLINE || '1',
};

const child = spawn(process.execPath, [expoCli, ...process.argv.slice(2)], {
  cwd: path.resolve(__dirname, '..'),
  env,
  stdio: 'inherit',
  shell: false,
});

child.on('exit', (code, signal) => {
  if (signal) {
    process.kill(process.pid, signal);
    return;
  }

  process.exit(code || 0);
});

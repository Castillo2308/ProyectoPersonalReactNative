#!/usr/bin/env node
const { spawn } = require('child_process');

function run(cmd, args) {
  const child = spawn(cmd, args, { stdio: 'inherit', shell: true });
  child.on('exit', code => process.exit(code ?? 0));
}

const isWeb = !!process.env.npm_config_web; // supports `npm start --web`

if (isWeb) {
  const port = process.env.npm_config_port || process.env.PORT;
  const args = ['serve', '--config', 'webpack.config.js'];
  if (port) {
    process.env.PORT = String(port);
  }
  run('npx webpack', args);
} else {
  run('npx react-native', ['start']);
}

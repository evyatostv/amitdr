import {execSync} from 'node:child_process';

const cwd = process.cwd();

function hasProjectDevServer() {
  try {
    const output = execSync('ps -ax -o command', {encoding: 'utf8'});
    return output
      .split('\n')
      .some(
        (line) =>
          line.includes(cwd) &&
          line.includes('next') &&
          line.includes('dev') &&
          !line.includes('check-no-dev-running.mjs')
      );
  } catch {
    return false;
  }
}

if (hasProjectDevServer()) {
  console.error(
    '\nBuild blocked: `next dev` is running for this project.\nStop dev server first, then run `npm run build`.\n'
  );
  process.exit(1);
}

console.log('No project dev server detected. Continuing build...');

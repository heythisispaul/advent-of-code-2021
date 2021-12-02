import { execSync } from 'child_process';

(() => {
  const day = process.argv[2];
  const number = process.argv[3];
  execSync(`node ./ts-dist/challenges/day${day}/challenge${number || 1}.js`, { stdio: 'inherit' });
})();

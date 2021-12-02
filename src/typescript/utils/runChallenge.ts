import { readFile } from 'fs';
import { resolve } from 'path';
import { promisify } from 'util';
import { exec } from 'child_process';

(async () => {
  // get args from the cli input and then recompile the TS for the files that will run:
  const [,, day, number] = process.argv;
  await promisify(exec)(`tsc ./src/typescript/challenges/day${day}/* --outDir ts-dist/challenges/day${day}`);

  // import the input text file and the JS function to run:
  const [input, { default: handler }] = await Promise.all([
    promisify(readFile)(resolve(__dirname, `../../inputs/day${day}.txt`), 'utf-8'),
    import(`../challenges/day${day}/challenge${number || 1}.js`),
  ]);

  // get the result and log it out:
  const result = await handler(input);
  console.log('----------RESULT----------');
  console.log(result);
  console.log('--------------------------');
})();

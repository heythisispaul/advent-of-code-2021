import { readFile } from 'fs';
import { resolve } from 'path';
import { promisify } from 'util';

export const promisifedReadfile = promisify(readFile);

export function withSetup<T>(day: string, challengeFunction: (challengeInput: string) => Promise<T> | T) {
  return async () => {
    const input = await promisifedReadfile(resolve(__dirname, `../../inputs/day${day}.txt`), 'utf-8');
    const result = await challengeFunction(input);
    console.log('----------RESULT----------');
    console.log(result);
    console.log('--------------------------');
  };
}

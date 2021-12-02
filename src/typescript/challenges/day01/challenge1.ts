import { withSetup } from '../../utils/challengeSetup';

const day01part1 = withSetup<number>('01', (input) => {
  let increases = 0;
  const measurements = input.split('\n').map(parseFloat);
  measurements.forEach((depth, index) => {
    const next = measurements[index + 1];
    if (!isNaN(next) && next > depth) {
      increases++;
    }
  });
  return increases;
});

day01part1();

export default (input: string) => {
  let increases = 0;
  let lastSum = undefined;
  const measurements = input.split('\n').map(parseFloat);
  for (let i = 0; i < measurements.length; i++) {
    const current = measurements[i];
    const upOne = measurements[i + 1];
    const upTwo = measurements[i + 2];
    if (isNaN(upTwo)) {
      break;
    }
    const currentSum = current + upOne + upTwo;
    if (lastSum && currentSum > lastSum) {
      increases++;
    }
    lastSum = currentSum;
  }
  return increases;
};

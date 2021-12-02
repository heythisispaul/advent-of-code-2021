export default (input: string) => {
  let increases = 0;
  const measurements = input.split('\n').map(parseFloat);
  measurements.forEach((depth, index) => {
    const next = measurements[index + 1];
    if (!isNaN(next) && next > depth) {
      increases++;
    }
  });
  return increases;
};

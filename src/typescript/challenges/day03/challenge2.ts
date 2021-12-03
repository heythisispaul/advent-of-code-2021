type Direction = 'greatest' | 'least';

interface ReducedBinary {
  ones: string[];
  zeros: string[];
}

export default (input: string) => {
  const binaryValues = input.split('\n');

  const getArrayAtPosition = (
    values: string[],
    direction: Direction,
    depth = 0
  ): string => {
    const max = values[0].length;
    const { ones, zeros } = values.reduce((accrued: ReducedBinary, current) => {
      current.charAt(depth) === '1'
        ? accrued.ones.push(current)
        : accrued.zeros.push(current);
      return accrued;
    }, { ones: [], zeros: [] });

    const result = direction === 'greatest'
      ? ones.length >= zeros.length ? ones : zeros
      : zeros.length <= ones.length ? zeros : ones;
    if (depth <= max && result.length > 1) {
      return getArrayAtPosition(result, direction, depth + 1);
    }
    return result[0];
  };

  const oxygen = getArrayAtPosition(binaryValues, 'greatest');
  const co2 = getArrayAtPosition(binaryValues, 'least');
  
  return parseInt(oxygen, 2) * parseInt(co2, 2);
};

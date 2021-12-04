interface ReducedBinary {
  '1': string[];
  '0': string[];
}

export default (input: string) => {
  const binaryValues = input.split('\n');

  const getArrayAtPosition = (
    values: string[],
    isfindingGreatest?: boolean,
    depth = 0,
  ): string => {
    const max = values[0].length;
    const { 1: ones, 0: zeros } = values.reduce((accrued: ReducedBinary, current) => {
      const arr = current.charAt(depth) as keyof ReducedBinary;
      accrued[arr].push(current);
      return accrued;
    }, { '1': [], '0': [] });

    const result = isfindingGreatest
      ? ones.length >= zeros.length ? ones : zeros
      : zeros.length <= ones.length ? zeros : ones;

    if (depth <= max && result.length > 1) {
      return getArrayAtPosition(result, isfindingGreatest, depth + 1);
    }
    return result[0];
  };

  const oxygen = getArrayAtPosition(binaryValues, true);
  const co2 = getArrayAtPosition(binaryValues);
  
  return parseInt(oxygen, 2) * parseInt(co2, 2);
};

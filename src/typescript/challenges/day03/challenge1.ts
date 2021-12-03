export default (input: string) => {
  const binaryValues = input.split('\n');
  const toDecimal = (binaryArr: number[]) => parseInt(
    binaryArr.map((value) => value.toString()).join(''),
    2,
  );

  const summedBits = binaryValues.reduce((accrued: number[], current) => {
    current.trim().split('').forEach((value, index) => {
      accrued[index] += parseInt(value);
    });
    return accrued;
  }, new Array(binaryValues[0].length).fill(0, 0));

  const gamma = summedBits.map((value) => (
    value > (binaryValues.length / 2) ? 1 : 0
  ));
  const epsilon = gamma.map((value) => value > 0 ? 0 : 1);

  return (toDecimal(gamma) * toDecimal(epsilon));
};

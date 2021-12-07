export default (input: string) => {
  const numberArray = input.split(',').map(parseFloat);
  const occurrences = numberArray.reduce((counter, number) => {
    counter[number] = counter[number] + 1;
    return counter;
  }, new Array<number>(Math.max(...numberArray) + 1).fill(0, 0));

  const fuelTotals = occurrences
    .map((_, number) => occurrences
      .reduce((fuelTotal, occurs, currentNumber) => (
        fuelTotal + (Math.abs(number - currentNumber) * occurs)
      ), 0));

  return Math.min(...fuelTotals);
};

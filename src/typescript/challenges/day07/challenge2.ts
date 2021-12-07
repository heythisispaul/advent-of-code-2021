export default (input: string) => {
  const numberArray = input.split(',').map(parseFloat);
  const sequenceCache: Record<string, number> = {};

  const getSequence = (number: number) => {
    if (sequenceCache[number]) {
      return sequenceCache[number];
    }
    let index = number;
    const numArray: number[] = [];
    while (index > 0) {
      numArray.push(index);
      index--;
      if (sequenceCache[index]) {
        numArray.push(sequenceCache[index]);
        break;
      }
    }

    const result = numArray.reduce((total, current) => total + current, 0);
    sequenceCache[number] = result;
    return result;
  };

  const occurrences = numberArray.reduce((counter, number) => {
    counter[number] = counter[number] + 1;
    return counter;
  }, new Array<number>(Math.max(...numberArray) + 1).fill(0, 0));

  const fuelTotals = occurrences
    .map((_, number) => occurrences
      .reduce((fuelTotal, occurs, currentNumber) => {
        const fibLikeValue = getSequence(Math.abs(number - currentNumber));
        return fuelTotal + (fibLikeValue * occurs);
      }, 0));

  return Math.min(...fuelTotals);
};

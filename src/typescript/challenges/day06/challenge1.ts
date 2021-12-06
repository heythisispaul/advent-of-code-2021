export default (input: string) => {
  const handleNewDay = (fishArr: number[]) => {
    const newFish: number[] = [];
    fishArr.forEach((fish, index) => {
      const valueMinus1 = fish - 1;
      if (valueMinus1 < 0) {
        newFish.push(8);
      }
      const newFishValue = valueMinus1 < 0 ? 6 : valueMinus1;
      fishArr.splice(index, 1, newFishValue);
    });
    return [...fishArr, ...newFish];
  };

  let index = 0;
  let fishYesterday = input.split(',').map(parseFloat);
  while (index < 80) {
    const fishToday = handleNewDay(fishYesterday);
    fishYesterday = fishToday;
    index++;
  }
  return fishYesterday.length;
};

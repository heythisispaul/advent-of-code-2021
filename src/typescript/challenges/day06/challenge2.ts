export default (input: string) => {
  const handleNewDay = (fishArr: number[]) => {
    const newFishArray = [...fishArr];
    const fishToAdd = newFishArray.shift() as number;
    newFishArray[6] = newFishArray[6] + fishToAdd;
    newFishArray[8] = fishToAdd;
    return newFishArray;
  };

  let dayIndex = 0;
  let fishYesterday = input.split(',').reduce((fishArr, fishString) => {
    const fish = parseFloat(fishString);
    fishArr.splice(fish, 1, fishArr[fish] + 1);
    return fishArr;
  }, new Array<number>(9).fill(0, 0));

  while (dayIndex < 256) {
    const fishToday = handleNewDay(fishYesterday);
    fishYesterday = fishToday;
    dayIndex++;
  }

  return fishYesterday.reduce((total, current) => total + current, 0);
};

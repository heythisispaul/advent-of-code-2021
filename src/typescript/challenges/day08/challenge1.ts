export default (input: string) => input
  .split('\n')
  .map((line) => line.split(' | ')[1].split(' '))
  .flat()
  .filter((numString) => {
    const { length } = numString.trim();
    return length && (length < 5 || length > 6);
  })
  .length;

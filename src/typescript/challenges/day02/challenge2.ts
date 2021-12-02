export default (input: string) => {
  const [finalVert, finalHorz] = input.split('\n').reduce(([vert, horz, aim], command) => {
    const [direction, unitString] = command.split(' ');
    const units = parseInt(unitString);
    switch (direction) {
      case 'up':
        return [vert, horz, aim - units];
      case 'down':
        return [vert, horz, aim + units];
      default:
        return [vert + (aim * units), horz + units, aim];
    }
  }, [0, 0, 0]);
  return Math.abs(finalVert * finalHorz);
};

export default (input: string) => {
  const [finalVert, finalHorz] = input.split('\n').reduce(([vert, horz], command) => {
    const [direction, unitString] = command.split(' ');
    const units = parseInt(unitString);
    switch (direction) {
      case 'up':
        return [vert + units, horz];
      case 'down':
        return [vert - units, horz];
      default:
        return [vert, horz + units];
    }
  }, [0, 0]);
  return Math.abs(finalVert * finalHorz);
};

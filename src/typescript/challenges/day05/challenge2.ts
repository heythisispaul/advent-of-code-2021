type CoordMap = Record<string, number>;

export default (input: string) => {
  const incrementCoords = (coordPairKey: string, map: CoordMap) => {
    const currentCoordCount = map[coordPairKey] || 0;
    map[coordPairKey] = currentCoordCount + 1;
  };

  const mutateMapWithLineData = (
    coord1: number,
    coord2: number,
    coord3: number,
    type: 'x' | 'y',
    map: CoordMap,
  ) => {
    let index = Math.min(coord1, coord2);
    const end = Math.max(coord1, coord2);

    while (index <= end) {
      const coordPairKey = JSON.stringify(type === 'x' ? [coord3, index] : [index, coord3]);
      incrementCoords(coordPairKey, map);
      index++;
    }
  };

  const coordOverlaps = input.split('\n').reduce((coordMap: CoordMap, coordString) => {
    const [x1, y1, x2, y2] = coordString.replace(' -> ', ',').split(',').map(parseFloat);
    if (x1 === x2) {
      mutateMapWithLineData(y1, y2, x1, 'x', coordMap);
    }
    if (y1 === y2) {
      mutateMapWithLineData(x1, x2, y1, 'y', coordMap);
    }
    if (Math.abs(x1 - x2) && Math.abs(y1 - y2)) {
      let index = 0;
      const length = Math.abs(x1 - x2);
      while (index <= length) {
        const getDiffToApply = (slope: number) => slope < 0 ? index : index * -1;
        const coordPairKey = JSON.stringify([
          x1 + getDiffToApply(x1 - x2),
          y1 + getDiffToApply(y1 - y2),
        ]);
        incrementCoords(coordPairKey, coordMap);
        index++;
      }
    }
    return coordMap;
  }, {});

  return Object.values(coordOverlaps).filter((value) => value > 1).length;
};

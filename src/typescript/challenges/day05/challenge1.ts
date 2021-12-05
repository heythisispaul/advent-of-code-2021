type CoordMap = Record<string, number>;

export default (input: string) => {
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
      const currentCoordCount = map[coordPairKey] || 0;
      map[coordPairKey] = currentCoordCount + 1;
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
    return coordMap;
  }, {});

  return Object.values(coordOverlaps).filter((value) => value > 1).length;
};

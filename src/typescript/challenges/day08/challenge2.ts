interface SegmentMap {
  rightSide: string[];
  topLeft: string;
  middle: string;
}

const getMiddleAndTopLeftSegments = (one: string, four: string, segmentInputs: string[]) => {
  const sixLengths = segmentInputs.filter((segments) => segments.trim().length === 6).join('');
  const missingFromASixLength = new Set<string>();
  sixLengths.split('').forEach((segment) => {
    const isOnlyPresentTwice = (sixLengths.split(segment).length - 1) < 3;
    if (isOnlyPresentTwice) {
      missingFromASixLength.add(segment);
    }
  });
  const missingArray = Array.from(missingFromASixLength);
  const middle = missingArray.find((segment) => !one.includes(segment) && four.includes(segment)) as string;
  const topLeft = four.split('').find((segment) => segment !== middle && !one.includes(segment)) as string;

  return { middle, topLeft };
};

const getResultNumeral = ({ rightSide, middle, topLeft }: SegmentMap) => (segmentString: string) => {
  const segmentArrSplit = segmentString.trim().split('');
  const hasFullRightSide = rightSide.every((segment) => segmentArrSplit.includes(segment));

  switch (segmentArrSplit.length) {
    case 2:
      return '1';
    case 3:
      return '7';
    case 4:
      return '4';
    case 5:
      if (hasFullRightSide) {
        return '3';
      }
      return segmentArrSplit.includes(topLeft) ? '5' : '2';
    case 6:
      if (hasFullRightSide) {
        return '9';
      }
      return segmentArrSplit.includes(middle) ? '6' : '0';
    default:
      return '8';
  }
};

const buildNumeralReducer = (segmentInputsString: string) => {
  const segmentInputs = segmentInputsString.trim().split(' ');
  const { 2: oneNumeral, 4: fourNumeral } = segmentInputs.reduce((numeralMap: Record<string, string>, segment) => {
    const trimmedSegment = segment.trim();
    numeralMap[trimmedSegment.length.toString()] = trimmedSegment;
    return numeralMap;
  }, {});

  return getResultNumeral({
    rightSide: oneNumeral.trim().split(''),
    ...getMiddleAndTopLeftSegments(oneNumeral, fourNumeral, segmentInputs),
  });
};


export default (input: string) => input.split('\n').reduce((total, numStringArr) => {
  const [segmentInputs, segmentResults] = numStringArr.split(' | ');
  const segmentReducer = buildNumeralReducer(segmentInputs);
  const resultNumString = segmentResults.split(' ').map(segmentReducer).join('');
  return total + parseFloat(resultNumString);
}, 0);

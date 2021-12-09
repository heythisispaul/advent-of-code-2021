interface SegmentMap {
  rightSide: string[];
  topLeft: string;
  middle: string;
}

interface KnownNumeralMap {
  oneNumeral: string;
  fourNumeral: string;
  eightNumeral: string;
}

const test = `be cfbegad cbdgef fgaecd cgeb fdcge agebfd fecdb fabcd edb | fdgacbe cefdb cefbgd gcbe
edbfga begcd cbg gc gcadebf fbgde acbgfd abcde gfcbed gfec | fcgedb cgb dgebacf gc
fgaebd cg bdaec gdafb agbcfd gdcbef bgcad gfac gcb cdgabef | cg cg fdcagb cbg
fbegcd cbd adcefb dageb afcb bc aefdc ecdab fgdeca fcdbega | efabcd cedba gadfec cb
aecbfdg fbg gf bafeg dbefa fcge gcbea fcaegb dgceab fcbdga | gecf egdcabf bgf bfgea
fgeab ca afcebg bdacfeg cfaedg gcfdb baec bfadeg bafgc acf | gebdcfa ecba ca fadegcb
dbcfg fgd bdegcaf fgec aegbdf ecdfab fbedc dacgb gdcebf gf | cefg dcbef fcge gbcadfe
bdfegc cbegaf gecbf dfcage bdacg ed bedf ced adcbefg gebcd | ed bcgafe cdgba cbgef
egadfb cdbfeg cegd fecab cgb gbdefca cg fgcdab egfdb bfceg | gbdfcae bgc cg cgb
gcafb gcf dcaebfg ecagb gf abcdeg gaef cafbge fdbac fegbdc | fgae cfgab fg bagce`;

const includesSubSegments = (smaller: string[], larger: string[]) => (
  smaller.every((segment) => larger.includes(segment))
);

const getMiddleSegment = (one: string, four: string, segmentInputs: string[]) => {
  const fourSplit = four.split('');
  const sixLengths = segmentInputs.filter((segments) => segments.length === 6);
  const numeralNine = sixLengths.find((segmentString) => {
    const splitSegment = segmentString.split('');
    return includesSubSegments(one.split(''), splitSegment) && includesSubSegments(fourSplit, splitSegment)
  });
  const middle = sixLengths.find(());
};

const buildSegmentMap = (segmentInputs: string[]) => {
  const segmentMap = {};
  const { oneNumeral, fourNumeral, eightNumeral } = segmentInputs.reduce((numeralMap, segment) => {
    const mapper: Record<string, keyof KnownNumeralMap> = { 2: 'oneNumeral', 4: 'fourNumeral', 7: 'eightNumeral' };
    const trimmedSegment = segment.trim();
    numeralMap[mapper[trimmedSegment.length.toString()]] = trimmedSegment;
    return numeralMap;
  }, {} as KnownNumeralMap);
}

export default (input: string) => {
  const outputNumbersStrings = test.split('\n');

  const total = outputNumbersStrings.reduce((total, numStringArr) => {
    const rightSide: string[] = [];
    const segmentMap: Record<string, string> = {};
    const segmentInputs = numStringArr.split(' | ')[0].split(' ');
    const knownBySegementNum = getKnownBySegmentLength(segmentInputs);
  }, 0);

  console.log(total);
  
  return outputNumbersStrings;
};

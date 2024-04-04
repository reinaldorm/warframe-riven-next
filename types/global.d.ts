interface ApiData {
  [collection: string]: RivenCollection;
}

interface RivenCollection {
  [compatibility: string]: RivenData;
}

interface RivenData {
  rerolled?: RivenStatistics;
  unrolled?: RivenStatistics;
}

interface RivenStatistics {
  itemType: string;
  compatibility: string;
  rerolled: boolean;
  avg: number;
  stddev: number;
  min: number;
  max: number;
  pop: number;
  median: number;
}

interface RivenDocument {
  [weaponName: string]: RivenHistory;
}

interface RivenHistory {
  name: string;
  date: Date;
  pop: number;
  max: number;
  hPop: number;
  lPop: number;
}

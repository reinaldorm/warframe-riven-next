// api types

interface RivenResponse {
  [weaponName: string]: Riven;
}

interface Riven {
  rerolled?: RivenStatus;
  unrolled?: RivenStatus;
}

interface RivenStatus {
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

// code types

interface QueryError {
  status: boolean;
  htmlDesc: string;
  level: ErrorLevel;
}

interface DataResponse<T> {
  ok: boolean;
  data: T | null;
}

// firebase types

interface RivenCollection {
  [rivenModType: string]: {
    [weaponName: string]: Riven;
  };
}

type RivenCollectionArray = Array<RivenType>;

interface RivenType {
  [weaponName: string]: Riven;
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

// support types

type ErrorLevel = 0 | 1 | 2;

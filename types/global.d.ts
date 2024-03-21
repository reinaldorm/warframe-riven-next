interface RivenResponse {
  [weaponName: string]: {
    rerolled?: RivenMod;
    unrolled?: RivenMod;
  };
}

interface RivenInfo {
  rerolled?: RivenMod;
  unrolled?: RivenMod;
}

interface RivenMod {
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

type ErrorLevel = 0 | 1 | 2;

type Suggestion = string;

interface QueryError {
  status: boolean;
  htmlDesc: string;
  level: ErrorLevel;
}

interface SuggestionResponse {
  name?: string;
}

interface Suggestions {
  query: string;
  suggestions: Suggestion[];
}

import { getDoc } from "firebase/firestore";
import { historyDocRef } from "@/firebase/config";

function parseRivenData({ rerolled, unrolled }: RivenData): RivenHistory {
  let max = 0;
  let pop = 0;
  let name = "N/A";

  if (rerolled && unrolled) {
    max = Math.max(rerolled.max, unrolled.max);
    pop = rerolled.pop + unrolled.pop;
    name = parseRivenName(unrolled.compatibility);
  } else if (rerolled) {
    max = rerolled.max;
    pop = rerolled.pop;
    name = parseRivenName(rerolled.compatibility);
  } else if (unrolled) {
    max = unrolled.max;
    pop = unrolled.pop;
    name = parseRivenName(unrolled.compatibility);
  }

  return {
    name,
    date: new Date(),
    pop,
    max,
    hPop: pop,
    lPop: pop,
  };
}

function parseRivenName(name: string) {
  return name.split(" ").join("-").toLowerCase();
}

export async function getAllRivenDataFromApi() {
  const response = await fetch("https://api.warframestat.us/pc/rivens/");

  if (!response.ok) {
    return null;
  } else {
    const apiData = (await response.json()) as ApiData;

    return Object.values(apiData);
  }
}

export async function getRivenDataFromApi(
  query: string
): Promise<RivenData | null> {
  const response = await fetch(
    `https://api.warframestat.us/pc/rivens/search/${query}`
  );

  if (!response.ok) {
    return null;
  } else {
    const rivenData = (await response.json()) as RivenCollection;
    return rivenData;
  }
}

export async function getAllRivenHistory() {
  const historySnap = await getDoc<RivenDocument, RivenDocument>(historyDocRef);

  if (!historySnap.exists()) {
    return null;
  } else {
    return historySnap.data();
  }
}

export async function getRivenHistory() {}

export function generateRivenObject(rivenCollections: RivenCollection[]) {
  const rivens: RivenDocument = {};

  rivenCollections.forEach((collection) => {
    const rivenDataArr = Object.values(collection);

    rivenDataArr.forEach((rivenData) => {
      const rivenObject = parseRivenData(rivenData);
      const rivenName = parseRivenName(rivenObject.name);

      rivens[rivenName] = rivenObject;
    });
  });

  return rivens;
}

export function updateRivenHistory(
  newRiven: RivenHistory,
  oldRiven: RivenHistory
): RivenHistory {
  let pop = newRiven.pop;

  let hPop = pop > oldRiven.hPop ? pop : oldRiven.hPop;
  let lPop = pop < oldRiven.lPop ? pop : oldRiven.lPop;
  let max = newRiven.max > oldRiven.max ? newRiven.max : oldRiven.max;

  return {
    name: newRiven.name,
    date: new Date(),
    pop,
    max,
    hPop,
    lPop,
  };
}

export function startsWith(str: string, sub: string) {
  return str.substring(0, sub.length).toLowerCase() === sub.toLowerCase();
}

import { getDoc } from "firebase/firestore";
import { historyDocRef } from "@/firebase/config";

export function generateSucessfulResponse(description: string) {
  return {
    ok: true,
    description,
  };
}

export function generateErrorResponse(error: string, description: string) {
  return {
    ok: false,
    error,
    description,
  };
}

export function generateRivenObject(rivenCollection: RivenCollectionArray) {
  const rivens: RivenDocument = {};

  rivenCollection.forEach((rivenType) => {
    const rivensRaw = Object.values(rivenType);

    for (let riven of rivensRaw) {
      const rivenObject = parseRivenData(riven);
      const rivenName = parseRivenName(rivenObject.name);

      rivens[rivenName] = rivenObject;
    }
  });

  return rivens;
}

export function parseRivenData({ rerolled, unrolled }: Riven): RivenHistory {
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

export function parseRivenName(name: string) {
  return name.split(" ").join("-").toLowerCase();
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

export async function getAllRivenDataFromApi(): Promise<
  DataResponse<RivenCollectionArray>
> {
  const response = await fetch("https://api.warframestat.us/pc/rivens/");

  if (!response.ok) {
    return {
      ok: false,
      data: null,
    };
  } else {
    const rivenCollection = (await response.json()) as RivenCollection;
    return {
      ok: true,
      data: Object.values(rivenCollection),
    };
  }
}

export async function getRivenDataFromApi(
  query: string
): Promise<DataResponse<Riven>> {
  const response = await fetch(
    `https://api.warframestat.us/pc/rivens/search/${query}`
  );

  if (!response.ok) {
    return {
      ok: false,
      data: null,
    };
  } else {
    const rivenData = (await response.json()) as RivenCollection;
    return {
      ok: true,
      data: rivenData,
    };
  }
}

export async function getAllRivenHistory(): Promise<
  DataResponse<RivenDocument>
> {
  const historySnap = await getDoc<RivenDocument, RivenDocument>(historyDocRef);

  if (!historySnap.exists()) {
    return {
      ok: false,
      data: null,
    };
  } else {
    return {
      ok: true,
      data: historySnap.data(),
    };
  }
}

export async function getRivenHistory() {}

export function startsWith(str: string, sub: string) {
  return str.substring(0, sub.length).toLowerCase() === sub.toLowerCase();
}

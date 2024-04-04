import { setDoc } from "firebase/firestore";
import { historyDocRef } from "@/firebase/config";
import {
  getAllRivenHistory,
  getAllRivenDataFromApi,
  updateRivenHistory,
  generateRivenObject,
} from "@/utils";

export async function POST() {
  const apiData = await getAllRivenDataFromApi();
  const rivenHistory = await getAllRivenHistory();

  if (!apiData || !rivenHistory) {
    return Response.json(
      { message: "Bad Request", detail: "Could not fetch api data." },
      { status: 404 }
    );
  }

  const rivens: RivenDocument = generateRivenObject(apiData);
  const newRivenDoc: RivenDocument = {};

  for (let riven in rivens) {
    const oldRivenData = rivenHistory[riven];
    const newRivenData = rivens[riven];

    if (oldRivenData) {
      const newRivenHistory = updateRivenHistory(newRivenData, oldRivenData);
      newRivenDoc[newRivenHistory.name] = newRivenHistory;
    } else {
      newRivenDoc[newRivenData.name] = newRivenData;
    }
  }

  setDoc(historyDocRef, newRivenDoc);

  return Response.json(
    { message: "Successfully updated riven data" },
    { status: 202 }
  );
}

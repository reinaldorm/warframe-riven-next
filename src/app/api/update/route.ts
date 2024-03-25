import { setDoc } from "firebase/firestore";
import { historyDocRef } from "@/firebase/config";
import {
  generateErrorResponse,
  generateSucessfulResponse,
  getAllRivenHistory,
  getAllRivenDataFromApi,
  updateRivenHistory,
  generateRivenObject,
} from "@/utils";

export async function POST() {
  const apiData = await getAllRivenDataFromApi();
  const rivenHistory = await getAllRivenHistory();

  if (!apiData.ok || !apiData.data || !rivenHistory.ok || !rivenHistory.data) {
    return Response.json(
      generateErrorResponse("Bad Request", "Could not fetch api data."),
      { status: 404 }
    );
  }

  const rivens: RivenDocument = generateRivenObject(apiData.data);
  const newRivenDoc: RivenDocument = {};

  for (let riven in rivens) {
    const oldRivenData = rivenHistory.data[riven];
    const newRivenData = rivens[riven];

    if (rivenHistory.data[riven]) {
      const newRivenHistory = updateRivenHistory(newRivenData, oldRivenData);
      newRivenDoc[newRivenHistory.name] = newRivenHistory;
    } else {
      newRivenDoc[newRivenData.name] = newRivenData;
    }
  }

  setDoc(historyDocRef, newRivenDoc);

  return Response.json(
    generateSucessfulResponse("Successfully updated riven data"),
    { status: 202 }
  );
}

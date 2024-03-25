import { setDoc } from "firebase/firestore";
import { historyDocRef } from "@/firebase/config";
import {
  generateErrorResponse,
  generateSucessfulResponse,
  generateRivenObject,
  getAllRivenDataFromApi,
} from "@/utils";

export async function GET() {
  return Response.json({ ok: true }, { status: 200 });
}

export async function POST() {
  const apiData = await getAllRivenDataFromApi();

  if (!apiData.ok || !apiData.data) {
    return Response.json(
      generateErrorResponse("Bad Request", "Could not fetch riven data."),
      { status: 404 }
    );
  }

  const rivens = generateRivenObject(apiData.data);

  setDoc(historyDocRef, rivens);

  return Response.json(
    generateSucessfulResponse("Successfully updated riven data"),
    { status: 202 }
  );
}

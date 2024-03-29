import { setDoc, getDoc } from "firebase/firestore";
import { historyDocRef } from "@/firebase/config";
import {
  generateErrorResponse,
  generateSucessfulResponse,
  generateRivenObject,
  getAllRivenDataFromApi,
} from "@/utils";

export async function GET() {
  const snapshot = await getDoc<RivenDocument, RivenDocument>(historyDocRef);

  if (snapshot.exists()) {
    return Response.json(
      {
        ok: true,
        description: "Successfully retrived data",
        data: snapshot.data(),
      },
      { status: 200 }
    );
  } else {
    return Response.json(
      { ok: false, description: "Could not retrive data", data: null },
      { status: 404 }
    );
  }
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

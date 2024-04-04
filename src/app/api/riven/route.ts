import { setDoc, getDoc } from "firebase/firestore";
import { historyDocRef } from "@/firebase/config";
import { generateRivenObject, getAllRivenDataFromApi } from "@/utils";

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

  if (!apiData) {
    return Response.json(
      { message: "Bad Request", detail: "Could not fetch riven data." },
      { status: 404 }
    );
  }

  const rivens = generateRivenObject(apiData);
  setDoc(historyDocRef, rivens);

  return Response.json(
    { message: "Successfully overwrited riven data" },
    { status: 202 }
  );
}

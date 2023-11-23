import config from "@/config";
const headers = {
  Accept: "application/json",
  "Content-Type": "application/json",
};
export async function validateStudentDocument(
  stepId: number,
  observaciones: string,
) {
  try {
    const response = await fetch(`${config.BACK_URL}/documents/validate`, {
      method: "POST",
      headers,
      body: JSON.stringify({ stepId, observaciones }),
    });

    if (!response.ok) {
      throw new Error("Error validando el documento");
    }

    return response.json();
  } catch (error) {
    throw error;
  }
}

export async function rejectStudentDocument(
  stepId: number,
  observaciones: string,
) {
  try {
    const response = await fetch(`${config.BACK_URL}/documents/reject`, {
      method: "POST",
      headers,
      body: JSON.stringify({ stepId, observaciones }),
    });

    if (!response.ok) {
      throw new Error("Error rechazando el documento");
    }

    return response.json();
  } catch (error) {
    throw error;
  }
}

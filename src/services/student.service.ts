import config from "@/config";

const URL_APIS = config.BACK_URL;

export async function getStudents() {
  try {
    const response = await fetch(URL_APIS + "/student", {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Error al obtener la lista de estudiantes");
    }

    const students = await response.json();
    return students;
  } catch (error) {
    console.error("Error en StudentService.getStudents:", error);
    throw error;
  }
}
export async function addStudent() {
  return "function not implemented";
}
export async function getStudentPreviewState(userId: number): Promise<any> {
  const response = await fetch(
    `${URL_APIS}/student/introduccion_visto/${userId}`,
    {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    },
  );

  return response.json();
}
export async function updateStudentPreviewState(userId: number) {
  const response = await fetch(
    `${URL_APIS}/student/update-view-intro/${userId}`,
    {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ introduccion_visto: true }),
    },
  );
  return response.json();
}

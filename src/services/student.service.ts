import { config } from "@/config";

const URL_APIS = config.BACK_URL;

export const StudentService = {
  // Función para obtener la lista de estudiantes
  async getStudents() {
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
  },
  async addStudent() {
    return "function not implemented";
  },
};

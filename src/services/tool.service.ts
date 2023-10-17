import config from "../config";
import { CreateToolBody } from "./interfaces/tool";
const URL_APIS = config.BACK_URL;

export const ToolService = {
  async getTools() {
    try {
      const response = await fetch(URL_APIS + "/tool", {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Error al obtener la lista de estudiantes");
      }

      const tools = await response.json();
      return tools;
    } catch (error) {
      console.error("Error en ToolService.getTools:", error);
      throw error;
    }
  },

  async createTool(toolData: CreateToolBody) {
    try {
      const response = await fetch(URL_APIS + "/tool/create", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(toolData), // Envía los datos del instrumento a crear
      });

      if (!response.ok) {
        throw new Error("Error al crear el instrumento de evaluación");
      }

      const newTool = await response.json();
      return newTool;
    } catch (error) {
      console.error("Error en ToolService.createTool:", error);
      throw error;
    }
  },
};

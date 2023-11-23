import config from "@/config";

const URL_APIS = config.BACK_URL;

export const ProcessService = {
  async getAllProcesses() {
    try {
      const response = await fetch(URL_APIS + "/process", {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Error al obtener la lista de procesos");
      }

      return response.json();
    } catch (error) {
      throw error;
    }
  },
};

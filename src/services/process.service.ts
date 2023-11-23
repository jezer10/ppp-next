import { config } from "@/config";

const URL_APIS = config.BACK_URL;

export const ProcessService = {
    async getAllProcesses () {
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
        
              const students = await response.json();
              return students;
        }catch(error){
            console.error("Error en ProcessService.getAllProcesses:", error);
            throw error;
        }
    },

    async getProcessAssesment(id:number){
      try {
        const response = await fetch(URL_APIS + "/process/assesment/"+id, {
            method: "GET",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
            },
          });
    
          if (!response.ok) {
            throw new Error("Error al obtener la lista de procesos");
          }
    
          const students = await response.json();
          return students;
      }catch(error){
          console.error("Error en ProcessService.getProcessAssesment:", error);
          throw error;
      }
    }
}
import config from "@/config";

const URL_APIS = config.BACK_URL;
export const getAllSupervisorService = async () => {
  const response = await fetch(`${URL_APIS}/supervisor/`);
  const data = await response.json();
  return data;
};

export const getStudentsForAssignService = async (supervisor_id: number) => {
  const response = await fetch(`${URL_APIS}/supervisor/${supervisor_id}`);
  const data = await response.json();
  return data;
};

export const changeStateStudentService = async (
  supervisor_id: any,
  student_id: number,
) => {
  const response = await fetch(`${URL_APIS}/supervisor/${student_id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ supervisor_id, student_id }),
  });
  const data = await response.json();
  return data;
};

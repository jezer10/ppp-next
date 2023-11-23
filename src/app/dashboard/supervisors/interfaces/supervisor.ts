export interface ISupervisor {
  teacher_id: number;
  person_id: number;
  code: string;
  name: string;
  surname: string;
  phone: string;
  dni: string;
  email: string;
  address: string;
  department: string;
  district: string;
  province: string;
  status: string;
  per_created_at: Date;
  supervisor_id: number;
  students_assigned : []
}

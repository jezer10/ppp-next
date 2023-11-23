interface IProcess {
  process_id: number;
  supervisor_id: number;
  student_id: number;
  company_id: number;
  type: string;
  state: string;
  Estudiante: IStudent;
  Supervisor: ISupervisor;
  Etapa: IEtapa[];
  /* functionality purposes */
  show: boolean;
}

interface IStudent {
  Cycle: ICycle;
  Persona: IPersona;
  School: ISchool;
  code: string;
  state: string;
}

interface ICycle {
  cycle: string;
}

interface ISchool {
  name: string;
}

interface IPersona {
  name: string;
  surname: string;
  email: string | null;
  dni: string;
  phone: string;
}

interface IEtapa {
  step_id: number;
  type_id: number;
  filename: string;
  path: string;
  state: string;
  observaciones: string;
  Tipo: IEtapaTipo;
}

interface IEtapaTipo {
  name: string;
}

interface IDocente {
  Persona: IPersona;
}

interface ISupervisor {
  Docente: IDocente;
}

interface IApiResponse<T> {
  info: T;
  status: number;
  message: string;
}

export type { IApiResponse, IProcess, IEtapa };

interface IPersona {
  name: string;
  surname: string;
  email: string | null;
  dni: string;
  phone:string;
}

interface ICycle {
  cycle: string;
}

interface IDocente {
  Persona: IPersona;
}

interface ISupervisor {
  Docente: IDocente;
}

interface ISchool {
  name: string;
}

interface IEtapa {
    filename:string;
    path:string;
    state:string;
    Tipo:IEtapaTipo;
}

interface IEtapaTipo {
    name:string;
}

interface IApiResponse<T> {
  info: T;
  status: number;
  message: string;
}

interface IProceso {
  process_id: number;
  company_id: number;
  state: string;
  student_id: number;
  supervisor_id: number;
  type: string;
  Supervisor: ISupervisor;
  Etapa: IEtapa[];
}

interface IStudent {
  student_id: number;
  person_id: number;
  school_id: number;
  cycle_id: number;
  code: string;
  state: string;
  Cycle: ICycle;
  Persona: IPersona;
  School: ISchool;
  Proceso: IProceso[];
  show:boolean
}

// export type { IApiResponse, IStudent, IEtapa};
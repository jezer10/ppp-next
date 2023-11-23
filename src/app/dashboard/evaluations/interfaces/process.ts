interface IProcess {
    process_id:number;
    supervisor_id:number;
    student_id:number;
    company_id:number;
    type:string;
    state:string;
    Estudiante: IStudent;
    Supervisor:ISupervisor;
    Evaluacion:IAssesment[];
    /* functionality purposes */
    show:boolean

}

interface IAssesment {
    assesment_id:number;
    assesment_tool_id:number;
    start_date:string;
    end_date:string;
    is_virtual:boolean;
    type:number;
    status:number;
}

interface IStudent {
    Cycle: ICycle;
    Persona: IPersona;
    School: ISchool;
    code:string;
    state:string;
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
    phone:string;
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

export type { IApiResponse, IProcess, IAssesment};
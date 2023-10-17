export interface IModalProps {
    fullName: string | null;
    codeStudent: string| null;
    school: string| null;
    cycle: string| null;
    DNI: string| null;
    phone: string| null;
    email: string| null;
    practicesMode: string| null;
}

export interface IManageDocument {
    studentName:string | null;
    documentName:string | null;
    onClose?: () => void;
}
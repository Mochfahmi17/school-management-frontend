export interface Subject {
  id: string;
  name: string;
  code: string;
  createdAt: Date;
  updatedAt: Date;
}
export interface DataTeacher {
  id: string;
  userId: string;
  nip: string;
  phone: string;
  subjectId: string;
  createdAt: Date;
  updatedAt: Date;
  subjects: Subject;
}

export interface UserTeacher {
  id: string;
  name: string;
  email: string;
  password: string;
  role: string;
  teacher?: DataTeacher;
  createdAt: Date;
  updatedAt: Date;
}

export interface UserTeacherResponse {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
  data: UserTeacher[];
  message?: string;
}

export interface SingleUserTeacherResponse {
  teacher: UserTeacher;
  message?: string;
}

export interface SubjectResponse {
  data: Subject[];
  message?: string;
}

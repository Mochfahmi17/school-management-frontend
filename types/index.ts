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
  user: { name: string; email: string; role: string };
  subjects: { name: string };
}

export interface User {
  id: string;
  name: string;
  email: string;
  password: string;
  role: string;
  teacher?: DataTeacher;
  createdAt: Date;
  updatedAt: Date;
}

export interface TeacherResponse {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
  data: DataTeacher[];
  message?: string;
}

export interface SingleUserTeacherResponse {
  teacher: DataTeacher;
  message?: string;
}

export interface SubjectResponse {
  data: Subject[];
  message?: string;
}

import { API_ENDPOINTS } from "@/constants/api-endpoints";
import axiosClient from "@/lib/axios";
import { APIResponse, PaginatedResponse } from "@/types/api";
import { StudentListParams } from "@/types/api/student";
import { StudentRequest, StudentResponse } from "@/types/models/student";

export const listStudents = async (params: StudentListParams) => {
  const res = await axiosClient.get<PaginatedResponse<StudentResponse>>(
    API_ENDPOINTS.STUDENT.BASE,
    { params }
  );

  return res.data;
};

export const getStudentById = async (id: string) => {
  const res = await axiosClient.get<APIResponse<StudentResponse>>(
    API_ENDPOINTS.STUDENT.BY_ID(id)
  );

  return res.data;
};

export const addStudent = async (data: StudentRequest) => {
  const res = await axiosClient.post(API_ENDPOINTS.STUDENT.BASE, data);

  return res.data;
};

export const updateStudent = async (id: string, data: StudentRequest) => {
  const res = await axiosClient.put(API_ENDPOINTS.STUDENT.BY_ID(id), data);

  return res.data;
};

export const deleteStudent = async (id: string) => {
  const res = await axiosClient.delete(API_ENDPOINTS.STUDENT.BY_ID(id));

  return res.data;
};

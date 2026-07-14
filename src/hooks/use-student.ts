import { useQuery, useMutation, useInfiniteQuery, useQueryClient } from "@tanstack/react-query"
import { listStudents, getStudentById, addStudent, updateStudent, deleteStudent } from "@/services/student-service"
import type { StudentListParams } from "@/types/api/student"
import type { StudentRequest } from "@/types/models/student"
import { toast } from "sonner"

const useStudent = () => {
  const qc = useQueryClient()

  const useStudentList = (params: Omit<StudentListParams, "page">) =>
    useInfiniteQuery({
      queryKey: ["students", params],
      queryFn: ({ pageParam }) => listStudents({ ...params, page: pageParam }),
      initialPageParam: 1,
      getNextPageParam: (lastPage) =>
        lastPage.page < lastPage.totalPages ? lastPage.page + 1 : undefined,
    })

  const useStudentDetail = (id?: string) =>
    useQuery({
      queryKey: ["student", id ?? "none"],
      queryFn: () => getStudentById(id!),
      enabled: !!id,
    })

  const useCreateStudent = () =>
    useMutation({
      mutationFn: (data: StudentRequest) => addStudent(data),
      onSuccess: () => {
        qc.invalidateQueries({ queryKey: ["students"] })
        toast.success("Student created")
      },
      onError: () => toast.error("Failed to create student"),
    })

  const useUpdateStudent = () =>
    useMutation({
      mutationFn: ({ id, data }: { id: string; data: StudentRequest }) => updateStudent(id, data),
      onSuccess: () => {
        qc.invalidateQueries({ queryKey: ["students"] })
        toast.success("Student updated")
      },
      onError: () => toast.error("Failed to update student"),
    })

  const useDeleteStudent = () =>
    useMutation({
      mutationFn: (id: string) => deleteStudent(id),
      onSuccess: () => {
        qc.invalidateQueries({ queryKey: ["students"] })
        toast.success("Student deleted")
      },
      onError: () => toast.error("Failed to delete student"),
    })

  return { useStudentList, useStudentDetail, useCreateStudent, useUpdateStudent, useDeleteStudent }
}

export default useStudent

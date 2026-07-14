import { useQuery, useMutation, useInfiniteQuery, useQueryClient } from "@tanstack/react-query"
import { listParents, getParentById, addParent, updateParent, deleteParent } from "@/services/parent-service"
import type { ParentListParams } from "@/types/api/parent"
import type { ParentUserRequest } from "@/types/models/parent"
import { toast } from "sonner"

const useParent = () => {
  const qc = useQueryClient()

  const useParentList = (params: Omit<ParentListParams, "page">) =>
    useInfiniteQuery({
      queryKey: ["parents", params],
      queryFn: ({ pageParam }) => listParents({ ...params, page: pageParam }),
      initialPageParam: 1,
      getNextPageParam: (lastPage) =>
        lastPage.page < lastPage.totalPages ? lastPage.page + 1 : undefined,
    })

  const useParentDetail = (id?: string) =>
    useQuery({
      queryKey: ["parent", id ?? "none"],
      queryFn: () => getParentById(id!),
      enabled: !!id,
    })

  const useCreateParent = () =>
    useMutation({
      mutationFn: (data: ParentUserRequest) => addParent(data),
      onSuccess: () => {
        qc.invalidateQueries({ queryKey: ["parents"] })
        toast.success("Parent created")
      },
      onError: () => toast.error("Failed to create parent"),
    })

  const useUpdateParent = () =>
    useMutation({
      mutationFn: ({ id, data }: { id: string; data: ParentUserRequest }) => updateParent(id, data),
      onSuccess: () => {
        qc.invalidateQueries({ queryKey: ["parents"] })
        toast.success("Parent updated")
      },
      onError: () => toast.error("Failed to update parent"),
    })

  const useDeleteParent = () =>
    useMutation({
      mutationFn: (id: string) => deleteParent(id),
      onSuccess: () => {
        qc.invalidateQueries({ queryKey: ["parents"] })
        toast.success("Parent deleted")
      },
      onError: () => toast.error("Failed to delete parent"),
    })

  return { useParentList, useParentDetail, useCreateParent, useUpdateParent, useDeleteParent }
}

export default useParent

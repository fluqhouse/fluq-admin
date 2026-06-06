import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getAllUsers,
  updateUserStatus,
  deleteUser,
} from "../../services/api/userManagement";
import toast from "react-hot-toast";

const QUERY_KEYS = {
  USERS: "users",
};

export const useUsers = (filters, options = {}) => {
  return useQuery({
    queryKey: [QUERY_KEYS.USERS, filters],
    queryFn: () => getAllUsers(filters),
    ...options,
  });
};

export const useUpdateUserStatus = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ userId, updates }) => updateUserStatus(userId, updates),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.USERS],
      });
      toast.success("User updated successfully");
    },
    onError: (error) => {
      const message =
        error.error?.message ||
        error.message ||
        "Failed to update user";
      toast.error(message, { duration: 5000 });
    },
  });
};

export const useDeleteUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteUser,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.USERS],
      });
      toast.success("User deleted successfully");
    },
    onError: (error) => {
      const message =
        error.error?.message ||
        error.message ||
        "Failed to delete user";
      toast.error(message, { duration: 5000 });
    },
  });
};

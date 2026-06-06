import { useMutation } from "@tanstack/react-query";
import { createAdminApi } from "../../services/api/auth";
import toast from "react-hot-toast";

export const useCreateAdmin = () => {
  return useMutation({
    mutationFn: createAdminApi,
    onSuccess: (data, variables) => {
      toast.success(`Admin "${variables.email}" created successfully!`);
      return data;
    },
    onError: (error) => {
      const message =
        error.error?.message ||
        error.message ||
        "Failed to create admin";
      toast.error(message, { duration: 5000 });
    },
  });
};

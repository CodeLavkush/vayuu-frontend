import { toast } from "sonner";

export const SuccessToast = (message) => {
  toast.success(message, {
    icon: null,
    style: {
      background: "#1f1f2e",
      color: "#c084fc",
      border: "1px solid #6b21a8",
      borderRadius: "12px",
      fontWeight: "500",
    },
  });
};

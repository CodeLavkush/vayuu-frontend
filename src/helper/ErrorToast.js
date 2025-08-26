import { toast } from "sonner";

export const ErrorToast = (message) => {
  toast.error(message, {
    icon: null,
    style: {
      background: "#1f1f2e",
      color: "#f87171",
      border: "1px solid #991b1b",
      borderRadius: "12px",
      fontWeight: "500",
    },
  });
};

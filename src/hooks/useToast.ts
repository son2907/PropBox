import { useState } from "react";

export default function useToast() {
  const [openToast, setOpen] = useState(false);

  const toastOpen = () => {
    setOpen(true);
  };

  const toastClose = () => {
    setOpen(false);
  };

  return {
    openToast,
    toastOpen,
    toastClose,
  };
}

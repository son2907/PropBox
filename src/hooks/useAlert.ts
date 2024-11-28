import { useState } from "react";

export default function useAlert() {
  const [openAlert, setOpen] = useState<boolean>(false);

  const onOpenAlert = () => {
    setOpen(true);
  };
  const onCloseAlert = () => {
    setOpen(false);
  };

  return { openAlert, onOpenAlert, onCloseAlert };
}

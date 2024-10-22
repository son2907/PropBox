import { useState } from "react";

interface useToggleButttonProps {
  defaultValue: boolean;
}
export default function useToggleButtton({
  defaultValue,
}: useToggleButttonProps) {
  const [toggle, setToggle] = useState(defaultValue);

  const onChange = (event: React.ChangeEvent<unknown>) => {
    setToggle(!toggle);
  };

  return { toggle, onChange };
}

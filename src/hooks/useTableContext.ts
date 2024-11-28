import { useContext } from "react";
import { TableContext } from "../components/Table/context/TableProvider";

// Context 값 사용하기 위한 커스텀 훅
const useTableContext = () => {
  const context = useContext(TableContext);
  if (!context) {
    throw new Error("useTableContext must be used within a TableProvider");
  }
  return context;
};

export default useTableContext;

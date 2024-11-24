import React, { createContext } from "react";

// Context 타입 정의
interface TableContextProps {
  selectedRows: Set<string>;
  toggleRowSelection: (id: string) => void;
}

// Context 생성
export const TableContext = createContext<TableContextProps | undefined>(
  undefined
);

// Provider 컴포넌트
interface TableProviderProps {
  selectedRows: Set<string>;
  toggleRowSelection: (id: string) => void;
  children: React.ReactNode;
}

const TableProvider: React.FC<TableProviderProps> = ({
  selectedRows,
  toggleRowSelection,
  children,
}) => {
  return (
    <TableContext.Provider value={{ selectedRows, toggleRowSelection }}>
      {children}
    </TableContext.Provider>
  );
};

export default TableProvider;

import React, { createContext } from "react";

// Context 타입 정의
interface TableContextProps {
  selectedRows: Set<string>;
  toggleRowsSelection: (id: string) => void;
  [key: string]: any; // 나머지 props를 허용
}

// Context 생성
export const TableContext = createContext<TableContextProps | undefined>(
  undefined
);

// Provider 컴포넌트
interface TableProviderProps {
  selectedRows: Set<string>;
  toggleRowsSelection: (id: string) => void;
  children: React.ReactNode;
  [key: string]: any; // 나머지 props를 허용
}

const TableProvider: React.FC<TableProviderProps> = ({
  selectedRows,
  toggleRowsSelection,
  children,
  ...rest
}) => {
  return (
    <TableContext.Provider
      value={{ selectedRows, toggleRowsSelection, ...rest }}
    >
      {children}
    </TableContext.Provider>
  );
};

export default TableProvider;

import React, { ReactNode } from "react";

interface TableProps {
  children: ReactNode;
}

interface TableItemProps {
  children: ReactNode;
  [property: string]: any; // ...rest를 받기 위함
}
const Th: React.FC<TableItemProps> = ({ children }) => {
  return (
    <th className="border-solid bg-gray-200 border border-gray-300 border-b-0 border-t-0 last:border-0 text-left py-3 px-3 whitespace-nowrap sticky top-0 z-10">
      {children}
    </th>
  );
};

const Td: React.FC<TableItemProps> = ({ children, ...rest }) => {
  return (
    <td className="py-1 px-1" {...rest}>
      {children}
    </td>
  );
};

const Tr: React.FC<
  TableItemProps & { isClicked?: boolean; onClick?: (e?) => void }
> = ({ children, isClicked, onClick, ...rest }) => {
  return (
    <tr
      onClick={onClick}
      style={{
        backgroundColor: isClicked ? "#F1F1F1" : "white",
        border: isClicked ? "2px solid #6AA5FE" : "none",
        borderRadius: "8px",
      }}
      {...rest}
    >
      {children}
    </tr>
  );
};

const Tbody: React.FC<{ children: ReactNode }> = ({ children, ...rest }) => {
  return <tbody {...rest}>{children}</tbody>;
};

const HardcodingBasicTable: React.FC<TableProps> & {
  Th: typeof Th;
  Tr: typeof Tr;
  Td: typeof Td;
  Tbody: typeof Tbody;
} = ({ children }) => {
  return (
    <>
      <table className="table-auto w-full border-gray-300 border-collapse">
        <thead>
          <tr>
            {React.Children.map(children, (child) => {
              if (
                (child as React.ReactElement<any>).type ===
                HardcodingBasicTable.Th
              ) {
                return child; // Th 컴포넌트를 렌더링
              }
              return null; // 헤더가 아닌 경우 무시
            })}
          </tr>
        </thead>
        {React.Children.map(children, (child) => {
          if (
            (child as React.ReactElement<any>).type ===
            HardcodingBasicTable.Tbody
          ) {
            return child; // Tbody를 그대로 렌더링
          }
          return null; // Tbody가 아닌 경우 무시
        })}
      </table>
    </>
  );
};
HardcodingBasicTable.Th = Th;
HardcodingBasicTable.Tr = Tr;
HardcodingBasicTable.Td = Td;
HardcodingBasicTable.Tbody = Tbody;

export default HardcodingBasicTable;

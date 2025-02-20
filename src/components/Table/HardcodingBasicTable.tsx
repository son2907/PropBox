import React, { ReactNode } from "react";

interface TableProps {
  children: ReactNode;
}

interface TableItemProps {
  children: ReactNode;
  [property: string]: any; // ...rest를 받기 위함
}

const Th: React.FC<TableItemProps & { radius?: boolean }> = ({
  children,
  radius = false,
  ...rest
}) => {
  return (
    <th
      {...rest}
      className={`border-solid bg-tableHeader border border-tableBorder border-t-0 first:border-l-0 last:border-r-0 text-center whitespace-nowrap py-3 sticky top-0 z-10 ${
        radius ? "first:rounded-tl-lg last:rounded-tr-lg" : ""
      }`}
    >
      {children}
    </th>
  );
};

const Td: React.FC<TableItemProps> = ({ children, ...rest }) => {
  return (
    <td
      className="py-3 px-3 border-tableBorder border-solid border border-b-0 border-t-0 first:border-l-0 last:border-r-0  "
      {...rest}
    >
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

import React, { ReactNode } from "react";

interface TableProps {
  data: { [key: string]: any }[] | undefined; // Table data
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

const EmptyTable = () => {
  return (
    <table className="table-auto w-full border-collapse">
      <thead>
        <tr>
          <th className="border-solid flex justify-center bg-gray-200 border border-gray-300 border-b-0 border-t-0 p-2 text-left py-2 px-2 last:border-0">
            조회 데이터가 존재하지 않습니다.
          </th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td className="border-solid flex justify-center border border-b-0 border-t-0 border-gray-300 p-2 text-left py-2 px-2 last:border-0">
            조회 데이터가 존재하지 않습니다.
          </td>
        </tr>
      </tbody>
    </table>
  );
};

const BasicTable: React.FC<TableProps> & {
  Th: typeof Th;
  Tr: typeof Tr;
  Td: typeof Td;
  Tbody: typeof Tbody;
  EmptyTable: typeof EmptyTable;
} = ({ data, children }) => {
  return (
    <>
      {!data || data.length === 0 ? (
        <EmptyTable /> // data가 없을 경우 EmptyTable 렌더링
      ) : (
        <table className="table-auto w-full border-gray-300 border-collapse">
          <thead>
            <tr>
              {React.Children.map(children, (child) => {
                if ((child as React.ReactElement<any>).type === BasicTable.Th) {
                  return child; // Th 컴포넌트를 렌더링
                }
                return null; // 헤더가 아닌 경우 무시
              })}
            </tr>
          </thead>
          {React.Children.map(children, (child) => {
            if ((child as React.ReactElement<any>).type === BasicTable.Tbody) {
              return child; // Tbody를 그대로 렌더링
            }
            return null; // Tbody가 아닌 경우 무시
          })}
        </table>
      )}
    </>
  );
};

BasicTable.EmptyTable = EmptyTable;
BasicTable.Th = Th;
BasicTable.Tr = Tr;
BasicTable.Td = Td;
BasicTable.Tbody = Tbody;

export default BasicTable;

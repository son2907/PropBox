import React, { ReactNode } from "react";

interface TableProps {
  data: { [key: string]: any }[] | undefined; // Table data
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

const EmptyTable = () => {
  return (
    <table className="table-auto w-full border-collapse">
      <thead>
        <tr>
          <th className="border-solid bg-tableHeader border border-tableBorder border-t-0 first:border-l-0 last:border-r-0 text-center whitespace-nowrap py-3 sticky top-0 z-10">
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

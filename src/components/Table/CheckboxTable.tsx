import React, { ReactNode, useState } from "react";
import TableProvider from "./context/TableProvider";
import useTableContext from "../../hooks/useTableContext";

interface TableProps {
  data: { [key: string]: any }[] | undefined;
  selectedRows: Set<string>;
  toggleRowsSelection: (id: string) => void;
  highlightSelection?: boolean; // 선택한 행 강조 여부
  children: ReactNode;
}

interface TableItemProps {
  children: ReactNode;
  [property: string]: any; // ...rest를 받기 위함
}

interface CheckboxTdProps {
  item: { [key: string]: any }; // item 객체의 id 속성 타입
  keyName: string;
}

const Th: React.FC<TableItemProps & { radius?: boolean }> = ({
  children,
  radius = false,
  ...rest
}) => {
  return (
    <th
      {...rest}
      className={`border-solid bg-tableHeader border border-tableBorder border-t-0 first:border-l-0 last:border-r-0 text-center whitespace-nowrap py-3 sticky top-0 z-10 ${radius ? "first:rounded-tl-lg last:rounded-tr-lg" : ""
        }`}
    >
      {children}
    </th>
  );
};

const CheckboxTh = ({ keyName }: { keyName: string }) => {
  const { data, selectedRows, toggleRowsSelection } = useTableContext();

  // 전체 선택 상태 관리
  const allSelected = selectedRows.size === data.length;

  // 전체 선택/해제 핸들러
  const handleSelectAllChange = () => {
    data.forEach((row: any) => {
      const isSelected = selectedRows.has(row[keyName]);
      if (allSelected && isSelected) {
        toggleRowsSelection(row[keyName]); // 이미 선택된 행 해제
      } else if (!allSelected && !isSelected) {
        toggleRowsSelection(row[keyName]); // 선택되지 않은 행 선택
      }
    });
  };

  return (
    <Th key="checkbox-header text-center">
      <Checkbox checked={allSelected} onChange={handleSelectAllChange} />
    </Th>
  );
};

const Td: React.FC<TableItemProps> = ({ children, ...rest }) => {
  return (
    <td
      className="py-3 px-3 border-tableBorder border-solid border border-b-0 border-t-0 first:border-l-0 last:border-r-0 "
      {...rest}
    >
      {children}
    </td>
  );
};

const Tr: React.FC<TableItemProps & { highlightSelection?: boolean }> =
  React.memo(({ children, highlightSelection = false, ...rest }) => {
    const { selectedRows } = useTableContext();
    const [click, setClick] = useState(false);
    const isSelected = rest?.item && selectedRows.has(rest.item.id);

    return (
      <tr
        onClick={() => {
          setClick(!click);
          rest?.onClick?.();
        }}
        style={{
          backgroundColor:
            highlightSelection && isSelected ? "#F1F1F1" : "white",
        }}
        {...rest}
      >
        {children}
      </tr>
    );
  });

const Tbody: React.FC<TableItemProps> = ({ children, ...rest }) => {
  return <tbody {...rest}>{children}</tbody>;
};

const Thead: React.FC<TableItemProps> = ({ children, ...rest }) => {
  return <thead {...rest}>{children}</thead>;
};
// const EmptyTable = () => {
//   return (
//     <table className="table-auto overflow-hidden w-full border-collapse border-r-4 bg-white">
//       <thead>
//         <tr>
//           <th className="border-solid bg-tableHeader border border-tableBorder border-t-0 first:border-l-0 last:border-r-0 text-center whitespace-nowrap py-3 sticky top-0 z-10">
//             조회 데이터가 존재하지 않습니다.
//           </th>
//         </tr>
//       </thead>
//       <tbody>
//         <tr>
//           <td className="border-solid flex justify-center border border-b-0 border-t-0 border-gray-300 p-2 text-left last:border-0">
//             조회 데이터가 존재하지 않습니다.
//           </td>
//         </tr>
//       </tbody>
//     </table>
//   );
// };

const CheckboxTd = ({ item, keyName }: CheckboxTdProps) => {
  const { selectedRows, toggleRowsSelection } = useTableContext();

  return (
    <Td className="checkbox-header text-center">
      <input
        type="checkbox"
        checked={selectedRows.has(item[keyName])}
        onChange={() => toggleRowsSelection(item[keyName])}
      />
    </Td>
  );
};

const Checkbox: React.FC<{ checked: boolean; onChange: () => void }> =
  React.memo(({ checked, onChange }) => {
    return <input type="checkbox" checked={checked} onChange={onChange} />;
  });

const CheckboxTable: React.FC<TableProps> & {
  Thead: typeof Thead;
  Th: typeof Th;
  CheckboxTh: typeof CheckboxTh;
  Tr: typeof Tr;
  Td: typeof Td;
  Tbody: typeof Tbody;
  CheckboxTd: typeof CheckboxTd;
  //EmptyTable: typeof EmptyTable;
} = ({
  data,
  selectedRows,
  toggleRowsSelection,
  highlightSelection = false,
  children,
}) => {
    return (
      <>
        <TableProvider
          data={data}
          selectedRows={selectedRows}
          toggleRowsSelection={toggleRowsSelection}
        >
          <table className="w-full border-gray-300 border-collapse ">
            {React.Children.map(children, (child) => {
              if (
                (child as React.ReactElement<any>).type === CheckboxTable.Thead
              ) {
                return child;
              }
              return null;
            })}
            {!data || data.length > 0 ? (
              React.Children.map(children, (child) => {
                if (
                  (child as React.ReactElement<any>).type === CheckboxTable.Tbody
                ) {
                  return React.cloneElement(child as React.ReactElement<any>, {
                    highlightSelection,
                  });
                }
                return null;
              })

            ) : (
              <tbody>
                <tr>
                  <td className="border-solid flex justify-center border border-b-0 border-t-0 border-gray-300 p-2 text-left py-2 px-2 last:border-0">
                  </td>
                </tr>
              </tbody>
            )}
          </table>
        </TableProvider>

      </>
    );
  };

//CheckboxTable.EmptyTable = EmptyTable;
CheckboxTable.Thead = Thead;
CheckboxTable.Th = Th;
CheckboxTable.CheckboxTh = CheckboxTh;
CheckboxTable.Tr = Tr;
CheckboxTable.Td = Td;
CheckboxTable.CheckboxTd = CheckboxTd;
CheckboxTable.Tbody = Tbody;

Thead.displayName = "CheckboxTable.Thead";

export default CheckboxTable;

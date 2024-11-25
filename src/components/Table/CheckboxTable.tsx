import React, { ReactNode, useState } from "react";
import TableProvider from "./context/TableProvider";
import useTableContext from "../../hooks/useTableContext";

interface TableProps {
  data: { id: string; [key: string]: any }[]; // Table data
  selectedRows: Set<string>;
  toggleRowsSelection: (id: string) => void;
  children: ReactNode;
}

interface TableItemProps {
  children: ReactNode;
  [property: string]: any; // ...rest를 받기 위함
}

interface CheckboxTdProps {
  item: { id: string }; // item 객체의 id 속성 타입
}

const Theader: React.FC<TableItemProps> = ({ children, ...rest }) => {
  return (
    <th
      {...rest}
      className="border-solid bg-gray-200 py-3 border border-gray-300 border-b-0 border-t-0 last:border-0 text-left whitespace-nowrap"
    >
      {children}
    </th>
  );
};

const CheckboxTh = () => {
  const { data, selectedRows, toggleRowsSelection } = useTableContext();

  // 전체 선택 상태 관리
  const allSelected = selectedRows.size === data.length;

  // 전체 선택/해제 핸들러
  const handleSelectAllChange = () => {
    data.forEach((row: any) => {
      const isSelected = selectedRows.has(row.id);
      if (allSelected && isSelected) {
        toggleRowsSelection(row.id); // 이미 선택된 행 해제
      } else if (!allSelected && !isSelected) {
        toggleRowsSelection(row.id); // 선택되지 않은 행 선택
      }
    });
  };

  return (
    <Theader key="checkbox-header">
      <Checkbox checked={allSelected} onChange={handleSelectAllChange} />
    </Theader>
  );
};

const Td: React.FC<TableItemProps> = ({ children, ...rest }) => {
  return <td {...rest}>{children}</td>;
};

const Tr: React.FC<TableItemProps> = React.memo(({ children, ...rest }) => {
  const [click, setClick] = useState(false);

  return (
    <tr
      onClick={() => {
        setClick(!click);
        rest?.onClick?.();
      }}
      style={{
        backgroundColor: click ? "#F1F1F1" : "white",
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

const EmptyTable = () => {
  return (
    <table className="table-auto w-full border-collapse">
      <thead>
        <tr>
          <th className="border-solid flex justify-center bg-gray-200 border border-gray-300 border-b-0 border-t-0 p-2 text-left last:border-0">
            조회 데이터가 존재하지 않습니다.
          </th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td className="border-solid flex justify-center border border-b-0 border-t-0 border-gray-300 p-2 text-left last:border-0">
            조회 데이터가 존재하지 않습니다.
          </td>
        </tr>
      </tbody>
    </table>
  );
};

const CheckboxTd = ({ item }: CheckboxTdProps) => {
  const { selectedRows, toggleRowsSelection } = useTableContext();

  return (
    <Td>
      <input
        type="checkbox"
        checked={selectedRows.has(item.id)}
        onChange={() => toggleRowsSelection(item.id)}
      />
    </Td>
  );
};

const Checkbox: React.FC<{ checked: boolean; onChange: () => void }> =
  React.memo(({ checked, onChange }) => {
    return <input type="checkbox" checked={checked} onChange={onChange} />;
  });

const CheckboxTable: React.FC<TableProps> & {
  Theader: typeof Theader;
  CheckboxTh: typeof CheckboxTh;
  Tr: typeof Tr;
  Td: typeof Td;
  Tbody: typeof Tbody;
  CheckboxTd: typeof CheckboxTd;
  EmptyTable: typeof EmptyTable;
} = ({ data, selectedRows, toggleRowsSelection, children }) => {
  return (
    <>
      {data.length === 0 ? (
        <EmptyTable /> // data가 없을 경우 EmptyTable 렌더링
      ) : (
        <TableProvider
          data={data}
          selectedRows={selectedRows}
          toggleRowsSelection={toggleRowsSelection}
        >
          <table className="table-auto w-full border-gray-300 border-collapse">
            <thead>
              <tr>
                {React.Children.map(children, (child) => {
                  if (
                    (child as React.ReactElement<any>).type ===
                      CheckboxTable.Theader ||
                    (child as React.ReactElement<any>).type ===
                      CheckboxTable.CheckboxTh
                  ) {
                    return child;
                  }
                  return null;
                })}
              </tr>
            </thead>
            {React.Children.map(children, (child) => {
              if (
                (child as React.ReactElement<any>).type === CheckboxTable.Tbody
              ) {
                return child; // Tbody를 그대로 렌더링
              }
              return null; // Tbody가 아닌 경우 무시
            })}
          </table>
        </TableProvider>
      )}
    </>
  );
};

CheckboxTable.EmptyTable = EmptyTable;
CheckboxTable.Theader = Theader;
CheckboxTable.CheckboxTh = CheckboxTh;
CheckboxTable.Tr = Tr;
CheckboxTable.Td = Td;
CheckboxTable.CheckboxTd = CheckboxTd;
CheckboxTable.Tbody = Tbody;

export default CheckboxTable;

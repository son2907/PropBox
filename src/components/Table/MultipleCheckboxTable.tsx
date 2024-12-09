import React, { ReactNode } from "react";

interface TableProps {
  data: { id: string; [key: string]: any }[]; // Table data
  children: ReactNode;
}

interface TableItemProps {
  children: ReactNode;
  [property: string]: any; // ...rest를 받기 위함
}

interface CheckboxTdProps {
  selectedRows: Set<string>;
  toggleRowsSelection: (id: string) => void;
  item: { id: string }; // item 객체의 id 속성 타입
  [property: string]: any;
}

interface CheckboxThProps extends CheckboxTdProps {
  data: { id: string; [key: string]: any }[];
  [property: string]: any;
}

const Th: React.FC<TableItemProps> = ({ children, ...rest }) => {
  return (
    <th
      {...rest}
      className="border-solid bg-gray-200 border border-gray-300 border-b-0 border-t-0 last:border-0 text-left whitespace-nowrap"
    >
      {children}
    </th>
  );
};

// 여러 컬럼에 여러 체크박스가 들어갈 수 있으므로 props로 직접 체크 데이터와 토글을 받는다.
const CheckboxTh = ({
  data,
  selectedRows,
  toggleRowsSelection,
}: CheckboxThProps) => {
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
    <Th>
      <input
        type="checkbox"
        checked={allSelected}
        onChange={handleSelectAllChange}
      />
    </Th>
  );
};

const Td: React.FC<TableItemProps> = ({ children, ...rest }) => {
  return <td {...rest}>{children}</td>;
};

const Tr: React.FC<TableItemProps> = React.memo(({ children, ...rest }) => {
  return <tr {...rest}>{children}</tr>;
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

// 여러 컬럼에 여러 체크박스가 들어갈 수 있으므로 props로 직접 체크 데이터와 토글을 받는다.
const CheckboxTd = ({
  selectedRows,
  toggleRowsSelection,
  item,
  ...rest
}: CheckboxTdProps) => {
  return (
    <Td>
      <input
        type="checkbox"
        checked={selectedRows.has(item.id)}
        onChange={() => toggleRowsSelection(item.id)}
        {...rest}
      />
    </Td>
  );
};

const MultipleCheckboxTable: React.FC<TableProps> & {
  Th: typeof Th;
  CheckboxTh: typeof CheckboxTh;
  Tr: typeof Tr;
  Td: typeof Td;
  Tbody: typeof Tbody;
  CheckboxTd: typeof CheckboxTd;
  EmptyTable: typeof EmptyTable;
} = ({ data, children }) => {
  return (
    <>
      {data.length === 0 ? (
        <EmptyTable /> // data가 없을 경우 EmptyTable 렌더링
      ) : (
        <table className="table-auto w-full border-gray-300 border-collapse">
          <thead>
            <tr>
              {React.Children.map(children, (child) => {
                if (
                  (child as React.ReactElement<any>).type ===
                    MultipleCheckboxTable.Th ||
                  (child as React.ReactElement<any>).type ===
                    MultipleCheckboxTable.CheckboxTh
                ) {
                  return child;
                }
                return null;
              })}
            </tr>
          </thead>
          {React.Children.map(children, (child) => {
            if (
              (child as React.ReactElement<any>).type ===
              MultipleCheckboxTable.Tbody
            ) {
              return child; // Tbody를 그대로 렌더링
            }
            return null; // Tbody가 아닌 경우 무시
          })}
        </table>
      )}
    </>
  );
};

MultipleCheckboxTable.EmptyTable = EmptyTable;
MultipleCheckboxTable.Th = Th;
MultipleCheckboxTable.Tr = Tr;
MultipleCheckboxTable.Td = Td;
MultipleCheckboxTable.CheckboxTd = CheckboxTd;
MultipleCheckboxTable.Tbody = Tbody;
MultipleCheckboxTable.CheckboxTh = CheckboxTh;

export default MultipleCheckboxTable;

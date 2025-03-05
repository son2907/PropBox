import React, { ReactNode } from "react";

interface TableProps {
  data: { [key: string]: any }[] | undefined; // Table data
  children: ReactNode;
}

interface TableItemProps {
  children: ReactNode;
  [property: string]: any; // ...rest를 받기 위함
}

interface CheckboxTdProps {
  selectedRows: Set<string>;
  toggleRowsSelection: (id: string) => void;
  item: any; // item 객체의 id 속성 타입
  keyName: string;
  [property: string]: any;
}

interface CheckboxThProps extends CheckboxTdProps {
  data: { [key: string]: any }[];
  [property: string]: any;
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

// 여러 컬럼에 여러 체크박스가 들어갈 수 있으므로 props로 직접 체크 데이터와 토글을 받는다.
const CheckboxTh = ({
  data,
  selectedRows,
  toggleRowsSelection,
  keyName,
}: CheckboxThProps) => {
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
  return (
    <td
      {...rest}
      className="py-3 px-3 border-tableBorder border-solid border border-b-0 border-t-0 first:border-l-0 last:border-r-0 "
    >
      {children}
    </td>
  );
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
          <th className="border-solid bg-tableHeader border border-tableBorder border-t-0 first:border-l-0 last:border-r-0 text-center whitespace-nowrap py-3 sticky top-0 z-10">
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
  keyName,
  ...rest
}: CheckboxTdProps) => {
  return (
    <Td>
      <input
        type="checkbox"
        checked={selectedRows.has(item[keyName])}
        onChange={() => toggleRowsSelection(item[keyName])}
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
      {!data || data.length === 0 ? (
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

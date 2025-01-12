import React, { ReactNode } from "react";
import {
  DndContext,
  closestCenter,
  MouseSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
  useSortable,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { arrayMove } from "@dnd-kit/sortable";
import useTableContext from "../../hooks/useTableContext";
import TableProvider from "./context/TableProvider";
import { LuArrowDownUp } from "react-icons/lu";
import { VscThreeBars } from "react-icons/vsc";

interface TableProps {
  checkbox?: boolean;
  selectedRows?: Set<string>;
  toggleRowsSelection?: (id: string) => void;
  data: { [key: string]: any }[];
  setData: React.Dispatch<React.SetStateAction<any[]>>;
  keyName: string;
  children: ReactNode;
}

interface CheckboxTdProps {
  item: { [key: string]: any };
  keyName: string;
}

const Th: React.FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <th className="border-solid bg-gray-200 border border-gray-300 border-b-0 border-t-0 p-2 text-left last:border-0 whitespace-nowrap">
      {children}
    </th>
  );
};

const CheckboxTd = ({ item, keyName }: CheckboxTdProps) => {
  const { selectedRows, toggleRowsSelection } = useTableContext();
  const itemId = item[keyName];

  return (
    <Td>
      <input
        type="checkbox"
        checked={selectedRows.has(itemId)}
        onChange={() => toggleRowsSelection(itemId)}
      />
    </Td>
  );
};

const CheckboxTh = () => {
  const { checkbox, data, selectedRows, toggleRowsSelection } =
    useTableContext();

  const allSelected = checkbox
    ? selectedRows && selectedRows.size === data.length
    : false;

  const handleSelectAllChange = () => {
    if (!checkbox || !selectedRows || !toggleRowsSelection) return;

    data.forEach((row: any) => {
      const isSelected = selectedRows.has(row.id);
      if (allSelected && isSelected) {
        toggleRowsSelection(row.id);
      } else if (!allSelected && !isSelected) {
        toggleRowsSelection(row.id);
      }
    });
  };

  return (
    <Th key="checkbox-header">
      <Checkbox
        checked={allSelected ?? false}
        onChange={handleSelectAllChange}
      />
    </Th>
  );
};

const SortableRow = ({
  id,
  children,
  isClicked, // 체크박스 없이 행클릭 할 경우
  onClick, // 체크박스 없이 행클릭 할 경우
  ...rest
}: {
  id: string;
  children: ReactNode;
  isClicked?: boolean;
  onClick?: () => void;
}) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    backgroundColor: isClicked ? "#F1F1F1" : "white",
  };

  return (
    <tr
      onClick={onClick}
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...rest}
    >
      <td style={{ cursor: "grab" }} {...listeners}>
        <VscThreeBars />
      </td>
      {children}
    </tr>
  );
};

const Td: React.FC<{ children: ReactNode }> = ({ children, ...rest }) => {
  return (
    <td
      className="border-solid border border-b-0 border-t-0 border-gray-300 p-2 text-left last:border-0 whitespace-nowrap"
      {...rest}
    >
      {children}
    </td>
  );
};

const Tbody: React.FC<{ children: ReactNode }> = ({ children }) => {
  return <tbody>{children}</tbody>;
};

const EmptyTable = () => {
  return (
    <table className="table-auto  w-full  border-collapse">
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

const Checkbox: React.FC<{ checked: boolean; onChange: () => void }> =
  React.memo(({ checked, onChange }) => {
    return <input type="checkbox" checked={checked} onChange={onChange} />;
  });

const RowDragTable: React.FC<TableProps> & {
  Th: typeof Th;
  CheckboxTh: typeof CheckboxTh;
  Tr: typeof SortableRow;
  Td: typeof Td;
  Tbody: typeof Tbody;
  EmptyTable: typeof EmptyTable;
  CheckboxTd: typeof CheckboxTd;
} = ({
  checkbox = false,
  selectedRows,
  toggleRowsSelection,
  data,
  setData,
  keyName,
  children,
}) => {
  const sensors = useSensors(
    useSensor(MouseSensor, {
      activationConstraint: { distance: 10 },
    })
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (active.id !== over?.id) {
      setData((prevData) => {
        const oldIndex = prevData.findIndex(
          (item) => item[keyName] === active.id
        );
        const newIndex = prevData.findIndex(
          (item) => item[keyName] === over?.id
        );

        return arrayMove(prevData, oldIndex, newIndex);
      });
    }
  };

  const TableWrapper: React.FC<{ children: ReactNode }> = ({ children }) => {
    return selectedRows && toggleRowsSelection ? (
      <TableProvider
        selectedRows={selectedRows}
        toggleRowsSelection={toggleRowsSelection}
        checkbox={checkbox} // 체크박스 체크 여부
        data={data} // 테이블 데이터
      >
        {children}
      </TableProvider>
    ) : (
      <>{children}</>
    );
  };

  return (
    <>
      {data.length === 0 ? (
        <EmptyTable />
      ) : (
        <TableWrapper>
          <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragEnd={handleDragEnd}
          >
            <table className="table-auto w-full border-gray-300 border-collapse">
              <thead>
                <tr>
                  <Th>
                    <LuArrowDownUp />
                  </Th>
                  {React.Children.map(children, (child) => {
                    if (
                      (child as React.ReactElement<any>).type ===
                        RowDragTable.Th ||
                      (child as React.ReactElement<any>).type ===
                        RowDragTable.CheckboxTh
                    ) {
                      return child;
                    }
                    return null;
                  })}
                </tr>
              </thead>
              <SortableContext
                items={data.map((item) => item[keyName])} // keyName으로 동적 참조
                strategy={verticalListSortingStrategy}
              >
                {React.Children.map(children, (child) => {
                  if (
                    (child as React.ReactElement<any>).type ===
                    RowDragTable.Tbody
                  ) {
                    return child;
                  }
                  return null;
                })}
              </SortableContext>
            </table>
          </DndContext>
        </TableWrapper>
      )}
    </>
  );
};

RowDragTable.EmptyTable = EmptyTable;
RowDragTable.Th = Th;
RowDragTable.CheckboxTh = CheckboxTh;
RowDragTable.Tr = SortableRow;
RowDragTable.Td = Td;
RowDragTable.Tbody = Tbody;
RowDragTable.CheckboxTd = CheckboxTd;

export default RowDragTable;

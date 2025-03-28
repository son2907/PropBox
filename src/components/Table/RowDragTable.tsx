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
  data: { [key: string]: any }[] | undefined;
  setData: React.Dispatch<React.SetStateAction<any[]>>;
  keyName: string;
  children: ReactNode;
}

interface CheckboxTdProps {
  item: { [key: string]: any };
  keyName: string;
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
      className={`border-solid bg-tableHeader border border-tableBorder border-t-0 first:border-l-0 last:border-r-0 text-center whitespace-nowrap py-3 sticky top-0 z-10 ${radius ? "first:rounded-tl-lg last:rounded-tr-lg" : ""
        }`}
    >
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
      <td
        style={{
          cursor: "grab",
          height: "100%",
          padding: 0, 
        }}
        {...listeners}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center", 
            justifyContent: "center",
            height: "100%",
          }}
        >
          <VscThreeBars/>
        </div>
      </td>
      {children}
    </tr>
  );
};

const Td: React.FC<{ children: ReactNode }> = ({ children, ...rest }) => {
  return (
    <td
      className="py-3 px-3 border-tableBorder border-solid border border-b-0 border-t-0 first:border-l-0 last:border-r-0 alignItems-center"
      {...rest}
    >
      {children}
    </td>
  );
};

const Tbody: React.FC<{ children: ReactNode }> = ({ children }) => {
  return <tbody>{children}</tbody>;
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
  //EmptyTable: typeof EmptyTable;
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
        <TableWrapper>
          <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragEnd={handleDragEnd}
          >
            <table className="table-auto w-full border-gray-300 border-collapse">
              <thead>
                <tr>
                  <Th style={{ alignItems: "center", justifyContent: "center" }}>
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
              {!data || data.length === 0 ? (
                <tbody>
                  <tr>
                    <td className="border-solid flex justify-center border border-b-0 border-t-0 border-gray-300 p-2 text-left py-2 px-2 last:border-0">
                    </td>
                  </tr>
                </tbody>
              ) : (
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
              )}
            </table>
          </DndContext>
        </TableWrapper>
      </>
    );
  };

//RowDragTable.EmptyTable = EmptyTable;
RowDragTable.Th = Th;
RowDragTable.CheckboxTh = CheckboxTh;
RowDragTable.Tr = SortableRow;
RowDragTable.Td = Td;
RowDragTable.Tbody = Tbody;
RowDragTable.CheckboxTd = CheckboxTd;

export default RowDragTable;

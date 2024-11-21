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

interface TableProps {
  checkbox?: boolean;
  selectedRows?: Set<string | number>;
  toggleRowsSelection?: (id: string) => void;
  data: { id: string; [key: string]: any }[];
  setData: React.Dispatch<React.SetStateAction<any[]>>;
  children: ReactNode;
}

interface CheckboxTdProps {
  selectedRows: Set<string | number>;
  toggleRowsSelection: (id: string | number) => void;
  item: { id: string | number }; // item 객체의 id 속성 타입
}

const Theader: React.FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <th className="border-solid bg-gray-200 border border-gray-300 border-b-0 border-t-0 p-2 text-left last:border-0 whitespace-nowrap">
      {children}
    </th>
  );
};

const CheckboxTd = ({
  selectedRows,
  toggleRowsSelection,
  item,
}: CheckboxTdProps) => {
  return (
    <td>
      <input
        type="checkbox"
        checked={selectedRows.has(item.id)}
        onChange={() => toggleRowsSelection(item.id)}
      />
    </td>
  );
};

const SortableRow = ({
  id,
  children,
  isClicked,
  onClick,
  ...rest
}: {
  id: string;
  children: ReactNode;
  isClicked: boolean;
  onClick: () => void;
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
        =
      </td>
      {children}
    </tr>
  );
};

const Td: React.FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <td className="border-solid border border-b-0 border-t-0 border-gray-300 p-2 text-left last:border-0 whitespace-nowrap">
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

const RowDragTable: React.FC<TableProps> & {
  Theader: typeof Theader;
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
  children,
}) => {
  const sensors = useSensors(
    useSensor(MouseSensor, {
      activationConstraint: { distance: 10 },
    })
  );

  const allSelected = checkbox
    ? selectedRows && selectedRows.size === data.length
    : false;

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (active.id !== over?.id) {
      setData((prevData) => {
        const oldIndex = prevData.findIndex((item) => item.id === active.id);
        const newIndex = prevData.findIndex((item) => item.id === over?.id);

        return arrayMove(prevData, oldIndex, newIndex);
      });
    }
  };

  const handleSelectAllChange = () => {
    if (!checkbox || !selectedRows || !toggleRowsSelection) return;

    data.forEach((row) => {
      const isSelected = selectedRows.has(row.id);
      if (allSelected && isSelected) {
        toggleRowsSelection(row.id);
      } else if (!allSelected && !isSelected) {
        toggleRowsSelection(row.id);
      }
    });
  };

  return (
    <>
      {data.length === 0 ? (
        <EmptyTable />
      ) : (
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
        >
          <table className="table-auto w-full border-gray-300 border-collapse">
            <thead>
              <tr>
                <Theader> </Theader>
                {checkbox && (
                  <Theader>
                    <input
                      type="checkbox"
                      checked={allSelected}
                      onChange={handleSelectAllChange}
                    />
                  </Theader>
                )}
                {React.Children.map(children, (child) => {
                  if (
                    (child as React.ReactElement<any>).type ===
                    RowDragTable.Theader
                  ) {
                    return child;
                  }
                  return null;
                })}
              </tr>
            </thead>
            <SortableContext
              items={data.map((item) => item.id)}
              strategy={verticalListSortingStrategy}
            >
              {React.Children.map(children, (child) => {
                if (
                  (child as React.ReactElement<any>).type === RowDragTable.Tbody
                ) {
                  return child;
                }
                return null;
              })}
            </SortableContext>
          </table>
        </DndContext>
      )}
    </>
  );
};

RowDragTable.EmptyTable = EmptyTable;
RowDragTable.Theader = Theader;
RowDragTable.Tr = SortableRow;
RowDragTable.Td = Td;
RowDragTable.Tbody = Tbody;
RowDragTable.CheckboxTd = CheckboxTd;

export default RowDragTable;

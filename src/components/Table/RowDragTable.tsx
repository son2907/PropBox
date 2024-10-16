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
  selectedRows: string[];
  toggleRowSelection: (id: string) => void;
  data: { id: string; [key: string]: any }[]; // Table data
  setData: React.Dispatch<React.SetStateAction<any[]>>; // Function to update data
  children: ReactNode;
}

const Theader: React.FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <th className="border-solid bg-gray-200 border border-gray-300 border-b-0 border-t-0 p-2 text-left last:border-0">
      {children}
    </th>
  );
};

const SortableRow = ({ id, children }: { id: string; children: ReactNode }) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <tr ref={setNodeRef} style={style} {...attributes} {...listeners}>
      <td style={{ cursor: "grab" }}>=</td>
      {children}
    </tr>
  );
};

const Td: React.FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <td className="border-solid border border-b-0 border-t-0 border-gray-300 p-2 text-left last:border-0">
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
          <th className="p-2">조회 데이터가 존재하지 않습니다.</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td className="p-2">조회 데이터가 존재하지 않습니다.</td>
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
} = ({
  checkbox = false,
  selectedRows,
  toggleRowSelection,
  data,
  setData,
  children,
}) => {
  const sensors = useSensors(
    useSensor(MouseSensor, {
      activationConstraint: { distance: 10 },
    })
  );

  // 전체 선택 상태 관리
  const allSelected = selectedRows.length === data.length;

  // onDragEnd 핸들러: 드래그 후 순서를 업데이트
  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    // 드래그한 요소와 놓은 위치가 다를 경우에만 처리
    if (active.id !== over?.id) {
      setData((prevData) => {
        const oldIndex = prevData.findIndex((item) => item.id === active.id);
        const newIndex = prevData.findIndex((item) => item.id === over?.id);

        // arrayMove를 사용하여 순서 변경
        return arrayMove(prevData, oldIndex, newIndex);
      });
    }
  };

  // 전체 선택/해제 핸들러
  const handleSelectAllChange = () => {
    data.forEach((row) => {
      const isSelected = selectedRows.includes(row.id);
      if (allSelected && isSelected) {
        toggleRowSelection(row.id); // 이미 선택된 행 해제
      } else if (!allSelected && !isSelected) {
        toggleRowSelection(row.id); // 선택되지 않은 행 선택
      }
    });
  };

  return (
    <>
      {data.length === 0 ? (
        <EmptyTable /> // data가 없을 경우 EmptyTable 렌더링
      ) : (
        <div
          style={{
            display: "flex",
            width: "100%",
            height: "100%",
            overflow: "auto",
          }}
        >
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
                      return child; // Theader 컴포넌트를 렌더링
                    }
                    return null; // 헤더가 아닌 경우 무시
                  })}
                </tr>
              </thead>
              <SortableContext
                items={data.map((item) => item.id)} // 드래그 가능한 항목 목록
                strategy={verticalListSortingStrategy}
              >
                {React.Children.map(children, (child) => {
                  if (
                    (child as React.ReactElement<any>).type ===
                    RowDragTable.Tbody
                  ) {
                    return child; // Tbody를 그대로 렌더링
                  }
                  return null; // Tbody가 아닌 경우 무시
                })}
              </SortableContext>
            </table>
          </DndContext>
        </div>
      )}
    </>
  );
};

RowDragTable.EmptyTable = EmptyTable;
RowDragTable.Theader = Theader;
RowDragTable.Tr = SortableRow;
RowDragTable.Td = Td;
RowDragTable.Tbody = Tbody;

export default RowDragTable;

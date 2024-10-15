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
  data: { id: string; [key: string]: any }[]; // 테이블의 데이터
  setData: React.Dispatch<React.SetStateAction<any[]>>; // 데이터를 업데이트할 함수
  children: ReactNode;
}

const Theader: React.FC<{ children: ReactNode }> = ({ children }) => {
  return <th>{children}</th>;
};

// SortableRow 컴포넌트 정의
const SortableRow = ({ id, children }: { id: string; children: ReactNode }) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <tr ref={setNodeRef} style={style} {...attributes} {...listeners}>
      {children}
    </tr>
  );
};

const Td: React.FC<{ children: ReactNode }> = ({ children }) => {
  return <td>{children}</td>;
};

const Tbody: React.FC<{ children: ReactNode }> = ({ children }) => {
  return <tbody>{children}</tbody>;
};

const RowDragTable: React.FC<TableProps> & {
  Theader: typeof Theader;
  Tr: typeof SortableRow;
  Td: typeof Td;
  Tbody: typeof Tbody;
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

  // onDragEnd 핸들러
  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (over && active.id !== over.id) {
      setData((prevData) => {
        const oldIndex = prevData.findIndex((item) => item.id === active.id);
        const newIndex = prevData.findIndex((item) => item.id === over.id);

        if (oldIndex !== -1 && newIndex !== -1) {
          return arrayMove(prevData, oldIndex, newIndex);
        }
        return prevData; // 변경 사항이 없는 경우 이전 데이터 반환
      });
    }
  };

  // 전체 선택/해제 핸들러
  const handleSelectAllChange = () => {
    if (allSelected) {
      // 모든 체크박스 선택 해제
      data.forEach((row) => toggleRowSelection(row.id)); // 현재 선택된 모든 행 해제
    } else {
      // 체크되지 않은 행 모두 선택
      data.forEach((row) => {
        if (!selectedRows.includes(row.id)) {
          toggleRowSelection(row.id); // 선택되지 않은 행 선택
        }
      });
    }
  };

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
    >
      <table>
        <thead>
          <tr>
            <Theader>=</Theader>
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
                (child as React.ReactElement<any>).type === RowDragTable.Theader
              ) {
                return child;
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
              (child as React.ReactElement<any>).type === RowDragTable.Tbody
            ) {
              return child; // Tbody를 그대로 렌더링
            }
            return null; // Tbody가 아닌 경우 무시
          })}
        </SortableContext>
      </table>
    </DndContext>
  );
};

RowDragTable.Theader = Theader;
RowDragTable.Tr = SortableRow;
RowDragTable.Td = Td;
RowDragTable.Tbody = Tbody;

export default RowDragTable;

import React, { useState } from "react";
import {
  DndContext,
  DragEndEvent,
  closestCenter,
  MouseSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
  horizontalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import Move from "../../assets/images/move.png";
import Switch from "../../assets/images/switch.png";

interface Row {
  id: any;
  [key: string]: string | number;
}

interface TableProps {
  initialData: Row[];
}

const DraggableTable: React.FC<TableProps> = ({ initialData }) => {
  const [rows, setRows] = useState<Row[]>(initialData);
  const [cols, setCols] = useState<string[]>(() => {
    // 열 제목을 초기 데이터의 첫 번째 행에서 추출
    if (initialData.length > 0) {
      const firstRow = initialData[0];
      return Object.keys(firstRow);
    }
    return [];
  });

  // DnD 센서 설정
  const sensors = useSensors(
    useSensor(MouseSensor, {
      activationConstraint: {
        distance: 10, // 드래그 시작 최소 거리
      },
    })
  );

  // 행 드래그 앤 드롭
  const RowItem: React.FC<{ row: Row }> = ({ row }) => {
    const { attributes, listeners, setNodeRef, transform, transition } =
      useSortable({ id: row.id });

    const style = {
      transform: CSS.Transform.toString(transform),
      transition,
      cursor: "grab", // 커서 모양 변경
    };

    return (
      <tr ref={setNodeRef} style={style} {...attributes} {...listeners}>
        <td>
          <img src={Move} />
        </td>
        {cols.map((col, colIndex) => (
          <td key={colIndex}>{row[col]}</td> // 각 열의 데이터를 셀에 표시
        ))}
      </tr>
    );
  };

  // 행 드래그 종료 처리
  const handleRowDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (active?.id !== over?.id) {
      // 드래그 시작 항목과 종료 항목의 인덱스
      const oldIndex = rows.findIndex((row) => row.id === active?.id);
      const newIndex = rows.findIndex((row) => row.id === over?.id);
      if (oldIndex >= 0 && newIndex >= 0) {
        setRows(arrayMove(rows, oldIndex, newIndex)); // 순서 변경
      }
    }
  };

  // 열 드래그 앤 드롭 처리
  const ColumnHeader: React.FC<{ column: string }> = ({ column }) => {
    const { attributes, listeners, setNodeRef, transform, transition } =
      useSortable({ id: column });

    const style = {
      transform: CSS.Transform.toString(transform),
      transition,
      cursor: "move", // 커서 모양 변경
    };

    return (
      <th ref={setNodeRef} style={style} {...attributes} {...listeners}>
        {column}
      </th>
    );
  };

  // 열 드래그 종료 처리 함수
  const handleColumnDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (active?.id !== over?.id) {
      // 드래그 시작 항목과 종료 항목의 인덱스
      const oldIndex = cols.findIndex((col) => col === active?.id);
      const newIndex = cols.findIndex((col) => col === over?.id);
      if (oldIndex >= 0 && newIndex >= 0) {
        setCols(arrayMove(cols, oldIndex, newIndex)); // 열 순서 변경
      }
    }
  };

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={(event) => {
        handleRowDragEnd(event); // 행 드래그 종료 시 처리
        handleColumnDragEnd(event); // 열 드래그 종료 시 처리
      }}
    >
      <table>
        <thead>
          <SortableContext
            items={cols}
            strategy={horizontalListSortingStrategy} // 열 정렬
          >
            <tr>
              <th>
                <img src={Switch} />
              </th>
              {cols.map((col) => (
                <ColumnHeader key={col} column={col} />
              ))}
            </tr>
          </SortableContext>
        </thead>
        <tbody>
          <SortableContext
            items={rows.map((row) => row.id)}
            strategy={verticalListSortingStrategy} // 행 정렬
          >
            {rows.map((row) => (
              <RowItem key={row.id} row={row} />
            ))}
          </SortableContext>
        </tbody>
      </table>
    </DndContext>
  );
};

export default DraggableTable;

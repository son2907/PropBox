import React from "react";
import {
  DndContext,
  closestCenter,
  useSensor,
  useSensors,
  PointerSensor,
  KeyboardSensor,
  DragEndEvent,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import Move from "../../assets/images/move.png";
import Switch from "../../assets/images/switch.png";

interface Data {
  id: string; // 각 행의 고유 ID
  [key: string]: any; // 다양한 필드가 가능하도록 설정
}

interface DraggableTableProps {
  data: Data[];
  onReorder: (newData: Data[]) => void;
}

const RowDraggableTable: React.FC<DraggableTableProps> = ({
  data,
  onReorder,
}) => {
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      const oldIndex = data.findIndex((item) => item.id === active.id);
      const newIndex = data.findIndex((item) => item.id === over.id);

      const newData = arrayMove(data, oldIndex, newIndex);
      onReorder(newData);
    }
  };

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
    >
      <SortableContext
        items={data.map((item) => item.id)}
        strategy={verticalListSortingStrategy}
      >
        <table>
          <thead>
            <tr>
              <th>
                <img src={Switch} />
              </th>
              {Object.keys(data[0]).map((key) => (
                <th key={key}>{key}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map((item) => (
              <SortableRow key={item.id} item={item} />
            ))}
          </tbody>
        </table>
      </SortableContext>
    </DndContext>
  );
};

interface SortableRowProps {
  item: Data;
}

const SortableRow: React.FC<SortableRowProps> = ({ item }) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({
      id: item.id,
    });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <tr ref={setNodeRef} style={style} {...attributes} {...listeners}>
      <td style={{ cursor: "grab", width: "30px", textAlign: "center" }}>
        <img src={Move} />
      </td>
      {Object.keys(item).map((key) => (
        <td key={key}>{item[key]}</td>
      ))}
    </tr>
  );
};

export default RowDraggableTable;

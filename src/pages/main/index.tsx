import Button, { BasicButton, GrayButton } from "../../components/Button";
import AccessAlarmIcon from "@mui/icons-material/AccessAlarm";
import RowDraggableTable from "../../components/Table/RowDraggableTable";
import { useState } from "react";
import DraggableTable from "../../components/Table/DraggableTable";
import { useCheckboxSelection } from "../../hooks/useCheckboxSelection";

interface Data {
  id: string;
  [key: string]: any;
}

const initialData: Data[] = [
  { id: "1", name: "John Doe", age: 28, job: "Developer" },
  { id: "2", name: "Jane Smith", age: 34, job: "Designer" },
  { id: "3", name: "Sam Johnson", age: 45, job: "Manager" },
];
export default function Main() {
  const [data, setData] = useState<Data[]>(initialData);
  // 커스텀 훅 사용
  const { selectedRows, toggleRowSelection } = useCheckboxSelection();

  const handleReorder = (newData: Data[]) => {
    setData(newData);
  };
  console.log(selectedRows);
  return (
    <>
      <div>메인페이지</div>
      <BasicButton>베이직 스타일 버튼</BasicButton>
      <GrayButton>그레이 버튼 스타일</GrayButton>
      <Button>
        <AccessAlarmIcon /> 아이콘 버튼
      </Button>
      <RowDraggableTable data={data} onReorder={handleReorder} />
      <DraggableTable
        initialData={data}
        selectedRows={selectedRows}
        checkbox={true}
        toggleRowSelection={toggleRowSelection}
      />
    </>
  );
}

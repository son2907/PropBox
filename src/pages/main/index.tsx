import Button, { BasicButton, GrayButton } from "../../components/Button";
import AccessAlarmIcon from "@mui/icons-material/AccessAlarm";
import { useCheckboxSelection } from "../../hooks/useCheckboxSelection";
import RowDragTable from "../../components/Table/RowDragTable";
import { useState } from "react";

interface Data {
  id: string;
  [key: string]: any;
}

export default function Main() {
  // 커스텀 훅 사용
  const { selectedRows, toggleRowSelection } = useCheckboxSelection();
  const [data, setData] = useState<Data[]>([
    { id: "1", name: "John Doe", age: 28, job: "Developer" },
    { id: "2", name: "Jane Smith", age: 34, job: "Designer" },
    { id: "3", name: "Sam Johnson", age: 45, job: "Manager" },
  ]); // 드래그 후 데이터를 업데이트할 상태

  console.log(selectedRows);
  return (
    <>
      <div>메인페이지</div>
      <BasicButton>베이직 스타일 버튼</BasicButton>
      <GrayButton>그레이 버튼 스타일</GrayButton>
      <Button>
        <AccessAlarmIcon /> 아이콘 버튼
      </Button>
      <RowDragTable
        checkbox={true}
        selectedRows={selectedRows}
        toggleRowSelection={toggleRowSelection}
        data={data}
        setData={setData} // 데이터를 업데이트할 함수를 전달
      >
        <RowDragTable.Theader>아이디</RowDragTable.Theader>
        <RowDragTable.Theader>이름</RowDragTable.Theader>
        <RowDragTable.Theader>값</RowDragTable.Theader>
        <RowDragTable.Theader>삭제</RowDragTable.Theader>

        <RowDragTable.Tbody>
          {data.map((item) => (
            <RowDragTable.Tr key={item.id} id={item.id}>
              <RowDragTable.Td>=</RowDragTable.Td>
              <RowDragTable.Td>
                <input
                  type="checkbox"
                  checked={selectedRows.includes(item.id)}
                  onChange={() => toggleRowSelection(item.id)}
                />
              </RowDragTable.Td>
              <RowDragTable.Td>{item.id}</RowDragTable.Td>
              <RowDragTable.Td>{item.name}</RowDragTable.Td>
              <RowDragTable.Td>{item.age}</RowDragTable.Td>
              <RowDragTable.Td>
                <button
                  onClick={() => {
                    alert(item.id);
                  }}
                >
                  버튼
                </button>
              </RowDragTable.Td>
            </RowDragTable.Tr>
          ))}
        </RowDragTable.Tbody>
      </RowDragTable>
    </>
  );
}

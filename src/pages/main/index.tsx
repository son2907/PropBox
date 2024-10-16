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
    { id: "4", name: "Chris Lee", age: 22, job: "Developer" },
    { id: "5", name: "Alex Brown", age: 30, job: "Designer" },
    { id: "6", name: "Emily Davis", age: 31, job: "Manager" },
    { id: "7", name: "Michael Wilson", age: 29, job: "Analyst" },
    { id: "8", name: "Sarah Miller", age: 40, job: "Tester" },
    { id: "9", name: "David Garcia", age: 36, job: "Architect" },
    { id: "10", name: "Laura Martinez", age: 33, job: "Sales" },
    { id: "11", name: "William Anderson", age: 25, job: "Marketing" },
    { id: "12", name: "Olivia Thomas", age: 39, job: "HR" },
    { id: "13", name: "James Taylor", age: 44, job: "Product Owner" },
    { id: "14", name: "Isabella Moore", age: 27, job: "Developer" },
    { id: "15", name: "Mason Jackson", age: 32, job: "Designer" },
    { id: "16", name: "Ava Martin", age: 35, job: "Manager" },
    { id: "17", name: "Liam White", age: 24, job: "Analyst" },
    { id: "18", name: "Sophia Harris", age: 41, job: "Tester" },
    { id: "19", name: "Elijah Thompson", age: 29, job: "Architect" },
    { id: "20", name: "Charlotte Clark", age: 38, job: "Sales" },
    { id: "21", name: "Benjamin Lewis", age: 21, job: "Marketing" },
    { id: "22", name: "Amelia Lee", age: 42, job: "HR" },
    { id: "23", name: "Lucas Walker", age: 37, job: "Product Owner" },
    { id: "24", name: "Mia Hall", age: 26, job: "Developer" },
    { id: "25", name: "Noah Allen", age: 34, job: "Designer" },
    { id: "26", name: "Evelyn Young", age: 30, job: "Manager" },
    { id: "27", name: "Oliver Hernandez", age: 23, job: "Analyst" },
    { id: "28", name: "Harper King", age: 39, job: "Tester" },
    { id: "29", name: "Ella Wright", age: 45, job: "Architect" },
    { id: "30", name: "Aiden Scott", age: 32, job: "Sales" },
    { id: "31", name: "Abigail Green", age: 29, job: "Marketing" },
    { id: "32", name: "Jack Adams", age: 36, job: "HR" },
    { id: "33", name: "Grace Nelson", age: 25, job: "Product Owner" },
    { id: "34", name: "Chloe Carter", age: 31, job: "Developer" },
    { id: "35", name: "Henry Mitchell", age: 28, job: "Designer" },
    { id: "36", name: "Zoe Perez", age: 40, job: "Manager" },
    { id: "37", name: "Daniel Roberts", age: 43, job: "Analyst" },
    { id: "38", name: "Lily Turner", age: 27, job: "Tester" },
    { id: "39", name: "Samuel Phillips", age: 35, job: "Architect" },
    { id: "40", name: "Victoria Campbell", age: 22, job: "Sales" },
    { id: "41", name: "Joseph Parker", age: 38, job: "Marketing" },
    { id: "42", name: "Madison Edwards", age: 44, job: "HR" },
    { id: "43", name: "David Collins", age: 33, job: "Product Owner" },
    { id: "44", name: "Scarlett Stewart", age: 24, job: "Developer" },
    { id: "45", name: "William Sanchez", age: 31, job: "Designer" },
  ]); // 드래그 후 데이터를 업데이트할 상태

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

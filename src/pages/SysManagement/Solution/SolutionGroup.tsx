import { Box, Stack, Typography } from "@mui/material";
import GrayBox from "../../../components/Box/GrayBox";
import { BasicButton, ToggleButton } from "../../../components/Button";
import SelectorTabs from "../../../components/Tab/SelectorTabs";
import BasicInput from "../../../components/Input/BasicInput";
import useTabs from "../../../hooks/useTabs";
import TabPanel from "../../../components/Tab/TabPanel";
import BasicTable from "../../../components/Table/BasicTable";
import { tableTestData } from "../../../utils/testData";
import LabelTypo from "../../../components/Typography/LabelTypo";
import { useMultiRowSelection } from "../../../hooks/useMultiRowSelection";
import RowDragTable from "../../../components/Table/RowDragTable";
import TextArea from "../../../components/TextArea/TextArea";
import { useRef, useState } from "react";
import { Select } from "../../../components/Select";
import { selectTestData } from "../../../utils/testData";
import useSelect from "../../../hooks/useSelect";
import useToggleButtton from "../../../hooks/useToggleButton";

interface Data {
  id: string;
  [key: string]: any;
}

export default function SolutionGroup() {
  const { value, handleChange: tabChange } = useTabs(0);

  // 테이블 선택 조건이 없으므로 다중선택 ui 적용
  const { selectedRows, toggleRowsSelection } = useMultiRowSelection();

  const [data, setData] = useState<Data[]>([
    {
      id: "1",
      name: "John Doe",
      age: 30,
      job: "Developer",
      address: "123 Elm St, Springfield",
      email: "john.doe@example.com",
      phone: "555-1111",
      department: "Engineering",
      hireDate: "2015-06-15",
      salary: "$85,000",
    },
    {
      id: "2",
      name: "Jane Smith",
      age: 28,
      job: "Designer",
      address: "456 Oak St, Springfield",
      email: "jane.smith@example.com",
      phone: "555-2222",
      department: "Design",
      hireDate: "2016-03-10",
      salary: "$70,000",
    },
    {
      id: "3",
      name: "Sam Johnson",
      age: 45,
      job: "Manager",
      address: "123 Main St, Springfield",
      email: "sam.johnson@example.com",
      phone: "555-1234",
      department: "Sales",
      hireDate: "2010-05-23",
      salary: "$75,000",
    },
    {
      id: "4",
      name: "Alice Brown",
      age: 40,
      job: "HR",
      address: "789 Pine St, Springfield",
      email: "alice.brown@example.com",
      phone: "555-3333",
      department: "Human Resources",
      hireDate: "2012-08-30",
      salary: "$65,000",
    },
    {
      id: "5",
      name: "Michael White",
      age: 50,
      job: "CEO",
      address: "101 Maple St, Springfield",
      email: "michael.white@example.com",
      phone: "555-4444",
      department: "Executive",
      hireDate: "2005-09-01",
      salary: "$150,000",
    },
    {
      id: "6",
      name: "Karen Taylor",
      age: 38,
      job: "Accountant",
      address: "555 Cedar St, Springfield",
      email: "karen.taylor@example.com",
      phone: "555-5555",
      department: "Finance",
      hireDate: "2011-07-18",
      salary: "$60,000",
    },
    {
      id: "7",
      name: "Robert Brown",
      age: 34,
      job: "IT Support",
      address: "678 Birch St, Springfield",
      email: "robert.brown@example.com",
      phone: "555-6666",
      department: "IT",
      hireDate: "2017-02-14",
      salary: "$55,000",
    },
    {
      id: "8",
      name: "Emily Davis",
      age: 26,
      job: "Marketing",
      address: "234 Ash St, Springfield",
      email: "emily.davis@example.com",
      phone: "555-7777",
      department: "Marketing",
      hireDate: "2019-10-22",
      salary: "$58,000",
    },
    {
      id: "9",
      name: "James Wilson",
      age: 31,
      job: "Product Manager",
      address: "111 Poplar St, Springfield",
      email: "james.wilson@example.com",
      phone: "555-8888",
      department: "Product",
      hireDate: "2018-04-19",
      salary: "$95,000",
    },
    {
      id: "10",
      name: "Sophia Martinez",
      age: 27,
      job: "Customer Support",
      address: "999 Cherry St, Springfield",
      email: "sophia.martinez@example.com",
      phone: "555-9999",
      department: "Customer Service",
      hireDate: "2020-06-25",
      salary: "$50,000",
    },
    {
      id: "11",
      name: "William Clark",
      age: 33,
      job: "Legal Counsel",
      address: "123 Elm St, Springfield",
      email: "william.clark@example.com",
      phone: "555-1212",
      department: "Legal",
      hireDate: "2013-05-20",
      salary: "$110,000",
    },
    {
      id: "12",
      name: "Olivia Lewis",
      age: 29,
      job: "PR Specialist",
      address: "789 Oak St, Springfield",
      email: "olivia.lewis@example.com",
      phone: "555-2323",
      department: "Public Relations",
      hireDate: "2014-11-03",
      salary: "$72,000",
    },
    {
      id: "13",
      name: "Henry Robinson",
      age: 36,
      job: "Sales Executive",
      address: "456 Birch St, Springfield",
      email: "henry.robinson@example.com",
      phone: "555-3434",
      department: "Sales",
      hireDate: "2010-07-07",
      salary: "$78,000",
    },
    {
      id: "14",
      name: "Emma Clark",
      age: 25,
      job: "UX Designer",
      address: "567 Cedar St, Springfield",
      email: "emma.clark@example.com",
      phone: "555-4545",
      department: "Design",
      hireDate: "2021-01-12",
      salary: "$68,000",
    },
    {
      id: "15",
      name: "Liam Lopez",
      age: 42,
      job: "Operations Manager",
      address: "678 Maple St, Springfield",
      email: "liam.lopez@example.com",
      phone: "555-5656",
      department: "Operations",
      hireDate: "2009-03-21",
      salary: "$88,000",
    },
    {
      id: "16",
      name: "Ava Garcia",
      age: 30,
      job: "Data Analyst",
      address: "789 Cherry St, Springfield",
      email: "ava.garcia@example.com",
      phone: "555-6767",
      department: "Data",
      hireDate: "2017-06-29",
      salary: "$82,000",
    },
    {
      id: "17",
      name: "Ethan Walker",
      age: 35,
      job: "Marketing Manager",
      address: "890 Elm St, Springfield",
      email: "ethan.walker@example.com",
      phone: "555-7878",
      department: "Marketing",
      hireDate: "2011-09-05",
      salary: "$95,000",
    },
    {
      id: "18",
      name: "Sophia Hill",
      age: 28,
      job: "Recruiter",
      address: "123 Pine St, Springfield",
      email: "sophia.hill@example.com",
      phone: "555-8989",
      department: "Human Resources",
      hireDate: "2018-03-17",
      salary: "$60,000",
    },
    {
      id: "19",
      name: "Noah Allen",
      age: 41,
      job: "DevOps Engineer",
      address: "456 Poplar St, Springfield",
      email: "noah.allen@example.com",
      phone: "555-9090",
      department: "Engineering",
      hireDate: "2013-08-02",
      salary: "$100,000",
    },
    {
      id: "20",
      name: "Isabella Young",
      age: 34,
      job: "Copywriter",
      address: "789 Oak St, Springfield",
      email: "isabella.young@example.com",
      phone: "555-1112",
      department: "Content",
      hireDate: "2015-04-11",
      salary: "$63,000",
    },
    {
      id: "21",
      name: "Daniel Hernandez",
      age: 32,
      job: "Software Engineer",
      address: "123 Maple St, Springfield",
      email: "daniel.hernandez@example.com",
      phone: "555-2223",
      department: "Engineering",
      hireDate: "2012-12-08",
      salary: "$120,000",
    },
    {
      id: "22",
      name: "Mia King",
      age: 27,
      job: "Social Media Manager",
      address: "456 Elm St, Springfield",
      email: "mia.king@example.com",
      phone: "555-3334",
      department: "Marketing",
      hireDate: "2020-09-13",
      salary: "$65,000",
    },
    {
      id: "23",
      name: "David Wright",
      age: 38,
      job: "IT Manager",
      address: "789 Poplar St, Springfield",
      email: "david.wright@example.com",
      phone: "555-4445",
      department: "IT",
      hireDate: "2010-01-25",
      salary: "$105,000",
    },
    {
      id: "24",
      name: "Abigail Scott",
      age: 31,
      job: "Graphic Designer",
      address: "123 Cedar St, Springfield",
      email: "abigail.scott@example.com",
      phone: "555-5556",
      department: "Design",
      hireDate: "2014-10-19",
      salary: "$67,000",
    },
    {
      id: "25",
      name: "Sebastian Hall",
      age: 45,
      job: "Business Analyst",
      address: "456 Cherry St, Springfield",
      email: "sebastian.hall@example.com",
      phone: "555-6667",
      department: "Business",
      hireDate: "2008-07-30",
      salary: "$90,000",
    },
    {
      id: "26",
      name: "Charlotte Green",
      age: 29,
      job: "Project Manager",
      address: "789 Elm St, Springfield",
      email: "charlotte.green@example.com",
      phone: "555-7778",
      department: "Project Management",
      hireDate: "2019-06-24",
      salary: "$85,000",
    },
    {
      id: "27",
      name: "Alexander Adams",
      age: 37,
      job: "Security Specialist",
      address: "123 Oak St, Springfield",
      email: "alexander.adams@example.com",
      phone: "555-8889",
      department: "Security",
      hireDate: "2013-11-30",
      salary: "$92,000",
    },
    {
      id: "28",
      name: "Amelia Nelson",
      age: 35,
      job: "Account Manager",
      address: "456 Pine St, Springfield",
      email: "amelia.nelson@example.com",
      phone: "555-9990",
      department: "Sales",
      hireDate: "2012-02-18",
      salary: "$78,000",
    },
    {
      id: "29",
      name: "Oliver Moore",
      age: 40,
      job: "Operations Director",
      address: "789 Birch St, Springfield",
      email: "oliver.moore@example.com",
      phone: "555-1010",
      department: "Operations",
      hireDate: "2009-04-12",
      salary: "$120,000",
    },
    {
      id: "30",
      name: "Avery Turner",
      age: 33,
      job: "QA Engineer",
      address: "123 Maple St, Springfield",
      email: "avery.turner@example.com",
      phone: "555-2121",
      department: "Quality Assurance",
      hireDate: "2016-01-30",
      salary: "$75,000",
    },
    {
      id: "31",
      name: "Elijah Baker",
      age: 44,
      job: "Director of Marketing",
      address: "456 Poplar St, Springfield",
      email: "elijah.baker@example.com",
      phone: "555-3232",
      department: "Marketing",
      hireDate: "2007-05-28",
      salary: "$130,000",
    },
    {
      id: "32",
      name: "Harper Clark",
      age: 36,
      job: "HR Director",
      address: "789 Cedar St, Springfield",
      email: "harper.clark@example.com",
      phone: "555-4343",
      department: "Human Resources",
      hireDate: "2011-06-06",
      salary: "$100,000",
    },
    {
      id: "33",
      name: "Jack Collins",
      age: 29,
      job: "Junior Developer",
      address: "123 Oak St, Springfield",
      email: "jack.collins@example.com",
      phone: "555-5454",
      department: "Engineering",
      hireDate: "2018-08-15",
      salary: "$65,000",
    },
    {
      id: "34",
      name: "Ella Howard",
      age: 26,
      job: "Intern",
      address: "456 Birch St, Springfield",
      email: "ella.howard@example.com",
      phone: "555-6565",
      department: "Marketing",
      hireDate: "2021-07-01",
      salary: "$45,000",
    },
    {
      id: "35",
      name: "Luna Ramirez",
      age: 31,
      job: "Operations Specialist",
      address: "789 Pine St, Springfield",
      email: "luna.ramirez@example.com",
      phone: "555-7676",
      department: "Operations",
      hireDate: "2013-12-03",
      salary: "$70,000",
    },
    {
      id: "36",
      name: "Mason Price",
      age: 42,
      job: "Sales Director",
      address: "123 Elm St, Springfield",
      email: "mason.price@example.com",
      phone: "555-8787",
      department: "Sales",
      hireDate: "2009-02-15",
      salary: "$110,000",
    },
    {
      id: "37",
      name: "Isabella Bell",
      age: 28,
      job: "Customer Success Manager",
      address: "456 Oak St, Springfield",
      email: "isabella.bell@example.com",
      phone: "555-9898",
      department: "Customer Success",
      hireDate: "2018-11-11",
      salary: "$75,000",
    },
    {
      id: "38",
      name: "Logan Brooks",
      age: 39,
      job: "Network Engineer",
      address: "789 Maple St, Springfield",
      email: "logan.brooks@example.com",
      phone: "555-0909",
      department: "IT",
      hireDate: "2011-04-16",
      salary: "$95,000",
    },
    {
      id: "39",
      name: "Mia Bailey",
      age: 34,
      job: "Content Strategist",
      address: "123 Birch St, Springfield",
      email: "mia.bailey@example.com",
      phone: "555-1011",
      department: "Content",
      hireDate: "2014-09-07",
      salary: "$78,000",
    },
    {
      id: "40",
      name: "Ethan Wood",
      age: 47,
      job: "CTO",
      address: "456 Pine St, Springfield",
      email: "ethan.wood@example.com",
      phone: "555-1112",
      department: "Executive",
      hireDate: "2003-06-10",
      salary: "$180,000",
    },
    {
      id: "41",
      name: "Charlotte Gray",
      age: 29,
      job: "Data Scientist",
      address: "789 Oak St, Springfield",
      email: "charlotte.gray@example.com",
      phone: "555-1213",
      department: "Data",
      hireDate: "2015-02-08",
      salary: "$95,000",
    },
    {
      id: "42",
      name: "Aiden Morgan",
      age: 35,
      job: "Legal Advisor",
      address: "123 Maple St, Springfield",
      email: "aiden.morgan@example.com",
      phone: "555-1314",
      department: "Legal",
      hireDate: "2011-07-25",
      salary: "$105,000",
    },
    {
      id: "43",
      name: "Evelyn Rogers",
      age: 33,
      job: "Business Development Manager",
      address: "456 Elm St, Springfield",
      email: "evelyn.rogers@example.com",
      phone: "555-1415",
      department: "Business",
      hireDate: "2012-03-12",
      salary: "$85,000",
    },
    {
      id: "44",
      name: "Owen Cooper",
      age: 30,
      job: "Product Designer",
      address: "789 Poplar St, Springfield",
      email: "owen.cooper@example.com",
      phone: "555-1516",
      department: "Design",
      hireDate: "2017-05-05",
      salary: "$70,000",
    },
    {
      id: "45",
      name: "Emma Carter",
      age: 32,
      job: "Finance Manager",
      address: "123 Cedar St, Springfield",
      email: "emma.carter@example.com",
      phone: "555-1617",
      department: "Finance",
      hireDate: "2013-01-18",
      salary: "$85,000",
    },
  ]); // 드래그 후 데이터를 업데이트할 상태

  const { selectValue, handleChange } = useSelect();

  const { toggle, onChange: setToggle } = useToggleButtton({
    defaultValue: true,
  });

  return (
    <>
      <TabPanel value={value} index={0}>
        <div
          style={{
            height: "80%",
            overflow: "scroll",
          }}
        >
          <RowDragTable
            checkbox={false}
            data={data}
            setData={setData} // 데이터를 업데이트할 함수를 전달
          >
            <RowDragTable.Theader>솔루션ID</RowDragTable.Theader>
            <RowDragTable.Theader>솔루션이름</RowDragTable.Theader>
            <RowDragTable.Theader>라이선스방식</RowDragTable.Theader>

            <RowDragTable.Tbody>
              {data.map((item) => (
                <RowDragTable.Tr
                  isClicked={selectedRows.has(item.id)}
                  onClick={() => toggleRowsSelection(item.id)}
                  key={item.id}
                  id={item.id}
                >
                  <RowDragTable.Td>{item.id}</RowDragTable.Td>
                  <RowDragTable.Td>{item.name}</RowDragTable.Td>
                  <RowDragTable.Td>{item.age}</RowDragTable.Td>
                </RowDragTable.Tr>
              ))}
            </RowDragTable.Tbody>
          </RowDragTable>
        </div>
        {/* <div
          style={{
            height: "100%",
          }}
        > */}
        <Stack overflow={"hidden"}>
          <GrayBox marginBottom={1}>솔루션 상세정보</GrayBox>
          <Stack
            gap={1}
            alignItems={"left"}
            minHeight={"50%"}
            style={{
              overflowY: "scroll", // 세로 스크롤 활성화
              overflowX: "hidden", // 가로 스크롤 비활성화
            }}
          >
            <Box
              display="flex"
              flexDirection="column" // 세로 방향 설정
              alignItems="start" // 왼쪽 정렬
            >
              <Typography color="primary.dark" marginBottom={1}>
                솔루션ID
              </Typography>
              <BasicInput sx={{ height: "35px", width: "60%" }} />
            </Box>
            <Box
              display="flex"
              flexDirection="column" // 세로 방향 설정
              alignItems="start" // 왼쪽 정렬
            >
              <Typography color="primary.dark" marginBottom={1}>
                솔루션이름
              </Typography>
              <BasicInput sx={{ height: "35px", width: "60%" }} />
            </Box>
            <Box
              display="flex"
              flexDirection="column" // 세로 방향 설정
              alignItems="start" // 왼쪽 정렬
            >
              <Typography color="primary.dark" marginBottom={1}>
                라이선스방식
              </Typography>
              <Select
                value={selectValue}
                onChange={handleChange}
                selectData={selectTestData}
                sx={{ width: "204px" }}
              />
            </Box>
            <Box
              display="flex"
              flexDirection="column" // 세로 방향 설정
              alignItems="start" // 왼쪽 정렬
            >
              <Typography color="primary.dark" marginBottom={1}>
                사용여부
              </Typography>
              <ToggleButton checked={toggle} onChange={setToggle} label="" />
            </Box>
            <Box
              display="flex"
              flexDirection="column" // 세로 방향 설정
              alignItems="start" // 왼쪽 정렬
            >
              <Typography color="primary.dark" marginBottom={1}>
                비허가 URL
              </Typography>
              <BasicInput sx={{ height: "35px", width: "100%" }} />
            </Box>
            <Box
              display="flex"
              flexDirection="column" // 세로 방향 설정
              alignItems="start" // 왼쪽 정렬
            >
              <Typography color="primary.dark" marginBottom={1}>
                비고
              </Typography>
              <BasicInput sx={{ height: "35px", width: "100%" }} />
            </Box>
          </Stack>
          <GrayBox height={"40px"} marginTop={1} justifyContent={"flex-end"}>
            <BasicButton>추가</BasicButton>
            <BasicButton>저장</BasicButton>
            <BasicButton>삭제</BasicButton>
          </GrayBox>
        </Stack>
        {/* </div> */}
      </TabPanel>
    </>
  );
}

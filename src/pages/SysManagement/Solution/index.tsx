import { Box, Stack, Typography } from "@mui/material";
import MenuGroup from "./MenuGroup";
import SolutionGroup from "./SolutionGroup";
import useTabs from "../../../hooks/useTabs";
import TableBox from "../../../components/Box/TableBox";
import RowDragTable from "../../../components/Table/RowDragTable";
import { selectTestData, tableTestData } from "../../../utils/testData";
import { useEffect, useState } from "react";
import { tableDataType } from "../../../types";
import useSelect from "../../../hooks/useSelect";
import { Select } from "../../../components/Select";
import GrayBox from "../../../components/Box/GrayBox";
import BasicInput from "../../../components/Input/BasicInput";
import { BasicButton, ToggleButton } from "../../../components/Button";
import useToggleButtton from "../../../hooks/useToggleButton";
import api from "../../../api";
import { SolutionListType, useSolutionList } from "../../../api/solutionList";
import { SolutionMenuListType, useSolutionMenuList } from "../../../api/solutionMenuList";

export default function SolutionManagement() {

  // 솔루션 데이터
  const [data, setData] = useState<tableDataType[]>([]);
  // 메뉴 데이터
  const [data2, setData2] = useState<tableDataType[]>([]);

  const [selectedSolutionId, setSelectedSolutionId] = useState<string>("");

  const { data: solutionData, isLoading: isLoadingSolutions } = useSolutionList();
  const { data: menuData, isLoading: isLoadingMenus } = useSolutionMenuList(selectedSolutionId);


  const { selectListData, selectValue, handleChange } = useSelect(selectTestData, "value", "data");

  const { toggle, onChange: setToggle } = useToggleButtton({ defaultValue: true, });

  // 솔루션 데이터 로드 후 상태 업데이트
  // useEffect(() => {
  //   if (solutionData?.) {
  //     setData(solutionData.data.contents);
  //   }
  // }, [solutionData]);

  // // 메뉴 데이터 로드 후 상태 업데이트
  // useEffect(() => {
  //   if (menuData?.data.contents) {
  //     setData2(menuData.data.contents);
  //   }
  // }, [menuData]);

  return (
    <>
      <Stack width={"100%"} height={"100%"} gap={1}>
        <TableBox gap={1}>
          <Stack width={"50%"} height={"100%"} gap={1}>
            <Stack width={"100%"} height={"60%"} overflow={"auto"}>
              <RowDragTable
                checkbox={false}
                data={data}
                setData={setData}
              >
                <RowDragTable.Th>솔루션ID</RowDragTable.Th>
                <RowDragTable.Th>솔루션이름</RowDragTable.Th>
                <RowDragTable.Th>라이선스방식</RowDragTable.Th>

                <RowDragTable.Tbody>
                  {data.map((item) => (
                    <RowDragTable.Tr key={item.slutnId} id={item.slutnId}>
                      <RowDragTable.Td>{item.slutnId}</RowDragTable.Td>
                      <RowDragTable.Td>{item.slutnNm}</RowDragTable.Td>
                      <RowDragTable.Td>{item.lisneSeCd}</RowDragTable.Td>
                    </RowDragTable.Tr>
                  ))}
                </RowDragTable.Tbody>
              </RowDragTable>
            </Stack>
            <GrayBox width={"100%"} height={"40%"}>
              <Stack width={"100%"} height={"100%"} gap={1}>
                <Stack width={"100%"} height={"10%"} marginTop={2} marginBottom={2}>
                  <Typography color="primary.dark" fontWeight={"bold"} fontSize={"22px"}>
                    솔루션 상세정보
                  </Typography>
                </Stack>
                <Stack width={"100%"} height={"80%"} overflow={"auto"} gap={1} paddingBottom={1}>
                  <Stack gap={1}>
                    <Typography fontSize={"18px"}>솔루션 ID</Typography>
                    <BasicInput placeholder="솔루션 ID" sx={{ width: "40%", height: "40px" }}></BasicInput>
                  </Stack>
                  <Stack gap={1}>
                    <Typography fontSize={"18px"}>솔루션 이름</Typography>
                    <BasicInput placeholder="솔루션 이름" sx={{ width: "40%", height: "40px" }}></BasicInput>
                  </Stack>
                  <Stack gap={1}>
                    <Typography fontSize={"18px"}>라이선스 방식</Typography>
                    <Select
                      value={selectValue}
                      onChange={handleChange}
                      selectData={selectTestData}
                      sx={{ width: "400px" }}
                    />
                  </Stack>
                  <Stack gap={1}>
                    <Typography fontSize={"18px"}>사용여부</Typography>
                    <ToggleButton checked={toggle} onChange={setToggle} label="" />
                  </Stack>
                  <Stack gap={1} marginRight={1}>
                    <Typography fontSize={"18px"}>비허가 URL</Typography>
                    <BasicInput placeholder="URL" sx={{ width: "100%", height: "40px" }}></BasicInput>
                  </Stack>
                  <Stack gap={1} marginRight={1}>
                    <Typography fontSize={"18px"}>비고</Typography>
                    <BasicInput placeholder="비고" sx={{ width: "100%", height: "40px" }}></BasicInput>
                  </Stack>
                </Stack>
                <Stack width={"100%"} height={"10%"} gap={1} justifyContent={"flex-end"} direction={"row"}>
                  <BasicButton>추가</BasicButton>
                  <BasicButton>저장</BasicButton>
                  <BasicButton>취손</BasicButton>
                </Stack>
              </Stack>
            </GrayBox>
          </Stack>
          <Stack width={"50%"} height={"100%"}>
            <Stack width={"100%"} height={"60%"} gap={1} overflow={"auto"}>
              <RowDragTable
                checkbox={false}
                data={data2}
                setData={setData2}
              >
                <RowDragTable.Th>메뉴ID</RowDragTable.Th>
                <RowDragTable.Th>메뉴이름</RowDragTable.Th>
                <RowDragTable.Th>라이선스체크</RowDragTable.Th>
                <RowDragTable.Th>사용여부</RowDragTable.Th>

                <RowDragTable.Tbody>
                  {data.map((item) => (
                    <RowDragTable.Tr key={item.id} id={item.id}>
                      <RowDragTable.Td>{item.id}</RowDragTable.Td>
                      <RowDragTable.Td>{item.name}</RowDragTable.Td>
                      <RowDragTable.Td>
                        {
                          <Select
                            value={selectValue}
                            onChange={handleChange}
                            selectData={selectTestData}
                            sx={{ width: "204px" }}
                          />
                        }
                      </RowDragTable.Td>
                      <RowDragTable.Td>{item.age}</RowDragTable.Td>
                    </RowDragTable.Tr>
                  ))}
                </RowDragTable.Tbody>
              </RowDragTable>
            </Stack>
            <GrayBox width={"100%"} height={"40%"}>
              <Stack width={"100%"} height={"100%"} gap={1}>
                <Stack width={"100%"} height={"10%"} marginTop={2} marginBottom={2}>
                  <Typography color="primary.dark" fontWeight={"bold"} fontSize={"22px"}>
                    메뉴 상세정보
                  </Typography>
                </Stack>
                <Stack width={"100%"} height={"80%"} overflow={"auto"} gap={1} paddingBottom={1}>
                  <Stack gap={1}>
                    <Typography fontSize={"18px"}>메뉸 ID</Typography>
                    <BasicInput placeholder="메뉴 ID" sx={{ width: "40%", height: "40px" }}></BasicInput>
                  </Stack>
                  <Stack gap={1}>
                    <Typography fontSize={"18px"}>메뉴 이름</Typography>
                    <BasicInput placeholder="메뉴 이름" sx={{ width: "40%", height: "40px" }}></BasicInput>
                  </Stack>
                  <Stack gap={1}>
                    <Typography fontSize={"18px"}>라이선스 체크</Typography>
                    <Select
                      value={selectValue}
                      onChange={handleChange}
                      selectData={selectTestData}
                      sx={{ width: "400px" }}
                    />
                  </Stack>
                  <Stack gap={1} marginRight={1}>
                    <Typography fontSize={"18px"}>URL</Typography>
                    <BasicInput placeholder="URL" sx={{ width: "100%", height: "40px" }}></BasicInput>
                  </Stack>
                  <Stack gap={1}>
                    <Typography fontSize={"18px"}>아이콘</Typography>
                    <BasicInput placeholder="" sx={{ width: "40%", height: "40px" }}></BasicInput>
                  </Stack>
                  <Stack gap={1}>
                    <Typography fontSize={"18px"}>사용여부</Typography>
                    <ToggleButton checked={toggle} onChange={setToggle} label="" />
                  </Stack>
                  <Stack gap={1} marginRight={1}>
                    <Typography fontSize={"18px"}>비고</Typography>
                    <BasicInput placeholder="비고" sx={{ width: "100%", height: "40px" }}></BasicInput>
                  </Stack>
                </Stack>
                <Stack width={"100%"} height={"10%"} gap={1} justifyContent={"flex-end"} direction={"row"}>
                  <BasicButton>추가</BasicButton>
                  <BasicButton>저장</BasicButton>
                  <BasicButton>취손</BasicButton>
                </Stack>
              </Stack>
            </GrayBox>
          </Stack>
        </TableBox>
      </Stack>
    </>
  );
}

import { IconButton, Stack, Typography } from "@mui/material";
import GrayBox from "../../../components/Box/GrayBox";
import SearchInput from "../../../components/Input/SearchInput";
import TableBox from "../../../components/Box/TableBox";
import RowDragTable from "../../../components/Table/RowDragTable";
import { useEffect, useState } from "react";
import { tableDataType } from "../../../types";
import { RiDeleteBinLine } from "react-icons/ri";
import { BasicButton } from "../../../components/Button";
import { useCnsltItemList } from "../../../api/callCnslt";
import { CnsltItem } from "../../../types/callCnslt";

export default function ConfigSetting() {
  const [cnsltList, setCnsltList] = useState<CnsltItem[]>([]);
  const [data2, setData2] = useState<tableDataType[]>([]);

  const { data: cnsltListApi } = useCnsltItemList();
  console.log(cnsltListApi);

  useEffect(() => {
    if (cnsltListApi) {
      setCnsltList(cnsltListApi?.data.contents);
    }
  }, [cnsltListApi]);

  return (
    <>
      <Stack width={"50%"} minWidth={"400px"} height={"100%"} gap={1}>
        <GrayBox gap={1}>
          <Typography>상담항목</Typography>
          <SearchInput />
          <input type="checkbox" />
          <Typography>사용</Typography>
        </GrayBox>
        <TableBox>
          <TableBox.Inner>
            <RowDragTable
              keyName="itemNo"
              data={cnsltList}
              checkbox={false}
              setData={setCnsltList}
            >
              <RowDragTable.Th>상담항목</RowDragTable.Th>
              <RowDragTable.Th>사용</RowDragTable.Th>
              <RowDragTable.Th>삭제</RowDragTable.Th>

              <RowDragTable.Tbody>
                {cnsltList.map((item) => (
                  <RowDragTable.Tr key={item.itemNo} id={item.itemNo}>
                    <RowDragTable.Td>{item.itemNm}</RowDragTable.Td>
                    <RowDragTable.Td>{item.useYn}</RowDragTable.Td>
                    <RowDragTable.Td>
                      <IconButton>
                        <RiDeleteBinLine color="#f4475f" />
                      </IconButton>
                    </RowDragTable.Td>
                  </RowDragTable.Tr>
                ))}
              </RowDragTable.Tbody>
            </RowDragTable>
          </TableBox.Inner>
        </TableBox>
        <GrayBox gap={1}>
          <Typography>상담항목</Typography>
          <BasicButton sx={{ marginLeft: "auto" }}>추가</BasicButton>
          <BasicButton>저장</BasicButton>
        </GrayBox>
      </Stack>
      <Stack width={"50%"} minWidth={"400px"} height={"100%"} gap={1}>
        <GrayBox gap={1}>
          <Typography>상담항목</Typography>
          <SearchInput />
          <input type="checkbox" />
          <Typography>사용</Typography>
        </GrayBox>
        <TableBox>
          <TableBox.Inner>
            <RowDragTable data={data2} checkbox={false} setData={setData2}>
              <RowDragTable.Th>상담항목</RowDragTable.Th>
              <RowDragTable.Th>사용</RowDragTable.Th>
              <RowDragTable.Th>삭제</RowDragTable.Th>

              <RowDragTable.Tbody>
                {data2.map((item) => (
                  <RowDragTable.Tr key={item.id} id={item.id}>
                    <RowDragTable.Td>{item.name}</RowDragTable.Td>
                    <RowDragTable.Td>{item.name}</RowDragTable.Td>
                    <RowDragTable.Td>
                      <IconButton>
                        <RiDeleteBinLine color="#f4475f" />
                      </IconButton>
                    </RowDragTable.Td>
                  </RowDragTable.Tr>
                ))}
              </RowDragTable.Tbody>
            </RowDragTable>
          </TableBox.Inner>
        </TableBox>
        <GrayBox gap={1}>
          <Typography>상담세부항목</Typography>
          <BasicButton sx={{ marginLeft: "auto" }}>추가</BasicButton>
          <BasicButton>저장</BasicButton>
        </GrayBox>
      </Stack>
    </>
  );
}

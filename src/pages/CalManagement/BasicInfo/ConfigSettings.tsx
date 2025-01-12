import { IconButton, Stack, Typography } from "@mui/material";
import GrayBox from "../../../components/Box/GrayBox";
import SearchInput from "../../../components/Input/SearchInput";
import TableBox from "../../../components/Box/TableBox";
import RowDragTable from "../../../components/Table/RowDragTable";
import { useEffect, useState } from "react";
import { RiDeleteBinLine } from "react-icons/ri";
import { BasicButton } from "../../../components/Button";
import { useCnsltItemList, useItemDetList } from "../../../api/callCnslt";
import { CnsltItem, DetailItem } from "../../../types/callCnslt";
import { useSingleRowSelection } from "../../../hooks/useSingleRowSelection";

export default function ConfigSetting() {
  const [cnsltList, setCnsltList] = useState<CnsltItem[]>([]);
  const [detList, setDetList] = useState<DetailItem[]>([]);
  const { selectedRow, toggleRowSelection } = useSingleRowSelection(); // 행 단일 선택

  // 선택한 상담 항목 목록에 대한 상세항목 api
  const { data: itemDetList } = useItemDetList({
    itemNo: Array.from(selectedRow)[0] ?? "",
  });

  const { data: cnsltListApi } = useCnsltItemList();
  console.log(cnsltListApi);

  useEffect(() => {
    if (cnsltListApi) {
      setCnsltList(cnsltListApi?.data.contents);
    }
  }, [cnsltListApi]);

  useEffect(() => {
    if (itemDetList) {
      setDetList(itemDetList?.data.contents);
    }
  }, [itemDetList]);

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
              selectedRows={selectedRow}
              toggleRowsSelection={toggleRowSelection}
            >
              <RowDragTable.Th>상담항목</RowDragTable.Th>
              <RowDragTable.Th>사용</RowDragTable.Th>
              <RowDragTable.Th>삭제</RowDragTable.Th>

              <RowDragTable.Tbody>
                {cnsltList.map((item) => (
                  <RowDragTable.Tr
                    key={item.itemNo}
                    id={item.itemNo ?? ""}
                    isClicked={selectedRow.has(item.itemNo ?? "")}
                    onClick={() => toggleRowSelection(item.itemNo ?? "")}
                  >
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
            <RowDragTable
              data={detList}
              checkbox={false}
              setData={setDetList}
              keyName="detailNo"
            >
              <RowDragTable.Th>상담항목</RowDragTable.Th>
              <RowDragTable.Th>사용</RowDragTable.Th>
              <RowDragTable.Th>삭제</RowDragTable.Th>

              <RowDragTable.Tbody>
                {detList.map((item) => (
                  <RowDragTable.Tr key={item.detailNo} id={item.detailNo}>
                    <RowDragTable.Td>{item.detailNm}</RowDragTable.Td>
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
          <Typography>상담세부항목</Typography>
          <BasicButton sx={{ marginLeft: "auto" }}>추가</BasicButton>
          <BasicButton>저장</BasicButton>
        </GrayBox>
      </Stack>
    </>
  );
}

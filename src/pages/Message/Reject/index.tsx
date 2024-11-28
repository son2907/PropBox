import { Stack, Typography } from "@mui/material";
import React from "react";
import GrayBox from "../../../components/Box/GrayBox";
import SearchInput from "../../../components/Input/SearchInput";
import { BasicButton } from "../../../components/Button";
import TableBox from "../../../components/Box/TableBox";
import { useMultiRowSelection } from "../../../hooks/useMultiRowSelection";
import BasicTable from "../../../components/Table/BasicTable";
import { tableTestData } from "../../../utils/testData";
import CenteredBox from "../../../components/Box/CenteredBox";
import { Pagination } from "../../../components/Pagination";
import TableSelect from "../../../components/Select/TableSelect";
import { usePagination } from "../../../hooks/usePagination";
import BasicInput from "../../../components/Input/BasicInput";
import { openPopup } from "../../../utils/openPopup";
import PathConstants from "../../../routers/path";

export default function RejectMessage() {
  const { selectedRows: ts_1, toggleRowsSelection: tt_1 } =
    useMultiRowSelection();
  const { currentPage, onChangePage } = usePagination();

  const popupInfo = {
    url: PathConstants.Message.RegistrationExel,
    windowName: "수신거부 엑셀등록",
    windowFeatures: "width=1000,height=500,scrollbars=yes,resizable=yes",
  };
  return (
    <Stack width={"100%"} height={"100%"} gap={2}>
      <GrayBox gap={1}>
        <SearchInput />
        <BasicButton
          sx={{
            marginLeft: "auto",
          }}
          onClick={() => {
            openPopup(popupInfo);
          }}
        >
          거부일괄추가
        </BasicButton>
        <BasicButton>엑셀다운로드</BasicButton>
      </GrayBox>
      <TableBox width="100%" gap={2}>
        <Stack width="100%" minWidth={"900px"} height={"100%"}>
          <TableBox.Inner>
            <BasicTable data={tableTestData}>
              <BasicTable.Theader>전송일시</BasicTable.Theader>
              <BasicTable.Theader>구분</BasicTable.Theader>
              <BasicTable.Theader>메시지</BasicTable.Theader>

              <BasicTable.Tbody>
                {tableTestData.map((item, index) => {
                  return (
                    <BasicTable.Tr
                      key={index}
                      isClicked={ts_1.has(item.id)}
                      onClick={() => tt_1(item.id)}
                    >
                      <BasicTable.Td>{item.name}</BasicTable.Td>
                      <BasicTable.Td>{item.age}</BasicTable.Td>
                      <BasicTable.Td>{item.age}</BasicTable.Td>
                    </BasicTable.Tr>
                  );
                })}
              </BasicTable.Tbody>
            </BasicTable>
          </TableBox.Inner>
          <CenteredBox justifyContent={"space-between"} padding={1}>
            <Pagination count={25} page={currentPage} onChange={onChangePage} />
            <TableSelect total={100} />
          </CenteredBox>
        </Stack>
        <Stack width={"700px"} height={"300px"} marginRight={1}>
          <GrayBox width={"100%"} height={"100%"}>
            <Stack width={"100%"} gap={1}>
              <Typography variant="h3" marginBottom={2}>
                수신거부 등록정보
              </Typography>
              <Typography>휴대전화</Typography>
              <BasicInput />
              <Typography>비고(거부사유)</Typography>
              <BasicInput />
              <CenteredBox justifyContent={"flex-end"} gap={1} marginTop={3}>
                <BasicButton>저장</BasicButton>
                <BasicButton>삭제</BasicButton>
              </CenteredBox>
            </Stack>
          </GrayBox>
        </Stack>
      </TableBox>
    </Stack>
  );
}

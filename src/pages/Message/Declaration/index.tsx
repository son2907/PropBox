import { Stack } from "@mui/material";
import GrayBox from "../../../components/Box/GrayBox";
import { Select } from "../../../components/Select";
import { selectTestData, tableTestData } from "../../../utils/testData";
import useSelect from "../../../hooks/useSelect";
import SearchInput from "../../../components/Input/SearchInput";
import { BasicButton } from "../../../components/Button";
import TableBox from "../../../components/Box/TableBox";
import { useMultiRowSelection } from "../../../hooks/useMultiRowSelection";
import CheckboxTable from "../../../components/Table/CheckboxTable";
import { Pagination } from "../../../components/Pagination";
import TableSelect from "../../../components/Select/TableSelect";
import { usePagination } from "../../../hooks/usePagination";
import CenteredBox from "../../../components/Box/CenteredBox";
import BasicTable from "../../../components/Table/BasicTable";
import { HiRefresh } from "react-icons/hi";
import IconSquareButton from "../../../components/Button/IconSquareButton";
import PathConstants from "../../../routers/path";
import { openPopup } from "../../../utils/openPopup";

export default function DeclarationMessage() {
  const { selectValue: s_0, handleChange: o_0 } = useSelect();
  const { selectedRows: ts_1, toggleRowsSelection: tt_1 } =
    useMultiRowSelection();
  const { selectedRows: ts_2, toggleRowsSelection: tt_2 } =
    useMultiRowSelection();

  const { currentPage, onChangePage } = usePagination();

  const spam = {
    url: PathConstants.Message.Sapm,
    windowName: "방송통신위원회 스팸 등록",
  };

  const groupCell = {
    url: PathConstants.Message.GroupCell,
    windowName: "방송통신위원회 그룹셀",
  };

  return (
    <Stack width={"100%"} height={"100%"}>
      <GrayBox gap={1}>
        <Select
          selectData={selectTestData}
          value={s_0}
          onChange={o_0}
          sx={{ width: "300px" }}
        />
        <SearchInput
          placeholder="입력창"
          sx={{ width: "250px", bgcolor: "primary.light" }}
        />
        <BasicButton sx={{ marginLeft: "auto" }}>수신거부등록</BasicButton>
        <BasicButton>삭제</BasicButton>
        <BasicButton
          onClick={() => {
            openPopup(spam);
          }}
        >
          엑셀업로드
        </BasicButton>
        <BasicButton
          onClick={() => {
            openPopup(groupCell);
          }}
        >
          그룹관리
        </BasicButton>
        <IconSquareButton color="primary">
          <HiRefresh />
        </IconSquareButton>
      </GrayBox>
      <TableBox gap={2}>
        <Stack width={"50%"} height={"100%"}>
          <TableBox.Inner>
            <CheckboxTable
              data={tableTestData}
              selectedRows={ts_1}
              toggleRowsSelection={tt_1}
            >
              <CheckboxTable.Thead>
                <CheckboxTable.Tr>
                  <CheckboxTable.CheckboxTh />
                  <CheckboxTable.Th>그룹</CheckboxTable.Th>
                  <CheckboxTable.Th>신고전화번호</CheckboxTable.Th>
                  <CheckboxTable.Th>휴대전화</CheckboxTable.Th>
                </CheckboxTable.Tr>
              </CheckboxTable.Thead>

              <CheckboxTable.Tbody>
                {tableTestData.map((item) => (
                  <CheckboxTable.Tr key={item.id} id={item.id}>
                    <CheckboxTable.CheckboxTd item={item} />
                    <CheckboxTable.Td>{item.name}</CheckboxTable.Td>
                    <CheckboxTable.Td>{item.name}</CheckboxTable.Td>
                    <CheckboxTable.Td>{item.name}</CheckboxTable.Td>
                  </CheckboxTable.Tr>
                ))}
              </CheckboxTable.Tbody>
            </CheckboxTable>
          </TableBox.Inner>
          <CenteredBox margin={1} justifyContent={"space-between"}>
            <Pagination count={25} page={currentPage} onChange={onChangePage} />
            <TableSelect total={100} />
          </CenteredBox>
        </Stack>

        <Stack width={"50%"} height={"100%"}>
          <TableBox.Inner>
            <BasicTable data={tableTestData}>
              <BasicTable.Th>전송일시</BasicTable.Th>
              <BasicTable.Th>구분</BasicTable.Th>
              <BasicTable.Th>메시지</BasicTable.Th>

              <BasicTable.Tbody>
                {tableTestData.map((item, index) => {
                  return (
                    <BasicTable.Tr
                      key={index}
                      isClicked={ts_2.has(item.id)}
                      onClick={() => tt_2(item.id)}
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
          <CenteredBox margin={1} justifyContent={"space-between"}>
            <Pagination count={25} page={currentPage} onChange={onChangePage} />
            <TableSelect total={100} />
          </CenteredBox>
        </Stack>
      </TableBox>
    </Stack>
  );
}

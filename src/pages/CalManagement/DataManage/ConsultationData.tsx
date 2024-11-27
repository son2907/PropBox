import { Stack } from "@mui/material";
import GrayBox from "../../../components/Box/GrayBox";
import { Select } from "../../../components/Select";
import { selectTestData, tableTestData } from "../../../utils/testData";
import useSelect from "../../../hooks/useSelect";
import SearchInput from "../../../components/Input/SearchInput";
import { BasicButton } from "../../../components/Button";
import CheckboxTable from "../../../components/Table/CheckboxTable";
import TableBox from "../../../components/Box/TableBox";
import { useMultiRowSelection } from "../../../hooks/useMultiRowSelection";
import { Pagination } from "../../../components/Pagination";
import { usePagination } from "../../../hooks/usePagination";
import TableSelect from "../../../components/Select/TableSelect";
import CenteredBox from "../../../components/Box/CenteredBox";
import { openPopup } from "../../../utils/openPopup";
import PathConstants from "../../../routers/path";

export default function ConsultationData() {
  const { selectValue: s_0, handleChange: o_0 } = useSelect();
  const { selectedRows, toggleRowsSelection } = useMultiRowSelection();
  const { currentPage, onChangePage } = usePagination();

  const uploadInfo = {
    url: PathConstants.Call.UploadConsultation,
    windowName: "상담등록",
    windowFeatures: "width=1200,height=500,scrollbars=yes,resizable=yes",
  };

  return (
    <Stack width={"100%"} height={"100%"} gap={1}>
      <GrayBox gap={1}>
        <Select
          sx={{ width: "150px" }}
          selectData={selectTestData}
          value={s_0}
          onChange={o_0}
          placeholder="검색 항목 선택"
        />
        <SearchInput />
        <BasicButton>조회</BasicButton>
        <BasicButton
          sx={{ marginLeft: "auto" }}
          onClick={() => {
            openPopup({
              url: uploadInfo.url,
              windowName: uploadInfo.windowName,
              windowFeatures: uploadInfo.windowFeatures,
            });
          }}
        >
          엑셀업로드
        </BasicButton>
        <BasicButton>엑셀다운로드</BasicButton>
        <BasicButton>숨기기</BasicButton>
      </GrayBox>
      <TableBox>
        <TableBox.Inner>
          <CheckboxTable
            data={tableTestData}
            selectedRows={selectedRows}
            toggleRowsSelection={toggleRowsSelection}
          >
            {/* 체크한 데이터에 따라 표시 */}
            <CheckboxTable.Thead>
              <CheckboxTable.Tr>
                <CheckboxTable.Th>고객이름</CheckboxTable.Th>
              </CheckboxTable.Tr>
            </CheckboxTable.Thead>
            <CheckboxTable.Tbody>
              {tableTestData.map((item) => (
                <CheckboxTable.Tr key={item.id} id={item.id}>
                  <CheckboxTable.Td>{item.name}</CheckboxTable.Td>
                  <CheckboxTable.Td>{item.name}</CheckboxTable.Td>
                  <CheckboxTable.Td>{item.name}</CheckboxTable.Td>
                  <CheckboxTable.Td>{item.name}</CheckboxTable.Td>
                  <CheckboxTable.Td>{item.name}</CheckboxTable.Td>
                </CheckboxTable.Tr>
              ))}
            </CheckboxTable.Tbody>
          </CheckboxTable>
        </TableBox.Inner>
      </TableBox>
      <CenteredBox padding={2} justifyContent={"space-between"}>
        <Pagination count={25} page={currentPage} onChange={onChangePage} />
        <TableSelect total={100} />
      </CenteredBox>
    </Stack>
  );
}

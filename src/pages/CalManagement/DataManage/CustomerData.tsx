import { Stack } from "@mui/material";
import GrayBox from "../../../components/Box/GrayBox";
import SearchInput from "../../../components/Input/SearchInput";
import { BasicButton } from "../../../components/Button";
import TableBox from "../../../components/Box/TableBox";
import CheckboxTable from "../../../components/Table/CheckboxTable";
import { tableTestData } from "../../../utils/testData";
import CenteredBox from "../../../components/Box/CenteredBox";
import { Pagination } from "../../../components/Pagination";
import TableSelect from "../../../components/Select/TableSelect";
import { useMultiRowSelection } from "../../../hooks/useMultiRowSelection";
import { usePagination } from "../../../hooks/usePagination";
import { openPopup } from "../../../utils/openPopup";
import PathConstants from "../../../routers/path";
import { useTableSelect } from "../../../hooks/useTableSelect";

export default function CustomerData() {
  const { selectedRows, toggleRowsSelection } = useMultiRowSelection();
  const { currentPage, onChangePage } = usePagination();

  const popupInfo = {
    url: PathConstants.Call.CreateConsultation,
    windowName: "상담생성",
    windowFeatures: "width=1066,height=1000,scrollbars=yes,resizable=yes",
  };

  const { countValues, selectValue, handleChange } = useTableSelect();

  return (
    <Stack width={"100%"} height={"100%"} gap={1}>
      <GrayBox gap={1}>
        <SearchInput />
        <BasicButton
          sx={{ marginLeft: "auto" }}
          onClick={() => {
            openPopup({
              url: popupInfo.url,
              windowName: popupInfo.windowName,
              windowFeatures: popupInfo.windowFeatures,
            });
          }}
        >
          상담생성
        </BasicButton>
        <BasicButton>엑셀 다운로드</BasicButton>
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
                <CheckboxTable.Th colSpan={5}>고객이름</CheckboxTable.Th>
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
        <TableSelect
          total={100}
          countValues={countValues}
          selectValue={selectValue}
          handleChange={handleChange}
        />
      </CenteredBox>
    </Stack>
  );
}

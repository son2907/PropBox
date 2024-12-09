import { Box, Stack, Typography } from "@mui/material";
import SearchInput from "../../components/Input/SearchInput";
import { BasicButton, IconButton } from "../../components/Button";
import { IoIosAddCircleOutline } from "react-icons/io";
import TableBox from "../../components/Box/TableBox";
import CheckboxTable from "../../components/Table/CheckboxTable";
import { tableTestData } from "../../utils/testData";
import { RiDeleteBinLine } from "react-icons/ri";
import { useMultiRowSelection } from "../../hooks/useMultiRowSelection";
import PathConstants from "../../routers/path";
import { useRef } from "react";
import { openPopup } from "../../utils/openPopup";



export default function FAQList() {

  // 여러개선택
  const {
    selectedRows: useSelectedRows,
    toggleRowsSelection: toggleUseRowsSelection,
  } = useMultiRowSelection();

  const faqList = {
    url: PathConstants.FAQ.FAQList,
    windowName: "FAQ",
  };

  //공지사항 등록
  const faqAdd = {
    url: PathConstants.FAQ.FAQAdd,
    windowName: "FAQ 등록",
    windowFeatures: "width=570,height=400,scrollbars=yes,resizable=yes",
  };

  //공지사항 상세보기
  const faqDetail = {
    url: PathConstants.FAQ.FAQDetail,
    windowName: "FAQ 상세보기",
    windowFeatures: "width=570,height=400,scrollbars=yes,resizable=yes",
  };

  //공지사항 상세보기
  const faqModify = {
    url: PathConstants.FAQ.FAQModify,
    windowName: "FAQ 수정",
    windowFeatures: "width=570,height=400,scrollbars=yes,resizable=yes",
  };

  return (
    <>
      <Stack bgcolor={"white"} width={"100%"} height={"100%"}>
        <Stack direction={"row"} padding={1} justifyContent={"space-between"} width={"100%"} height={"10%"}>
          <Box>
            <SearchInput placeholder="FAQ 검색"></SearchInput>
          </Box>
          <Box>
            <BasicButton sx={{ color: "primary.main", borderColor: "primary.main" }}>선택삭제</BasicButton>
            <BasicButton sx={{ marginLeft: 1, color: "primary.main", borderColor: "primary.main" }}
              onClick={() => {
                openPopup({
                  url: faqAdd.url,
                  windowName: faqAdd.windowName,
                  windowFeatures: faqAdd.windowFeatures,
                });
              }}
            >

              <Stack alignItems={"center"} justifyContent={"center"} direction={"row"} gap={1}>
                <Typography color="primary.main">글쓰기</Typography>
                <IoIosAddCircleOutline size={"24px"} />
              </Stack>
            </BasicButton>
          </Box>

        </Stack>
        <Box width={"100%"} height={"90%"}>
          <TableBox>
            <TableBox.Inner>
              <CheckboxTable
                data={tableTestData}
                selectedRows={useSelectedRows}
                toggleRowsSelection={toggleUseRowsSelection}
              >
                <CheckboxTable.Thead>
                  <CheckboxTable.Tr>
                    <CheckboxTable.CheckboxTh />
                    <CheckboxTable.Th>제목</CheckboxTable.Th>
                    <CheckboxTable.Th>작성일</CheckboxTable.Th>
                    <CheckboxTable.Th >상세보기</CheckboxTable.Th>
                  </CheckboxTable.Tr>
                </CheckboxTable.Thead>

                <CheckboxTable.Tbody>
                  {tableTestData.map((item) => (
                    <CheckboxTable.Tr key={item.id} id={item.id}>
                      <CheckboxTable.CheckboxTd item={item} />
                      <CheckboxTable.Td>{item.name}</CheckboxTable.Td>
                      <CheckboxTable.Td>{item.phone}</CheckboxTable.Td>
                      <CheckboxTable.Td>
                        <BasicButton
                        onClick={() => {
                          openPopup({
                            url: faqModify.url,
                            windowName: faqModify.windowName,
                            windowFeatures: faqModify.windowFeatures,
                          });
                        }}
                        >상세보기</BasicButton>
                      </CheckboxTable.Td>

                    </CheckboxTable.Tr>
                  ))}
                </CheckboxTable.Tbody>
              </CheckboxTable>
            </TableBox.Inner>
          </TableBox>
        </Box>
      </Stack>
    </>
  );
}

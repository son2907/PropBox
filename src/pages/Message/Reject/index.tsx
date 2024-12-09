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
import useModal from "../../../hooks/useModal";
// import BasicAlert from "../../../components/Alert/BasicAlert";
import CustomAlert from "../../../components/Alert/CustomAlert";

// const AlertComponent1 = ({
//   onClose,
//   onSubmit,
//   modalId,
// }: {
//   onClose: () => void;
//   onSubmit: () => void;
//   modalId: string;
// }) => {
//   return (
//     <BasicAlert>
//       <BasicAlert.Content>{modalId}</BasicAlert.Content>
//       <BasicAlert.ButtonZone>
//         <BasicButton onClick={onClose} variant="outlined">
//           취소
//         </BasicButton>
//         <BasicButton onClick={onSubmit} variant="contained">
//           확인
//         </BasicButton>
//       </BasicAlert.ButtonZone>
//     </BasicAlert>
//   );
// };

const AlertComponent2 = ({
  onClose,
  onSubmit,
}: {
  onClose: () => void;
  onSubmit: () => void;
  modalId: string;
}) => {
  return (
    <CustomAlert onClose={onClose}>
      <CustomAlert.Title color="error.main">
        등록정보가 삭제됩니다.
      </CustomAlert.Title>
      <CustomAlert.Content>삭제하시겠습니까?</CustomAlert.Content>
      <CustomAlert.ButtonZone>
        <BasicButton onClick={onClose} variant="outlined">
          예
        </BasicButton>
        <BasicButton onClick={onSubmit} variant="contained">
          아니오
        </BasicButton>
      </CustomAlert.ButtonZone>
    </CustomAlert>
  );
};

export default function RejectMessage() {
  const { selectedRows: ts_1, toggleRowsSelection: tt_1 } =
    useMultiRowSelection();
  const { currentPage, onChangePage } = usePagination();

  const popupInfo = {
    url: PathConstants.Message.RegistrationExel,
    windowName: "수신거부 엑셀등록",
    windowFeatures: "width=1000,height=500,scrollbars=yes,resizable=yes",
  };
  const { openModal } = useModal();

  const handleOpenStackedModal = () => {
    openModal(AlertComponent2, {
      modalId: "alert1",
      stack: true, // 단일 모달 모드 = false,
      onClose: () => console.log("모달 닫힘"),
      onSubmit: () => console.log("확인"),
    });
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
              <BasicTable.Th>전송일시</BasicTable.Th>
              <BasicTable.Th>구분</BasicTable.Th>
              <BasicTable.Th>메시지</BasicTable.Th>

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
                <BasicButton onClick={handleOpenStackedModal}>삭제</BasicButton>
              </CenteredBox>
            </Stack>
          </GrayBox>
        </Stack>
      </TableBox>
    </Stack>
  );
}

import { Stack, Typography } from "@mui/material";
import IconSquareButton from "../../../../components/Button/IconSquareButton";
import { PiArrowsClockwiseBold } from "react-icons/pi";
import GrayBox from "../../../../components/Box/GrayBox";
import { BasicButton } from "../../../../components/Button";
import BasicInput from "../../../../components/Input/BasicInput";
import TableBox from "../../../../components/Box/TableBox";
import CheckboxTable from "../../../../components/Table/CheckboxTable";
import { useMultiRowSelection } from "../../../../hooks/useMultiRowSelection";
import { tableTestData } from "../../../../utils/testData";
import { deleteSubject, getSubjectList, updateSubject } from "../../../../api/dataManage";
import { useEffect, useState } from "react";
import BasicTable from "../../../../components/Table/BasicTable";
import { useSptStore } from "../../../../stores/sptStore";
import { useAuthStore } from "../../../../stores/authStore";
import useModal from "../../../../hooks/useModal";
import { UpdateCompletedModal } from "../../../../components/Modal/modal/UpdateCompletedModal";
import { EmptySelectModal } from "../../../../components/Modal/modal/EmptySelectModal";
import { ConfirmDeleteModal } from "../../../../components/Modal/modal/ConfirmDeleteModal";
import { DeleteCompletedModal } from "../../../../components/Modal/modal/DeleteCompletedModal";

//상담 주제 등록 팝업
export default function TopicRegistration() {
  //api를 호출하기위해 sptNo 불러오기
  const { sptNo } = useSptStore();
  const { loginId } = useAuthStore(["loginId"]);
  const { openModal, closeModal } = useModal();

  const { selectedRows, toggleRowsSelection } = useMultiRowSelection();
  //상담 주제 조회
  const { data: subjectList, refetch: refetchSubjectList } = getSubjectList();
  const [subject, setSubject] = useState("");
  const [subjectNo, setSubjectNo] = useState("");
  const { mutate: updateSubjectAPI } = updateSubject();
  const { mutate: deleteSubjectAPI } = deleteSubject();

  //주제 수정
  const handleSubjectUpdate = () => {
    const subjectUpdateReqData = {
      body: {
        sptNo: sptNo || "",
        themaNo: subjectNo,
        themaNm: subject,
        useYn: "Y",
        delYn: "N",
        userId: loginId,
      }
    };

    console.log("subjectUpdateReqData", subjectUpdateReqData);

    updateSubjectAPI(subjectUpdateReqData, {
      onSuccess: (response) => {
        if (response.data.result === "SUCCESS") {
          updateCompletedModal();
        }
      }
    })
  };

  //주제 삭제
  const handleSubjectDelete = () => {
    const subjectDeleteReqData = {
      body: {
        sptNo: sptNo || "",
        themaNo: subjectNo,
        themaNm: subject,
        useYn: "Y",
        delYn: "N",
        userId: loginId,
      }
    };

    console.log("subjectDeleteReqData", subjectDeleteReqData);
    if (subjectNo === "") {
      console.log("여기는");
      emptySelectionModal();
      return;
    } else {
      deleteSubjectAPI(subjectDeleteReqData, {
        onSuccess: (response) => {
          if (response.data.result === "SUCCESS") {
            deleteCompletedModal();
          }
        }
      });
    }
  };

  //수정 완료 모달
  const updateCompletedModal = () => {
    openModal(UpdateCompletedModal, {
      modalId: "UpdateCompletedModal",
      stack: false,
      onClose: () => closeModal,
      onSubmit: () => {
        refetchSubjectList();
      },
    });
  };

  //선택된 값이 없을때
  const emptySelectionModal = () => {
    openModal(EmptySelectModal, {
      modalId: "emptySelectModal",
      stack: false,
      onClose: () => closeModal,
      onSubmit: () => {
        window.close();
      },
    });
  };

  //삭제할것인지 묻는 모달
  const SolutionconfirmDeleteModal = () => {
    openModal(ConfirmDeleteModal, {
      modalId: "noticeDelete",
      stack: false, //단일 모달 모드
      onClose: () => closeModal,
      onSubmit: () => {
        handleSubjectDelete();
      },
    });
  };

  //삭제 완료 모달
  const deleteCompletedModal = () => {
    openModal(DeleteCompletedModal, {
      modalId: "deleteCompleted",
      stack: false,
      onClose: () => closeModal,
      onSubmit: () => {
        refetchSubjectList();
        setSubject("");
        setSubjectNo("");
      },
    });
  };

  return (
    <Stack width={"100%"} height={"100%"} bgcolor={"primary.light"}>
      <Stack width={"100%"} height={"5%"} bgcolor={"#CBE0FF"} justifyContent={"center"} padding={3}><Typography fontSize={"20px"}>상담주제등록</Typography></Stack>
      <GrayBox gap={1} marginBottom={1}>
        <IconSquareButton onClick={() => { window.location.reload() }}>
          <PiArrowsClockwiseBold color="#6AA5FE" />
        </IconSquareButton>
        <BasicButton onClick={SolutionconfirmDeleteModal}>주제 삭제</BasicButton>
        <BasicButton onClick={handleSubjectUpdate}>저장</BasicButton>
      </GrayBox>
      <GrayBox gap={1}>
        <Typography>주제명</Typography>
        <BasicInput sx={{ width: "200px" }} value={subject} onChange={(e) => setSubject(e.target.value)} />
      </GrayBox>
      <TableBox marginBottom={2}>
        <TableBox.Inner>
          <BasicTable data={subjectList?.data?.contents || []}>
            <BasicTable.Th>No</BasicTable.Th>
            <BasicTable.Th>주제명</BasicTable.Th>
            <BasicTable.Tbody>
              {(subjectList?.data?.contents || []).map((item, index) => {
                return (
                  <BasicTable.Tr
                    key={index}
                    isClicked={subjectNo === item.themaNo}
                    onClick={() => {
                      if (subjectNo === item.themaNo) {
                        setSubjectNo("");
                        setSubject("");
                      } else {
                        setSubject(item.themaNm);
                        setSubjectNo(item.themaNo);
                      }
                    }}
                  >
                    <BasicTable.Td >{item.themaNo}</BasicTable.Td>
                    <BasicTable.Td>{item.themaNm}</BasicTable.Td>
                  </BasicTable.Tr>
                );
              })}
            </BasicTable.Tbody>
          </BasicTable>
        </TableBox.Inner>
      </TableBox>
    </Stack>
  );
}

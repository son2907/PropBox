import { Stack, Tab, Typography } from "@mui/material";
import useTabs from "../../../../hooks/useTabs";
import TableBox from "../../../../components/Box/TableBox";
import BasicTable from "../../../../components/Table/BasicTable";
import GrayBox from "../../../../components/Box/GrayBox";
import ModalBox from "../../../../components/Modal";
import CenteredBox from "../../../../components/Box/CenteredBox";
import { IconButton } from "../../../../components/Button";
import { IoMdClose } from "react-icons/io";
import { useEffect, useState } from "react";
import {
  usePostBulkChk,
  usePostBulkDuplication,
  usePostBulkError,
  usePostBulkreject,
  usePostBulkChkTotalCnt,
  useBulkSendMsg,
} from "../../../../api/messageBulk";
import useModal from "../../../../hooks/useModal";
import { useModalStoreClear } from "../../../../stores/modalStore";
import { useApiRes } from "../../../../utils/useApiRes";
import { BasicCompletedModl } from "../../../../components/Modal/modal/BasicCompletedModl";
import { SendMsgConfirm } from "../../../Message/Bulk/popup/SendMsgConfirm";
import CustomTabs from "../../../Message/Bulk/popup/components/CustomTabs";
import { useSptStore } from "../../../../stores/sptStore";
import { confirmedCustomerList, duplicateCustomerList, errorCustomerList, rejectCustomerList, transmissionCount } from "../../../../api/CustomerManagement";
import { CustomerPreviewListType, CustomerSmsTotalCountListType, CustomerSmsTotalCountType } from "../../../../types/CustomerManagement";

export default function CustomerPreview({ body, msgData }) {
  //api를 호출하기위해 sptNo 불러오기
  const { sptNo } = useSptStore();
  // 팝업 페이지에서 파라미터 파싱
  const selectedCstmrNos = JSON.parse(localStorage.getItem("selectedCstmrNos") || "[]");
  //url에 파싱된 데이터 가져오기
  const queryParams = new URLSearchParams(window.location.search);
  const groupNo = queryParams.get("groupNo");
  console.log("선택된 고객 번호:", groupNo);

  const { value: tabValue, handleChange } = useTabs(0);
  const [tableData, setTableData] = useState<CustomerPreviewListType[]>([]);

  const [totalData, setTotalData] = useState({
    totalCnt1: "",
    totalCnt2: "",
    totalCnt3: "",
    totalCnt4: "",
  });

  const { openModal, closeModal } = useModal();
  const clear = useModalStoreClear();
  const checkApiFail = useApiRes();

  // 전송확인대상 인원수 확인
  const transmissionCountAPI = transmissionCount();
  const [smsCount, setSmsCount] = useState<CustomerSmsTotalCountListType>();

  useEffect(() => {
    const reqData: CustomerSmsTotalCountType = {
      sptNo: sptNo || "",
      groupNo: groupNo || "",
      tabFlag: "",
      cstmrList: selectedCstmrNos.map(data => data.custmNo)
    };

    //console.log("보낼 데이터 확인:", reqData);

    transmissionCountAPI.mutate(
      { body: reqData },
      {
        onSuccess: (response) => {
          if (response.data.message === "SUCCESS") {
            console.log("response.data", response.data.contents);
            setSmsCount(response.data.contents);
          }
        },
      }
    )
  }, []);

  const { mutate: base } = confirmedCustomerList(); // 확정 인원 목록

  const { mutate: duplicate } = duplicateCustomerList(); // 중복 인원 목록
  const { mutate: error } = errorCustomerList(); // 형식 오류 인원 목록
  const { mutate: reject } = rejectCustomerList(); // 수신 거부 인원 목록
  const { mutate: total } = transmissionCount(); // 전체 인원

  const { mutate: sendMsgApi } = useBulkSendMsg(); // 문자 발송

  useEffect(() => {
    const body: {
      sptNo: string;
      groupNo: string;
      tabFlag: string;
      cstmrList: string[];
    } = {
      sptNo: sptNo,
      groupNo: groupNo || "", // groupNo가 없을 경우 빈 문자열 처리
      tabFlag: "", // 공백 문자열
      cstmrList: selectedCstmrNos.map(item => item.custmNo), // 선택된 고객 목록
    };

    base(
      {
        body: body,
      },
      {
        onSuccess: (res) => {
          if (res.data.code == 200) {
            setTableData(res.data.contents);
            console.log("데이터확인:",res.data.contents);
          }
        },
      }
    );

    total(
      {
        body: body,
      },
      {
        onSuccess: (res) => {
          if (res.data.code == 200) {
            setTotalData(res.data.contents);
            console.log("데이터확인:",res.data.contents);
          }
        },
      }
    );
  }, []);

  useEffect(() => {
    let func = duplicate;
    let tabFlagValue = "1"; // 기본값 설정

    switch (tabValue) {
      case 1:
        func = duplicate;
        tabFlagValue = "2"; // 기본값 설정
        break;
      case 2:
        func = error;
        tabFlagValue = "3";
        break;
      case 3:
        func = reject;
        tabFlagValue = "4";
        break;
      default:
        func = base;
        tabFlagValue = "1";
        break;
    }

    const body: {
      sptNo: string;
      groupNo: string;
      tabFlag: string;
      cstmrList: string[];
    } = {
      sptNo: sptNo,
      groupNo: groupNo || "", // groupNo가 없을 경우 빈 문자열 처리
      tabFlag: tabFlagValue, // 공백 문자열
      cstmrList: selectedCstmrNos.map(item => item.custmNo), // 선택된 고객 목록
    };

    console.log("보낼데이터 확인:",body);

    func(
      {
        body: body,
      },
      {
        onSuccess: (res) => {
          if (res.data.code == 200) {
            setTableData(res.data.contents);
            console.log("데이터확인:",res.data.contents);
          } else {
            checkApiFail(res);
          }
        },
      }
    );
  }, [tabValue]);

  const sendMsg = () => {
    sendMsgApi(
      {
        body: msgData,
      },
      {
        onSuccess: (res) => {
          console.log("문자 전송 결과:", res);
          const result = checkApiFail(res);
          if (result.data.message === "SUCCESS") {
            openModal(BasicCompletedModl, {
              modalId: "excelComplete",
              stack: true,
              onClose: () => closeModal,
            });
          }
        },
      }
    );
  };

  const close = () => {
    openModal(SendMsgConfirm, {
      onClose: () => clear(),
      onSubmit: () => sendMsg(),
      modalId: "confirm",
    });
  };

  return (
    <ModalBox>
      <Stack width={"500px"} height={"100%"} bgcolor={"primary.light"}>
        <CenteredBox
          width="100%"
          height="50px"
          bgcolor={"modal.moadlBlueBg"}
          padding={2}
          marginBottom={1}
        >
          <Typography variant="h4">전송대상 미리보기</Typography>
          <IconButton onClick={close} sx={{ marginLeft: "auto" }}>
            <IoMdClose />
          </IconButton>
        </CenteredBox>
        <CustomTabs value={tabValue} handleChange={handleChange}>
          <Tab label="확정인원" />
          <Tab label="중복인원" />
          <Tab label="형식오류인원" />
          <Tab label="수신거부인원" />
        </CustomTabs>
        <TableBox>
          <TableBox.Inner height="440px">
            <BasicTable data={tableData}>
              <BasicTable.Th>전화번호</BasicTable.Th>
              <BasicTable.Th>이름</BasicTable.Th>
              <BasicTable.Th>상담종류</BasicTable.Th>
              <BasicTable.Tbody>
                {tableData.map((item, index) => {
                  return (
                    <BasicTable.Tr key={index}>
                      <BasicTable.Td>{item.mbtlNo}</BasicTable.Td>
                      <BasicTable.Td>{item.cstmrNm}</BasicTable.Td>
                    </BasicTable.Tr>
                  );
                })}
              </BasicTable.Tbody>
            </BasicTable>
          </TableBox.Inner>
        </TableBox>
        <GrayBox gap={3}>
          <Typography>확정인원 : {smsCount?.totalCnt1}</Typography>
          <Typography>중복인원 : {smsCount?.totalCnt2}</Typography>
          <Typography>형식오류인원 : {smsCount?.totalCnt3}</Typography>
          <Typography>수신거부인원 : {smsCount?.totalCnt4}</Typography>
        </GrayBox>
      </Stack>
    </ModalBox>
  );
}

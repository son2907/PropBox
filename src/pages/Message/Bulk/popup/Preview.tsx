import { Stack, Tab, Typography } from "@mui/material";
import CustomTabs from "./components/CustomTabs";
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
import { SendMsgConfirm } from "./SendMsgConfirm";
import { useModalStoreClear } from "../../../../stores/modalStore";
import { useApiRes } from "../../../../utils/useApiRes";
import { BasicCompletedModl } from "../../../../components/Modal/modal/BasicCompletedModl";

export default function Preview({ body, msgData }) {
  const { value: tabValue, handleChange } = useTabs(0);
  const [tableData, setTableData] = useState([
    {
      mbtlNo: "",
      cstmrNm: "",
      groupNm: "",
    },
  ]);

  const [totalData, setTotalData] = useState({});

  const { openModal, closeModal } = useModal();
  const clear = useModalStoreClear();
  const checkApiFail = useApiRes();

  const { mutate: base } = usePostBulkChk(); // 확정 인원 목록
  const { mutate: duplicate } = usePostBulkDuplication(); // 중복 인원 목록
  const { mutate: error } = usePostBulkError(); // 형식 오류 인원 목록
  const { mutate: reject } = usePostBulkreject(); // 수신 거부 인원 목록
  const { mutate: total } = usePostBulkChkTotalCnt(); // 전체 인원

  const { mutate: sendMsgApi } = useBulkSendMsg(); // 문자 발송

  useEffect(() => {
    base(
      {
        body: body,
      },
      {
        onSuccess: (res) => {
          if (res.data.code == 200) {
            setTableData(res.data.contents);
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
            console.log(res);
            setTotalData(res.data.contents);
          }
        },
      }
    );
  }, []);

  useEffect(() => {
    let func = duplicate;

    switch (tabValue) {
      case 1:
        func = duplicate;
        break;
      case 2:
        func = error;
        break;
      case 3:
        func = reject;
        break;
      default:
        func = base;
        break;
    }
    console.log("body:", body);
    func(
      {
        body: body,
      },
      {
        onSuccess: (res) => {
          console.log("응답:", res);
          if (res.data.code == 200) {
            setTableData(res.data.contents);
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
              stack: false,
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
      onSubmit: () => sendMsg,
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
                      <BasicTable.Td>{item.groupNm}</BasicTable.Td>
                    </BasicTable.Tr>
                  );
                })}
              </BasicTable.Tbody>
            </BasicTable>
          </TableBox.Inner>
        </TableBox>
        <GrayBox gap={3}>
          <Typography>확정인원 : {totalData.totalCnt1}</Typography>
          <Typography>중복인원 : {totalData.totalCnt2}</Typography>
          <Typography>형식오류인원 : {totalData.totalCnt3}</Typography>
          <Typography>수신거부인원 : {totalData.totalCnt4}</Typography>
        </GrayBox>
      </Stack>
    </ModalBox>
  );
}

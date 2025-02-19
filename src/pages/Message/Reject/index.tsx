import { Stack, Typography } from "@mui/material";
import GrayBox from "../../../components/Box/GrayBox";
import { BasicButton } from "../../../components/Button";
import TableBox from "../../../components/Box/TableBox";
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
import CustomAlert from "../../../components/Alert/CustomAlert";
import {
  useDeletetReject,
  usePostReject,
  usePutReject,
  useRejectList,
} from "../../../api/messageReject";
import { useTableSelect } from "../../../hooks/useTableSelect";
import { useSingleRowData } from "../../../hooks/useTest";
import { useForm } from "react-hook-form";
import useDidMountEffect from "../../../hooks/useDidMountEffect";
import { GetRejectList } from "../../../types/messageReject";
import { useAuthStore } from "../../../stores/authStore";
import { useApiRes } from "../../../utils/useApiRes";
import { BasicCompletedModl } from "../../../components/layout/modal/BasicCompletedModl";
import { useSptStore } from "../../../stores/sptStore";
import PhoneInput from "../../../components/Input/PhoneInput";
import SearchIcon from "../../../assets/images/Search.png";
import { useRef } from "react";
import ExcelUploadTable from "./ExcelUploadTable";

const DeleteAlert = ({
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
        <BasicButton onClick={onSubmit} variant="outlined">
          예
        </BasicButton>
        <BasicButton onClick={onClose} variant="contained">
          아니오
        </BasicButton>
      </CustomAlert.ButtonZone>
    </CustomAlert>
  );
};

export default function RejectMessage() {
  const { countValues, selectValue, handleChange } = useTableSelect();
  const { currentPage, onChangePage } = usePagination();
  const searchRef = useRef<HTMLInputElement>(null);

  const { selectedRow, toggleRowSelection } =
    useSingleRowData<GetRejectList>("rejectNo");
  const { loginId } = useAuthStore(["loginId"]);
  const { sptNo } = useSptStore();
  const popupInfo = {
    url: PathConstants.Message.RegistrationExel,
    windowName: "수신거부 엑셀등록",
    windowFeatures: "width=1000,height=500,scrollbars=yes,resizable=yes",
  };
  const { openModal, closeModal } = useModal();

  const { data: rejectList, refetch: rejectRefetch } = useRejectList({
    page: currentPage,
    limit: selectValue,
    rejectTelNo: searchRef.current?.value,
  });

  console.log("rejectList:", rejectList);

  const { register, reset, getValues } = useForm({
    defaultValues: {
      rejectTelNo: "",
      rmk: "",
    },
  });

  useDidMountEffect(() => {
    reset({
      rejectTelNo: selectedRow?.rejectTelNo ?? "",
      rmk: selectedRow?.rmk ?? "",
    });
  }, [selectedRow]);

  const searchFn = () => {
    rejectRefetch();
  };

  const checkApiFail = useApiRes();

  // 수정
  const { mutate: put } = usePutReject();
  const onPut = () => {
    if (!selectedRow) return;
    const body = {
      rejectNo: selectedRow.rejectNo,
      sptNo: selectedRow.sptNo,
      rejectTelNo: getValues("rejectTelNo"),
      useYn: selectedRow.useYn,
      rmk: getValues("rmk"),
      userId: loginId || "",
    };
    console.log("수정 보내는 정보 : ", body);
    put(
      {
        body: body,
      },
      {
        onSuccess: (res) => {
          const result = checkApiFail(res);
          if (result.data.message === "SUCCESS") {
            console.log("수정 성공 응답:", res);
            openModal(BasicCompletedModl, {
              modalId: "complete",
              stack: false,
              onClose: () => closeModal,
            });
            rejectRefetch();
          }
        },
      }
    );
  };

  // 추가
  const { mutate: post } = usePostReject();
  const onPost = () => {
    const body = {
      sptNo: sptNo,
      rejectTelNo: getValues("rejectTelNo"),
      rmk: getValues("rmk"),
      userId: loginId || "",
    };
    console.log("추가 보내는 정보 : ", body);
    post(
      {
        body: body,
      },
      {
        onSuccess: (res) => {
          const result = checkApiFail(res);
          console.log("추가 응답:", res);
          if (result.data.message === "SUCCESS") {
            console.log("추가 성공:", res);
            openModal(BasicCompletedModl, {
              modalId: "complete",
              stack: false,
              onClose: () => closeModal,
            });
            rejectRefetch();
          }
        },
      }
    );
  };

  const onSubmit = () => (selectedRow ? onPut() : onPost());

  const { mutate: delete_ } = useDeletetReject();

  const handleDelete = () => {
    openModal(DeleteAlert, {
      modalId: "alert1",
      stack: false,
      onClose: () => closeModal,
      onSubmit: () => {
        delete_(
          {
            rejectNo: selectedRow?.rejectNo || "",
          },
          {
            onSuccess: (res) => {
              const result = checkApiFail(res);
              // console.log("삭제 응답:", res);
              if (result.data.message === "SUCCESS") {
                // console.log("삭제 성공:", res);
                openModal(BasicCompletedModl, {
                  modalId: "complete",
                  stack: false,
                  onClose: () => closeModal,
                });
                rejectRefetch();
              }
            },
          }
        );
      },
    });
  };

  return (
    <Stack width={"100%"} height={"100%"} gap={2}>
      <ExcelUploadTable />
      <GrayBox gap={1}>
        <PhoneInput
          endAdornment={<img src={SearchIcon} alt="search-icon" />}
          placeholder="검색"
          ref={searchRef}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              searchFn();
            }
          }}
        />
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
              <BasicTable.Th>휴대전화</BasicTable.Th>
              <BasicTable.Th>비고(거부사유)</BasicTable.Th>
              <BasicTable.Th>등록자</BasicTable.Th>
              <BasicTable.Th>등록일시</BasicTable.Th>

              <BasicTable.Tbody>
                {rejectList?.data?.contents?.map((item, index) => {
                  return (
                    <BasicTable.Tr
                      key={index}
                      isClicked={selectedRow?.rejectNo === item.rejectNo}
                      onClick={() => toggleRowSelection(item)}
                    >
                      <BasicTable.Td>{item.rejectTelNo}</BasicTable.Td>
                      <BasicTable.Td>{item.rmk}</BasicTable.Td>
                      <BasicTable.Td>{item.regrNm}</BasicTable.Td>
                      <BasicTable.Td>{item.regDtm}</BasicTable.Td>
                    </BasicTable.Tr>
                  );
                })}
              </BasicTable.Tbody>
            </BasicTable>
          </TableBox.Inner>
          <CenteredBox justifyContent={"space-between"} padding={1}>
            <Pagination
              count={rejectList?.data.totalPage || 1}
              page={currentPage}
              onChange={onChangePage}
            />
            <TableSelect
              total={rejectList?.data.totalCnt || 10}
              countValues={countValues}
              selectValue={selectValue}
              handleChange={handleChange}
            />
          </CenteredBox>
        </Stack>
        <Stack width={"700px"} height={"300px"} marginRight={1}>
          <GrayBox width={"100%"} height={"100%"}>
            <Stack width={"100%"} gap={1}>
              <Typography variant="h3" marginBottom={2}>
                수신거부 등록정보
              </Typography>
              <Typography>휴대전화</Typography>
              {/* <PhoneInput {...register("rejectTelNo")} /> */}
              <BasicInput {...register("rejectTelNo")} />
              <Typography>비고(거부사유)</Typography>
              <BasicInput {...register("rmk")} />
              <CenteredBox justifyContent={"flex-end"} gap={1} marginTop={3}>
                <BasicButton onClick={onSubmit}>저장</BasicButton>
                <BasicButton onClick={handleDelete}>삭제</BasicButton>
              </CenteredBox>
            </Stack>
          </GrayBox>
        </Stack>
      </TableBox>
    </Stack>
  );
}

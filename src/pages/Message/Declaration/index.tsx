import { Stack } from "@mui/material";
import GrayBox from "../../../components/Box/GrayBox";
import { Select } from "../../../components/Select";
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
import PathConstants from "../../../routers/path";
import { openPopup } from "../../../utils/openPopup";
import { useTableSelect } from "../../../hooks/useTableSelect";
import {
  useDeleteKccGroup,
  useGetKccGroupList,
  useGetKccList,
  useGetKccMsg,
  usePostKccReject,
} from "../../../api/kcc";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { filterDataByValues } from "../../../utils/filterDataByValues";
import { useApiRes } from "../../../utils/useApiRes";
import useModal from "../../../hooks/useModal";
import { BasicCompletedModl } from "../../../components/Modal/modal/BasicCompletedModl";
import { DeleteCompleteModal } from "./popup/Modal/DeleteCompleteModal";
import { MultipleDeleteModal } from "../../../components/Modal/modal/MultipleDeleteModal";
import { AlertModal } from "./popup/Modal/AlertModal";

export default function DeclarationMessage() {
  const {
    selectedRows: ts_1,
    toggleRowsSelection: tt_1,
    resetSelectedRows,
  } = useMultiRowSelection();

  const [mbtlNo, setMbtlNo] = useState("");

  const { register, getValues } = useForm({
    defaultValues: {
      mbtlNo: "",
    },
  });

  const { currentPage: l_c, onChangePage: l_cp } = usePagination();
  const { currentPage: r_c, onChangePage: r_cp } = usePagination();

  const spam = {
    url: PathConstants.Message.Sapm,
    windowName: "방송통신위원회 스팸 등록",
    windowFeatures: "width=1200,height=500,scrollbars=yes,resizable=yes",
  };

  const groupCell = {
    url: PathConstants.Message.GroupCell,
    windowName: "방송통신위원회 그룹셀",
  };

  const {
    countValues: lt_v,
    selectValue: lt_s,
    handleChange: lt_c,
  } = useTableSelect();
  const {
    countValues: rt_v,
    selectValue: rt_s,
    handleChange: rt_c,
  } = useTableSelect();

  const onClickGetMsg = (mbtlNo) => {
    setMbtlNo(mbtlNo);
  };

  // -----------------------------API-----------------------------

  const { data: groupList } = useGetKccGroupList();

  const {
    selectListData: sd_0,
    selectValue: s_0,
    handleChange: o_0,
  } = useSelect(
    [{ groupNo: "", groupNm: "전체" }, ...(groupList?.data?.contents || [])],
    "groupNo",
    "groupNm"
  );

  // 왼쪽 테이블 리스트
  const { data: kccListData, refetch: refetchList } = useGetKccList({
    page: l_c,
    limit: lt_s,
    groupNo: s_0,
    mbtlNo: getValues("mbtlNo"),
  });

  // 우측 테이블 리스트
  const { data: kccMsgData, refetch: retetchMsg } = useGetKccMsg({
    page: r_c,
    limit: lt_s,
    mbtlNo: mbtlNo,
  });

  console.log("kccListData:", kccListData);
  console.log("kccMsgData:", kccMsgData);

  const { mutate: postKccReject } = usePostKccReject();
  const { mutate: deleteGroup } = useDeleteKccGroup();

  const checkApiFail = useApiRes();
  const { openModal, closeModal } = useModal();

  // 등록
  const onPost = () => {
    if (ts_1.size == 0) {
      openModal(AlertModal, {
        onClose: () => closeModal,
      });
      return;
    }

    const list = filterDataByValues({
      data: kccListData?.data?.contents,
      key: "idx",
      values: Array.from(ts_1),
    });

    const body = list.map((item) => ({ mbtlNo: item.mbtlNo }));

    postKccReject(
      {
        body: body,
      },
      {
        onSuccess: (res) => {
          console.log("수신거부 등록 결과:", res);
          const result = checkApiFail(res);
          if (result.data.message === "SUCCESS") {
            console.log("수신거부 등록 성공:", res);
            openModal(BasicCompletedModl, {
              modalId: "complete",
              stack: false,
              onClose: () => closeModal,
            });
          }
        },
      }
    );
  };

  // 삭제
  const onDelete = () => {
    const list = filterDataByValues({
      data: kccListData?.data?.contents,
      key: "idx",
      values: Array.from(ts_1),
    });

    const body = list.map((item) => ({ groupNo: item.groupNo }));

    body.map((item) => {
      openModal(MultipleDeleteModal, {
        number: ts_1.size,
        stack: false,
        onClose: () => closeModal,
        onSubmit: () => {
          deleteGroup(
            {
              groupNo: item.groupNo,
            },
            {
              onSuccess: (res) => {
                console.log("삭제 결과:", res);
                const result = checkApiFail(res);
                if (result.data.message === "SUCCESS") {
                  console.log("삭제 성공:", res);
                  openModal(DeleteCompleteModal, {
                    stack: false,
                    onClose: () => closeModal,
                  });
                }
                refetchList();
              },
            }
          );
        },
      });
    });
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      resetSelectedRows();
      setMbtlNo("");
      refetchList();
      retetchMsg();
    }
  };

  return (
    <Stack width={"100%"} height={"100%"} gap={1}>
      <GrayBox gap={1}>
        <Select
          selectData={sd_0}
          value={s_0}
          onChange={o_0}
          sx={{ width: "300px" }}
          placeholder="전체"
        />
        <SearchInput
          placeholder="입력창"
          sx={{ width: "250px", bgcolor: "primary.light" }}
          {...register("mbtlNo")}
          onKeyDown={(e) => handleKeyDown(e)}
        />
        <BasicButton sx={{ marginLeft: "auto" }} onClick={onPost}>
          수신거부등록
        </BasicButton>
        <BasicButton onClick={onDelete}>삭제</BasicButton>
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
      </GrayBox>
      <TableBox gap={2}>
        <Stack
          width={"50%"}
          height={"100%"}
          border="1px solid #E5E5E5"
          borderRadius="8px"
        >
          <TableBox.Inner>
            <CheckboxTable
              data={kccListData?.data?.contents || []}
              selectedRows={ts_1}
              toggleRowsSelection={tt_1}
            >
              <CheckboxTable.Thead>
                <CheckboxTable.Tr>
                  <CheckboxTable.CheckboxTh keyName="idx" />
                  <CheckboxTable.Th radius>그룹</CheckboxTable.Th>
                  <CheckboxTable.Th radius>신고전화번호</CheckboxTable.Th>
                  <CheckboxTable.Th radius>휴대전화</CheckboxTable.Th>
                  <CheckboxTable.Th radius>전화상담</CheckboxTable.Th>
                  <CheckboxTable.Th radius>설문</CheckboxTable.Th>
                  <CheckboxTable.Th radius>MGM</CheckboxTable.Th>
                  <CheckboxTable.Th radius>이벤트</CheckboxTable.Th>
                  <CheckboxTable.Th radius>방문상담</CheckboxTable.Th>
                  <CheckboxTable.Th radius>고객등록</CheckboxTable.Th>
                  <CheckboxTable.Th radius>메세지 조회</CheckboxTable.Th>
                </CheckboxTable.Tr>
              </CheckboxTable.Thead>

              <CheckboxTable.Tbody>
                {kccListData?.data?.contents?.map((item, index) => (
                  <CheckboxTable.Tr key={index} id={item.idx}>
                    <CheckboxTable.CheckboxTd item={item} keyName="idx" />
                    <CheckboxTable.Td>{item.grpNm}</CheckboxTable.Td>
                    <CheckboxTable.Td>{item.sttemntTelno}</CheckboxTable.Td>
                    <CheckboxTable.Td>{item.mbtlNo}</CheckboxTable.Td>
                    <CheckboxTable.Td>0</CheckboxTable.Td>
                    <CheckboxTable.Td>0</CheckboxTable.Td>
                    <CheckboxTable.Td>{item.mgm}</CheckboxTable.Td>
                    <CheckboxTable.Td>{item.event}</CheckboxTable.Td>
                    <CheckboxTable.Td>{item.cnslt}</CheckboxTable.Td>
                    <CheckboxTable.Td>0</CheckboxTable.Td>
                    <CheckboxTable.Td className="py-1 px-1 text-center align-middle">
                      <BasicButton
                        onClick={(e) => {
                          onClickGetMsg(item.mbtlNo);
                          e.preventDefault();
                          e.stopPropagation();
                        }}
                      >
                        조회
                      </BasicButton>
                    </CheckboxTable.Td>
                  </CheckboxTable.Tr>
                ))}
              </CheckboxTable.Tbody>
            </CheckboxTable>
          </TableBox.Inner>
          <CenteredBox margin={1} justifyContent={"space-between"}>
            <Pagination
              count={kccListData?.data?.totalPage || 1}
              page={l_c}
              onChange={l_cp}
            />
            <TableSelect
              total={kccListData?.data.totalCnt}
              countValues={lt_v}
              selectValue={lt_s}
              handleChange={lt_c}
            />
          </CenteredBox>
        </Stack>

        <Stack
          width={"50%"}
          height={"100%"}
          border="1px solid #E5E5E5"
          borderRadius="8px"
        >
          <TableBox.Inner>
            <BasicTable data={kccMsgData?.data?.contents}>
              <BasicTable.Th radius>전송일시</BasicTable.Th>
              <BasicTable.Th radius>구분</BasicTable.Th>
              <BasicTable.Th radius>메시지</BasicTable.Th>

              <BasicTable.Tbody>
                {kccMsgData?.data?.contents?.map((item, index) => {
                  return (
                    <BasicTable.Tr key={index}>
                      <BasicTable.Td>{item.trnsmitTxt}</BasicTable.Td>
                      <BasicTable.Td>{item.smsKnd}</BasicTable.Td>
                      <BasicTable.Td>{item.trnsmitTxt}</BasicTable.Td>
                    </BasicTable.Tr>
                  );
                })}
              </BasicTable.Tbody>
            </BasicTable>
          </TableBox.Inner>
          <CenteredBox margin={1} justifyContent={"space-between"}>
            <Pagination
              count={kccMsgData?.data?.totalPage || 1}
              page={r_c}
              onChange={r_cp}
            />

            <TableSelect
              total={kccMsgData?.data.totalCnt}
              countValues={rt_v}
              selectValue={rt_s}
              handleChange={rt_c}
            />
          </CenteredBox>
        </Stack>
      </TableBox>
    </Stack>
  );
}

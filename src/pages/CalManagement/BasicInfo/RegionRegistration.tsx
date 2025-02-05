import { Box, Stack, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import RowDragTable from "../../../components/Table/RowDragTable";
import GrayBox from "../../../components/Box/GrayBox";
import CenteredBox from "../../../components/Box/CenteredBox";
import { BasicButton } from "../../../components/Button";
import TableBox from "../../../components/Box/TableBox";
import BasicInput from "../../../components/Input/BasicInput";
import { useSingleRowSelection } from "../../../hooks/useSingleRowSelection";
import { useAreaList } from "../../../api/callCnslt";
import { AreaListItem } from "../../../types/callCnslt";
import { filterDataByValues } from "../../../utils/filterDataByValues";
import { BasicDeleteConfirmModal } from "../../../components/layout/modal/BasicDeleteConfirmModal";
import useModal from "../../../hooks/useModal";
import {
  useDeleteBasicArea,
  usePostBasicArea,
  usePutBasicArea,
} from "../../../api/calllBasic";
import { useAuthStore } from "../../../stores/authStore";
import { useApiRes } from "../../../utils/useApiRes";
import { useSptStore } from "../../../stores/sptStore";

export default function RegionRegistration() {
  const [areaList, setAreaList] = useState<AreaListItem[]>([]);
  const [areaInput, setAreaInput] = useState<any>();
  const { selectedRow, toggleRowSelection, resetSelection } =
    useSingleRowSelection(); // 행 단일 선택

  const { data: areaListApi, refetch: areaListRefetch } = useAreaList();
  //모달
  const { openModal, closeModal } = useModal();
  const { loginId } = useAuthStore(["loginId"]);

  useEffect(() => {
    if (areaListApi) {
      setAreaList(areaListApi?.data.contents);
      resetSelection();
    }
  }, [areaListApi]);

  useEffect(() => {
    const data = filterDataByValues({
      data: areaList,
      key: "areaNo",
      values: Array.from(selectedRow),
    });
    setAreaInput(data[0]);
  }, [selectedRow]);

  // ---------------------- API ----------------------
  const { mutate: postArea } = usePostBasicArea(); // 지역 등록
  const { mutate: putArea } = usePutBasicArea(); // 지역 수정
  const { mutate: deleteArea } = useDeleteBasicArea(); // 지역 삭제
  const checkApiFail = useApiRes(); // API 실패 확인 훅

  const { sptNo } = useSptStore();

  const defaultCnsltInput = {
    sptNo: sptNo,
    userId: loginId || "",
  };

  // 순서 정렬. 추후 배열을 받는 새 api로 교체
  useEffect(() => {
    if (areaListApi?.data.contents == areaList) return;

    const updatedData = areaList.map((item, index) => ({
      ...item,
      ...defaultCnsltInput,
      lnupOrd: (index + 1).toString(),
    }));

    updatedData.map((item) => {
      putArea(
        { body: item },
        {
          onSuccess: (res) => {
            console.log("정렬 응답:", res);
            checkApiFail(res);
            areaListRefetch();
          },
        }
      );
    });
  }, [areaList]);

  const onSaveArea = () => {
    const existingItem = areaInput.areaNo
      ? true
      : areaList.find((item) => item.areaNm === areaInput.areaNm);

    if (existingItem) {
      // 수정 API 호출 (PUT)
      putArea(
        { body: { ...defaultCnsltInput, ...areaInput } },
        {
          onSuccess: (res) => {
            console.log("수정 응답:", res);
            checkApiFail(res);
            areaListRefetch();
          },
        }
      );
    } else {
      // 등록 API 호출 (POST)
      postArea(
        { body: { ...defaultCnsltInput, ...areaInput } },
        {
          onSuccess: (res) => {
            console.log("등록 응답:", res);
            checkApiFail(res);
            areaListRefetch();
          },
        }
      );
    }
  };

  const onDeleteArea = () => {
    openModal(BasicDeleteConfirmModal, {
      modalId: "deleteArea",
      stack: false,
      onClose: () => closeModal,
      onSubmit: () => {
        deleteArea(
          {
            body: {
              ...areaInput,
              ...defaultCnsltInput,
            },
          },
          {
            onSuccess: (res) => {
              console.log("삭제 응답:", res);
              checkApiFail(res);
              areaListRefetch();
            },
          }
        );
      },
    });
  };

  return (
    <>
      <Box display={"flex"} width={"30%"} minWidth={"300px"} height={"100%"}>
        <TableBox>
          <TableBox.Inner>
            <TableBox>
              <TableBox.Inner>
                <RowDragTable
                  data={areaList}
                  setData={setAreaList}
                  checkbox={false}
                  selectedRows={selectedRow}
                  toggleRowsSelection={toggleRowSelection}
                  keyName="areaNo"
                >
                  <RowDragTable.Th>관리지역</RowDragTable.Th>
                  <RowDragTable.Tbody>
                    {areaList.map((item) => (
                      <RowDragTable.Tr
                        key={item.areaNo}
                        id={item.areaNo ?? ""}
                        isClicked={selectedRow.has(item.areaNo ?? "")}
                        onClick={() => toggleRowSelection(item.areaNo ?? "")}
                      >
                        <RowDragTable.Td>{item.areaNm}</RowDragTable.Td>
                      </RowDragTable.Tr>
                    ))}
                  </RowDragTable.Tbody>
                </RowDragTable>
              </TableBox.Inner>
            </TableBox>
          </TableBox.Inner>
        </TableBox>
      </Box>
      <Box display={"flex"} width={"50%"} height={"100px"}>
        <GrayBox>
          <Stack width={"100%"} gap={1}>
            <CenteredBox gap={1}>
              <Typography variant="h3" marginRight={"auto"}>
                관리지역명
              </Typography>
              <BasicButton
                onClick={() => {
                  areaListRefetch();
                }}
              >
                새로고침
              </BasicButton>
              <BasicButton onClick={onSaveArea}>저장</BasicButton>
              <BasicButton onClick={onDeleteArea}>삭제</BasicButton>
            </CenteredBox>
            <CenteredBox gap={1}>
              <Typography marginRight={3}>관리지역명</Typography>
              <BasicInput
                placeholder="입력창"
                fullWidth
                value={areaInput?.areaNm || ""}
                onChange={(e) =>
                  setAreaInput({
                    ...areaInput,
                    areaNm: e.target.value,
                  })
                }
              />
            </CenteredBox>
          </Stack>
        </GrayBox>
      </Box>
    </>
  );
}

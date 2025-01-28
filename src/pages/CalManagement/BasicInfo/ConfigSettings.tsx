import { IconButton, Stack, Typography } from "@mui/material";
import GrayBox from "../../../components/Box/GrayBox";
import SearchInput from "../../../components/Input/SearchInput";
import TableBox from "../../../components/Box/TableBox";
import RowDragTable from "../../../components/Table/RowDragTable";
import { useEffect, useState } from "react";
import { RiDeleteBinLine } from "react-icons/ri";
import { BasicButton } from "../../../components/Button";
import { useCnsltItemList, useItemDetList } from "../../../api/callCnslt";
import { CnsltItem, DetailItem } from "../../../types/callCnslt";
import { useSingleRowSelection } from "../../../hooks/useSingleRowSelection";
import { filterDataByValues } from "../../../utils/filterDataByValues";
import {
  useDeleteBasicItem,
  useDeleteBasicItemDet,
  usePostBasicItem,
  usePostBasicItemDet,
  usePutBasicItem,
  usePutBasicItemDet,
  useReorderBasicItem,
  useReorderBasicItemDet,
} from "../../../api/calllBasic";
import getItemByStorageOne from "../../../utils/getItemByStorageOne";
import { useAuthStore } from "../../../stores/authStore";
import { useApiRes } from "../../../utils/useApiRes";
import useModal from "../../../hooks/useModal";
import { BasicDeleteConfirmModal } from "../../../components/layout/modal/BasicDeleteConfirmModal";
import useDidMountEffect from "../../../hooks/useDidMountEffect";
import BasicInput from "../../../components/Input/BasicInput";
import CenteredBox from "../../../components/Box/CenteredBox";

export default function ConfigSetting() {
  const sptNo = getItemByStorageOne("selectedSite")?.sptNo;
  const [cnsltList, setCnsltList] = useState<CnsltItem[]>([]);
  const [detList, setDetList] = useState<DetailItem[]>([]);

  const {
    selectedRow: selectedCnslt,
    toggleRowSelection: toggleCnslt,
    resetSelection: resetSelectedCnslt,
  } = useSingleRowSelection();

  const {
    selectedRow: selectedDet,
    toggleRowSelection: toggleDet,
    resetSelection: resetSelectedDet,
  } = useSingleRowSelection();

  const [cnsltInput, setCnsltInput] = useState<any>();
  const [detInput, setDetInput] = useState<any>();
  const { loginId } = useAuthStore(["loginId"]);

  const { data: cnsltListApi, refetch: refetchCnslt } = useCnsltItemList();

  // 선택한 상담 항목 목록에 대한 상세항목 api
  const { data: itemDetList, refetch: refetchDet } = useItemDetList({
    itemNo: Array.from(selectedCnslt)[0] ?? "",
  });

  useEffect(() => {
    if (cnsltListApi) {
      setCnsltList(cnsltListApi?.data.contents);
      resetSelectedCnslt();
    }
  }, [cnsltListApi]);

  useEffect(() => {
    if (itemDetList) {
      setDetList(itemDetList?.data.contents);
      resetSelectedDet();
    }
  }, [itemDetList]);

  useEffect(() => {
    if (selectedCnslt.size == 0) {
      setDetList([]);
      setCnsltInput({});
      return;
    }
    const data = filterDataByValues({
      data: cnsltList,
      key: "itemNo",
      values: Array.from(selectedCnslt),
    });
    setCnsltInput(data[0]);
  }, [selectedCnslt]);

  useEffect(() => {
    const data = filterDataByValues({
      data: detList,
      key: "detailNo",
      values: Array.from(selectedDet),
    });
    setDetInput(data[0]);
  }, [selectedDet]);

  const clearCnsltInput = () => {
    setCnsltInput({});
    resetSelectedCnslt();
  };

  const clearDetInput = () => {
    setDetInput({});
    resetSelectedDet();
  };

  // ---------------------- API ----------------------
  const { mutate: postCnslt } = usePostBasicItem(); // 상담 항목 등록
  const { mutate: putCnslt } = usePutBasicItem(); // 상담 항목 수정
  const { mutate: reorderCnslt } = useReorderBasicItem(); // 상담 항목 순서 변경
  const { mutate: deleteCnslt } = useDeleteBasicItem(); // 상담 항목 삭제

  const { mutate: postDet } = usePostBasicItemDet(); // 상세 항목 등록
  const { mutate: putDet } = usePutBasicItemDet(); // 상세 항목 수정
  const { mutate: reorderDet } = useReorderBasicItemDet();
  const { mutate: deleteDet } = useDeleteBasicItemDet(); // 상세 항목 삭제

  const checkApiFail = useApiRes();

  //모달
  const { openModal, closeModal } = useModal();

  // 상담항목 - 드래그 앤 드롭 시 순서 변경 api 전송
  useDidMountEffect(() => {
    // lnupOrd를 배열 번호 + 1로 업데이트
    if (cnsltListApi?.data.contents == cnsltList) return;
    const updatedData = cnsltList.map((item, index) => ({
      sptNo: sptNo || "",
      itemNo: item.itemNo,
      lnupOrd: (index + 1).toString(),
      userId: loginId || "",
    }));
    reorderCnslt(
      { body: updatedData },
      {
        onSuccess: (res) => {
          console.log("항목 정렬 응답:", res);
          checkApiFail(res);
          refetchCnslt();
        },
      }
    );
  }, [cnsltList]);

  // 상세항목 - 드래그 앤 드롭 시 순서 변경 api 전송
  useDidMountEffect(() => {
    if (
      !detList?.length || // detList가 비었거나
      !itemDetList || // itemDetList가 FALSY
      itemDetList.data.contents === detList // 둘의 데이터가 같을 경우 (최초 로드)
    )
      return;

    const updatedData = detList.map((item, index) => ({
      sptNo: sptNo || "",
      detailNo: item.detailNo,
      itemNo: item.itemNo,
      lnupOrd: (index + 1).toString(),
      userId: loginId || "",
    }));
    reorderDet(
      { body: updatedData },
      {
        onSuccess: (res) => {
          console.log("상세 정렬 응답:", res);
          checkApiFail(res);
          refetchDet();
        },
      }
    );
  }, [detList]);

  const onDeleteCnslt = (item: CnsltItem) => {
    openModal(BasicDeleteConfirmModal, {
      modalId: "deleteCnslt",
      stack: false, //단일 모달 모드
      onClose: () => closeModal,
      onSubmit: () => {
        deleteCnslt(
          {
            body: {
              itemNo: item.itemNo,
              sptNo: sptNo,
              userId: loginId || "",
              detailNo: "",
            },
          },
          {
            onSuccess: (res) => {
              console.log("삭제 응답:", res);
              checkApiFail(res);
              refetchCnslt();
            },
          }
        );
      },
    });
  };

  // 상세 삭제
  const onDeleteDet = (item: DetailItem) => {
    openModal(BasicDeleteConfirmModal, {
      modalId: "deleteDet",
      stack: false, //단일 모달 모드
      onClose: () => closeModal,
      onSubmit: () => {
        deleteDet(
          {
            body: {
              itemNo: item.itemNo,
              sptNo: sptNo,
              userId: loginId || "",
              detailNo: item.detailNo,
            },
          },
          {
            onSuccess: (res) => {
              console.log("삭제 응답:", res);
              checkApiFail(res);
              refetchDet();
            },
          }
        );
      },
    });
  };

  const defaultCnsltInput = {
    sptNo: sptNo,
    userId: loginId || "",
  };

  const onAddCnslt = () => {
    const existingItem = cnsltInput.itemNo
      ? true
      : cnsltList.find((item) => item.itemNm === cnsltInput.itemNm);

    if (existingItem) {
      // 수정 API 호출 (PUT)
      putCnslt(
        {
          body: {
            ...cnsltInput,
            ...defaultCnsltInput,
          },
        },
        {
          onSuccess: (res) => {
            console.log("수정 응답:", res);
            checkApiFail(res);
            refetchCnslt();
          },
        }
      );
    } else {
      // 등록 API 호출 (POST)
      postCnslt(
        {
          body: {
            ...cnsltInput,
            ...defaultCnsltInput,
            useYn: cnsltInput.useYn || "N",
          },
        },
        {
          onSuccess: (res) => {
            console.log("등록 응답:", res);
            checkApiFail(res);
            refetchCnslt();
          },
        }
      );
    }
  };

  const onAddDet = () => {
    const existingItem = detInput.detailNo
      ? true
      : detList.find((item) => item.detailNm === detInput.detailNm);

    const { itemNm, ...filteredData } = {
      ...cnsltInput,
      ...detInput,
      ...defaultCnsltInput,
      useYn: detInput.useYn || "N",
    };

    console.log(filteredData);

    if (existingItem) {
      // 수정 API 호출 (PUT)
      putDet(
        { body: filteredData },
        {
          onSuccess: (res) => {
            console.log("수정 응답:", res);
            checkApiFail(res);
            refetchDet();
          },
        }
      );
    } else {
      // 등록 API 호출 (POST)
      postDet(
        {
          body: filteredData,
        },
        {
          onSuccess: (res) => {
            console.log("등록 응답:", res);
            checkApiFail(res);
            refetchDet();
          },
        }
      );
    }
  };

  return (
    <>
      <Stack width={"50%"} minWidth={"400px"} height={"100%"} gap={1}>
        <GrayBox gap={1}>
          <Typography>상담항목</Typography>
        </GrayBox>
        <TableBox>
          <TableBox.Inner>
            <RowDragTable
              keyName="itemNo"
              data={cnsltList}
              checkbox={false}
              setData={setCnsltList}
              selectedRows={selectedCnslt}
              toggleRowsSelection={toggleCnslt}
            >
              <RowDragTable.Th>상담항목</RowDragTable.Th>
              <RowDragTable.Th>사용</RowDragTable.Th>
              <RowDragTable.Th>삭제</RowDragTable.Th>

              <RowDragTable.Tbody>
                {cnsltList?.map((item) => (
                  <RowDragTable.Tr
                    key={item.itemNo}
                    id={item.itemNo ?? ""}
                    isClicked={selectedCnslt.has(item.itemNo ?? "")}
                    onClick={() => {
                      toggleCnslt(item.itemNo ?? "");
                    }}
                  >
                    <RowDragTable.Td>{item.itemNm}</RowDragTable.Td>
                    <RowDragTable.Td>{item.useYn}</RowDragTable.Td>
                    <RowDragTable.Td>
                      <IconButton
                        onClick={(e) => {
                          onDeleteCnslt(item);
                          e.stopPropagation();
                        }}
                      >
                        <RiDeleteBinLine color="#f4475f" />
                      </IconButton>
                    </RowDragTable.Td>
                  </RowDragTable.Tr>
                ))}
              </RowDragTable.Tbody>
            </RowDragTable>
          </TableBox.Inner>
        </TableBox>
        <GrayBox gap={1}>
          <Stack width={"100%"} gap={1}>
            <CenteredBox gap={1}>
              <Typography>상담항목</Typography>
              <BasicInput
                placeholder="입력창"
                value={cnsltInput?.itemNm || ""}
                onChange={(e) =>
                  setCnsltInput({
                    ...cnsltInput,
                    itemNm: e.target.value,
                  })
                }
              />
              <input
                type="checkbox"
                checked={cnsltInput?.useYn === "Y" ? true : false}
                onChange={(e) =>
                  setCnsltInput({
                    ...cnsltInput,
                    useYn: e.target.checked ? "Y" : "N",
                  })
                }
              />
              <Typography>사용</Typography>
            </CenteredBox>
            <CenteredBox gap={1}>
              <BasicButton sx={{ marginLeft: "auto" }} onClick={clearCnsltInput}>
                추가
              </BasicButton>
              <BasicButton onClick={onAddCnslt}>저장</BasicButton>
            </CenteredBox>
          </Stack>
        </GrayBox>
      </Stack>
      <Stack width={"50%"} minWidth={"400px"} height={"100%"} gap={1}>
        <GrayBox gap={1}>
          <Typography>상담항목</Typography>
        </GrayBox>
        <TableBox>
          <TableBox.Inner>
            <RowDragTable
              data={detList}
              checkbox={false}
              setData={setDetList}
              keyName="detailNo"
              selectedRows={selectedDet}
              toggleRowsSelection={toggleDet}
            >
              <RowDragTable.Th>상담항목</RowDragTable.Th>
              <RowDragTable.Th>사용</RowDragTable.Th>
              <RowDragTable.Th>삭제</RowDragTable.Th>

              <RowDragTable.Tbody>
                {detList?.map((item) => (
                  <RowDragTable.Tr
                    key={item.detailNo}
                    id={item.detailNo}
                    isClicked={selectedDet.has(item.detailNo ?? "")}
                    onClick={() => {
                      toggleDet(item.detailNo ?? "");
                    }}
                  >
                    <RowDragTable.Td>{item.detailNm}</RowDragTable.Td>
                    <RowDragTable.Td>{item.useYn}</RowDragTable.Td>
                    <RowDragTable.Td>
                      <IconButton
                        onClick={(e) => {
                          onDeleteDet(item);
                          e.stopPropagation();
                        }}
                      >
                        <RiDeleteBinLine color="#f4475f" />
                      </IconButton>
                    </RowDragTable.Td>
                  </RowDragTable.Tr>
                ))}
              </RowDragTable.Tbody>
            </RowDragTable>
          </TableBox.Inner>
        </TableBox>
        <GrayBox gap={1}>
          <Stack width={"100%"} gap={1}>
            <CenteredBox gap={1}>
              <Typography>상담세부항목</Typography>
              <BasicInput
                placeholder="입력창"
                value={detInput?.detailNm || ""}
                onChange={(e) =>
                  setDetInput({
                    ...detInput,
                    detailNm: e.target.value,
                  })
                }
              />
              <input
                type="checkbox"
                checked={detInput?.useYn === "Y" ? true : false}
                onChange={(e) =>
                  setDetInput({
                    ...detInput,
                    useYn: e.target.checked ? "Y" : "N",
                  })
                }
              />
              <Typography>사용</Typography>
            </CenteredBox>
            <CenteredBox gap={1}>
              <BasicButton sx={{ marginLeft: "auto" }} onClick={clearDetInput}>
                추가
              </BasicButton>
              <BasicButton onClick={onAddDet}>저장</BasicButton>
            </CenteredBox>
          </Stack>
        </GrayBox>
      </Stack>
    </>
  );
}

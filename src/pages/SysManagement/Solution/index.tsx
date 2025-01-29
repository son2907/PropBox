import { Box, Stack, Typography } from "@mui/material";
import MenuGroup from "./MenuGroup";
import SolutionGroup from "./SolutionGroup";
import useTabs from "../../../hooks/useTabs";
import TableBox from "../../../components/Box/TableBox";
import RowDragTable from "../../../components/Table/RowDragTable";
import { selectTestData, tableTestData } from "../../../utils/testData";
import { useEffect, useState } from "react";
import { tableDataType } from "../../../types";
import useSelect from "../../../hooks/useSelect";
import { Select } from "../../../components/Select";
import GrayBox from "../../../components/Box/GrayBox";
import BasicInput from "../../../components/Input/BasicInput";
import { BasicButton, ToggleButton } from "../../../components/Button";
import useToggleButtton from "../../../hooks/useToggleButton";
import api from "../../../api";
import { deleteMenu, deleteSolution, insertMenu, insertSolution, reorderSolution, updateMenu, updateSolution, useMenuDetail, useSolutionDetail, useSolutionList, useSolutionMenuList } from "../../../api/solutionList";
import { licenseMethodType } from "../../../api/licenseMethod";
import { useAuthStore } from "../../../stores/authStore";
import useModal from "../../../hooks/useModal";
import { InsertCompletedModal } from "../../../components/layout/modal/InsertCompletedModal";
import { UpdateCompletedModal } from "../../../components/layout/modal/UpdateCompletedModal";
import { ConfirmDeleteModal } from "../../../components/layout/modal/ConfirmDeleteModal";
import { DeleteCompletedModal } from "../../../components/layout/modal/DeleteCompletedModal";
import { EmptySelectModal } from "../../../components/layout/modal/EmptySelectModal";
import { EmptyDataModal } from "../../../components/layout/modal/EmptyDataModal";
import { solutionDetailType, SolutionListType, solutionMenuDetailType, SolutionMenuListType } from "../../../types/solution";
import useDidMountEffect from "../../../hooks/useDidMountEffect";
import { useApiRes } from "../../../utils/useApiRes";

export default function SolutionManagement() {
  //api를 호출하기위해 userID 불러오기
  const { loginId } = useAuthStore(["loginId"]);

  //추가인지 수정인지 state관리
  const [isUpdate, setIsUpdate] = useState(false);
  // 메뉴 추가인지 수정인지 state 관리
  const [isMenuUpdate, setMuneUpdate] = useState(false);

  //모달
  const { openModal, closeModal } = useModal();

  // 솔루션 데이터
  const [solutionList, setSolutionList] = useState<SolutionListType[]>([]);
  const { data: solutionData, refetch: refetchSolutionData } =
    useSolutionList();
  const [selectedSolutionId, setSelectedSolutionId] = useState<string>("");

  // 솔루션 상세 데이터
  const [solutionDetail, setSolutionDetail] = useState<solutionDetailType | null>(null);
  const [selectMenuID, setSelectMenuID] = useState<string>("");
  const { data: solutionDetailData, isSuccess: isSolutionDetailSuccess } =
    useSolutionDetail(selectedSolutionId);
  //솔루션 데이터 상세
  const [solutionID, setSolutionID] = useState("");
  const [solutionName, setSolutionName] = useState("");
  const [solutionIsUes, setSolutionIsUse] = useState(true);
  const [solutionLicenseName, setSolutionLicenseMethodName] = useState("");
  const [solutionUnUseUrl, setSolutionUnUseUrl] = useState("");
  const [solutionRmk, setSolutionRmk] = useState("");
  const [solutionLicenseKey, setSolutionLicenseKey] = useState("");
  const [solutionUseYn, setSolutionUseYn] = useState(true);

  // 메뉴 데이터
  const [solutionMenuList, setSolutionMenuList] = useState<SolutionMenuListType[]>([]);
  const { data: menuData, refetch: refetchMenuData } =
    useSolutionMenuList(selectedSolutionId);

  // 메뉴 데이터 상세
  const { data: menuDetailData, isSuccess: isMenuDetailSuccess } =
    useMenuDetail(selectMenuID);
  const [menuDetail, setMenuDetail] = useState<solutionMenuDetailType | null>(
    null
  );
  const [menuID, setMuneID] = useState("");
  const [menuName, setMenuName] = useState("");
  const [menuLicenseCheck, setMenuLicenseCheck] = useState("");
  const [menuUrl, setMenuUrl] = useState("");
  const [iconUrl, setIconUrl] = useState("");
  const [menuRmk, setMenuRmk] = useState("");
  const [menuUseYn, setMenuUseYn] = useState(true);

  //라이선스 방식 데이터
  const { isSuccess, data } = api.LicenseMethod.useLicenseMethod();
  const [licenseMethodData, setLicenseMethodData] = useState<
    licenseMethodType[]
  >([]);

  const selectData = [
    { value: "Y", data: "사용" },
    { value: "N", data: "미사용" },
  ];

  const { selectListData, selectValue, handleChange } = useSelect(
    licenseMethodData,
    "cd", // 현장 번호
    "cdNm" // 현장명
  );

  const {
    selectListData: sd_0,
    selectValue: s_0,
    handleChange: o_0,
  } = useSelect(selectTestData, "value", "data");
  const {
    selectListData: sd_1,
    selectValue: s_1,
    handleChange: o_1,
  } = useSelect(selectData, "value", "data");

  const { toggle: solutionIsUse, onChange: solutionIsUseToggle } =
    useToggleButtton({
      defaultValue: true,
    });

  const { toggle: menuIsUse, onChange: menuIsUseToggle } = useToggleButtton({
    defaultValue: true,
  });

  // 삭제를 위한 api
  const { mutate: deleteSolutionAPI } = deleteSolution();

  // 메뉴 삭제를 위한 api
  const { mutate: deleteMenuAPI } = deleteMenu();

  //순서변경 api
  const { mutate: reorderSolutionAPI } = reorderSolution(); // 솔루션 순서 변경
  const checkApiFail = useApiRes();

  // 솔루션 데이터 로드 후 상태 업데이트
  useEffect(() => {
    if (solutionData?.data.contents) {
      setSolutionList(solutionData.data.contents);
    }
    console.log("");
  }, [solutionData]);

  // 솔루션 순서 변경 - 드래그 앤 드롭 시 순서 변경 api 전송
  useDidMountEffect(() => {
    // lnupOrd를 배열 번호 + 1로 업데이트
    if (solutionData?.data.contents == solutionList) return;
    const updatedData = solutionList.map((item, index) => ({
      slutnId: item.slutnId || "",
      lnupOrd: (index + 1).toString(),
      userId: loginId || "",
    }));
    reorderSolutionAPI(
      { body: updatedData },
      {
        onSuccess: (res) => {
          console.log("항목 정렬 응답:", res);
          checkApiFail(res);
          refetchSolutionData();
        },
      }
    );
  }, [solutionList]);

  // 솔루션 순서 변경 - 드래그 앤 드롭 시 순서 변경 api 전송
  useDidMountEffect(() => {
    // lnupOrd를 배열 번호 + 1로 업데이트
    if (menuData?.data.contents == solutionMenuList) return;
    const updatedData = solutionMenuList.map((item, index) => ({
      slutnId: item.slutnId || "",
      lnupOrd: (index + 1).toString(),
      userId: loginId || "",
    }));
    reorderSolutionAPI(
      { body: updatedData },
      {
        onSuccess: (res) => {
          console.log("항목 정렬 응답:", res);
          checkApiFail(res);
          refetchMenuData();
        },
      }
    );
  }, [solutionMenuList]);

  //모달
  //수정 완료 모달
  const updateCompletedModal = () => {
    openModal(UpdateCompletedModal, {
      modalId: "UpdateCompletedModal",
      stack: false,
      onClose: () => closeModal,
      onSubmit: () => {
        window.location.reload();
      },
    });
  };

  // 추가 완료 모달
  const insertCompletedModal = () => {
    openModal(InsertCompletedModal, {
      modalId: "InsertCompletedModal",
      stack: false,
      onClose: () => closeModal,
      onSubmit: () => {
        window.location.reload();
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
        handleDelete();
      },
    });
  };

  const MenuconfirmDeleteModal = () => {
    openModal(ConfirmDeleteModal, {
      modalId: "noticeDelete",
      stack: false, //단일 모달 모드
      onClose: () => closeModal,
      onSubmit: () => {
        handleMenuDelete();
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
        window.close();
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

  //입력한 값이 없을때
  const emptyDataModal = () => {
    openModal(EmptyDataModal, {
      modalId: "emptyDataModal",
      stack: false,
      onClose: () => closeModal,
      onSubmit: () => {
        window.close();
      },
    });
  };

  useEffect(() => {
    console.log("선택한 솔루션 아이디", selectedSolutionId);
    if (solutionDetailData?.data.contents) {
      setSolutionDetail(solutionDetailData.data.contents);
    }
  }, [solutionDetailData]);

  useEffect(() => {
    console.log("선택한 메뉴 아이디", selectMenuID);
    if (menuDetailData?.data.contents) {
      setMenuDetail(menuDetailData.data.contents);
    }
  }, [menuDetailData]);

  useEffect(() => {
    if (solutionDetail) {
      console.log("솔루션 상세", solutionDetail);
      setSolutionID(solutionDetail.slutnId);
      setSolutionName(solutionDetail.slutnNm);
      setSolutionIsUse(solutionDetail.useYn === "Y" ? true : false);
      setSolutionLicenseMethodName(solutionDetail.lisneSeNm);
      setSolutionUnUseUrl(solutionDetail.authorNthgUrl);
      setSolutionRmk(solutionDetail.rmk);
      setSolutionLicenseKey(solutionDetail.lisneSeCd);
      setSolutionUseYn(solutionDetail.useYn === "Y" ? true : false);
    }
  }, [solutionDetail]);

  useEffect(() => {
    if (solutionDetail && solutionDetail.lisneSeNm) {
      setSolutionLicenseMethodName(solutionDetail.lisneSeNm); // 초기 값 설정
      setSolutionLicenseKey(solutionDetail.lisneSeCd);
    }
  }, [solutionDetail]);

  useEffect(() => {
    console.log("메뉴 상세정보", menuDetail);
    if (menuDetail) {
      setMuneID(menuDetail.slutnId);
      setMenuName(menuDetail.slutnNm);
      setMenuLicenseCheck(menuDetail.lisneCnfirmYn);
      setMenuUrl(menuDetail.url);
      setIconUrl(menuDetail.iconFlpth);
      setMenuRmk(menuDetail.rmk);
      setMenuUseYn(menuDetail.useYn === "Y" ? true : false);
    }
  }, [menuDetail]);

  // 메뉴 데이터 로드 후 상태 업데이트
  useEffect(() => {
    if (menuData?.data.contents) {
      setSolutionMenuList(menuData.data.contents);
    }
  }, [menuData]);

  //라이선스방식 api 호출
  useEffect(() => {
    if (data?.data?.contents) {
      setLicenseMethodData(data.data.contents);
      console.log("라이선스방식 리스트 출력", data.data.contents);
    }
  }, [data, isSuccess]);

  //솔루션 리스트에서 선택
  const handleRowClick = (id: string) => {
    setIsUpdate(true); // Row 클릭 시 수정 모드로 설정
    setSelectedSolutionId((prevId) => {
      const newId = prevId === id ? "" : id; // 이미 선택된 ID면 해제
      console.log("Selected Solution ID:", newId); // 선택된 ID를 콘솔에 출력
      return newId;
    });
  };

  const handleMenuRowClick = (id: string) => {
    setMuneUpdate(true);
    setSelectMenuID((prevId) => {
      const newId = prevId === id ? "" : id; // 이미 선택된 ID면 해제
      console.log("선택한 메뉴 아이디:", newId); // 선택된 ID를 콘솔에 출력
      return newId;
    });
  };

  //솔루션 상세 수정
  const solutionUpdateReqData = {
    body: {
      slutnId: solutionID,
      upperSlutnId: "000000",
      slutnNm: solutionName,
      lisneSeCd: solutionLicenseKey,
      lisneCnfirmYn: solutionIsUes === true ? "Y" : "N",
      url: solutionUnUseUrl,
      iconFlpth: "",
      authorNthgUrl: solutionUnUseUrl,
      lnupOrd: "",
      rmk: solutionRmk,
    },
  };

  //솔루션 등록을 위한 데이터
  const solutionInsertReqData = {
    body: {
      slutnId: solutionID,
      upperSlutnId: "000000",
      slutnNm: solutionName,
      lisneSeCd: solutionLicenseKey,
      lisneCnfirmYn: solutionIsUes === true ? "Y" : "N",
      authorNthgUrl: solutionUnUseUrl,
      useYn: solutionIsUse ? "Y" : "N",
      lnupOrd: "0",
      rmk: solutionRmk,
      userId: loginId,
    },
  };

  // 메뉴 상세 수정
  const menuUpdateReqData = {
    body: {
      slutnId: menuID,
      upperSlutnId: selectedSolutionId,
      slutnNm: menuName,
      lisneSeCd: "",
      lisneCnfirmYn: solutionIsUes === true ? "Y" : "N",
      url: menuUrl,
      iconFlpth: iconUrl,
      authorNthgUrl: "",
      lnupOrd: "",
      rmk: menuRmk,
    },
  };

  //메뉴 등록을 위한 데이터
  const menuInsertReqData = {
    body: {
      slutnId: menuID,
      upperSlutnId: selectedSolutionId,
      slutnNm: menuName,
      lisneCnfirmYn: menuLicenseCheck,
      url: menuUrl,
      iconFlpth: iconUrl,
      useYn: menuIsUse ? "Y" : "N",
      delYn: "",
      lnupOrd: "0",
      rmk: menuRmk,
      userId: loginId,
    },
  };

  //api 호출
  // 솔루션 수정 API
  const { mutate: updateSolutionDetailAPI } = updateSolution(
    solutionUpdateReqData
  );
  // 솔루션 추가 API
  const { mutate: insertSolutionAPI } = insertSolution(solutionInsertReqData);
  // 메뉴 수정 API
  const { mutate: updateMenuDetailAPI } = updateMenu(menuUpdateReqData);
  // 메뉴 추가 API
  const { mutate: insertMenuAPI } = insertMenu(menuInsertReqData);

  //수정버튼 클릭시
  const handleSave = () => {
    console.log("수정인지 추가인지", isUpdate);
    if (isUpdate) {
      console.log("데이터 확인", solutionUpdateReqData);
      if (solutionUpdateReqData.body.slutnId) {
        updateSolutionDetailAPI(solutionUpdateReqData, {
          onSuccess: (response) => {
            console.log("솔루션 상세 수정 성공");
            if (response.data.result === "SUCCESS") {
              console.log("수정완");
              updateCompletedModal();
            } else {
              console.warn("result가 SUCCESS가 아닙니다.");
            }
          },
          onError: (error) => {
            console.error("솔루션 수정 실패:", error);
          },
        });
      } else {
        console.log("솔루션 아이디가 비워져있음");
        emptySelectionModal();
        return;
      }
    } else {
      console.log("데이터 확인", solutionInsertReqData);
      if (solutionInsertReqData.body.slutnId) {
        insertSolutionAPI(solutionInsertReqData, {
          onSuccess: (response) => {
            console.log("솔루션 추가 성공");
            if (response.data.result === "SUCCESS") {
              console.log("수정완");
              insertCompletedModal();
            }
          },
        });
      } else {
        console.log("솔루션 아이디가 비워져있음");
        emptyDataModal();
        return;
      }
    }
  };

  //메뉴 추가 및 수정
  const handleMenuSave = () => {
    console.log("상위 솔루션 번호가 뭔가요 : ", selectedSolutionId);
    console.log(
      "메뉴 추가인지 수정인지 false면 추가 true면 수정 : ",
      isMenuUpdate
    );
    if (isMenuUpdate) {
      console.log("메뉴 수정을 위한 데이터 확인", menuUpdateReqData);
      if (menuUpdateReqData.body.slutnId) {
        updateMenuDetailAPI(menuUpdateReqData, {
          onSuccess: (response) => {
            if (response.data.result === "SUCCESS") {
              console.log("수정완");
              updateCompletedModal();
            } else {
              console.warn("result가 SUCCESS가 아닙니다.");
            }
          },
          onError: (error) => {
            console.error("메뉴 수정 실패:", error);
          },
        });
      } else {
        emptySelectionModal();
        return;
      }
    } else {
      console.log("메뉴 추가를 위한 데이터 확인", menuInsertReqData);
      if (menuInsertReqData.body.slutnId) {
        insertMenuAPI(menuInsertReqData, {
          onSuccess: (response) => {
            if (response.data.result === "SUCCESS") {
              console.log("메뉴 추가 성공");
              insertCompletedModal();
            }
          },
        });
      } else {
        emptyDataModal();
        return;
      }
    }
  };

  //추가
  const handleAdd = () => {
    setIsUpdate(false); // 추가 버튼 클릭 시 isUpdate를 false로 설정
    setSelectedSolutionId(""); // 기존 선택된 ID를 초기화 (선택된 항목 해제)
    setSolutionID(""); // 필드 값 초기화
    setSolutionName("");
    setSolutionLicenseMethodName("");
    setSolutionLicenseKey("");
    setSolutionIsUse(true); // 기본값 설정
    setSolutionUnUseUrl("");
    setSolutionRmk("");
  };

  //메뉴 추가
  const handleMenuAdd = () => {
    setMuneUpdate(false);
    setSelectMenuID("");
    setMuneID("");
    setMenuName("");
    setMenuLicenseCheck("");
    setMenuUrl("");
    setIconUrl("");
    setMenuRmk("");
    setMenuUseYn(true);
  };

  const handleDelete = () => {
    if (!solutionID) {
      console.log("id 값이 존재하지 않습니다.");
      return;
    }

    //삭제
    const deleteSolutionData = {
      body: {
        slutnId: solutionID,
        upperSlutnId: "",
        slutnNm: "",
        lisneSeCd: "",
        lisneSeNm: "",
        lisneCnfirmYn: "",
        url: "",
        iconFlpth: "",
        authorNthgUrl: "",
        useYn: "",
        delYn: "",
        lnupOrd: "",
        rmk: "",
        regrId: "",
        updrId: loginId,
      },
    };

    console.log("삭제 요청 데이터: ", deleteSolutionData);

    deleteSolutionAPI(deleteSolutionData, {
      onSuccess: (response) => {
        console.log("삭제 성공", response);
        if (response.data.result === "SUCCESS") {
          deleteCompletedModal();
          window.location.reload();
        } else {
          console.warn("result가 SUCCESS가 아닙니다.");
        }
      },
      onError: (error) => {
        console.error("삭제 실패:", error);
      },
    });
  };

  const handleMenuDelete = () => {
    if (!selectMenuID) {
      console.log("선택된 데이터가 없습니다.");
      return;
    }

    //삭제
    const deleteMenuReqData = {
      body: {
        slutnId: selectMenuID,
        upperSlutnId: "",
        slutnNm: "",
        lisneSeCd: "",
        lisneSeNm: "",
        lisneCnfirmYn: "",
        url: "",
        iconFlpth: "",
        authorNthgUrl: "",
        useYn: "",
        delYn: "",
        lnupOrd: "",
        rmk: "",
        regrId: "",
        updrId: loginId,
      },
    };

    console.log("삭제 메뉴 데이터 : ", deleteMenuReqData);

    deleteMenuAPI(deleteMenuReqData, {
      onSuccess: (response) => {
        console.log("삭제 성공", response);
        if (response.data.result === "SUCCESS") {
          deleteCompletedModal();
          window.location.reload();
        } else {
          console.warn("result가 SUCCESS가 아닙니다.");
        }
      },
      onError: (error) => {
        console.error("삭제 실패:", error);
      },
    });
  };

  return (
    <>
      <Stack width={"100%"} height={"100%"} gap={1}>
        <TableBox gap={1}>
          <Stack width={"50%"} height={"100%"} gap={1}>
            <Stack width={"100%"} height={"60%"} overflow={"auto"}>
              <RowDragTable
                keyName="slutnId"
                checkbox={false}
                data={solutionList.map((item) => ({
                  ...item,
                  id: item.slutnId,
                }))}
                setData={setSolutionList}
              >
                <RowDragTable.Th>솔루션ID</RowDragTable.Th>
                <RowDragTable.Th>솔루션이름</RowDragTable.Th>
                <RowDragTable.Th>라이선스방식</RowDragTable.Th>

                <RowDragTable.Tbody>
                  {solutionList.map((item) => (
                    <RowDragTable.Tr
                      key={item.slutnId}
                      id={item.slutnId}
                      onClick={() => handleRowClick(item.slutnId)}
                      isClicked={selectedSolutionId === item.slutnId} // 선택 여부 반영
                    >
                      <RowDragTable.Td>{item.slutnId}</RowDragTable.Td>
                      <RowDragTable.Td>{item.slutnNm}</RowDragTable.Td>
                      <RowDragTable.Td>{item.lisneSeNm}</RowDragTable.Td>
                    </RowDragTable.Tr>
                  ))}
                </RowDragTable.Tbody>
              </RowDragTable>
            </Stack>
            <GrayBox width={"100%"} height={"40%"}>
              <Stack width={"100%"} height={"100%"} gap={1}>
                <Stack
                  width={"100%"}
                  height={"10%"}
                  marginTop={2}
                  marginBottom={2}
                >
                  <Typography
                    color="primary.dark"
                    fontWeight={"bold"}
                    fontSize={"22px"}
                  >
                    솔루션 상세정보
                  </Typography>
                </Stack>
                <Stack
                  width={"100%"}
                  height={"80%"}
                  overflow={"auto"}
                  gap={1}
                  paddingBottom={1}
                >
                  <Stack gap={1}>
                    <Typography fontSize={"18px"}>솔루션 ID</Typography>
                    <BasicInput
                      placeholder="솔루션 ID"
                      sx={{ width: "40%", height: "40px" }}
                      value={solutionID}
                      onChange={(e) => setSolutionID(e.target.value)}
                    ></BasicInput>
                  </Stack>
                  <Stack gap={1}>
                    <Typography fontSize={"18px"}>솔루션 이름</Typography>
                    <BasicInput
                      placeholder="솔루션 이름"
                      sx={{ width: "40%", height: "40px" }}
                      value={solutionName}
                      onChange={(e) => setSolutionName(e.target.value)}
                    ></BasicInput>
                  </Stack>
                  <Stack gap={1}>
                    <Typography fontSize={"18px"}>라이선스 방식</Typography>
                    <Select
                      value={selectValue}
                      onChange={(e) => {
                        const newValue = e.target.value; // 선택된 값 (cdNm)
                        const selectedOption = licenseMethodData.find(
                          (item) => item.cdNm === newValue
                        ); // 선택된 옵션 객체

                        if (selectedOption) {
                          console.log(
                            `라이선스 체크 변경: ${selectedOption.cdNm}`
                          ); // cdNm 콘솔 출력
                          console.log(`라이선스 키 변경: ${selectedOption.cd}`); // cd 콘솔 출력
                          setSolutionLicenseMethodName(selectedOption.cdNm); // cdNm 상태 저장
                          setSolutionLicenseKey(selectedOption.cd); // cd 상태 저장 (필요시 추가)
                        }
                      }}
                      selectData={licenseMethodData.map((item) => ({
                        value: item.cdNm, // 표시될 이름
                        data: item.cdNm, // 선택될 값
                      }))}
                      sx={{ width: "400px" }}
                      placeholder={solutionLicenseName}
                    />
                  </Stack>
                  <Stack gap={1}>
                    <Typography fontSize={"18px"}>사용여부</Typography>
                    <ToggleButton
                      checked={solutionIsUes} // solutionIsUes로 동작
                      onChange={(e) => {
                        const newValue = e.target.checked; // Toggle 버튼의 변경된 값
                        setSolutionIsUse(newValue); // solutionIsUes 상태 업데이트
                        console.log("solutionIsUes 값 변경:", newValue); // 콘솔 출력
                      }}
                      label=""
                    />
                  </Stack>
                  <Stack gap={1} marginRight={1}>
                    <Typography fontSize={"18px"}>비허가 URL</Typography>
                    <BasicInput
                      placeholder="URL"
                      sx={{ width: "100%", height: "40px" }}
                      value={solutionUnUseUrl}
                      onChange={(e) => setSolutionUnUseUrl(e.target.value)}
                    ></BasicInput>
                  </Stack>
                  <Stack gap={1} marginRight={1}>
                    <Typography fontSize={"18px"}>비고</Typography>
                    <BasicInput
                      placeholder="비고"
                      sx={{ width: "100%", height: "40px" }}
                      value={solutionRmk}
                      onChange={(e) => setSolutionRmk(e.target.value)}
                    ></BasicInput>
                  </Stack>
                </Stack>
                <Stack
                  width={"100%"}
                  height={"10%"}
                  gap={1}
                  justifyContent={"flex-end"}
                  direction={"row"}
                >
                  <BasicButton onClick={handleAdd}>추가</BasicButton>
                  <BasicButton onClick={handleSave}>저장</BasicButton>
                  <BasicButton onClick={SolutionconfirmDeleteModal}>
                    삭제
                  </BasicButton>
                </Stack>
              </Stack>
            </GrayBox>
          </Stack>
          <Stack width={"50%"} height={"100%"}>
            <Stack width={"100%"} height={"60%"} gap={1} overflow={"auto"}>
              <RowDragTable
                checkbox={false}
                data={solutionMenuList.map((item) => ({
                  ...item,
                  id: item.slutnId,
                }))}
                setData={setSolutionMenuList}
                keyName="slutnId"
              >
                <RowDragTable.Th>메뉴ID</RowDragTable.Th>
                <RowDragTable.Th>메뉴이름</RowDragTable.Th>
                <RowDragTable.Th>라이선스체크</RowDragTable.Th>
                <RowDragTable.Th>사용여부</RowDragTable.Th>

                <RowDragTable.Tbody>
                  {solutionMenuList.map((item) => (
                    <RowDragTable.Tr
                      key={item.slutnId}
                      id={item.slutnId}
                      onClick={() => handleMenuRowClick(item.slutnId)}
                      isClicked={selectMenuID === item.slutnId}
                    >
                      <RowDragTable.Td>{item.slutnId}</RowDragTable.Td>
                      <RowDragTable.Td>{item.slutnNm}</RowDragTable.Td>
                      <RowDragTable.Td>
                        {item.lisneCnfirmYn === "Y" ? "사용" : "미사용"}
                      </RowDragTable.Td>
                      <RowDragTable.Td>{item.useYn}</RowDragTable.Td>
                    </RowDragTable.Tr>
                  ))}
                </RowDragTable.Tbody>
              </RowDragTable>
            </Stack>
            <GrayBox width={"100%"} height={"40%"}>
              <Stack width={"100%"} height={"100%"} gap={1}>
                <Stack
                  width={"100%"}
                  height={"10%"}
                  marginTop={2}
                  marginBottom={2}
                >
                  <Typography
                    color="primary.dark"
                    fontWeight={"bold"}
                    fontSize={"22px"}
                  >
                    메뉴 상세정보
                  </Typography>
                </Stack>
                <Stack
                  width={"100%"}
                  height={"80%"}
                  overflow={"auto"}
                  gap={1}
                  paddingBottom={1}
                >
                  <Stack gap={1}>
                    <Typography fontSize={"18px"}>메뉴 ID</Typography>
                    <BasicInput
                      placeholder="메뉴 ID"
                      sx={{ width: "40%", height: "40px" }}
                      value={menuID}
                      onChange={(e) => setMuneID(e.target.value)}
                    ></BasicInput>
                  </Stack>
                  <Stack gap={1}>
                    <Typography fontSize={"18px"}>메뉴 이름</Typography>
                    <BasicInput
                      placeholder="메뉴 이름"
                      sx={{ width: "40%", height: "40px" }}
                      value={menuName}
                      onChange={(e) => setMenuName(e.target.value)}
                    ></BasicInput>
                  </Stack>
                  <Stack gap={1}>
                    <Typography fontSize={"18px"}>라이선스 체크</Typography>
                    <Select
                      value={menuLicenseCheck} // menuLicenseCheck 값을 바인딩
                      onChange={(e) => setMenuLicenseCheck(e.target.value)} // 상태 업데이트
                      selectData={sd_1}
                      sx={{ width: "400px" }}
                      placeholder={menuLicenseCheck}
                    />
                  </Stack>
                  <Stack gap={1} marginRight={1}>
                    <Typography fontSize={"18px"}>URL</Typography>
                    <BasicInput
                      placeholder="URL"
                      sx={{ width: "100%", height: "40px" }}
                      value={menuUrl}
                      onChange={(e) => setMenuUrl(e.target.value)}
                    ></BasicInput>
                  </Stack>
                  <Stack gap={1}>
                    <Typography fontSize={"18px"}>아이콘</Typography>
                    <BasicInput
                      placeholder=""
                      sx={{ width: "40%", height: "40px" }}
                      value={iconUrl}
                      onChange={(e) => setIconUrl(e.target.value)}
                    ></BasicInput>
                  </Stack>
                  <Stack gap={1}>
                    <Typography fontSize={"18px"}>사용여부</Typography>
                    <ToggleButton
                      checked={menuUseYn}
                      onChange={(e) => {
                        const newValue = e.target.checked; // ToggleButton의 값 변화
                        console.log("ToggleButton 값 변경:", newValue); // 콘솔에 변경 값 출력
                        setMenuUseYn(newValue); // 상태 업데이트
                      }}
                      label=""
                    />
                  </Stack>
                  <Stack gap={1} marginRight={1}>
                    <Typography fontSize={"18px"}>비고</Typography>
                    <BasicInput
                      placeholder="비고"
                      sx={{ width: "100%", height: "40px" }}
                      value={menuRmk}
                      onChange={(e) => setMenuRmk(e.target.value)}
                    ></BasicInput>
                  </Stack>
                </Stack>
                <Stack
                  width={"100%"}
                  height={"10%"}
                  gap={1}
                  justifyContent={"flex-end"}
                  direction={"row"}
                >
                  <BasicButton onClick={handleMenuAdd}>추가</BasicButton>
                  <BasicButton onClick={handleMenuSave}>저장</BasicButton>
                  <BasicButton onClick={MenuconfirmDeleteModal}>
                    삭제
                  </BasicButton>
                </Stack>
              </Stack>
            </GrayBox>
          </Stack>
        </TableBox>
      </Stack>
    </>
  );
}

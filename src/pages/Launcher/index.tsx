import { Box } from "@mui/material";
import Info from "../../assets/images/propbox_info.png";
import Customer from "../../assets/images/propbox_customer.png";
import Message from "../../assets/images/propbox_sms.png";
import { MdOutlineKeyboardDoubleArrowLeft } from "react-icons/md";
import { MdOutlineKeyboardDoubleArrowRight } from "react-icons/md";
import { IconButton } from "../../components/Button";
import useTabs from "../../hooks/useTabs";
import CenteredBox from "../../components/Box/CenteredBox";
import { useEffect, useState } from "react";
import PathConstants from "../../routers/path";
import { openPopup } from "../../utils/openPopup";
import api from "../../api";
import { popupNoticeType } from "../../types/notice";
import { usePopupNotice } from "../../api/noticeList";

export default function Launcher() {
  const { value, handleChange: tabChange } = useTabs(0);

  //공지사항 목록 가져오기
  const { isSuccess, data } = usePopupNotice();
  const [popupNoticeList, setPopupNoticeList] = useState<popupNoticeType[]>([]);

  const [popupCount, setPopupCount] = useState(0);

  const handlePrev = (event: React.SyntheticEvent) => {
    const newValue = (value - 1 + 3) % 3;
    tabChange(event, newValue);
  };

  const handleNext = (event: React.SyntheticEvent) => {
    const newValue = (value + 1) % 3;
    tabChange(event, newValue);
  };

  //공지사항 상세보기
  const NoticeDetail = {
    url: PathConstants.Notice.NoticeDetail,
    windowName: "공지사항 상세보기",
    windowFeatures: "width=570,height=500,scrollbars=yes,resizable=yes",
  };

  //팝업 공지사항 api 호출
  useEffect(() => {
    if (data?.data?.contents) {
      //팝업 숨기기 -> 하루동안 안보이기 선택한 팝업만 숨기고 나머지는 출력하도록함
      const hiddenPopups = JSON.parse(localStorage.getItem("hiddenPopups") || "{}");
  
      const today = new Date().toISOString().split("T")[0];
      const validPopups = data.data.contents.filter((notice) => {
        const hiddenDate = hiddenPopups[notice.noticeNo];
  
        // 숨겨진 팝업이 없거나, 숨김 날짜가 오늘 이전이면 표시
        return notice.popupYn === "Y" && (!hiddenDate || hiddenDate !== today);
      });
  
      setPopupNoticeList(validPopups);
  
      validPopups.forEach((notice, index) => {
        const popup = window.open(
          `${NoticeDetail.url}?id=${notice.noticeNo}`,
          `${NoticeDetail.windowName}_${index}`,
          NoticeDetail.windowFeatures
        );
  
        if (!popup || popup.closed || typeof popup.closed === "undefined") {
          alert("팝업이 차단되었습니다. 팝업 차단을 해제해주세요.");
          return;
        }
      });
    }
  }, [data, isSuccess]);


  return (
    <CenteredBox
      justifyContent={"center"}
      overflow={"hidden"}
      width={"100%"}
      height={"100%"}
    >
      <IconButton onClick={handlePrev}>
        <MdOutlineKeyboardDoubleArrowLeft size={"4rem"} />
      </IconButton>
      <Box
        overflow={"scroll"}
        height={"100%"}
        sx={{
          "::-webkit-scrollbar": { display: "none" }, // Chrome, Safari, Edge
          scrollbarWidth: "none", // Firefox
          msOverflowStyle: "none", // IE, Edge
        }}
        paddingLeft={10}
        paddingRight={10}
      >
        {/* 탭에 따라 컴포넌트 변경 */}
        {value === 0 ? (
          <img alt="메인 설명" src={Info} />
        ) : value === 1 ? (
          <img alt="메인 설명" src={Customer} />
        ) : value === 2 ? (
          <img alt="메인 설명" src={Message} />
        ) : null}
      </Box>
      <IconButton onClick={handleNext}>
        <MdOutlineKeyboardDoubleArrowRight size={"4rem"} />
      </IconButton>
    </CenteredBox>
  );
}

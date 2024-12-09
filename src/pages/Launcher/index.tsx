import { Box } from "@mui/material";
import Info from "../../assets/images/propbox_info.png";
import Customer from "../../assets/images/propbox_customer.png";
import Message from "../../assets/images/propbox_sms.png";
import { MdOutlineKeyboardDoubleArrowLeft } from "react-icons/md";
import { MdOutlineKeyboardDoubleArrowRight } from "react-icons/md";
import { IconButton } from "../../components/Button";
import useTabs from "../../hooks/useTabs";
import CenteredBox from "../../components/Box/CenteredBox";

export default function Launcher() {
  const { value, handleChange: tabChange } = useTabs(0);

  const handlePrev = (event: React.SyntheticEvent) => {
    const newValue = (value - 1 + 3) % 3;
    tabChange(event, newValue);
  };

  const handleNext = (event: React.SyntheticEvent) => {
    const newValue = (value + 1) % 3;
    tabChange(event, newValue);
  };

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

import Button, { BasicButton, GrayButton } from "../../components/Button";
import AccessAlarmIcon from "@mui/icons-material/AccessAlarm";
export default function Main() {
  return (
    <>
      <div>메인페이지</div>

      <BasicButton>베이직 스타일 버튼</BasicButton>
      <GrayButton>그레이 버튼 스타일</GrayButton>
      <Button>
        <AccessAlarmIcon /> 아이콘 버튼
      </Button>
    </>
  );
}

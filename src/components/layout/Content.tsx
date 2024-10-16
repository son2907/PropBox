import { Box, styled, Typography } from "@mui/material";
// Content 컴포넌트: 메인 컨텐츠 영역
const ContentArea = styled(Box)(() => ({
  height: "100%",
  width: "100%",
}));

interface ContentProps {
  children: React.ReactNode;
}
export default function Content({ children }: ContentProps) {
  // url을 통해 페이지 정보를 얻어와 타이포그래피에 바인딩한다
  // zuStand에 메뉴 정보를 api로 가져와 넣어놓은 다음
  // useHook을 통해 가져옴
  return (
    <ContentArea>
      <Box sx={{ padding: "10px" }}>
        <Typography variant="h3">문자관리</Typography>
      </Box>
      {/* 탭까지 만들어주면 좋음 */}
      {children}
    </ContentArea>
  );
}

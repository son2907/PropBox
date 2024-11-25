import { Typography } from "@mui/material";
import CenteredBox from "../../../../components/Box/CenteredBox";

interface TimeInputGroupProps {
  times: number[];
  inputRefs: React.MutableRefObject<(HTMLInputElement | null)[]>;
  startIndex: number; // inputRefs 배열에서의 시작 인덱스
}

export default function TimeInputGroup({
  times,
  inputRefs,
  startIndex,
}: TimeInputGroupProps) {
  return (
    <CenteredBox justifyContent={"space-between"}>
      {times.map((time, index) => (
        <label key={time} className="whitespace-nowrap">
          <input
            type="checkbox"
            name="sendTime"
            value={time}
            ref={(el) => (inputRefs.current[startIndex + index] = el)}
          />
          <Typography>{`${time}시`}</Typography>
        </label>
      ))}
    </CenteredBox>
  );
}

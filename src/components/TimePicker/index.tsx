import { Box } from "@mui/material";

type TimePickerProps = {
  time: number; // 초기 시간 (타임스탬프)
  setSelectedTime: (time: number) => void; // 선택된 시간을 설정하는 함수
};

export default function TimePicker({ time, setSelectedTime }: TimePickerProps) {
  // 타임스탬프를 HH:mm 형식으로 변환
  const formatTime = (timestamp: number): string => {
    const date = new Date(timestamp);
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    return `${hours}:${minutes}`;
  };

  // 초기 시간을 HH:mm 형식으로 변환
  const formattedTime = formatTime(time);

  const handleTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const time = e.target.value; // 입력된 시간 값 (HH:mm 형식)

    // HH:mm 형식의 시간을 타임스탬프로 변환
    const [hours, minutes] = time.split(":").map(Number);
    const newTime = new Date();
    newTime.setHours(hours, minutes, 0, 0); // 시간 및 분 설정

    setSelectedTime(newTime.getTime()); // 타임스탬프를 설정
  };

  return (
    <Box
      component="input"
      type="time"
      aria-label="Time"
      value={formattedTime} // 초기 값 설정
      onFocus={(e) => e.target.showPicker && e.target.showPicker()}
      onChange={handleTimeChange}
      sx={{
        padding: 0.5,
        paddingRight: 1.2,
        paddingLeft: 1.2,
        width: "100%",
        borderRadius: "8px",
        border: "1px solid #D9D9D9",
        boxShadow: "none",
        outline: "none",
        appearance: "none",
        "&::-webkit-calendar-picker-indicator": {
          width: "22px",
          height: "22px",
          filter: "invert(40%)",
        },
      }}
    />
  );
}

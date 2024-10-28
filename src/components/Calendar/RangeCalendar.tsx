import { ko } from "date-fns/locale";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./RangeCalendar.css"; // 스타일 파일 import
import CustomInput from "./CustomInput";

interface CalendarProps {
  startDate: Date;
  setStartDate: (date: Date) => void;
  endDate: Date;
  setEndDate: (date: Date) => void;
}

export default function RangeCalendar({
  startDate,
  setStartDate,
  endDate,
  setEndDate,
}: CalendarProps) {
  // 날짜별 클래스를 설정
  const dayClassName = (date: Date) => {
    if (startDate && endDate) {
      if (date.getTime() === startDate.getTime()) return "start-date";
      if (date.getTime() === endDate.getTime()) return "end-date";
      if (date > startDate && date < endDate) return "in-range";
    }
    return "";
  };
  return (
    <DatePicker
      selectsRange
      customInput={<CustomInput />}
      startDate={startDate}
      endDate={endDate}
      onChange={(dates) => {
        const [start, end] = dates as [Date, Date];
        setStartDate(start);
        setEndDate(end);
      }}
      locale={ko}
      dateFormat="yyyy.MM.dd"
      shouldCloseOnSelect={false}
      minDate={new Date("2000-01-01")}
      maxDate={new Date()}
      dayClassName={dayClassName} // 날짜별 클래스 적용
      renderDayContents={(day) => <span style={{ zIndex: 1000 }}>{day}</span>}
      renderCustomHeader={({
        date,
        changeYear,
        changeMonth,
        decreaseMonth,
        increaseMonth,
        prevMonthButtonDisabled,
        nextMonthButtonDisabled,
      }) => (
        <div
          style={{
            margin: 10,
            display: "flex",
            justifyContent: "center",
            backgroundColor: "white",
            border: "none",
          }}
        >
          <button
            style={{ backgroundColor: "transparent", border: "none" }}
            onClick={decreaseMonth}
            disabled={prevMonthButtonDisabled}
          >
            {"<"}
          </button>
          <select
            style={{ border: "none", fontSize: "16px" }}
            value={date.getFullYear()}
            onChange={({ target: { value } }) => changeYear(Number(value))}
          >
            {Array.from(
              { length: 101 },
              (_, i) => new Date().getFullYear() - i
            ).map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </select>

          <select
            style={{ border: "none", fontSize: "16px" }}
            value={date.getMonth()}
            onChange={({ target: { value } }) => changeMonth(Number(value))}
          >
            {Array.from({ length: 12 }, (_, i) => i).map((month) => (
              <option key={month} value={month}>
                {new Date(0, month).toLocaleString("ko", { month: "long" })}
              </option>
            ))}
          </select>
          <button
            style={{ backgroundColor: "transparent", border: "none" }}
            onClick={increaseMonth}
            disabled={nextMonthButtonDisabled}
          >
            {">"}
          </button>
        </div>
      )}
    />
  );
}

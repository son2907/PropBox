import { ko } from "date-fns/locale";
import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./RangeCalendar.css"; // 스타일 파일 import

export default function RangeCalendar() {
  const [startDate, setStartDate] = useState<Date | undefined>(new Date());
  const [endDate, setEndDate] = useState<Date | undefined>(new Date());

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
      startDate={startDate}
      endDate={endDate}
      onChange={(dates) => {
        const [start, end] = dates as [Date | undefined, Date | undefined];
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

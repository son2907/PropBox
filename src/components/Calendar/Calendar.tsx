import { ko } from "date-fns/locale";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./RangeCalendar.css"; // 스타일 파일 import
import CustomInput from "./CustomInput";

interface CalendarProps {
  selectedDate: Date;
  setSelectedDate: (date: Date) => void;
  width?: string;
  useMaxDate?: boolean; // maxDate 사용 여부를 결정하는 프로퍼티 추가
}
export default function Calendar({
  selectedDate,
  setSelectedDate,
  useMaxDate = true, // 기본값은 false로 설정
}: CalendarProps) {
  // const [selectedDate, setSelectedDate] = useState<Date>(new Date());

  return (
    <DatePicker
      locale={ko}
      customInput={<CustomInput />}
      dateFormat="yyyy.MM.dd" // 날짜 형태
      shouldCloseOnSelect // 날짜를 선택하면 datepicker가 자동으로 닫힘
      minDate={new Date("2000-01-01")} // minDate 이전 날짜 선택 불가
      maxDate={useMaxDate ? undefined : new Date()} // maxDate 이후 날짜 선택 불가
      selected={selectedDate}
      onChange={(date) => {
        if (date) {
          setSelectedDate(date);
        }
      }}
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
            type="button"
          >
            {"<"}
          </button>
          <select
            style={{ border: "none", fontSize: "11px" }}
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
            type="button"
          >
            {">"}
          </button>
        </div>
      )}
    />
  );
}

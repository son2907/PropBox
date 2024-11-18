import { forwardRef, ReactNode } from "react";
import { OutlinedInput, OutlinedInputProps } from "@mui/material";
import SearchIcon from "../../assets/images/Search.png";

interface InputProps extends OutlinedInputProps {
  placeholder?: string;
  children?: ReactNode;
}

// forwardRef를 사용하여 BasicInput 컴포넌트를 정의합니다.
const SearchInput = forwardRef<HTMLInputElement, InputProps>(
  ({ placeholder = "검색", children, ...rest }, ref) => {
    return (
      <>
        <OutlinedInput
          placeholder={placeholder}
          inputRef={ref} // ref를 OutlinedInput에 전달합니다.
          size="small"
          endAdornment={<img src={SearchIcon} alt="search-icon" />}
          sx={{
            display: "flex", // 부모 컴포넌트에 맞추어 높이와 가로 길이가 줄어들도록 함
            backgroundColor: "white",
            minHeight: 0,
            height: "100%",
            ...(rest.sx || {}),
          }}
          {...rest} // 나머지 props를 전달합니다.
        />
        {children}
      </>
    );
  }
);

export default SearchInput;

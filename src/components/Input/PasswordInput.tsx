import { forwardRef, ReactNode, useState } from "react";
import {
  OutlinedInput,
  OutlinedInputProps,
  InputAdornment,
} from "@mui/material";
import { IconButton } from "../Button";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

interface InputProps extends OutlinedInputProps {
  placeholder?: string;
  children?: ReactNode;
}

const PasswordInput = forwardRef<HTMLInputElement, InputProps>(
  ({ placeholder = "비밀번호를 입력하세요", ...rest }, ref) => {
    const [showPassword, setShowPassword] = useState(false);

    const handleClickShowPassword = () => setShowPassword(!showPassword);

    const handleMouseDownPassword = (
      event: React.MouseEvent<HTMLButtonElement>
    ) => {
      event.preventDefault();
    };

    const handleMouseUpPassword = (
      event: React.MouseEvent<HTMLButtonElement>
    ) => {
      event.preventDefault();
    };

    return (
      <OutlinedInput
        type={showPassword ? "text" : "password"}
        placeholder={placeholder}
        inputRef={ref}
        size="small"
        fullWidth
        {...rest}
        endAdornment={
          <InputAdornment position="end">
            <IconButton
              onClick={handleClickShowPassword}
              onMouseDown={handleMouseDownPassword}
              onMouseUp={handleMouseUpPassword}
              edge="end"
            >
              {showPassword ? <VisibilityOff /> : <Visibility />}
            </IconButton>
          </InputAdornment>
        }
      />
    );
  }
);

export default PasswordInput;

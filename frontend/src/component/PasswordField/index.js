import { Visibility, VisibilityOff } from "@mui/icons-material";
import { FormControl, IconButton, InputAdornment, InputLabel, OutlinedInput } from "@mui/material";
import { useState } from "react";

const PasswordField = (props) => {

  const { onChange } = props;
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((prev) => !prev);
  const handleMouseDownPassword = (event) => event.preventDefault();

  return (
    <FormControl variant="outlined" sx={{ width: "100%" }}>
      <InputLabel
        sx={{
          color: "#121212",
          fontFamily: "var(--fontvietnam)",
          fontSize: "18px",
        }}
      >
        Nhập mật khẩu...
      </InputLabel>
      <OutlinedInput
        type={showPassword ? "text" : "password"}
        endAdornment={
          <InputAdornment position="end">
            <IconButton
              aria-label={showPassword ? "hide the password" : "display the password"}
              onClick={handleClickShowPassword}
              onMouseDown={handleMouseDownPassword}
              edge="end"
            >
              {showPassword ? <VisibilityOff sx={{color: '#00AEEF'}} /> : <Visibility sx={{color: '#00AEEF'}} />}
            </IconButton>
          </InputAdornment>
        }
        label="Nhập mật khẩu..."
        name="password"
        onChange={onChange}
        sx={{
          borderRadius: "15px",
          "& .MuiOutlinedInput-notchedOutline": {
            border: "3px solid #00AEEF",
          },
          "&:hover .MuiOutlinedInput-notchedOutline": {
            border: "3px solid rgb(3, 169, 230)",
          },
          "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
            border: "3px solid rgb(3, 169, 230)",
          },
          "& .MuiInputBase-input": {
            color: "#121212",
            fontFamily: "var(--fontvietnam)",
            fontSize: "18px",
          },
          "& .MuiInputBase-input::placeholder": {
            color: "#9E9E9E",
            fontFamily: "var(--fontvietnam)",
            fontSize: "18px",
            opacity: 1,
          },
        }}
      />
    </FormControl>
  );
};

export default PasswordField;

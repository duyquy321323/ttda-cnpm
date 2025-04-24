import { Visibility, VisibilityOff } from "@mui/icons-material";
import { FormControl, IconButton, InputAdornment, InputLabel, OutlinedInput } from "@mui/material";
import { useState } from "react";

const PasswordField = (props) => {

  const { onChange, name, title } = props;
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((prev) => !prev);
  const handleMouseDownPassword = (event) => event.preventDefault();

  return (
    <FormControl variant="outlined" sx={{ width: "100%" }}>
      <InputLabel
        sx={{
            color: "#121212",
            fontFamily: "var(--fontvietnam)",
            fontSize: "30px",
            transform: "translate(26px, 24px) scale(1)", // Đẩy xuống khi chưa nhập
              "&.MuiInputLabel-shrink": {
                  transform: "translate(14px, -6px) scale(0.40)", // Khi focus
              },
          }}
      >
        {title}
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
              {showPassword ? <VisibilityOff sx={{color: 'var(--violetcolor)', fontSize: '48px'}} /> : <Visibility sx={{color: 'var(--violetcolor)', fontSize: '48px'}} />}
            </IconButton>
          </InputAdornment>
        }
        label={title}
        name={name}
        onChange={onChange}
        sx={{
          borderRadius: "15px",
          height: '100px',
          "& .MuiOutlinedInput-notchedOutline": {
            border: "3px solid var(--violetcolor)",
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
            fontSize: "30px",
            paddingLeft: "26px",
          },
          "& .MuiInputBase-input::placeholder": {
            color: "#9E9E9E",
            fontFamily: "var(--fontvietnam)",
            fontSize: "30px",
            opacity: 1,
          },
        }}
      />
    </FormControl>
  );
};

export default PasswordField;

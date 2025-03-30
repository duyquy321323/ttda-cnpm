import { TextField } from "@mui/material";
import { useState } from "react";

const OTPInput = ({ length = 6, onComplete, name }) => {
  const [otp, setOtp] = useState("");

  const handleChange = (e) => {
    let value = e.target.value.replace(/\D/g, ""); // Chỉ giữ số
    if (value.length > length) return;

    setOtp(value);

    if (value.length === length) {
      onComplete && onComplete(value);
    }

    // Giữ vị trí con trỏ đúng
    const cursorPos = e.target.selectionStart;
    setTimeout(() => {
      e.target.setSelectionRange(cursorPos, cursorPos);
    }, 0);
  };

  // Tạo chuỗi hiển thị với số đã nhập + dấu `_`
  const displayValue = otp.padEnd(length, "_");

  return (
    <TextField
      value={otp}
      onChange={handleChange}
      variant="outlined"
      placeholder={displayValue}
      name={name}
      fullWidth
      inputProps={{
        maxLength: length,
        style: {
          letterSpacing: "50px", // Khoảng cách giữa các ký tự
          fontSize: "50px",
          textAlign: "center",
          fontFamily: "var(--fontvietnam)",
          color: "var(--violetcolor)",
          caretColor: "black",
        },
      }}
      sx={{
        "& .MuiOutlinedInput-root": {
          height: "100px",
          borderRadius: "12px",
          "& fieldset": { border: "3px solid #00AEEF" },
          "&:hover fieldset": { border: "3px solid #007BB5" },
          "&.Mui-focused fieldset": { border: "3px solid #007BB5" },
        },
      }}
    />
  );
};

export default OTPInput;

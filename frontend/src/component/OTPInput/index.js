import { TextField } from "@mui/material";

const OTPInput = ({ length = 6, handleChange, otp, name }) => {
  

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

import { TextField } from "@mui/material";

const TextFieldForm = (props) => {
  const { title, name, onChange } = props;

  return (
    <TextField
      label={title}
      variant="outlined"
      name={name}
      onChange={onChange}
      sx={{
        "& .MuiOutlinedInput-root": {
            borderRadius: "15px",
          "& fieldset": {
            border: "3px solid #00AEEF", // Màu viền mặc định
          },
          "&:hover fieldset": {
            border: "3px solid rgb(3, 169, 230)", // Màu viền khi hover
          },
          "&.Mui-focused fieldset": {
            border: "3px solid rgb(3, 169, 230)", // Màu viền khi focus
          },
        },
        "& .MuiInputLabel-root": {
          color: "#121212", // Màu label (placeholder khi chưa nhập)
          fontFamily: "var(--fontvietnam)",
          fontSize: "18px",
        },
        "& .MuiInputBase-input": {
          color: "#121212", // Màu chữ khi nhập
          fontFamily: "var(--fontvietnam)",
          fontSize: "18px",
        },
        "& .MuiInputBase-input::placeholder": {
          color: "#9E9E9E", // Màu placeholder khi chưa nhập
          fontFamily: "var(--fontvietnam)",
          fontSize: "18px",
          opacity: 1, // Đảm bảo hiển thị đầy đủ màu
        },
      }}
    />
  );
};

export default TextFieldForm;

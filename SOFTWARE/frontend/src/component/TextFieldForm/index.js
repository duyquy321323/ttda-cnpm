import { TextField } from "@mui/material";

const TextFieldForm = (props) => {
  const { title, name, onChange, type } = props;

  return (
    <TextField
      label={title}
      variant="outlined"
      name={name}
      type={type}
      onChange={onChange}
      sx={{
          
        "& .MuiOutlinedInput-root": {
            height: '100px',
            paddingLeft: "14px",
            borderRadius: "15px",
          "& fieldset": {
            border: "3px solid var(--violetcolor)", // Màu viền mặc định
          },
          "&:hover fieldset": {
            border: "3px solid rgb(3, 169, 230)", // Màu viền khi hover
          },
          "&.Mui-focused fieldset": {
            border: "3px solid rgb(3, 169, 230)", // Màu viền khi focus
          },
        },
        "& .MuiInputLabel-root": {
            color: "#121212",
            fontFamily: "var(--fontvietnam)",
            fontSize: "30px",
            transform: "translate(26px, 24px) scale(1)", // Đẩy xuống khi chưa nhập
            "&.MuiInputLabel-shrink": {
            transform: "translate(14px, -6px) scale(0.40)", // Khi focus
            color: "var(--violetcolor)",
        },
        },
        "& .MuiInputBase-input": {
          color: "#121212", // Màu chữ khi nhập
          fontFamily: "var(--fontvietnam)",
          fontSize: "30px",
        },
        "& .MuiInputBase-input::placeholder": {
          color: "#9E9E9E", // Màu placeholder khi chưa nhập
          fontFamily: "var(--fontvietnam)",
          fontSize: "30px",
          opacity: 1, // Đảm bảo hiển thị đầy đủ màu
        },
      }}
    />
  );
};

export default TextFieldForm;

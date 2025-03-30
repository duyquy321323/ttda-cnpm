import { Box, TextField, Typography } from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import dayjs from "dayjs";
import { useState } from "react";

export default function TimeInput() {
  const [time, setTime] = useState(dayjs("01:00", "HH:mm"));
  const [isOn, setIsOn] = useState(true);

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            border: "2px solid #004466",
            borderRadius: "50px",
            padding: "5px 15px",
            cursor: "pointer",
            backgroundColor: "#E6F7FF",
          }}
        >
          <TimePicker
            value={time}
            onChange={(newTime) => setTime(newTime)}
            ampm={false} // Sử dụng 24h, bỏ AM/PM
            slotProps={{
              textField: {
                sx:{
                    width: "266px",  // Độ rộng input
                    "& fieldset": { border: "none" }, // Xóa viền mặc định
                    "& input": {
                        color: "#121212",
                        textAlign: "center",
                        fontFamily: "var(--fontvietnam)",
                        fontSize: "80px",
                        fontStyle: "normal",
                        fontWeight: "400",
                        padding: 0,
            
                    }
                },
                InputProps: { endAdornment: null }, // Bỏ icon đồng hồ
              },
            }}
            
            renderInput={(params) => (
              <TextField
                {...params}
                variant="standard"
                InputProps={{
                  ...params.InputProps,
                  disableUnderline: true, // Bỏ gạch chân input
                  sx: {
                    fontSize: "20px",
                    fontWeight: "bold",
                    color: "#000",
                    width: "60px", // Điều chỉnh độ rộng
                  },
                }}
              />
            )}
          />

          <Typography
            sx={{
              fontSize: "50px",
              fontWeight: "700",
              color: isOn ? "#65C466" : "#FF2D55",
              cursor: "pointer",
            }}
            onClick={() => setIsOn(!isOn)}
          >
            {isOn ? "ON" : "OFF"}
          </Typography>
        </Box>
      </Box>
    </LocalizationProvider>
  );
}

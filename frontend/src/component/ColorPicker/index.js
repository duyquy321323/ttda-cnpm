import { Box, FormControlLabel, Radio, RadioGroup } from "@mui/material";
import { useState } from "react";

const colors = [
  { name: "Black", value: "#000000" },
  { name: "White", value: "#FFFFFF" },
  { name: "Blue", value: "#0000FF" },
  { name: "Purple", value: "#A020F0" },
  { name: "Green", value: "#008000" },
  { name: "Orange", value: "#FFA500" },
  { name: "Red", value: "#FF0000" },
  { name: "Yellow", value: "#FFD700" },
];

export default function ColorPicker() {
  const [selectedColor, setSelectedColor] = useState("#A020F0");

  return (
    <Box
      sx={{
        padding: 2,
        borderRadius: 2,
        display: "flex",
        alignItems: "center",
      }}
    >
      <Box
        sx={{
          width: 78,
          height: 78,
          backgroundColor: selectedColor,
          borderRadius: 1,
          boxShadow: "0px 0px 5px rgba(0,0,0,0.2)",
          marginRight: 2,
        }}
      />

<RadioGroup
  value={selectedColor}
  onChange={(e) => setSelectedColor(e.target.value)}
  sx={{
    display: "grid",
    gridTemplateColumns: "repeat(4, 1fr)", // Chia thành 2 cột bằng nhau
    gap: 1, // Khoảng cách giữa các radio button
  }}
>

        {colors.map((color) => (
          <FormControlLabel
            key={color.value}
            value={color.value}
            control={
              <Radio
                sx={{
                  color: color.value,
                  "&.Mui-checked": {
                    color: color.value,
                  },
                }}
              />
            }
            label=""
          />
        ))}
      </RadioGroup>
    </Box>
  );
}

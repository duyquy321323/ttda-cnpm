import { Box, FormControlLabel, Radio, RadioGroup } from "@mui/material";
import { useState } from "react";

const colors = [
  { name: "black", value: "#000000" },
  { name: "white", value: "#FFFFFF" },
  { name: "blue", value: "#0000FF" },
  { name: "purple", value: "#A020F0" },
  { name: "green", value: "#008000" },
  { name: "orange", value: "#FFA500" },
  { name: "red", value: "#FF0000" },
  { name: "yellow", value: "#FFD700" },
];

export default function ColorPicker({handleChange, selectedColor}) {

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
  onChange={handleChange}
  sx={{
    display: "grid",
    gridTemplateColumns: "repeat(4, 1fr)", // Chia thành 2 cột bằng nhau
    gap: 1, // Khoảng cách giữa các radio button
  }}
>

        {colors.map((color) => (
          <FormControlLabel
            key={color.value}
            name="color"
            value={color.name}
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

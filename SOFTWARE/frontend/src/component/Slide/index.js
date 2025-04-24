import { Slider } from "@mui/material";

const Slide = (props) => {
  const { min, max, color, title, value } = props;

  // Hàm tính màu dựa trên giá trị slider (từ -40 đến 80)
  const getThumbColor = (val) => {
    const percent = (val + 40) / 120; // Chuyển đổi thành phần trăm trong khoảng [0,1]
    const r = Math.round((1 - percent) * 0 + percent * 255); // Chuyển dần từ xanh (0) sang đỏ (255)
    const g = Math.round((1 - percent) * 174 + percent * 59);
    const b = Math.round((1 - percent) * 239 + percent * 48);
    return `rgb(${r},${g},${b})`;
  };

  const getThumbColor2 = (val) => {
    const percent = (val - min) / (max - min); // Chuyển đổi thành % (0 -> 1)

    let r, g, b;

    if (percent <= 0.3) {
      // Đỏ -> Xanh lá
      const ratio = percent / 0.3;
      r = Math.round((1 - ratio) * 255 + ratio * 52);
      g = Math.round((1 - ratio) * 64 + ratio * 199);
      b = Math.round((1 - ratio) * 21 + ratio * 89);
    } else if (percent <= 0.6) {
      // Xanh lá -> Xanh dương
      const ratio = (percent - 0.3) / 0.3;
      r = Math.round((1 - ratio) * 52 + ratio * 0);
      g = Math.round((1 - ratio) * 199 + ratio * 174);
      b = Math.round((1 - ratio) * 89 + ratio * 239);
    } else if (percent <= 0.8) {
      // Xanh dương -> Tím
      const ratio = (percent - 0.6) / 0.2;
      r = Math.round((1 - ratio) * 0 + ratio * 151);
      g = Math.round((1 - ratio) * 174 + ratio * 71);
      b = Math.round((1 - ratio) * 239 + ratio * 255);
    } else {
      // Giữ nguyên tím
      r = 151;
      g = 71;
      b = 255;
    }

    return `rgb(${r},${g},${b})`;
  };

  const getThumbColor3 = (val) => {
    const percent = (val - min) / (max - min); // Chuyển đổi thành % (0 -> 1)

    let r, g, b;

    if (percent <= 0.1) {
      // Đen -> Đỏ
      const ratio = percent / 0.1;
      r = Math.round((1 - ratio) * 18 + ratio * 255);
      g = Math.round((1 - ratio) * 18 + ratio * 59);
      b = Math.round((1 - ratio) * 18 + ratio * 48);
    } else if (percent <= 0.3) {
      // Đỏ -> Xanh lá
      const ratio = (percent - 0.1) / 0.2;
      r = Math.round((1 - ratio) * 255 + ratio * 52);
      g = Math.round((1 - ratio) * 59 + ratio * 199);
      b = Math.round((1 - ratio) * 48 + ratio * 89);
    } else if (percent <= 0.7) {
      // Xanh lá -> Xanh dương
      const ratio = (percent - 0.3) / 0.4;
      r = Math.round((1 - ratio) * 52 + ratio * 0);
      g = Math.round((1 - ratio) * 199 + ratio * 174);
      b = Math.round((1 - ratio) * 89 + ratio * 239);
    } else if (percent <= 0.9) {
      // Xanh dương -> Vàng
      const ratio = (percent - 0.7) / 0.2;
      r = Math.round((1 - ratio) * 0 + ratio * 255);
      g = Math.round((1 - ratio) * 174 + ratio * 193);
      b = Math.round((1 - ratio) * 239 + ratio * 7);
    } else {
      // Giữ nguyên Vàng
      r = 255;
      g = 193;
      b = 7;
    }

    return `rgb(${r},${g},${b})`;
  };

  return (
    <>
      <Slider
        size="small"
        value={value}
        disabled
        aria-label="Small"
        min={min} // Giá trị nhỏ nhất
        max={max} // Giá trị lớn nhất
        valueLabelDisplay="auto"
        sx={{
          minWidth: "700px",
          height: "4px",
          "& .MuiSlider-track": {
            background: `${color}`,
          },
          "& .MuiSlider-rail": {
            background: `${color}`, // Gradient cho phần chưa kéo tới
            opacity: 1, // Đảm bảo không bị làm mờ
          },
          "& .MuiSlider-thumb": {
            backgroundColor:
              title === "Humidity"
                ? getThumbColor2(value)
                : title === "Light"
                ? getThumbColor3(value)
                : getThumbColor(value), // Thay đổi màu theo vị trí kéo
            border: `2px solid ${
              title === "Humidity"
                ? getThumbColor2(value)
                : title === "Light"
                ? getThumbColor3(value)
                : getThumbColor(value)
            }`,
          },
        }}
      />
    </>
  );
};

export default Slide;

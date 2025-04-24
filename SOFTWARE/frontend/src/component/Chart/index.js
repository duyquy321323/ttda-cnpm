import { CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

export default function Chart({ data, name }) {
  // Lấy giờ hiện tại
  const currentDate = new Date();
  const currentHour = currentDate.getHours();

  // Chuyển đổi và nhóm dữ liệu theo giờ (bao gồm cả ngày)
  const groupedData = data?.reduce((acc, { value, recorded_at }) => {
    const date = new Date(recorded_at); // Chuyển đổi recorded_at thành đối tượng Date
    const hour = date.getHours(); // Lấy giờ từ recorded_at
    const day = date.toLocaleDateString('en-GB', {
      timeZone: 'Asia/Ho_Chi_Minh',
      day: '2-digit',
      month: '2-digit',
      hour12: false,
    });

    // Tạo key cho nhóm dữ liệu: ngày + giờ
    const key = `${day} ${hour < 10 ? '0' : ''}${hour}h`;

    if (!acc[key]) {
      acc[key] = [];
    }
    acc[key].push(value);
    return acc;
  }, {}) || [];

  // Tính trung bình nhiệt độ mỗi giờ
  const averagedData = Object.keys(groupedData).map(key => {
    const temperatures = groupedData[key];
    const avgTemperature = temperatures.reduce((sum, temp) => sum + temp, 0) / temperatures.length;
    return { time: key, value: Number(avgTemperature).toFixed(2) };
  });

  // Tạo dữ liệu đầy đủ cho 24 giờ trước
  const fullDayData = [];
  for (let i = 0; i < 24; i++) {
    const hour = (currentHour - i + 24) % 24; // Tính giờ ngược lại từ giờ hiện tại
    const hourStr = `${hour < 10 ? '0' : ''}${hour}h`; // Đảm bảo định dạng giờ 2 chữ số

    const targetTime = new Date(currentDate);
    targetTime.setHours(currentHour - i); // Tạo đối tượng ngày giờ mới

    const dayStr = targetTime.toLocaleDateString('en-GB', {
      timeZone: 'Asia/Ho_Chi_Minh',
      day: '2-digit',
      month: '2-digit',
      hour12: false,
    });

    const key = `${dayStr} ${hourStr}`;

    const existingData = averagedData.find(item => item.time === key);
    if (existingData) {
      fullDayData.push(existingData);
    } else {
      fullDayData.push({ time: key, value: 0 }); // Nếu không có dữ liệu, gán giá trị 0
    }
  }

  fullDayData.sort((a, b) => {
    let [dateA, hourA] = a.time.split(' ');
    let [dateB, hourB] = b.time.split(' ');
  
    // Chuyển đổi '31/03' thành '03/31' để đúng với định dạng MM/DD/YYYY
    let [dayA, monthA] = dateA.split('/');
    let [dayB, monthB] = dateB.split('/');
  
    // Tạo đối tượng Date hợp lệ
    const timeA = new Date(`2025-${monthA}-${dayA}T${hourA.replace('h', '')}:00:00`);
    const timeB = new Date(`2025-${monthB}-${dayB}T${hourB.replace('h', '')}:00:00`);
  
    return timeA - timeB;  // Sắp xếp theo thứ tự thời gian
  });
  
  return (
    <>
      <h3>{name}</h3> {/* Tiêu đề */}
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={fullDayData} margin={{ top: 30, right: 30, left: 0, bottom: 10 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="time"/>
          <YAxis domain={[0, 1]} tickCount={21} />
          <Tooltip />
          <Line type="monotone" dataKey="value" stroke="#8884d8" strokeWidth={2} />
        </LineChart>
      </ResponsiveContainer>
    </>
  );
}

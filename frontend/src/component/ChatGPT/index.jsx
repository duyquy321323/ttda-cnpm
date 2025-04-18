
  import { GoogleGenerativeAI } from "@google/generative-ai";
import api from "../../api";
    
    const apiKey = "AIzaSyDUwwNU_Jyxw5VQNVuAHLHvVeMF6KWDXRo";
    const genAI = new GoogleGenerativeAI(apiKey);
    
    const model = genAI.getGenerativeModel({
      model: "gemini-2.0-flash",
    });

    async function getDeviceData() {
      try{
          const response = await api.get('/devices/training');
          console.log(response)
          const data = response.data;
          return {dataString: `Trạng thái hiện tại của cửa: ${data.door_state? "Đã mở" : "Đã đóng"}, 
            Tốc độ quạt hiện tại: ${data.fan_speed}%, 
            Trạng thái hiện tại của relay: ${data.relay_state? "Đã bật " : "Đã tắt"}, 
            Chế độ tự động tắt của đèn RBG: ${data.light_auto? "Đang bật" : "Đang tắt"},
            Màu hiện tại của đèn RBG: ${data.light_color}, 
            Giờ tắt của đèn RBG ở chế độ auto: ${data.light_timer_off}`, data: data};
      } catch (e) {
          console.error(e);
      }
    }

    async function setDoorState(state) {
      try {
          await api.post('/fan-relay-servo/door', {state: state});
      } catch (e) {
          console.error(e);
      }
    }
    async function setFanSpeed(speed) {
      try {
          await api.post('/fan-relay-servo/fan', {speed: speed});
      } catch (e) {
          console.error(e);
      }
    }

    async function setRelayState(state) {
      try {
          await api.post('/fan-relay-servo/relay', {state: state});
      } catch (e) {
          console.error(e);
      }
    }

    async function setLightColor(auto, color, timer) {
      try {
          await api.post('/light-rbg/', {auto: auto, color: color, timer_off: timer});
      } catch (e) {
          console.error(e);
      }
    }
    
    const generationConfig = {
      temperature: 1,
      topP: 0.95,
      topK: 40,
      maxOutputTokens: 8192,
      responseModalities: [
      ],
      responseMimeType: "text/plain",
    };
    
    let chatHistory = []; // Lưu toàn bộ hội thoại trước đó

  async function run(textInput, environmentData){

    const deviceData = await getDeviceData();
  let environmentDataString = `Nhiệt độ: ${environmentData.temperature}°C, Độ ẩm: ${environmentData.humidity }%, Độ sáng: ${environmentData.light}%`;
  console.log("environmentDataString", environmentDataString);
  // Lấy câu hỏi gần nhất của user
    const lastUserMessage = chatHistory
      .filter(msg => msg.role === "user")
      .map(msg => msg.text)
      .pop();

    // Kiểm tra nếu người dùng muốn mô tả chi tiết
    const detailRequestPattern = /(thêm|nói|sao|mô tả|chi tiết|giải thích|nói rõ|thêm thông tin|cụ thể hơn|mô tả đi|giới thiệu thêm)/i;

    if (detailRequestPattern.test(textInput)) {
      if (lastUserMessage) {
        textInput = `Hãy mô tả chi tiết hơn về: ${lastUserMessage}`;
      } else {
        return "Bạn muốn tôi mô tả điều gì? Hãy đề cập đến nội dung cụ thể!";
      }
    }

    // Định dạng lịch sử hội thoại đúng chuẩn Google Generative AI
    const formattedHistory = chatHistory.map(msg => ({
      role: msg.role === "bot" ? "model" : msg.role, // Chuyển đổi 'bot' thành 'model'
      parts: [{ text: msg.text }]
    }));

    const chatSession = model.startChat({
      generationConfig,
      history: [
        { role: "user", parts: [{ text: "Dưới đây là dữ liệu môi trường hiện tại của tòa nhà:\n" + environmentDataString }] },
        { role: "user", parts: [{ text: "Còn đây là dữ liệu của các thiết bị hiện tại của tòa nhà:\n" + deviceData.dataString }] },
        { role: "user", parts: [{ text: "Nếu Nhiệt độ < 10 độ C thì nhắn là: 'temperatureLow'"}] },
        { role: "user", parts: [{ text: "Nếu Nhiệt độ > 35 độ C thì nhắn là: 'temperatureHight'"}] },
        { role: "user", parts: [{ text: "Nếu Độ ẩm < 30% thì nhắn là: 'humidityLow'"}] },
        { role: "user", parts: [{ text: "Nếu Độ ẩm >= 60% và < 80% thì nhắn là: 'humidityHight1'"}] },
        { role: "user", parts: [{ text: "Nếu Độ ẩm > 80% thì nhắn là: 'humidityHight2'"}] },
        { role: "user", parts: [{ text: "Nếu Độ sáng < 10% thì nhắn là: 'lightLow1'"}] },
        { role: "user", parts: [{ text: "Nếu Độ sáng >= 10% và < 30% thì nhắn là: 'lightLow2'"}] },
        { role: "user", parts: [{ text: "Nếu Độ sáng >= 70% và < 90% thì nhắn là: 'lightHight1'"}] },
        { role: "user", parts: [{ text: "Nếu Độ sáng >= 90% thì nhắn là: 'lightHight2'"}] },
        { role: "user", parts: [{ text: "Bạn đang trả lời khách hàng nên hãy nói chuyện lịch sự." }] },
        { role: "user", parts: [{ text: "Bây giờ, hãy trả lời các câu hỏi dựa trên dữ liệu môi trường hiện tại. Nếu câu hỏi của khách là rỗng: { Nhớ những cái điều kiện thì nhắn đúng ký tự đó thôi ví dụ: temperatureLow. Bạn chỉ được trả về đúng từ khóa tôi đã đưa: temperatureLow, temperatureHight,... Không được nói gì khác.}" }] },
        { role: "user", parts: [{ text: "Còn nếu có dữ liệu môi trường hoặc khách không đề cập đến dữ liệu môi trường thì trả lời bình thường  " }] },
        { role: "user", parts: [{ text: "Nếu HỎI hoặc NHẮN thì phải TRẢ LỜI(Không chứa các token trên) còn không thì chỉ in ra token như đã đề cập trên" }] },
        { role: "user", parts: [{ text: "Nếu khách có tin nhắn mà không phải rỗng thì KHÔNG ĐƯƠC TRẢ RA token" }] },
        { role: "user", parts: [{ text: "Bạn là 1 trợ lý yolohome." }] },
        { role: "user", parts: [{ text: "Nếu khách muốn bật relay thì hãy nhắn là 'relay { state: 1 }' còn muốn tắt thì đổi lại state là 0"}] },
        { role: "user", parts: [{ text: "Nếu khách muốn đóng cửa thì hãy nhắn là 'door { state: 0 }' còn muốn mở thì đổi lại state là 1"}] },
        { role: "user", parts: [{ text: "Nếu khách muốn bật quạt thì hãy nhắn là 'fan { speed: 100 }' còn muốn tắt thì đổi lại speed là 0, hoặc muốn bật quạt bao nhiều phần trăm thì thay vào."}] },
        { role: "user", parts: [{ text: "Nếu khách muốn bật đèn thì hãy nhắn là 'light { auto: 1, color: 'white', timer_off: '00:00' }' còn muốn tắt thì đổi lại auto là 0 và color là black. LƯU Ý chỉ có 8 màu là red, blue, green, purple, orange, black, white, yellow. Nếu khách chọn màu khác thì đưa ra gợi ý cho khách các màu hiện có"}] },
        { role: "user", parts: [{ text: "nếu thiếu MÀU, CHẾ ĐỘ AUTO, GIỜ TẮT từ thông tìn khách hàng thì thêm trường đó lấy từ dữ liệu hiện có, NHỚ ĐÚNG CÚ PHÁP!!!"}] },
        { role: "user", parts: [{ text: "LÚC KHÁCH MUỐN ĐIỀU CHỈNH CÁC THIẾT BỊ NHƯ ĐÈN RBG, QUẠT, CỬA, RELAY thì phải ĐÚNG CÚ PHÁP ĐÃ NÓI TRƯỚC ĐÓ!!!"}] },
        { role: "user", parts: [{ text: "Khi đưa ra ví dụ thì không được nhắn luôn cú pháp, khi nào nhận được yêu cầu điều chỉnh thì mới nhắn cú pháp"}] },
        { role: "user", parts: [{ text: "bạn chỉ có thể đưa ra các gợi ý chỉnh thiết bị hiện có thôi"}] },
        { role: "user", parts: [{ text: "--- từ dòng này trở đi là TIN NHẮN CỦA KHÁCH (nhớ nếu không phải rổng thì không được trả token) ---" }] },
        ...formattedHistory // Sử dụng lịch sử hội thoại đã định dạng
      ],
    });

    // Gửi câu hỏi mới
    const result = await chatSession.sendMessage(textInput);
    let botResponse = result.response.text();

    if (textInput.trim().length > 0) {
      // Nếu bot vẫn phản hồi token → chặn lại
      const tokens = ["temperatureLow", "temperatureHight", "humidityLow", "humidityHight1", "humidityHight2", "lightLow1", "lightLow2", "lightHight1", "lightHight2"];
      const containsToken = tokens.some(token => botResponse.includes(token));
    
      if (containsToken) {
        botResponse = "Xin lỗi, tôi không thể cung cấp thông tin này.";
      }
    }

    console.log("botResponse", botResponse);

    let botWarning = null;
if(textInput.trim().length === 0) {
    if(botResponse.includes("temperatureLow")) {
      botWarning = "Nhiệt độ quá thấp, có nguy cơ cảm lạnh, cần ấm áp hơn.";
    }
    else if(botResponse.includes("temperatureHight")) {
      botWarning = `Nhiệt độ quá cao, có nguy cơ bị say nắng, sốt nóng. Cần bật quạt với tốc độ ${Number((environmentData.temperature - 35) * 100 / 10)?.toFixed(2)} trở lên.`;
    } 
    else if(botResponse.includes("humidityLow")) {
      botWarning = "Không khí quá khô! Có thể gây khô da, khó chịu khi hô hấp, tăng nguy cơ cháy nổ.";
    }
    else if(botResponse.includes("humidityHight1")) {
      botWarning = "Độ ẩm cao! Cẩn thận nấm mốc và vi khuẩn phát triển. Hãy kiểm tra thông gió, hút ẩm nếu cần.";
    }
    else if(botResponse.includes("humidityHight2")) {
      botWarning = "Nguy hiểm! Không khí quá ẩm, dễ gây ẩm mốc, hư hỏng thiết bị điện tử.";
    }
    else if(botResponse.includes("lightLow1")) {
      botWarning = "Ánh sáng quá yếu, cần bật đèn.";
    }
    else if(botResponse.includes("lightLow2")) {
      botWarning = "Độ sáng thấp, dễ gây mệt mỏi khi đọc sách hoặc làm việc trong thời gian dài.";
    }
    else if(botResponse.includes("lightHight1")) {
      botWarning = "Độ sáng vượt mức bình thường, có thể gây chói mắt nếu duy trì trong thời gian dài.Đề xuất tắt đèn để tiết kiệm điện.";
    }
    else if(botResponse.includes("lightHight2")) {
      botWarning = "Độ sáng hiện tại quá cao, có thể gây khó chịu và ảnh hưởng đến thị lực. Đề xuất tắt đèn để tiết kiệm điện."
    }
    else if (deviceData.data.relay_state) {
      botWarning = "Relay đang bật, bạn có muốn tắt lại không.";
    }
    else if (deviceData.data.door_state) {
      botWarning = "Cửa đang mở, bạn có muốn đóng lại không.";
    }
    else if (deviceData.data.fan_speed > 0) {
      botWarning = "Quạt đang chạy, bạn có muốn tắt để tiết kiệm điện không.";
    }
  }

  if(botResponse.includes("door")) {
    const input = botResponse.match(/door\s*\{[^}]*\}/);
    const [type, jsonPart] = input[0].split(/ (?=\{)/);
    const obj = JSON.parse(jsonPart.replace(/(\w+):/g, '"$1":'));
    await setDoorState(obj.state);
    botResponse = obj.state === 1 ? "Cửa đã mở" : "Cửa đã đóng";
  }
  else if(botResponse.includes("fan")) {
    const input = botResponse.match(/fan\s*\{[^}]*\}/);
    const [type, jsonPart] = input[0].split(/ (?=\{)/);
    const obj = JSON.parse(jsonPart.replace(/(\w+):/g, '"$1":'));
    await setFanSpeed(obj.speed);
    botResponse = `Quạt đã được điều chỉnh với tốc độ ${obj.speed}%`;
  }
  else if(botResponse.includes("relay {")) {
    const input = botResponse.match(/relay\s*\{[^}]*\}/);
    const [type, jsonPart] = input[0].split(/ (?=\{)/);
    const obj = JSON.parse(jsonPart.replace(/(\w+):/g, '"$1":'));
    await setRelayState(obj.state);
    botResponse = obj.state === 1 ? "Relay đã bật" : "Relay đã tắt";
  }
  else if (botResponse.includes("light")) {
    const match = botResponse.match(/light\s*\{[^}]*\}/);
    console.log("match", match);
  
    if (match && match[0]) {
      const extracted = match[0]; // light { auto: 0, color: 'black', timer_off: '00:00' }
      const [type, jsonPart] = extracted.split(/ (?=\{)/);
  
      // ✅ CHUẨN HÓA: chỉ thay dấu nháy đơn trong value, không gây lỗi
      const jsonFixed = eval('(' + jsonPart + ')');         // Chỉ thay 'value' → "value"
  
      console.log("jsonFixed", jsonFixed); // Xem lại chuỗi JSON đã chuẩn
  
      try {
  
        if (jsonFixed.color && jsonFixed.auto !== undefined) {
          await setLightColor(jsonFixed.auto, jsonFixed.color, jsonFixed.timer_off);
          botResponse = `Đèn đã được điều chỉnh với chế độ tự động tắt ${jsonFixed.auto}, màu ${jsonFixed.color}, giờ tắt ${jsonFixed.timer_off}`;
        } else {
          botResponse = "Điều chỉnh đèn thất bại. Vui lòng nhập đủ thông tin.";
        }
      } catch (err) {
        console.error("JSON parse error:", err);
        botResponse = "Lỗi khi phân tích cú pháp lệnh. Vui lòng kiểm tra định dạng.";
      }
  
    } else {
      botResponse = "Không tìm thấy lệnh điều chỉnh đèn hợp lệ.";
    }
  }
  
    // Cập nhật lịch sử hội thoại với format đúng
    chatHistory.push({ role: "user", text: "Khách: " + textInput });
    chatHistory.push({ role: "model", text: botResponse }); // Sửa role "bot" thành "model"

    return {message: botResponse, warning: botWarning};
  }

  export default run;

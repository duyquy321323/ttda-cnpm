
  import { GoogleGenerativeAI } from "@google/generative-ai";
    
    const apiKey = "AIzaSyDUwwNU_Jyxw5VQNVuAHLHvVeMF6KWDXRo";
    const genAI = new GoogleGenerativeAI(apiKey);
    
    const model = genAI.getGenerativeModel({
      model: "gemini-2.0-flash",
    });

    // async function getCarData() {
    //   try{
    //       const response = await api.get('/car/training');
    //       console.log(response)
    //       const data = response.data;
    //       return data.map(car => 
    //         `Tên xe: ${car.searchCarResponse.title}, 
    //         Xe cũ hoặc mới: ${car.searchCarResponse.condition}, 
    //         Giá hiện tại: ${car.searchCarResponse.price} VND, 
    //         Địa chỉ: ${car.searchCarResponse.address}, 
    //         Năm sản xuât: ${car.searchCarResponse.year}, 
    //         Số chỗ chứa trong xe: ${car.searchCarResponse.capacity}, 
    //         Số lượt đánh giá hiện tại của xe: ${Number(car.searchCarResponse.quantityEvaluate).toFixed(1)}, 
    //         Rate của xe: ${car.searchCarResponse.rates} sao
    //         Các feature của Xe {
    //           ${car.featureDTOs.map(feature =>`Tên feature: ${feature.name}`).join("\n")}
    //         }`).join("\n");
    //   } catch (e) {
    //       console.error(e);
    //   }
    // }
    
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

    // const carData = await getCarData();
  environmentData = `Nhiệt độ: ${environmentData.temperature}°C, Độ ẩm: ${environmentData.humidity}%, Độ sáng: ${environmentData.light}%`;
  console.log(environmentData)
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

    // Tạo session với lịch sử hội thoại đúng định dạng

    /**
     *  CẢNH BÁO: Nhiệt độ quá thấp, có nguy cơ cảm lạnh, cần ấm áp hơn.
                              </span>
                          )}
                          {environmentData.temperature > 35 && (
                              <span className="warning">
                                  CẢNH BÁO: Nhiệt độ quá cao, có nguy cơ bị say nắng, sốt nóng.

                                  {environmentData.humidity < 30 && (
                                  <span className="warning">
                                      CẢNH BÁO: Không khí quá khô! Có thể gây khô da, khó chịu khi hô hấp, tăng nguy cơ cháy nổ.
                                  </span>
                              )}
                              {environmentData.humidity >= 30 && environmentData.humidity < 60 && (
                                  <span className="warning">
                                      THÔNG BÁO: Mức lý tưởng! Không khí tốt cho sức khỏe và thiết bị. 
                                  </span>
                              )}
                              {environmentData.humidity >= 60 && environmentData.humidity < 80 && (
                                  <span className="warning">
                                      THÔNG BÁO: Độ ẩm cao! Cẩn thận nấm mốc và vi khuẩn phát triển. Hãy kiểm tra thông gió, hút ẩm nếu cần.
                                  </span>
                              )}
                              {environmentData.humidity >= 80 && (
                                  <span className="warning">
                                      CẢNH BÁO:  Nguy hiểm! Không khí quá ẩm, dễ gây ẩm mốc, hư hỏng thiết bị điện tử.
                                  </span>
                              )}


                              {environmentData.light < 10 && (
                                  <span className="warning">
                                      CẢNH BÁO: Có nguy cơ gây mỏi mắt và không an toàn, cần tăng cường độ sáng.
                                  </span>
                              )}


                              {environmentData.light >= 10 && environmentData.light < 30 && (
                                  <span className="warning">
                                      CẢNH BÁO: Dễ gây mệt mỏi khi đọc sách hoặc làm việc trong thời gian dài.
                                  </span> 
                              )}

                              {environmentData.light >= 30 && environmentData.light < 70  && (
                                  <span className="warning">
                                      THÔNG BÁO: tốt.
                                  </span> 
                              )}

                              {environmentData.light >= 70 && environmentData.light < 90 && (
                                  <span className="warning">
                                      CẢNH BÁO: Có thể gây chói mắt nếu duy trì trong thời gian dài.
                                  </span> 
                              )}
                              
                              {environmentData.light >= 90 && (
                                  <span className="warning">
                                      Có thể gây khó chịu và ảnh hưởng đến thị lực, do đó nên điều chỉnh để giảm cường độ sáng nếu cần.
                                  </span> 
                              )}
    */
    const chatSession = model.startChat({
      generationConfig,
      history: [
        { role: "user", parts: [{ text: "Dưới đây là dữ liệu môi trường hiện tại của tòa nhà:\n" + environmentData }] },
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
        { role: "user", parts: [{ text: "Nếu dữ liệu môi trường KHÔNG CÓ mà khách NÓI VỀ dữ liệu môi trường thì hãy nói là: Hiện tại tôi không thể kết nối được với hệ thống, vui lòng quay lại sau. " }] },
        { role: "user", parts: [{ text: "Còn nếu có dữ liệu môi trường hoặc khách không đề cập đến dữ liệu môi trường thì trả lời bình thường  " }] },
        { role: "user", parts: [{ text: "Nếu HỎI hoặc NHẮN thì phải TRẢ LỜI(Không chứa các token trên) còn không thì chỉ in ra token như đã đề cập trên" }] },
        { role: "user", parts: [{ text: "Nếu khách có tin nhắn mà không phải rỗng thì KHÔNG ĐƯƠC TRẢ RA token" }] },
        { role: "user", parts: [{ text: "Bạn là 1 trợ lý yolohome." }] },
        { role: "user", parts: [{ text: "--- từ dòng này trở đi là TIN NHẮN CỦA KHÁCH (nhớ nếu không phải rổng thì không được trả token) ---" }] },
        // { role: "user", parts: [{ text: "Bạn khoan hãy nói ra những tên xe khi khách hàng chưa đề cập đến, khi nào khách muốn giới thiệu thì hãy nói!." }] },
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

    let botWarning = null;

    if(botResponse.includes("temperatureLow")) {
      botWarning = "Nhiệt độ quá thấp, có nguy cơ cảm lạnh, cần ấm áp hơn.";
    }
    else if(botResponse.includes("temperatureHight")) {
      botWarning = "Nhiệt độ quá cao, có nguy cơ bị say nắng, sốt nóng.";
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
      botWarning = "Có nguy cơ gây mỏi mắt và không an toàn, cần tăng cường độ sáng.";
    }
    else if(botResponse.includes("lightLow2")) {
      botWarning = "Độ sáng thấp, dễ gây mệt mỏi khi đọc sách hoặc làm việc trong thời gian dài.";
    }
    else if(botResponse.includes("lightHight1")) {
      botWarning = "Độ sáng vượt mức bình thường, có thể gây chói mắt nếu duy trì trong thời gian dài.";
    }
    else if(botResponse.includes("lightHight2")) {
      botWarning = "Độ sáng hiện tại quá cao, có thể gây khó chịu và ảnh hưởng đến thị lực."
    }

    // Cập nhật lịch sử hội thoại với format đúng
    chatHistory.push({ role: "user", text: "Khách: " + textInput });
    chatHistory.push({ role: "model", text: botResponse }); // Sửa role "bot" thành "model"

    return {message: botResponse, warning: botWarning};
  }

  export default run;

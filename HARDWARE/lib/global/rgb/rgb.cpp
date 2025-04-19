#include <global.h>
void rgbControl(AdafruitIO_Data *data)
 {
    String receivedData = data->toString();
    Serial.print("Received RGB Data: ");
    Serial.println(receivedData);

    if (receivedData == "#000000"){
        turnoffLed();
    }
    else if (receivedData == "#ff0000"){ //RED
        turnonLed(255, 0, 0);
    }
    else if (receivedData == "#008000"){ // Green
        turnonLed(0, 255, 0);
    }
    else if (receivedData == "#0000ff"){ //Blue
        turnonLed(0, 0, 255);
    }
    else if (receivedData == "#ffffff"){ //White 
        turnonLed(255, 255, 255);
    }
    else if (receivedData == "#ffff00") {  // Yelloư
        turnonLed(255, 255, 0);
    }
    else if (receivedData == "#ffa500") {  // Orange
        turnonLed(255, 165, 0);
    }
    else if (receivedData == "#800080") {  // purple
        turnonLed(128, 0, 128);
    }
    if (stateRGB == 1){
        stateRGB = 0;
        //autorgb->save(stateRGB);
        countRGB = timeoutRGB;   
    }
}

void rgbAuto(AdafruitIO_Data *data){
    String autoStatus = data->toString();
    Serial.print("Auto is ");
    Serial.print(autoStatus);  
    if (autoStatus.toInt() == 0){
        countRGB = -1;
    }
    stateRGB = autoStatus.toInt();
}

void autoLed(){
        if (digitalRead(pirPin) && (light * 100 / 4095) < 30){
            turnonLed(255, 255, 255);
            setTimerRGB(10);
        }
        else{
            if (timer_flag5 == 1){
                turnoffLed();
                timer_flag5 = 0;
            }
        }
}

void timerControl(AdafruitIO_Data *data) {
    String timeStr = data->toString();
    Serial.print("Received timer off: ");
    Serial.println(timeStr);
    if (timeStr != "null" && timeStr != "00:00"){
        check = 1;
        int hour = timeStr.substring(0, timeStr.indexOf(':')).toInt();
        int minute = timeStr.substring(timeStr.indexOf(':') + 1).toInt();
        unsigned long targetSeconds = (hour * 3600) + (minute * 60);
        offTime = targetSeconds;
        Serial.print("Received seconds off: ");
        Serial.println(offTime);
        setTimer2(offTime);
    }
}

void turnoffLed(){
    NeoPixel.clear();
    NeoPixel.show();
    //Serial.println("OFF");
    //Serial.println("OFF");
}

void turnonLed(int r, int g, int b){
    for (int pixel = 0; pixel < NUM_PIXELS; pixel++) {
        NeoPixel.setPixelColor(pixel, NeoPixel.Color(r, g, b));
    }
    NeoPixel.show();
}
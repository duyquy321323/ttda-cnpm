#include "global.h"
void setupLCD(){
    lcd.init();
    lcd.backlight();
    lcd.setCursor(0, 0);
    lcd.print("TEST LCD");
}

void updateData() {
    status = DHT.read();
    temperature = DHT.getTemperature();
    humidity = DHT.getHumidity();
    light = analogRead(sensorPin);

    lcd.setCursor(0, 0);
    lcd.print("RT:");
    lcd.setCursor(3, 0);
    lcd.print((int)temperature);
    lcd.print("*C ");
    lcd.setCursor(8, 0);
    lcd.print("RH:");
    lcd.print((int)humidity);
    lcd.print("%");
    // lcd.setCursor(11, 0);
    // lcd.print(humidity);
    lcd.setCursor(0, 1);
    lcd.print("LUX:");
    lcd.setCursor(4, 1);
    lcd.print(light * 100 / 4095);
    lcd.print("%");
}
 
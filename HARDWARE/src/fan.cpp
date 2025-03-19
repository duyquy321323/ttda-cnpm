#include <fan.h>
int miniFanPin = P10;
void fanControl(AdafruitIO_Data *data){
    int fanSpeed = data->toInt();
    int pwmValue = map(fanSpeed, 0, 100, 0, 255);
    Serial.print("Fan speed: ");  
    Serial.println(fanSpeed);
    analogWrite(miniFanPin, pwmValue);
}
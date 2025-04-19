#include "global.h"
void fanControl(AdafruitIO_Data *data){
    int fanSpeed = data->toInt();
    int pwmValue = map(fanSpeed, 0, 100, 0, 255);
    Serial.print("Fan speed: ");  
    Serial.println(fanSpeed);
    analogWrite(miniFanPin, pwmValue);
    if (stateFan == 1){
        stateFan = 0;
        //autofan->save(stateFan);
        countFan = timeoutFan;
    }
}

void fanAuto(AdafruitIO_Data *data){
    String autoStatus = data->toString();
    Serial.print("Auto Fan is ");  
    Serial.println(autoStatus);
    stateFan = autoStatus.toInt();
    if (stateFan == 0){
        countFan = -1;
    }
}

void autoFan(){
    if (temperature > 20 && digitalRead(pirPin)){
        setTimerFan(10);
        analogWrite(miniFanPin, 80);
    }
    else {
        if (timer_flag4 == 1){
            analogWrite(miniFanPin, 0);
            timer_flag4 = 0;
        }
    }
}
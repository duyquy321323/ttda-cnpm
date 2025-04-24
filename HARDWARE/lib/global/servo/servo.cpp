#include "global.h"
void servoControl(AdafruitIO_Data *data){
    String servoStatus = data->toString();
    Serial.print("Servo is ");  
    Serial.println(servoStatus);
    myservo.write(servoStatus == "1" ? 90 : 180);
    if (stateDoor == 1){
        stateDoor = 0;
    // autodoor->save(stateDoor);
        countDoor = timeoutDoor;
    }
    Serial.print(stateRGB);
}
void setupServo(int pin){
    myservo.attach(pin);
    myservo.write(180);
}

void servoAuto(AdafruitIO_Data *data){
    String autoStatus = data->toString();
    Serial.print("Auto Door is ");  
    Serial.println(autoStatus);
    if  (autoStatus.toInt() == 0){
        countDoor = -1;
    }
    stateDoor = autoStatus.toInt();
    Serial.print(stateRGB);
}

void autoServo(){
    if (digitalRead(pirPin)) {
            myservo.write(90);
            setTimerDoor(10);
    }
    else{
        if (timer_flag3 == 1){
            myservo.write(180);
            // Serial.println(digitalRead(pirPin));
            setTimerDoor(10);
        }
    }
}
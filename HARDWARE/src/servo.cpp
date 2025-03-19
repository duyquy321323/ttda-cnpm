#include "servoControl.h"
Servo myservo;
String password = "";
int servoPin = P4;
void servoControl(AdafruitIO_Data *data){
    String servoStatus = data->toString();
    Serial.print("Servo is ");  
    Serial.println(servoStatus);
    myservo.write(servoStatus == "1" ? 90 : 180);
}
void setupServo(int pin){
    myservo.attach(pin);
    myservo.write(180);
}
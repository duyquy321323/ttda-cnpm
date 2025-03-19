#include <ESP32Servo.h>
#include "AdafruitIO_WiFi.h"
extern Servo myservo;
extern String password;
extern int servoPin;
void servoControl(AdafruitIO_Data *data);
void setupServo(int pin);
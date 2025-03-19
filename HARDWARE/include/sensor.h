#include <DHT20.h>
#include <LiquidCrystal_I2C.h>
#include <Wire.h>
#include "AdafruitIO_WiFi.h"
extern DHT20 DHT;
extern int sensorPin;
extern LiquidCrystal_I2C lcd;
void setupLCD();
void updateData();
extern int status;
extern float temperature;
extern float humidity;
extern float light;

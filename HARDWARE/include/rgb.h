#include <Adafruit_NeoPixel.h>
#include "AdafruitIO_WiFi.h"
#include <sensor.h>
#include "timer.h"
extern int PIN_NEO_PIXEL;
extern int NUM_PIXELS;
extern int pirPin;
extern String state;
extern unsigned long offTime;
extern Adafruit_NeoPixel NeoPixel;
extern bool check;
void rgbControl(AdafruitIO_Data *data);
void rgbAuto(AdafruitIO_Data *data);
void autoLed();
void timerControl(AdafruitIO_Data *data);
void turnoffLed();
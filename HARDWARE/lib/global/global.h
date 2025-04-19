#include <WiFi.h>
#include "pins_arduino.h"
#include <string.h>
#include "AdafruitIO_WiFi.h"
#include <Adafruit_NeoPixel.h>
#include <DHT20.h>
#include <LiquidCrystal_I2C.h>
#include <Wire.h>
#include <ESP32Servo.h>
#include <Arduino.h>
#include <Ticker.h>

//WIFI
extern const char* WIFI_SSID;
extern const char* WIFI_PASS;

//Adafruit IO
#define AIO_USERNAME    ""
#define AIO_KEY         ""

#define AIO_USERNAME1    ""
#define AIO_KEY1         ""
extern AdafruitIO_WiFi io;
extern AdafruitIO_WiFi io1;
extern AdafruitIO_Feed *temperatureFeed;
extern AdafruitIO_Feed *humidityFeed;
extern AdafruitIO_Feed *lightFeed;
extern AdafruitIO_Feed *relayFeed;
extern AdafruitIO_Feed *servoFeed;
extern AdafruitIO_Feed *rgbFeed;
extern AdafruitIO_Feed *fanFeed;
extern AdafruitIO_Feed *autorgb;
extern AdafruitIO_Feed *autofan;
extern AdafruitIO_Feed *autodoor;
extern AdafruitIO_Feed *timer_off;
extern AdafruitIO_Feed *passwordFeed;
extern AdafruitIO_Feed *remoteFan;
extern AdafruitIO_Feed *remoteRGB;
extern AdafruitIO_Feed *remoteDoor;
extern AdafruitIO_Feed *remoteRelay;
//FAN
extern int miniFanPin;
extern int stateFan;
void fanControl(AdafruitIO_Data *data);
void fanAuto(AdafruitIO_Data *data);
void autoFan();
//RELAY
extern int relayPin;
void relayControl(AdafruitIO_Data *data);

//TIMER
extern int timer_flag1;
extern int timer_flag2;
extern int timer_flag3;
extern int timer_flag4;
extern int timer_flag5;
extern Ticker myTimer;
void timerRun();
void setTimerDoor(int duratio);
void setTimerFan(int duration);
void setTimerRGB(int duration);
void setTimer1(int duration);
void setTimer2(int duration);

//SERVO
extern Servo myservo;
extern String password;
extern int servoPin;
extern int stateDoor;
void servoControl(AdafruitIO_Data *data);
void setupServo(int pin);
void servoAuto(AdafruitIO_Data *data);
void autoServo();

//REMOTE
extern int receiverPin;
extern int speedRemote;
extern String colorRemote;
extern String prevcolorRemote;
extern String passwordAda;
extern int relayRemote;
extern int doorRemote;
void controlRemote();
void setupRemote();
void passAuthorized(AdafruitIO_Data *data);

//LED RGB
extern int PIN_NEO_PIXEL;
extern int NUM_PIXELS;
extern int pirPin;
extern int stateRGB;
extern unsigned long offTime;
extern Adafruit_NeoPixel NeoPixel;
extern bool check;
void rgbControl(AdafruitIO_Data *data);
void rgbAuto(AdafruitIO_Data *data);
void autoLed();
void timerControl(AdafruitIO_Data *data);
void turnoffLed();
void turnonLed(int r, int g, int b);

//SENSORS
extern DHT20 DHT;
extern int sensorPin;
extern LiquidCrystal_I2C lcd;
extern int status;
extern float temperature;
extern float humidity;
extern float light;
void setupLCD();
void updateData();

//FSM
void fsm_auto();
void fsm_manual();
extern int timeoutRGB;
extern int timeoutDoor;
extern int timeoutFan;
extern int countRGB;
extern int countDoor;
extern int countFan;
#define LED_AUTO 1
#define LED_MAN 0
#define FAN_AUTO 1
#define FAN_MAN 0
#define DOOR_AUTO 1
#define DOOR_MAN 0

//SCHEDULER
#ifndef INC_SCHEDULER_H_
#define INC_SCHEDULER_H_
typedef struct{
	void (*pTask)(void);
	uint32_t Delay;
	uint32_t Period;
	uint8_t RunMe;
	uint8_t isRun;
}sTasks;

#define SCH_MAX_TASKS 5
#define TICK 10 //

void SCH_Init(void);
void SCH_Update(void);
void SCH_Add_Task(void(*pFunction)(), uint32_t DELAY, uint32_t PERIOD);
void SCH_Dispatch_Tasks(void);
void SCH_Delete_Task(uint8_t task_index);
void ClearAllTasks();
extern int start;
extern int end;
#endif /* INC_SCHEDULER_H_ */



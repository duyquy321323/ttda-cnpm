#include "global.h"
//ADAFRUIT
AdafruitIO_WiFi io(AIO_USERNAME, AIO_KEY, WIFI_SSID, WIFI_PASS);
AdafruitIO_WiFi io1(AIO_USERNAME1, AIO_KEY1, WIFI_SSID, WIFI_PASS);
AdafruitIO_Feed *temperatureFeed = io1.feed("DHT20_TEMPERATURE");
AdafruitIO_Feed *humidityFeed = io1.feed("DHT20_HUMIDITY");
AdafruitIO_Feed *lightFeed = io1.feed("LIGHT_SENSOR");
AdafruitIO_Feed *relayFeed = io.feed("RELAY");
AdafruitIO_Feed *servoFeed = io.feed("SERVO_DOOR");
AdafruitIO_Feed *rgbFeed = io.feed("LED_RGB");
AdafruitIO_Feed *fanFeed = io.feed("MINI_FAN");
AdafruitIO_Feed *passwordFeed = io.feed("PASSWORD");
AdafruitIO_Feed *timer_off = io.feed("TIME_OFF");
AdafruitIO_Feed *autorgb = io.feed("LED_RGB_AUTO");
AdafruitIO_Feed *autofan = io1.feed("AUTO_FAN");
AdafruitIO_Feed *autodoor = io1.feed("AUTO_DOOR");
AdafruitIO_Feed *remoteFan = io.feed("MINI_FAN");
AdafruitIO_Feed *remoteRGB = io.feed("LED_RGB");
AdafruitIO_Feed *remoteDoor = io.feed("SERVO_DOOR");
AdafruitIO_Feed *remoteRelay = io.feed("RELAY");

const char* WIFI_SSID = "";
const char* WIFI_PASS = "";
//FAN
int miniFanPin = P10;
int stateFan = 0;

//TIMER
int timer_flag1 = 0;
int timer_flag2 = 0;
int timer_flag3 = 0;
int timer_flag4 = 0;
int timer_flag5 = 0;
Ticker myTimer;

//SERVO
Servo myservo;
String password = "";
int servoPin = P4;
int stateDoor = 0;


//RELAY
int relayPin = P14;

//REMOTE
int receiverPin = P1;
int speedRemote = 0;
String colorRemote = "";
String prevcolorRemote = "";
String passwordAda = "";
int doorRemote = 0;
int relayRemote = 0;

//RGB
int PIN_NEO_PIXEL = P0;
int NUM_PIXELS  =   4;
int pirPin = P16;
bool check = false;
unsigned long offTime = 0;
int stateRGB = 0;
Adafruit_NeoPixel NeoPixel(NUM_PIXELS, PIN_NEO_PIXEL, NEO_GRB + NEO_KHZ800);

//SENSORS
DHT20 DHT(&Wire1);
int sensorPin = P2_ADC;
LiquidCrystal_I2C lcd(0x21, 16, 2);
int status = DHT.read();
float temperature = DHT.getTemperature();
float humidity = DHT.getHumidity();
float light = analogRead(sensorPin) * 100 / 4095;

//FSM
int timeoutRGB = 5;
int timeoutDoor = 5;
int timeoutFan = 5;
int countRGB = 0;
int countDoor = 0;
int countFan = 0;


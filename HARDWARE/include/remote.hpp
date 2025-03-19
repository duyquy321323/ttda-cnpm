#include <rgb.h>
#include <fan.h>
#include <servoControl.h>
#include <relay.h>
extern int receiverPin;
extern int speed;
extern String color;
extern String passwordAda;
void controlRemote();
void setupRemote();
void passAuthorized(AdafruitIO_Data *data);

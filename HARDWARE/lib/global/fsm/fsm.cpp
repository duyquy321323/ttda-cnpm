#include "global.h"

void fsm_auto(){
    //Serial.print("helllooooooooooo");
    switch (stateRGB)
    {
    case LED_AUTO:
        autoLed();
        break;   
    default:
        break;
    }

    switch (stateFan)
    {
    case FAN_AUTO:
        autoFan();
        break;
    default:
        break;
    }

    switch (stateDoor)
    {
    case DOOR_AUTO:
        autoServo();
        break;
    default:
        break;
    }
}

void fsm_manual(){
    switch (stateRGB)
    {
    case LED_MAN:
        if (countRGB == 0){
            stateRGB = LED_AUTO;
            rgbFeed->save("#000000");
            timer_flag5 = 1;
        }
        break;
    
    default:
        break;
    }

    switch (stateFan)
    {
    case FAN_MAN:
        if (countFan == 0){
            stateFan = FAN_AUTO;
            fanFeed->save(0);
        }
        break;
    default:
        break;
    }

    switch (stateDoor)
    {
    case DOOR_MAN:
        if (countDoor == 0){
            Serial.print("timeout");
            stateDoor = DOOR_AUTO;
            servoFeed->save(0);
        }
        break;
    default:
        break;
    }
    if (stateDoor == DOOR_MAN && countDoor > 0) countDoor--;
    if (stateRGB == LED_MAN && countRGB > 0) countRGB--;
    if (stateFan == FAN_MAN && countFan > 0) countFan--;
}
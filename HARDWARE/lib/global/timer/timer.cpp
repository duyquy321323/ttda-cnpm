#include <global.h>
#include <stdint.h>
int counter1 = 0;
int counter2 = 0;
int counter3 = 0;
int counter4 = 0;
int counter5 = 0;
void setTimer1(int duration){
    counter1 = duration;
    timer_flag1 = 0;
}

void setTimer2(int duration){
    counter2 = duration;
    timer_flag2 = 0;
}

void setTimerDoor(int duration){
    counter3 = duration;
    timer_flag3 = 0;
}

void setTimerFan(int duration){
    counter4 = duration;
    timer_flag4 = 0;
}

void setTimerRGB(int duration){
    counter5 = duration;
    timer_flag5 = 0;
}

void timerRun(){
    if (counter1 > 0){
        counter1--;
        if (counter1 <= 0) timer_flag1 = 1;
    }

    if (counter2 > 0){
        counter2--;
        if (counter2 <= 0) timer_flag2 = 1;
    }
    if (counter3 > 0){
        counter3--;
        if (counter3 <= 0) timer_flag3 = 1;
    }

    if (counter4 > 0){
        counter4--;
        if (counter4 <= 0) timer_flag4 = 1;
    }

    if (counter5 > 0){
        counter5--;
        if (counter5 <= 0) timer_flag5 = 1;
    }
}
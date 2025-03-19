#ifndef TIMER_H
#define TIMER_H

#include <Arduino.h>
#include <driver/timer.h>
#include <stdint.h>

extern hw_timer_t *dataTimer;
extern hw_timer_t *dataTimer1;
extern bool sendDataFlag;
extern bool offFlag;
// ISR (Hàm ngắt Timer)
void IRAM_ATTR timerRun2(); void IRAM_ATTR timerRun1();


void setTimer(uint32_t id, bool loop, hw_timer_t **timer, uint64_t duration, void (*callback)());


#endif
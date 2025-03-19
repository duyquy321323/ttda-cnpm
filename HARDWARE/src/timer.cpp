#include <timer.h>
#include <stdint.h>
bool sendDataFlag = false;
bool offFlag = false;
hw_timer_t *dataTimer = NULL;
hw_timer_t *dataTimer1 = NULL;
void setTimer(uint32_t id, bool loop, hw_timer_t **timer, uint64_t duration, void (*callback)()) {
    if (*timer != NULL) {
        timerDetachInterrupt(*timer); // Hủy ngắt trước khi gán mới
        timerEnd(*timer); // Giải phóng bộ nhớ
    }

    *timer = timerBegin(id, 8000, true); // 1 tick = 0.1ms
    timerAttachInterrupt(*timer, callback, true);
    timerAlarmWrite(*timer, duration * 10, loop);
    timerAlarmEnable(*timer);
}

void IRAM_ATTR timerRun1(){
    sendDataFlag = 1;
}

void IRAM_ATTR timerRun2() {
    offFlag = 1;
}
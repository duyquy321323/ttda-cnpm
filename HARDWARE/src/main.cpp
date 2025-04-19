#include "global.h"
//#include <IRremote.hpp>


void timerCallback() {
    timerRun();
    SCH_Update();
}

void sendData(){
    updateData();
    Serial.print("Sending light: ");
    Serial.println(light * 100 / 4095);
    lightFeed->save(light * 100 / 4095);

    Serial.print("Sending temperature: ");
    Serial.println(temperature);
    temperatureFeed->save(temperature);

    Serial.print("Sending humidity: ");
    Serial.println(humidity);
    humidityFeed->save(humidity);
}


void feedSetup(){
    io1.connect();
    io.connect();
    servoFeed->onMessage(servoControl);
    servoFeed->get();
    relayFeed->onMessage(relayControl);
    relayFeed->get();
    fanFeed->get();
    fanFeed->onMessage(fanControl);
    rgbFeed->get();
    rgbFeed->onMessage(rgbControl);
    autorgb->get();
    autorgb->onMessage(rgbAuto);
    passwordFeed->get();
    passwordFeed->onMessage(passAuthorized);
    timer_off->get();
    timer_off->onMessage(timerControl);
    autodoor->get();
    autodoor->onMessage(servoAuto);
    autofan->get();
    autofan->onMessage(fanAuto);
}


void setup() {
    Serial.begin(115200);
    WiFi.begin(WIFI_SSID, WIFI_PASS);
    pinMode(relayPin, OUTPUT);
    pinMode(miniFanPin, OUTPUT);
    pinMode(pirPin, INPUT);
    Wire.begin();
    Wire1.begin(P20, P19);
        //  ESP32 default pins 21 22
    setupRemote();
    Serial.println("IR Receiver Ready...");
    feedSetup();
    setupLCD();

    setupServo(servoPin);
    myservo.write(180);

    NeoPixel.begin();

    sendData();
    SCH_Init();
    //SCH_Add_Task(fsm_auto, 0, 1);
    SCH_Add_Task(fsm_manual, 0, 10);
    myTimer.attach(1.0, timerCallback);
    setTimer1(3);
}


void loop() {
    io.run();
    io1.run();
    if (timer_flag1 == 1) {
        sendData();
        setTimer1(30);
    }
    if (timer_flag2 == 1) {
        turnoffLed();
        rgbFeed->save("#000000");
        timer_flag2 = 0;
    }
    //fsm();
    fsm_auto();
    //fsm_manual();
    SCH_Dispatch_Tasks();
    controlRemote();
    //Serial.println(digitalRead(pirPin));
}

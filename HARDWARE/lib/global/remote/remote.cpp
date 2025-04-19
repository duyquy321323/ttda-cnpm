#include <global.h>
#include <IRremote.hpp>
void setupRemote(){
    IrReceiver.begin(receiverPin, ENABLE_LED_FEEDBACK);
}
void controlRemote(){
    if (IrReceiver.decode()) {  // Nếu nhận được tín hiệu IR
        int receivedCode = IrReceiver.decodedIRData.command;  // Lấy mã thập phân

        //Serial.println(receivedCode);
        switch (receivedCode){
            case 64:
                speedRemote += 20;
                speedRemote = speedRemote > 100 ? 100 : speedRemote;
                analogWrite(miniFanPin, speedRemote);
                if (stateFan == 1){
                    countFan = -1;
                    stateFan = 0;
                    autofan->save(0);
                }
                remoteFan->save(speedRemote);
                break;
            case 25:
                speedRemote -= 20;
                speedRemote = speedRemote < 0 ? 0 : speedRemote;
                analogWrite(miniFanPin, speedRemote);
                if (stateFan == 1){
                    countFan = -1;
                    stateFan = 0;
                    autofan->save(0);
                }
                remoteFan->save(speedRemote);
                break;
            case 69:
                colorRemote = "#000000";
                remoteRGB->save(colorRemote);
                turnoffLed();
                if (stateRGB == 1){
                    stateRGB = 0;
                    countRGB = -1;
                    autorgb->save(0);
                }
                prevcolorRemote = colorRemote;
                break;
            case 71:
                if (prevcolorRemote == "" || prevcolorRemote == "#000000" || prevcolorRemote == "#800080"){
                    colorRemote = "#ffffff";//white
                    turnonLed(255, 255, 255);
                    prevcolorRemote = colorRemote;
                }
                else if (prevcolorRemote == "#ffffff")
                {
                    colorRemote = "#ff0000";//red
                    turnonLed(255, 0, 0);
                    prevcolorRemote = colorRemote;
                }
                else if (prevcolorRemote == "#ff0000"){
                    colorRemote = "#008000";//green
                    turnonLed(0, 255, 0);
                    prevcolorRemote = colorRemote;
                }
                else if (prevcolorRemote == "#008000"){
                    colorRemote = "#0000ff";//blue
                    turnonLed(0, 0, 255);
                    prevcolorRemote = colorRemote;
                }
                else if (prevcolorRemote == "#0000ff"){
                    colorRemote = "#ffff00";//yellow
                    turnonLed(255, 255, 0);
                    prevcolorRemote = colorRemote;
                }
                else if (prevcolorRemote == "#ffff00"){
                    colorRemote = "#ffa500";//orange
                    turnonLed(255, 165, 0);
                    prevcolorRemote = colorRemote;
                }
                else if (prevcolorRemote == "#ffa500"){
                    colorRemote = "#800080";//purple
                    turnonLed(128, 0, 128);
                    prevcolorRemote = colorRemote;
                }
                if (stateRGB == 1){
                    stateRGB = 0;
                    countRGB = -1;
                    autorgb->save(0);
                }
                remoteRGB->save(colorRemote);
                break;
            case 7:
                digitalWrite(relayPin, LOW);
                relayRemote = 0;
                remoteRelay->save(relayRemote);
                break;
            case 9:
                digitalWrite(relayPin, HIGH);
                relayRemote = 1;
                remoteRelay->save(relayRemote);
                break;
            case 68:
                myservo.write(180);
                if (stateDoor == 1){
                    stateDoor = 0;
                    countDoor = -1;
                    autodoor->save(stateDoor);
                }
                doorRemote = 0;
                remoteDoor->save(doorRemote);
                break;
            case 67:
                myservo.write(90);
                doorRemote = 1;
                remoteDoor->save(doorRemote);
                if (stateDoor == 1){
                    stateDoor = 0;
                    countDoor = -1;
                    autodoor->save(stateDoor);
                }
                break;
            case 12:
                Serial.print("1");
                password += '1';
                break;
            case 24:
                Serial.print("2");
                password += '2';
                break;
            case 94:
                Serial.print("3");
                password += '3';
                break;
            case 8:
                Serial.print("4");
                password += '4';
                break;
            case 28:
                Serial.print("5");
                password += '5';
                break;
            case 90:
                Serial.print("6");
                password += '6';
                break;
            case 66:
                Serial.print("7");
                password += '7';
                break;
            case 82:
                Serial.print("8");
                password += '8';
                break;
            case 74:
                Serial.print("9");
                password += '9';
                break;
            default:
                break;
        }
        if (password.length() == 6){
            if (password == passwordAda){
                myservo.write(90);
                servoFeed->save(1);
            }
            else{
                myservo.write(180);
                servoFeed->save(0);
            }
            password = "";
        }
        IrReceiver.resume();  // Tiếp tục nhận tín hiệu mới
    }
}

void passAuthorized(AdafruitIO_Data *data) {
    String pass = data->toString();
    Serial.print("password is: ");
    Serial.println(pass);
    passwordAda = pass;
}
#include <remote.hpp>
#include <IRremote.hpp>
int receiverPin = P1;
int speed = 0;
String color = "";
String passwordAda = "";
void setupRemote(){
    IrReceiver.begin(receiverPin, ENABLE_LED_FEEDBACK);
}
void controlRemote(){
    if (IrReceiver.decode()) {  // Nếu nhận được tín hiệu IR
        int receivedCode = IrReceiver.decodedIRData.command;  // Lấy mã thập phân

        Serial.print("Mã thập phân nhận được: ");
        Serial.println(receivedCode);
        switch (receivedCode){
            case 64: 
                speed += 20;
                speed = speed > 100 ? 100 : speed;
                analogWrite(miniFanPin, speed);
                break;
            case 25:
                speed -= 20;
                speed = speed < 0 ? 0 : speed;
                analogWrite(miniFanPin, speed);
                break;
            case 69:
                for (int pixel = 0; pixel < NUM_PIXELS; pixel++) { //Black
                    NeoPixel.setPixelColor(pixel, NeoPixel.Color(0, 0, 0));
                }
                color = "#000000";
                NeoPixel.show();
                break;
            case 71:
                for (int pixel = 0; pixel < NUM_PIXELS; pixel++) { //White
                    NeoPixel.setPixelColor(pixel, NeoPixel.Color(255, 255, 255));
                }
                color = "#ffffff";
                NeoPixel.show();
                break;
            case 7:
                digitalWrite(relayPin, LOW);
                break;
            case 9:
                digitalWrite(relayPin, HIGH);
                break;
            case 68:
                myservo.write(180);
                break;
            case 67:
                myservo.write(90);
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
            }
            else{
                myservo.write(180);
            }
            password = "";
        }
        Serial.println("Fan_speed: ");
        Serial.println(speed);
        //remoteFeedrgb->save(color);
        //remoteFeedfan->save(speed);
        IrReceiver.resume();  // Tiếp tục nhận tín hiệu mới
    }
}

void passAuthorized(AdafruitIO_Data *data) {
    String pass = data->toString();
    Serial.print("password is: ");
    Serial.println(pass);
    passwordAda = pass;
}
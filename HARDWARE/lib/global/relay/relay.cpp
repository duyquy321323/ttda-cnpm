#include <global.h>
void relayControl(AdafruitIO_Data *data) {
    String relayStatus = data->toString();
    Serial.print("Relay is ");  
    Serial.println(relayStatus);
    digitalWrite(relayPin, relayStatus == "1" ? HIGH : LOW);
}
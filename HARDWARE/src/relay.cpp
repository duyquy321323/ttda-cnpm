#include <relay.h>
int relayPin = P14;
void relayControl(AdafruitIO_Data *data) {
    String relayStatus = data->toString();
    Serial.print("Relay is ");  
    Serial.println(relayStatus);
    digitalWrite(relayPin, relayStatus == "1" ? HIGH : LOW);
}
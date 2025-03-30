import time
import random
import paho.mqtt.client as mqtt

# Cấu hình
PORT = 8080
AIO_USERNAME = "quy321323"
AIO_KEY = "aio_kmrT10tRTQeZhcpoSwEJcm6dD31f"
BROKER = "io.adafruit.com"
TOPICS = {
    "TEMP_FEED": f"{AIO_USERNAME}/feeds/DHT20_TEMPERATURE",
    "HUMID_FEED": f"{AIO_USERNAME}/feeds/DHT20_HUMIDITY",
    "LIGHT_FEED": f"{AIO_USERNAME}/feeds/LIGHT_SENSOR",
    "FAN_FEED": f"{AIO_USERNAME}/feeds/MINI_FAN",
    "SERVO_FEED": f"{AIO_USERNAME}/feeds/SERVO_DOOR",
    "LED_FEED": f"{AIO_USERNAME}/feeds/LED_RGB",
    "AUTO_FEED": f"{AIO_USERNAME}/feeds/LED_RGB_AUTO",
    "TIME_OFF_FEED": f"{AIO_USERNAME}/feeds/TIME_OFF",
    "RELAY_FEED": f"{AIO_USERNAME}/feeds/RELAY",
}

# Kết nối MQTT
def on_connect(client, userdata, flags, rc):
    print("Connected with result code ", rc)

def publish_fake_data(client):
    while True:
        temp = round(random.uniform(20, 35), 2)
        humidity = round(random.uniform(40, 80), 2)
        light = random.randint(0, 1023)
        fan = random.choice([0, 1])
        servo = random.choice([0, 90, 180])
        led = random.choice(["#FF0000", "#00FF00", "#0000FF", "#FFFFFF", "#000000"])
        auto = random.choice([0, 1])
        time_off = random.randint(0, 60)
        relay = random.choice([0, 1])
        
        data = {
            "TEMP_FEED": temp,
            "HUMID_FEED": humidity,
            "LIGHT_FEED": light,
            "FAN_FEED": fan,
            "SERVO_FEED": servo,
            "LED_FEED": led,
            "AUTO_FEED": auto,
            "TIME_OFF_FEED": time_off,
            "RELAY_FEED": relay,
        }
        
        for key, value in data.items():
            client.publish(TOPICS[key], value)
            print(f"Published {value} to {TOPICS[key]}")
        
        time.sleep(5)  # Gửi mỗi 5 giây

client = mqtt.Client()
client.username_pw_set(AIO_USERNAME, AIO_KEY)
client.on_connect = on_connect
client.connect(BROKER, 1883, 60)

client.loop_start()
publish_fake_data(client)
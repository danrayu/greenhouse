import requests
import time
from fhict_cb_01.custom_telemetrix import CustomTelemetrix

# Arduino
board = CustomTelemetrix()
DHTPIN = 12
LDR_PIN = 2
board.set_pin_mode_dht(DHTPIN, dht_type=11)

# change this for each sensor
sensorId = "a1"


light_level = 0
def readLdrChange(data):
    global light_level
    light_level = data[2]
    
def getReadings():
    global light_level
    humidity, temperature, timestamp = board.dht_read(DHTPIN)
    sensorsOk = False
    timestamp = round(timestamp, 3)*1000
    if humidity and temperature:
        sensorsOk = True
    return {
        "sensor_id": sensorId,
        "status": sensorsOk,
        "humidity": humidity or None,
        "temperature": temperature or None,
        "light": light_level or None,
        "timestamp": timestamp or None
    }

board.set_pin_mode_analog_input(
    LDR_PIN, callback=readLdrChange, differential=50)


while True:
  url = 'http://localhost:5000/api/sensor-endpoint'
  readings = getReadings()
  try:
    x = requests.post(url, json = readings)
    print("Sent data")
  except:
    print("Could not reach server")
  
  # sleep for 30 minutes
  time.sleep(60*30)

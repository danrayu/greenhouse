import time
import sys
from fhict_cb_01.custom_telemetrix import CustomTelemetrix

board = CustomTelemetrix()

# -----------
# Constants
# -----------
DHTPIN = 12  # digital pin
# -----------
# functions
# -----------


def setup():
    board.displayOn()
    board.set_pin_mode_dht(DHTPIN, dht_type=11)


def loop():
    humidity, temperature, timestamp = board.dht_read(DHTPIN)
    print(humidity, temperature)
    board.displayShow(temperature)
    time.sleep(0.1)  # Give Firmata some time to handle protocol.


# --------------
# main program
# --------------
setup()
while True:
    try:
        loop()
    except KeyboardInterrupt:  # crtl+C
        print('shutdown')
        board.shutdown()
        sys.exit(0)

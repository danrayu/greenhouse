import csv
import datetime
import random
import math

# Initial values
humidity = 72.0
temperature = 26.2
light_level = 176
timestamp = 1696896329348.0

# Time increments in milliseconds (30 minutes)
time_increment = 30 * 60 * 1000

# Output file

with open("sensor_readings.csv", "a", newline='') as file:
    writer = csv.writer(file)
    for i in range(96):  # 96 readings for 2 days
        # Convert timestamp to hour to determine day/night
        dt = datetime.datetime.fromtimestamp(timestamp / 1000)
        hour = dt.hour
        
        # Sinusoidal adjustments
        sin_val = math.sin(math.pi * i / 24)/1.2  # One full cycle every 24 readings (12 hours)
        sin_val_light = math.sin(math.pi * (i+6) / 24)
        
        # Adjust values based on time of day and sinusoidal function
        if 6 <= hour < 18:  # Daytime
            humidity -= (0.2 + 0.6 * sin_val) + random.uniform(-0.1, 0.1)
            temperature += (0.1 + 0.33 * sin_val) + random.uniform(-0.05, 0.05)
            light_level += (22 + 45 * sin_val_light) + random.randint(-5, 5)
        else:  # Nighttime
            humidity += (0.2 - 0.6 * sin_val) + random.uniform(-0.1, 0.1)
            temperature -= (0.1 - 0.33 * sin_val) + random.uniform(-0.05, 0.05)
            light_level -= (22 - 45 * sin_val_light) + random.randint(-5, 5)
        
        # Write to file
        writer.writerow(["a2", "True", round(humidity, 2), round(temperature, 2), light_level, timestamp])
        
        # Increment timestamp
        timestamp += time_increment

print("a2 readings added successfully!")

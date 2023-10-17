import csv

def readLast():
  with open('sensor_readings.csv', newline='') as csvfile:
    spamreader = csv.reader(csvfile, delimiter=',', quotechar='|')
    spamreader = list(spamreader)
    if len(spamreader) >= 96:
      spamreader = spamreader[-96:]
      
    data = []  
    for item in spamreader:
      data.append({
        "sensor_id": item[0],
        "status": item[1],
        "humidity": item[2],
        "temperature": item[3],
        "light": item[4],
        "timestamp": item[5]
      });
    
    return data
    
def writeReading(reading):
  with open('readings.csv', 'a', newline='') as csvfile:
    spamwriter = csv.writer(csvfile, delimiter=',',
                            quotechar='|', quoting=csv.QUOTE_MINIMAL)
    
    row = [reading["sensor_id"],reading["status"],reading["humidity"],
           reading["temperature"],reading["light"],reading["timestamp"]]
    spamwriter.writerow(row)
  
import csv

# Read the CSV file
with open('./backend/sensor_readings.csv', 'r') as file:
    reader = csv.reader(file)
    data = list(reader)

# Sort the data based on the timestamp (last column)
data.sort(key=lambda row: float(row[-1]), reverse=True)

# Write the sorted data back to the CSV file
with open('./backend/sensor_readings.csv', 'w', newline='') as file:
    writer = csv.writer(file)
    writer.writerows(data)
    
print("readings sorted successfully!")

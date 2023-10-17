from flask import Flask, jsonify, request
from flask_cors import CORS
from csvBase import writeReading, readLast
import socket

app = Flask(__name__)
CORS(app)
    

def get_ip_address():
    s = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
    # Use a UDP connection (doesn't actually establish a connection) to retrieve the IP address
    try:
        # Doesn't matter if the IP below is unreachable, we're just using it to determine the most appropriate source IP to use
        s.connect(('10.254.254.254', 1))
        IP = s.getsockname()[0]
    except Exception:
        IP = '127.0.0.1'
    finally:
        s.close()
    return IP


# @app.route('', methods=['GET'])
# def main():
    

@app.route('/api/pointclim', methods=['GET'])
def getClimate():
    lastReadings = readLast()
    return jsonify(lastReadings)

@app.route('/api/sensor-endpoint', methods=['POST'])
def handleReading():
    writeReading(request.json)
    return '', 200
    
        
if __name__ == '__main__':
    ip_address = get_ip_address()
    # app.run(host=ip_address, port=5000)
    app.run()
   
        
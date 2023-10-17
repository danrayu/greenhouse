// get-ip.js
const os = require('os');
const interfaces = os.networkInterfaces();

function getLocalIP() {
    for (let name of Object.keys(interfaces)) {
        for (let iface of interfaces[name]) {
            if (iface.family === 'IPv4' && !iface.internal) {
                return iface.address;
            }
        }
    }
    return '127.0.0.1';
}

console.log(getLocalIP());

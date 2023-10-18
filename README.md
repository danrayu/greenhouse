## About
A collection of apps for capturing readings from an arduino, sending them to a Flask backend, storing them in a csv and getting them to a React dashboard through a request.

This project's repo is [greenhouse](https://github.com/danrayu/greenhouse).

## Folder Structure

Your project should look like this:

```
greenhouse/
  README.md
  frontend/
    public/
      index.html
    package.json
    package-lock.json
    get-ip.js
    src/
      App.js
      index.css
      index.js
      components/
        ...
  backend/
    air.py
    app.py
    csvBase.py
    firm.py
    gen-reada1.py
    gen-reada2.py
    sensor_readings.py
    sort_readings.py
  sensor_system/
    sensor_a1.py
    FirmataDisplay-1.zip
  flask.sh
  gen_readings.sh
```

## Application flow

1. Sensors generate readings (`/sensor_system/sensor.py`) and make a `POST` request to the backend, a Flask API (`/backend/app.py`). Alternatively sensor readings can be generated from the root dir with `./gen_readings.sh`.
2. The Flask API recieves the post request from the sensors, and saves it to `/backend/sensor_readings.csv`. When it recieves a `GET` request to the `/api/pointclim` endpoint, it retrieves the last 96 readings (if there are that many) and retreives them to the requesting address. 
3. The React frontend makes requests to the backend API for data and waits until it gets any. When it does get some, it displays it on the root page at `http://localhost:3000/`. If there is less than 47 readings per sensor, it will not display it in the main dashboards, as those require 24 hours worth of data. (It assumes there is one readings every 30 minutes.)

## Project installatin

### Sensors / Arduino

This project uses an arduino with python as the sensors, but you can use any other sensor setup as long as:
* The data format in the same
* The api endpoint is the same

To setup your arduino, first install Arduino IDE. In the IDE, install the library zip included in `./sensor_system`. <br>Open and upload the example called FirmataDisplay to your arduino. Change your sensor pins accordingly.

With this you only have to change the sensor name variable at the file beginning of `sensor.py`. A new file for each sensor is expected. The file is to be run with python. With this `POST` requests with sensor readings will be sent to the backend.

<b>Alternatively</b>, if one does not have the sensor setup, `gen_readings.sh` can be run to generate sample data for the app to use.

### Frontend / React

The installation process is simple: <br>
Navigate to your `frontend` directory and run `npm install`. This will automatically download all necessary dependencies for our application.

* `./frontend/public/index.html` is the page template;
* `./frontend/src/index.js` is the JavaScript entry point.

You can delete or rename the other files.

You may create subdirectories inside `src`. For faster rebuilds, only files inside `src` are processed by Webpack.<br>
You need to **put any JS and CSS files inside `src`**, or Webpack won’t see them.

Only files inside `public` can be used from `public/index.html`.<br>
Read instructions below for using assets from JavaScript and HTML.

You can, however, create more top-level directories.<br>
They will not be included in the production build so you can use them for things like documentation.

### Backend / Flask

The backend uses very few modules, so the installation is limited. Assuming a recent version of python is installed, first you have to install flask: `pip install flask`. After it is installed using the command `flask run` in the `backend` dir will start up the backend.

For the command to work, the flask app has to be named `app.py`.

## Available Scripts

In the project directory, you can run:

### `./flask.sh`

Starts the flask backend.<br>
Open [http://localhost:5000](http://localhost:5000) to view it in the browser.

This is the api, so it does not have any pages beyond the default.

### `./react.sh`

Launches the react frontend.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

### `gen_readings.sh`

Generates slighly randomised readings of 2 sensors for two days.

The file is generated in ./backend/

## Sample data

The `gen_read<sensor_name>.py` files generate files for imaginary sensors `a1` and `a2`. The backend and frontend will work with any sensor names, but the data structure created by the `gen_read` files has to be maintained.


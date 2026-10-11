# SUM200 React Native Laboration

Laboration application that retrieves weather forecasts from the [7Timer!](https://7timer.info)-API using JavaScript's Fetch API.

The application is developed using React Native and Expo, with support for both predefined locations and GPS-based weather forecasts.

## Features

- Get weather forecasts from the 7Timer! API
- Select between predefined locations
- Automatically update the weather when location changes
- Use GPS to retrieve weather forecasts for the current location
- Request permission to access the device's location
- Handle errors when GPS permission is denied or the location is unavailable
- Translate weather data into user-friendly descriptions
- Display weather conditions using emojis
- User interface using React Native components

## The project uses

- *JavaScript*
- *React Native*
- *React* with `useState` and `useEffect` hooks
- *Expo* for development and running the application
- *Expo Location* for retrieving GPS coordinates
- *Fetch API* for HTTP requests
- *7Timer!* API for weather data

The project dependencies are defined in [package.json](https://github.com/jojo-git67/SUM200-ReactNativeLaboration/blob/main/package.json).

The application uses the `expo-location` library to request location permission and retrieve the device's coordinates.

### State management

The application uses React's concept of *lifting state up* to share the selected location between components.

The parent component, [App.jsx](https://github.com/jojo-git67/SUM200-ReactNativeLaboration/blob/main/App.jsx), owns the `selectedLocation` state and passes it down to the `LocationPicker` and `WeatherCard` components using props.

When the user changes location in `LocationPicker`, the parent state is updated. `WeatherCard` then receives the new location and retrieves the corresponding forecast.

This solution was implemented with help from AI while learning how to share state between React components.

## Predefined locations

| Location | Latitude | Longitude |
|----------|----------|-----------|
| Trollhättan | 58.2837 | 12.2886 |
| Gothenburg | 57.7089 | 11.9746 |
| Stockholm | 59.3293 | 18.0686 |
| Malmö | 55.6050 | 13.0038 |
| New York | 40.7306 | -73.9352 |

The application also supports GPS as a location option.

When GPS is selected, the application requests permission to access the device's location using Expo Location.

If permission is granted, the latitude and longitude are retrieved and used in the API request.

Additional predefined locations can be added to the location data used by the `LocationPicker` component.

## API

The application uses the `Machine-readable` API version where the product is `civillight` and the output is `json`.

The `civillight` product contains weather forecast data relevant to the user.

- Forecast date
- Weather condition
- Minimum temperature
- Maximum temperature
- Maximum wind speed

The data is translated and formatted using utility functions before being displayed in the `WeatherCard` component.

The data retrieved from the API is not always user-friendly, which is why some values must be translated before displaying them.

E.g. weather = **ts** means nothing to the user. **Thunderstorm** is more descriptive for the user.

### Example API request

```bash
https://www.7timer.info/bin/api.pl?lon=12.2886&lat=58.2837&product=civillight&output=json
```

Gets weather forecast data for Trollhättan.

When using GPS, the latitude and longitude parameters are replaced with the coordinates retrieved from the device.

Documentation on the *7Timer!* API can be found [here](https://www.7timer.info/doc.php?lang=en).

## How to run the project

Clone the repository:

```bash
git clone https://github.com/jojo-git67/SUM200-ReactNativeLaboration.git
```

Navigate to the project directory:

```bash
cd SUM200-ReactNativeLaboration
```

Install the dependencies:

```bash
npm ci
```

Start the Expo development server:

```bash
npx expo start
```

The application can then be launched using:

- **Android:** Press `a` to open the application in an Android emulator.
- **iOS:** Press `i` to open the application in an iOS simulator (requires macOS and Xcode).
- **Physical device:** Scan the QR code using a compatible Expo Go app.

An Android emulator or iOS simulator must be installed and configured before launching the application.

For GPS functionality, location permission must be granted. When using an emulator or simulator, a simulated location may need to be configured.
## AUTHOR

Joakim Johansson

Student at University West in Trollhättan, Sweden

Course: SUM200

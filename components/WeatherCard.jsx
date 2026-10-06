import { useState, useEffect } from "react";
import { Text, View, StyleSheet } from "react-native";
import { translateWeather, getWeatherEmoji, translateWind } from "../utils/weatherTranslation";
import translateDate from "../utils/translateDate";
import {LOCATIONS} from "../data/locations.js";
import * as Location from "expo-location"

export default function WeatherCard( { selectedLocation } ) {
    const [data, setData] = useState(null);
    const [gpsPermission, setGpsPermission] = useState(null);

    const getGPSPermission = async () => {
        const { status } = await Location.requestForegroundPermissionsAsync();

        if (status != "granted"){
            console.log("GPS permission was denied");
            setGpsPermission(false);
            return false;
        }

        setGpsPermission(true);
        return true;
    }

    const getGPSLocation = async () => {
        const location = await Location.getCurrentPositionAsync({});

        console.log("Longitude: " + location.coords.longitude + " Latitude: " + location.coords.latitude);

        return {
            latitude: location.coords.latitude,
            longitude: location.coords.longitude
        };
    };

    const getSelectedLocation = () => {
        return LOCATIONS.find(location => location.value === selectedLocation);
    }
    
    const getWeatherData = async (longitude, latitude) => {
        try {

            const response = await fetch(
                "https://7timer.info/bin/api.pl?" +
                "lon=" + longitude +
                "&lat=" + latitude +
                "&product=civillight&output=json"
            );

            const json = await response.json();

            setData(json.dataseries[0]);
        } 
        catch (error) {
            console.error("Error fetching weather data:", error);
        }
    }

    

    useEffect(() => {
        const loadWeather = async () => {
            setData(null);

            if (selectedLocation === "gps") {
                const hasPermission = await getGPSPermission();

                if (!hasPermission) {
                    return;
                }
                
                const location = await getGPSLocation(); 

                await getWeatherData(location.longitude, location.latitude);
            }
            
            else {
                const location = getSelectedLocation();

                if(!location){
                    console.log("Location not found in LOCATIONS");
                    return;
                }
                
                await getWeatherData(location.longitude, location.latitude);

            }
        };

        loadWeather();

    }, [selectedLocation]);

    if (gpsPermission === null && selectedLocation === "gps"){
        return <Text>Checking GPS permission...</Text>
    }

    if (gpsPermission === false && selectedLocation === "gps"){
        return <Text>GPS permission is required to get the local weather</Text>
    }

    if (!data) {
        return <Text>Loading information...</Text>;
    }

    return (
    <View style={styles.container}>
        <View style={styles.card}>

            <Text style={styles.header}>
                Today's weather
            </Text>

            <Text style={styles.date}>
                {translateDate(data.date)}
            </Text>

            <Text style={styles.emoji}>
                {getWeatherEmoji(data.weather)}
            </Text>

            <Text style={styles.weather}>
                {translateWeather(data.weather)}
            </Text>

            <Text style={styles.temperatureRange}>
                Min: {data.temp2m.min}°C / Max: {data.temp2m.max}°C
            </Text>

            <Text style={styles.wind}>
                Wind condition: {translateWind(data.wind10m_max)}
            </Text>

        </View>
    </View>
);
}
const styles = StyleSheet.create({
    container: {
        padding: 10,
    },

    card: {
        width: "100%",
        padding: 30,
        borderRadius: 25,
        backgroundColor: "#E8F0F2",
        alignItems: "center",
    },

    header: {
        fontSize: 36,
        fontWeight: "600",
        marginBottom: 5,
    },

    date: {
        fontSize: 16,
        marginBottom: 15,
    },

    emoji: {
        fontSize: 90,
        marginBottom: 15,
    },

    weather: {
        fontSize: 28,
        fontWeight: "600",
        marginBottom: 25,
    },

    temperatureRange: {
        fontSize: 18,
        marginBottom: 30,
    },

    wind: {
        fontSize: 18,
    },
});
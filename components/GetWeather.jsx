import { useState, useEffect } from "react";
import { Text, View, StyleSheet } from "react-native";
import * as Location from "expo-location";
import { translateWeather, getWeatherEmoji, translateWind } from "../utils/weatherTranslation";
import translateDate from "../utils/translateDate";

const GetWeather = () => {
    const [data, setData] = useState(null);
    const [gpsPermission, setGpsPermission] = useState(null);

    useEffect(() => {
        const loadWeather = async () =>{
            try {
                const { status } = await Location.requestForegroundPermissionsAsync();

                if (status != "granted"){
                    console.log("GPS permission was denied");
                    setGpsPermission(false);
                    return;
                }

                setGpsPermission(true);

                const location = await Location.getCurrentPositionAsync({});

                const response = await fetch(
                    "https://7timer.info/bin/api.pl?lon=" + location.coords.longitude + "&lat=" + location.coords.latitude + "&product=civillight&output=json"
                );

                const json = await response.json();

                setData(json.dataseries[0]);

            } catch(error){
                console.log("Error loading the weather", error);
            } 
        }    
        loadWeather();    
    }, []);

    if (gpsPermission === null){
        return <Text>Checking GPS permission...</Text>
    }

    if (gpsPermission === false){
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
};

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

export default GetWeather;
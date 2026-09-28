import { useState, useEffect } from "react";
import { Text, View, StyleSheet } from "react-native";
import { translateWeather, getWeatherEmoji, translateWind } from "../utils/weatherTranslation";
import translateDate from "../utils/translateDate";

const GetWeather = () => {
    const [data, setData] = useState(null);

    const getWeather = async () => {
        const response = await fetch(
            "http://www.7timer.info/bin/api.pl?lon=113.17&lat=23.09&product=civillight&output=json"
        );

        const json = await response.json();

        setData(json.dataseries[0]);
    };

    useEffect(() => {
        getWeather();
    }, []);

    if (!data) {
        return <Text>Loading information...</Text>;
    }

    return (
        <View style={styles.container}>

            <View style={styles.card}>

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
                    {data.temp2m.min}°C / {data.temp2m.max}°C
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
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        padding: 20,
    },

    card: {
        width: "100%",
        padding: 25,
        borderRadius: 20,
        backgroundColor: "#E8F0F2",
        alignItems: "center",
    },

    date: {
        fontSize: 20,
        fontWeight: "600",
        marginBottom: 20,
    },

    emoji: {
        fontSize: 70,
        marginBottom: 10,
    },

    weather: {
        fontSize: 24,
        fontWeight: "600",
        marginBottom: 20,
    },

    temperatureRange: {
        fontSize: 18,
        marginTop: 5,
        marginBottom: 25,
    },

    wind: {
        fontSize: 16,
    },
});

export default GetWeather;
import { useState, useEffect } from "react";
import { Text, View } from "react-native";

const GetWeather = () => {
    const [data, setData] = useState(null);

    const getWeather = async () => {
        const response = await fetch("http://www.7timer.info/bin/api.pl?lon=113.17&lat=23.09&product=civillight&output=json");
        const json = await response.json();
        setData(json.dataseries[0]);
    };

    useEffect(() => {
        getWeather();
    }, []);

    if (!data){
        return <Text>Loading information</Text>
    }
    return (
        <View>
            <Text>{data.date}</Text>
            <Text>{data.weather}</Text>
            <Text>{data.temp2m.min} - {data.temp2m.max}</Text>
            <Text>{data.wind10m_max}</Text>
        </View>
    );
};

export default GetWeather;
import { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

import WeatherCard from './components/WeatherCard';
import LocationPicker from './components/LocationPicker.jsx';

export default function App() {
    const [selectedLocation, setSelectedLocation] = useState('gps');

    return (
        <SafeAreaProvider>
            <SafeAreaView style={styles.container}>
                <StatusBar style="auto" />

                <LocationPicker
                    selectedLocation={selectedLocation}
                    setSelectedLocation={setSelectedLocation}
                />

                <WeatherCard
                    selectedLocation={selectedLocation}
                />

            </SafeAreaView>
        </SafeAreaProvider>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
});
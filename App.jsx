import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import GetWeather from './components/GetWeather';

export default function App() {
  return (
    <SafeAreaProvider style={styles.container}>
      <SafeAreaView>
        <View>
          <StatusBar style="auto" />
          < GetWeather />
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#fff',
  },
});

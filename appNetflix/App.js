import { StatusBar } from 'expo-status-bar';
import { StyleSheet } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import Home from './app/home/screens/Home';

export default function App() {
    return (
        <SafeAreaProvider>
            <Home />
            <StatusBar style="light" translucent={true} />
        </SafeAreaProvider>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#000',
    },
});

import { StatusBar } from 'expo-status-bar';
import { StyleSheet } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import Home from './app/home/screens/Home';
import { AuthProvider } from './app/context/AuthContext';

export default function App() {
    return (
        <AuthProvider>
            <SafeAreaProvider>
                <Home />
                <StatusBar style="light" translucent={true} />
            </SafeAreaProvider>
        </AuthProvider>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#000',
    },
});

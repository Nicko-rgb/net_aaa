import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { AuthProvider, useAuthContext } from './app/context/AuthContext';
import Home from './app/home/screens/Home';
import Browser from './app/media/screens/Browser';
import { View, ActivityIndicator } from 'react-native';

const Stack = createStackNavigator();

const AppNavigator = () => {
    const { isAuthenticated, loading } = useAuthContext();

    if (loading) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#000' }}>
                <ActivityIndicator size="large" color="#e50914" />
            </View>
        );
    }

    return (
        <NavigationContainer>
            <Stack.Navigator
                screenOptions={{
                    headerShown: false,
                    cardStyle: { backgroundColor: '#000' },
                }}
            >
                {isAuthenticated ? (
                    <Stack.Screen 
                        name="Browser" 
                        component={Browser}
                        options={{
                            gestureEnabled: false, // Evitar volver atrás con gesto
                        }}
                    />
                ) : (
                    <Stack.Screen 
                        name="Home" 
                        component={Home}
                    />
                )}
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default function App() {
    return (
        <SafeAreaProvider>
            <AuthProvider>
                <AppNavigator />
                <StatusBar style="light" translucent={true} />
            </AuthProvider>
        </SafeAreaProvider>
    );
}

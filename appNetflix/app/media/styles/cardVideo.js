import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    card: {
        borderWidth: 1,
        borderColor: '#373737ff',
        borderRadius: 10,
        overflow: 'hidden',
        width: '50%',
    },
    imagen: {
        width: '100%',
        height: 150,
        resizeMode: 'cover',
    },
    title: {
        padding: 10,
        fontSize: 16,
        fontWeight: 'bold',
        color: '#fff',
    }
})
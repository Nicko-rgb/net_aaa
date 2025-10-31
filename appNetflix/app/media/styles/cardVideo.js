import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    card: {
        borderWidth: 1,
        borderColor: '#373737ff',
        borderRadius: 10,
        overflow: 'hidden',
        width: '49%',
        height: 180,
        position: 'relative',
        flexDirection: 'column',
        justifyContent: 'flex-end',
    },
    imagen: {
        width: '100%',
        height: '100%',
        position: 'absolute',
        resizeMode: 'cover',
        objectFit: 'cover',
    },
    titleContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 5,
    },
    title: {
        padding: 10,
        fontSize: 16,
        fontWeight: 'bold',
        color: '#fff',
    }
})
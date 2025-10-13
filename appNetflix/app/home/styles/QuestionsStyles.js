import { StyleSheet, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

const QuestionsStyles = StyleSheet.create({
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'flex-end',
    },
    modalBackground: {
        flex: 1,
    },
    modalContainer: {
        backgroundColor: '#141414',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        maxHeight: height * 0.8,
        minHeight: height * 0.5,
        paddingTop: 20,
        paddingHorizontal: 20,
        paddingBottom: 40,
    },
    modalHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 20,
        paddingBottom: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#333333',
    },
    modalTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#ffffff',
    },
    closeButton: {
        width: 30,
        height: 30,
        borderRadius: 15,
        backgroundColor: '#333333',
        justifyContent: 'center',
        alignItems: 'center',
    },
    closeButtonText: {
        color: '#ffffff',
        fontSize: 18,
        fontWeight: 'bold',
    },
    questionsContainer: {
        flex: 1,
    },
    questionItem: {
        marginBottom: 10,
        backgroundColor: '#222222',
        borderRadius: 8,
        overflow: 'hidden',
    },
    questionButton: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 20,
        backgroundColor: '#222222',
    },
    questionText: {
        flex: 1,
        fontSize: 16,
        fontWeight: '600',
        color: '#ffffff',
        marginRight: 15,
    },
    expandIcon: {
        fontSize: 24,
        color: '#ffffff',
        fontWeight: 'bold',
        transform: [{ rotate: '0deg' }],
        transition: 'transform 0.3s ease',
    },
    expandIconRotated: {
        transform: [{ rotate: '45deg' }],
    },
    answerContainer: {
        backgroundColor: '#333333',
        paddingHorizontal: 20,
        paddingVertical: 0,
        borderTopWidth: 1,
        borderTopColor: '#444444',
        overflow: 'hidden',
    },
    answerText: {
        fontSize: 14,
        lineHeight: 20,
        color: '#cccccc',
        paddingVertical: 15,
    },
});

export default QuestionsStyles;
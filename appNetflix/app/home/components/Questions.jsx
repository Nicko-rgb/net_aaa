import React, { useState, useRef } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    Modal,
    Animated,
    ScrollView,
    Dimensions
} from 'react-native';
import styles from '../styles/QuestionsStyles';

const { height } = Dimensions.get('window');

const Questions = ({ visible, onClose }) => {
    const [expandedQuestions, setExpandedQuestions] = useState(new Set());
    const slideAnim = useRef(new Animated.Value(height)).current;
    const animatedHeights = useRef({}).current;

    const questionsData = [
        {
            id: 1,
            question: "¿Qué es Netflix?",
            answer: "Netflix es un servicio de streaming que ofrece una gran variedad de series, películas y documentales premiados en miles de dispositivos conectados a internet. Puedes ver todo el contenido que quieras, cuando quieras, sin un solo anuncio, todo por una tarifa mensual reducida."
        },
        {
            id: 2,
            question: "¿Cuánto cuesta Netflix?",
            answer: "Ve Netflix en tu smartphone, tablet, Smart TV, laptop o dispositivo de streaming, todo por una tarifa plana mensual. Planes desde $99 MXN hasta $299 MXN al mes. Sin costos adicionales, sin contratos."
        },
        {
            id: 3,
            question: "¿Dónde puedo ver Netflix?",
            answer: "Ve Netflix donde quieras, cuando quieras. Inicia sesión en tu cuenta de Netflix para ver contenido al instante a través de netflix.com desde tu computadora personal o en cualquier dispositivo con conexión a internet que cuente con la app de Netflix."
        },
        {
            id: 4,
            question: "¿Cómo cancelo?",
            answer: "Netflix es flexible. Sin contratos molestos ni compromisos. Puedes cancelar fácilmente tu cuenta en línea con dos clics. Sin tarifas de cancelación: activa o cancela tu cuenta en cualquier momento."
        },
        {
            id: 5,
            question: "¿Qué puedo ver en Netflix?",
            answer: "Netflix tiene un amplio catálogo de largometrajes, documentales, series, anime, originales de Netflix premiados y más. Ve todo lo que quieras, cuando quieras."
        },
        {
            id: 6,
            question: "¿Netflix es bueno para los niños?",
            answer: "La experiencia de Netflix para niños está incluida en tu membresía para que los padres tengan el control mientras los peques disfrutan series y películas familiares en su propio espacio."
        }
    ];

    React.useEffect(() => {
        if (visible) {
            Animated.timing(slideAnim, {
                toValue: 0,
                duration: 400,
                useNativeDriver: true,
            }).start();
        } else {
            Animated.timing(slideAnim, {
                toValue: height,
                duration: 400,
                useNativeDriver: true,
            }).start();
        }
    }, [visible]);

    const initializeAnimatedHeight = (questionId) => {
        if (!animatedHeights[questionId]) {
            animatedHeights[questionId] = new Animated.Value(0);
        }
    };

    const toggleQuestion = (questionId) => {
        initializeAnimatedHeight(questionId);
        
        const newExpandedQuestions = new Set(expandedQuestions);
        const isExpanded = expandedQuestions.has(questionId);
        
        if (isExpanded) {
            // Cerrar pregunta
            newExpandedQuestions.delete(questionId);
            Animated.timing(animatedHeights[questionId], {
                toValue: 0,
                duration: 300,
                useNativeDriver: false,
            }).start();
        } else {
            // Abrir pregunta
            newExpandedQuestions.add(questionId);
            Animated.timing(animatedHeights[questionId], {
                toValue: 1,
                duration: 300,
                useNativeDriver: false,
            }).start();
        }
        
        setExpandedQuestions(newExpandedQuestions);
    };

    const handleClose = () => {
        Animated.timing(slideAnim, {
            toValue: height,
            duration: 400,
            useNativeDriver: true,
        }).start(() => {
            onClose();
            // Resetear todas las preguntas expandidas al cerrar el modal
            setExpandedQuestions(new Set());
            Object.keys(animatedHeights).forEach(questionId => {
                animatedHeights[questionId].setValue(0);
            });
        });
    };

    return (
        <Modal
            visible={visible}
            transparent={true}
            animationType="none"
            onRequestClose={handleClose}
        >
            <View style={styles.modalOverlay}>
                <TouchableOpacity
                    style={styles.modalBackground}
                    activeOpacity={1}
                    onPress={handleClose}
                />

                <Animated.View
                    style={[
                        styles.modalContainer,
                        {
                            transform: [{ translateY: slideAnim }]
                        }
                    ]}
                >
                    <View style={styles.modalHeader}>
                        <Text style={styles.modalTitle}>Preguntas frecuentes</Text>
                        <TouchableOpacity
                            style={styles.closeButton}
                            onPress={handleClose}
                        >
                            <Text style={styles.closeButtonText}>✕</Text>
                        </TouchableOpacity>
                    </View>

                    <ScrollView
                        style={styles.questionsContainer}
                        showsVerticalScrollIndicator={false}
                    >
                        {questionsData.map((item) => {
                            const isExpanded = expandedQuestions.has(item.id);
                            initializeAnimatedHeight(item.id);
                            
                            const animatedHeight = animatedHeights[item.id].interpolate({
                                inputRange: [0, 1],
                                outputRange: [0, 200], // Altura máxima estimada para la respuesta
                                extrapolate: 'clamp',
                            });

                            return (
                                <View key={item.id} style={styles.questionItem}>
                                    <TouchableOpacity
                                        style={styles.questionButton}
                                        onPress={() => toggleQuestion(item.id)}
                                    >
                                        <Text style={styles.questionText}>
                                            {item.question}
                                        </Text>
                                        <Animated.Text style={[
                                            styles.expandIcon,
                                            {
                                                transform: [{
                                                    rotate: animatedHeights[item.id] ? animatedHeights[item.id].interpolate({
                                                        inputRange: [0, 1],
                                                        outputRange: ['0deg', '45deg'],
                                                        extrapolate: 'clamp',
                                                    }) : '0deg'
                                                }]
                                            }
                                        ]}>
                                            +
                                        </Animated.Text>
                                    </TouchableOpacity>

                                    <Animated.View style={[
                                        styles.answerContainer,
                                        {
                                            maxHeight: animatedHeights[item.id] ? animatedHeights[item.id].interpolate({
                                                inputRange: [0, 1],
                                                outputRange: [0, 200],
                                                extrapolate: 'clamp',
                                            }) : 0,
                                            opacity: animatedHeights[item.id] || 0,
                                        }
                                    ]}>
                                        <Text style={styles.answerText}>
                                            {item.answer}
                                        </Text>
                                    </Animated.View>
                                </View>
                            );
                        })}
                    </ScrollView>
                </Animated.View>
            </View>
        </Modal>
    );
};

export default Questions;
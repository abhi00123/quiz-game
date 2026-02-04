import { createContext, useContext, useState, useCallback } from 'react';
import { getShuffledQuestions } from '../data/questions';
import { useSound } from '../hooks/useSound';
import { useLocalStorage } from '../hooks/useLocalStorage';

// Screen constants
export const SCREENS = {
    WELCOME: 'welcome',
    QUESTION: 'question',
    FEEDBACK: 'feedback',
    RESULTS: 'results',
    THANK_YOU: 'thank_you'
};

// Create context
const QuizContext = createContext(null);

// Provider component
export const QuizProvider = ({ children }) => {
    // Core state
    const [currentScreen, setCurrentScreen] = useState(SCREENS.WELCOME);
    const [questions, setQuestions] = useState(() => getShuffledQuestions());
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [selectedAnswer, setSelectedAnswer] = useState(null);
    const [userAnswers, setUserAnswers] = useState([]);
    const [score, setScore] = useState(0);
    const [showFeedback, setShowFeedback] = useState(false);
    const [userName, setUserName] = useState('');

    // Hooks
    const { playSound } = useSound();
    const [highScore, setHighScore] = useLocalStorage('quizHighScore', 0);

    // Derived values
    const currentQuestion = questions[currentQuestionIndex];
    const totalQuestions = questions.length;

    // Actions
    const startQuiz = useCallback(() => {
        const shuffled = getShuffledQuestions();
        setQuestions(shuffled);
        setCurrentScreen(SCREENS.QUESTION);
        setCurrentQuestionIndex(0);
        setScore(0);
        setUserAnswers([]);
        setSelectedAnswer(null);
        playSound('start');
    }, [playSound]);

    const handleAnswerSelect = useCallback((answerIndex) => {
        if (selectedAnswer !== null) return;

        setSelectedAnswer(answerIndex);
        const selectedOptionText = currentQuestion.options[answerIndex];
        const isCorrect = selectedOptionText === currentQuestion.correctAnswer;

        if (isCorrect) {
            setScore(prev => prev + 1);
            playSound('correct');
        } else {
            playSound('incorrect');
        }

        setUserAnswers(prev => [
            ...prev,
            {
                questionId: currentQuestion.id,
                selectedAnswer: selectedOptionText,
                correctAnswer: currentQuestion.correctAnswer,
                isCorrect
            }
        ]);

        setShowFeedback(true);
        setCurrentScreen(SCREENS.FEEDBACK);
    }, [selectedAnswer, currentQuestion, playSound]);

    const handleNextQuestion = useCallback(() => {
        setShowFeedback(false);
        setSelectedAnswer(null);

        if (currentQuestionIndex < totalQuestions - 1) {
            setCurrentQuestionIndex(prev => prev + 1);
            setCurrentScreen(SCREENS.QUESTION);
        } else {
            const finalScore = userAnswers.filter(a => a.isCorrect).length +
                (currentQuestion.options[selectedAnswer] === currentQuestion.correctAnswer ? 1 : 0);
            if (finalScore > highScore) {
                setHighScore(finalScore);
            }
            setCurrentScreen(SCREENS.RESULTS);
            playSound('complete');
        }
    }, [currentQuestionIndex, totalQuestions, userAnswers, currentQuestion, selectedAnswer, highScore, setHighScore, playSound]);

    const handleRestart = useCallback(() => {
        setCurrentScreen(SCREENS.WELCOME);
        setCurrentQuestionIndex(0);
        setScore(0);
        setUserAnswers([]);
        setSelectedAnswer(null);
        setShowFeedback(false);
    }, []);

    const handleFormSubmit = useCallback((name) => {
        setUserName(name);
        setCurrentScreen(SCREENS.THANK_YOU);
    }, []);

    // Context value
    const value = {
        // State
        currentScreen,
        questions,
        currentQuestion,
        currentQuestionIndex,
        totalQuestions,
        selectedAnswer,
        userAnswers,
        score,
        showFeedback,
        userName,
        highScore,

        // Actions
        startQuiz,
        handleAnswerSelect,
        handleNextQuestion,
        handleRestart,
        handleFormSubmit,
    };

    return (
        <QuizContext.Provider value={value}>
            {children}
        </QuizContext.Provider>
    );
};

// Custom hook to use quiz context
export const useQuiz = () => {
    const context = useContext(QuizContext);
    if (!context) {
        throw new Error('useQuiz must be used within a QuizProvider');
    }
    return context;
};

export default QuizContext;

import { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import WelcomeScreen from './components/WelcomeScreen';
import QuestionScreen from './components/QuestionScreen';
import FeedbackScreen from './components/FeedbackScreen';
import ResultsScreen from './components/ResultsScreen';
import LeadCaptureForm from './components/LeadCaptureForm';
import ThankYouScreen from './components/ThankYouScreen';
import SuccessToast from './components/SuccessToast';
import quizQuestions from './data/questions';
import { useSound } from './hooks/useSound';
import { useLocalStorage } from './hooks/useLocalStorage';
import { useTheme } from './hooks/useTheme';
import { Button } from "./components/ui/button";
import { Building2 } from "lucide-react";
import './index.css';

const SCREENS = {
    WELCOME: 'welcome',
    QUESTION: 'question',
    FEEDBACK: 'feedback',
    RESULTS: 'results',
    FORM: 'form',
    THANK_YOU: 'thank_you'
};

function App() {
    const [currentScreen, setCurrentScreen] = useState(SCREENS.WELCOME);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [selectedAnswer, setSelectedAnswer] = useState(null);
    const [userAnswers, setUserAnswers] = useState([]);
    const [score, setScore] = useState(0);
    const [showFeedback, setShowFeedback] = useState(false);
    const [showSuccessToast, setShowSuccessToast] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');
    const [userName, setUserName] = useState('');

    const { playSound } = useSound();
    const [highScore, setHighScore] = useLocalStorage('quizHighScore', 0);
    const { theme, toggleTheme, isDark } = useTheme();

    const currentQuestion = quizQuestions[currentQuestionIndex];
    const totalQuestions = quizQuestions.length;

    const startQuiz = () => {
        setCurrentScreen(SCREENS.QUESTION);
        setCurrentQuestionIndex(0);
        setScore(0);
        setUserAnswers([]);
        setSelectedAnswer(null);
        playSound('start');
    };

    const handleAnswerSelect = (answerIndex) => {
        if (selectedAnswer !== null) return; // Prevent multiple selections

        setSelectedAnswer(answerIndex);
        const isCorrect = answerIndex === currentQuestion.correctAnswer;

        // Update score
        if (isCorrect) {
            setScore(prev => prev + 1);
            playSound('correct');
        } else {
            playSound('incorrect');
        }

        // Store answer
        setUserAnswers(prev => [
            ...prev,
            {
                questionId: currentQuestion.id,
                selectedAnswer: answerIndex,
                correctAnswer: currentQuestion.correctAnswer,
                isCorrect
            }
        ]);

        // Show feedback
        setShowFeedback(true);
        setCurrentScreen(SCREENS.FEEDBACK);
    };

    const handleNextQuestion = () => {
        setShowFeedback(false);
        setSelectedAnswer(null);

        if (currentQuestionIndex < totalQuestions - 1) {
            // Next question
            setCurrentQuestionIndex(prev => prev + 1);
            setCurrentScreen(SCREENS.QUESTION);
        } else {
            // Quiz complete
            const finalScore = score + (selectedAnswer === currentQuestion.correctAnswer ? 1 : 0);
            if (finalScore > highScore) {
                setHighScore(finalScore);
            }
            setCurrentScreen(SCREENS.RESULTS);
            playSound('complete');
        }
    };

    const handleRestart = () => {
        setCurrentScreen(SCREENS.WELCOME);
        setCurrentQuestionIndex(0);
        setScore(0);
        setUserAnswers([]);
        setSelectedAnswer(null);
        setShowFeedback(false);
    };

    const handleTalkToExpert = () => {
        setCurrentScreen(SCREENS.FORM);
    };

    const handleFormSubmit = (formData) => {
        console.log('Form submitted:', formData);
        playSound('success');

        // Store user name and show thank you screen
        setUserName(formData.name);
        setCurrentScreen(SCREENS.THANK_YOU);
    };

    const handleSkipForm = () => {
        handleRestart();
    };

    return (
        <div className="h-screen bg-slate-50 dark:bg-slate-950 flex flex-col font-sans transition-colors duration-300 overflow-hidden">
            <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-bajaj-blue backdrop-blur supports-[backdrop-filter]:bg-bajaj-blue/95 shadow-md flex-shrink-0">
                <div className="container flex h-16 max-w-screen-2xl items-center px-4 justify-center">
                    <div className="flex items-center gap-2 text-white">
                        <Building2 className="h-6 w-6" />
                        <span className="text-lg font-bold tracking-tight">Bajaj Life Insurance</span>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="flex-1 flex items-center justify-center p-3 overflow-y-auto">
                <div className="w-full max-w-[600px]">
                    <AnimatePresence mode="wait">
                        {currentScreen === SCREENS.WELCOME && (
                            <WelcomeScreen key="welcome" onStart={startQuiz} />
                        )}

                        {currentScreen === SCREENS.QUESTION && (
                            <QuestionScreen
                                key={`question-${currentQuestionIndex}`}
                                question={currentQuestion}
                                currentQuestion={currentQuestionIndex + 1}
                                totalQuestions={totalQuestions}
                                onAnswerSelect={handleAnswerSelect}
                                selectedAnswer={selectedAnswer}
                            />
                        )}

                        {currentScreen === SCREENS.FEEDBACK && showFeedback && (
                            <div key="feedback-container">
                                <QuestionScreen
                                    question={currentQuestion}
                                    currentQuestion={currentQuestionIndex + 1}
                                    totalQuestions={totalQuestions}
                                    onAnswerSelect={() => { }}
                                    selectedAnswer={selectedAnswer}
                                />
                                <FeedbackScreen
                                    isCorrect={selectedAnswer === currentQuestion.correctAnswer}
                                    explanation={currentQuestion.explanation}
                                    onNext={handleNextQuestion}
                                />
                            </div>
                        )}

                        {currentScreen === SCREENS.RESULTS && (
                            <ResultsScreen
                                key="results"
                                score={score}
                                total={totalQuestions}
                                onRestart={handleRestart}
                                onTalkToExpert={handleTalkToExpert}
                            />
                        )}

                        {currentScreen === SCREENS.FORM && (
                            <LeadCaptureForm
                                key="form"
                                onSubmit={handleFormSubmit}
                                onSkip={handleSkipForm}
                            />
                        )}

                        {currentScreen === SCREENS.THANK_YOU && (
                            <ThankYouScreen
                                key="thankyou"
                                userName={userName}
                                onRestart={handleRestart}
                            />
                        )}
                    </AnimatePresence>
                </div>
            </main>

            {/* Success Toast Notification */}
            {showSuccessToast && (
                <SuccessToast
                    message={successMessage}
                    onClose={() => setShowSuccessToast(false)}
                />
            )}
        </div>
    );
}

export default App;

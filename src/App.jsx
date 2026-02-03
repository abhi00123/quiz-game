import { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import WelcomeScreen from './components/WelcomeScreen';
import QuestionScreen from './components/QuestionScreen';
import FeedbackScreen from './components/FeedbackScreen';
import ResultsScreen from './components/ResultsScreen';
import LeadCaptureForm from './components/LeadCaptureForm';
import quizQuestions from './data/questions';
import { useSound } from './hooks/useSound';
import { useLocalStorage } from './hooks/useLocalStorage';
import { useTheme } from './hooks/useTheme';
import { Button } from "./components/ui/button";
import { Building2, Sun, Moon } from "lucide-react";
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
        setCurrentScreen(SCREENS.THANK_YOU);

        setTimeout(() => {
            alert(`Thank you, ${formData.name}! Our expert will contact you at ${formData.phone} ${formData.preferredTime}.`);
            handleRestart();
        }, 1000);
    };

    const handleSkipForm = () => {
        handleRestart();
    };

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex flex-col font-sans transition-colors duration-300">
            {/* Header */}
            <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-brand-blue/95 backdrop-blur supports-[backdrop-filter]:bg-brand-blue/60 dark:bg-slate-900/95 shadow-md">
                <div className="container flex h-16 max-w-screen-2xl items-center px-4 justify-between">
                    <div className="flex items-center gap-2 text-white">
                        <Building2 className="h-6 w-6" />
                        <span className="text-lg font-bold tracking-tight">Bajaj Life Insurance</span>
                    </div>
                    <Button
                        variant="ghost"
                        size="icon"
                        className="text-white hover:bg-white/20 hover:text-white rounded-full transition-colors"
                        onClick={toggleTheme}
                        title={isDark ? "Switch to light mode" : "Switch to dark mode"}
                    >
                        {isDark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
                    </Button>
                </div>
            </header>

            {/* Main Content */}
            <main className="flex-1 flex items-center justify-center p-4 sm:p-8">
                <div className="w-full max-w-[600px] min-h-[500px]">
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
                    </AnimatePresence>
                </div>
            </main>
        </div>
    );
}

export default App;

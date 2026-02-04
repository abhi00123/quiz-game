import { AnimatePresence } from 'framer-motion';
import { QuizProvider, useQuiz, SCREENS } from './context/QuizContext';
import WelcomeScreen from './components/WelcomeScreen';
import QuestionScreen from './components/QuestionScreen';
import FeedbackScreen from './components/FeedbackScreen';
import ResultsScreen from './components/ResultsScreen';
import LeadCaptureForm from './components/LeadCaptureForm';
import ThankYouScreen from './components/ThankYouScreen';
import './index.css';

// Main Quiz Component (uses context)
const QuizGame = () => {
    const {
        currentScreen,
        currentQuestion,
        currentQuestionIndex,
        totalQuestions,
        selectedAnswer,
        wrongAnswers,
        shieldBroken,
        showFeedback,
        score,
        userName,
        startQuiz,
        handleAnswerSelect,
        handleNextQuestion,
        handleRestart,
        handleTalkToExpert,
        handleFormSubmit,
        handleSkipForm
    } = useQuiz();

    return (
        <div className="h-screen bg-slate-50 dark:bg-slate-950 flex flex-col font-sans transition-colors duration-300 overflow-hidden">
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
                                wrongAnswers={wrongAnswers}
                                shieldBroken={shieldBroken}
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
                                    wrongAnswers={wrongAnswers}
                                    shieldBroken={shieldBroken}
                                />
                                <FeedbackScreen
                                    isCorrect={currentQuestion.options[selectedAnswer] === currentQuestion.correctAnswer}
                                    explanation={currentQuestion.explanation}
                                    onNext={handleNextQuestion}
                                    shieldBroken={shieldBroken}
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
                                shieldBroken={shieldBroken}
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
        </div>
    );
};

// App wrapper with provider
function App() {
    return (
        <QuizProvider>
            <QuizGame />
        </QuizProvider>
    );
}

export default App;

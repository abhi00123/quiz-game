import { motion } from 'framer-motion';
import QuizProgressBar from './QuizProgressBar';

const QuestionScreen = ({ question, currentQuestion, totalQuestions, onAnswerSelect, selectedAnswer, wrongAnswers = 0, shieldBroken = false }) => {
    return (
        <motion.div
            className="w-full max-w-lg mx-auto"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.4 }}
        >
            {/* Quiz Progress Bar */}
            <div className="mb-4">
                <QuizProgressBar currentQuestion={currentQuestion} totalQuestions={totalQuestions} />
            </div>

            {/* Shield Status Bar */}
            <div className="flex justify-center items-center mb-4 px-3 py-2 bg-white rounded-lg shadow-sm border border-gray-100">
                {/* Shield */}
                <div className="flex items-center gap-2">
                    <div className="relative w-8 h-8">
                        {/* Shield Image */}
                        <motion.img
                            src="/assets/shield-blue.png"
                            alt="Shield"
                            className="w-8 h-8 object-contain"
                            animate={{
                                opacity: shieldBroken ? 0.6 : 1,
                                scale: wrongAnswers > 0 && !shieldBroken ? [1, 0.9, 1] : 1
                            }}
                            transition={{ duration: 0.3 }}
                        />
                        {/* Zig-zag Crack Overlay */}
                        {shieldBroken && (
                            <motion.svg
                                initial={{ pathLength: 0, opacity: 0 }}
                                animate={{ pathLength: 1, opacity: 1 }}
                                transition={{ duration: 0.5, ease: "easeOut" }}
                                className="absolute inset-0 w-8 h-8"
                                viewBox="0 0 32 32"
                                fill="none"
                            >
                                <motion.path
                                    d="M16 2 L14 8 L18 12 L13 18 L17 22 L15 30"
                                    stroke="#dc2626"
                                    strokeWidth="2.5"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    initial={{ pathLength: 0 }}
                                    animate={{ pathLength: 1 }}
                                    transition={{ duration: 0.5, ease: "easeOut" }}
                                />
                            </motion.svg>
                        )}
                    </div>
                    <div className="flex items-center gap-1">
                        {[...Array(3)].map((_, index) => (
                            <motion.span
                                key={index}
                                initial={{ scale: 1 }}
                                animate={{
                                    scale: index < wrongAnswers ? 1 : 0.8,
                                    opacity: index < wrongAnswers ? 1 : 0.3
                                }}
                                transition={{ duration: 0.3 }}
                                className={`text-2xl ${index < wrongAnswers ? 'text-red-600' : 'text-gray-300'}`}
                                style={{
                                    fontWeight: 900,
                                    WebkitTextStroke: index < wrongAnswers ? '0.0625rem #b91c1c' : '0.03125rem #9ca3af',
                                    letterSpacing: '-0.125rem'
                                }}
                            >
                                ✕
                            </motion.span>
                        ))}
                    </div>
                </div>
            </div>

            <div className="game-board">
                {/* Question Text Area */}
                <div className="bg-blue-50 border-l-4 border-brand-orange p-4 mb-6">
                    <h2 className="text-lg sm:text-xl font-bold text-gray-900 leading-relaxed">
                        {question.question}
                    </h2>
                </div>

                <div className="space-y-3">
                    {question.options.map((option, index) => (
                        <motion.button
                            key={index}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.1 }}
                            onClick={() => onAnswerSelect(index)}
                            disabled={selectedAnswer !== null}
                            className={`game-option flex items-center group ${selectedAnswer === index
                                ? 'selected ring-2 ring-brand-orange ring-offset-2 ring-offset-white'
                                : ''
                                }`}
                        >
                            <span className={`
                                flex items-center justify-center w-8 h-8 mr-4 font-bold border-2 transition-colors
                                ${selectedAnswer === index
                                    ? 'bg-white text-brand-blue border-white'
                                    : 'bg-brand-blue text-white border-brand-blue group-hover:bg-brand-orange group-hover:border-brand-orange'}
                            `}>
                                {String.fromCharCode(65 + index)}
                            </span>
                            <span className="flex-1 text-left font-medium">{option}</span>
                        </motion.button>
                    ))}
                </div>
            </div>
        </motion.div>
    );
};

export default QuestionScreen;

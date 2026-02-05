import { motion } from 'framer-motion';
import QuizProgressBar from './QuizProgressBar';

const QuestionScreen = ({ question, currentQuestion, totalQuestions, onAnswerSelect, selectedAnswer }) => {
    return (
        <motion.div
            className="w-full h-full flex flex-col py-4 px-2"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.4 }}
        >
            {/* Quiz Progress Bar at Top */}
            <div className="mb-8">
                <QuizProgressBar currentQuestion={currentQuestion} totalQuestions={totalQuestions} />
            </div>

            <div className="flex-1 flex flex-col justify-center space-y-8">
                {/* Question Text Area */}
                <div className="bg-blue-50 border-l-8 border-brand-orange py-6 px-6">
                    <h2 className="text-xl sm:text-2xl font-black text-gray-900 leading-tight uppercase">
                        {question.question}
                    </h2>
                </div>

                {/* Options Area */}
                <div className="space-y-4">
                    {question.options.map((option, index) => (
                        <motion.button
                            key={index}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.1 }}
                            onClick={() => onAnswerSelect(index)}
                            disabled={selectedAnswer !== null}
                            className={`game-option flex items-center group py-4 ${selectedAnswer === index
                                ? 'selected ring-4 ring-brand-orange/50 ring-offset-2 ring-offset-white'
                                : 'shadow-[4px_4px_0px_0px_rgba(0,94,184,0.1)]'
                                }`}
                        >
                            <span className={`
                                flex items-center justify-center w-10 h-10 mr-4 font-black border-2 text-lg transition-colors
                                ${selectedAnswer === index
                                    ? 'bg-white text-brand-blue border-white'
                                    : 'bg-brand-blue text-white border-brand-blue sm:group-hover:bg-brand-orange sm:group-hover:border-brand-orange'}
                            `}>
                                {String.fromCharCode(65 + index)}
                            </span>
                            <span className="flex-1 text-left font-bold text-base uppercase tracking-tight">{option}</span>
                        </motion.button>
                    ))}
                </div>
            </div>

            {/* Bottom spacer for balance */}
            <div className="h-12 flex items-center justify-center">
                <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest text-center">
                    BAJAJ LIFE INSURANCE
                </p>
            </div>
        </motion.div>
    );
};

export default QuestionScreen;

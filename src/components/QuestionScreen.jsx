import { motion } from 'framer-motion';
import QuestionStepper from './QuestionStepper';

const QuestionScreen = ({ question, currentQuestion, totalQuestions, onAnswerSelect, selectedAnswer }) => {
    return (
        <motion.div
            className="w-full max-w-lg mx-auto"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.4 }}
        >
            {/* Question Stepper - Will need to align this style if not already sharp */}
            <div className="mb-4">
                <QuestionStepper currentQuestion={currentQuestion} totalQuestions={totalQuestions} />
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

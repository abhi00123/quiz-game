import { motion } from "framer-motion";
import QuizProgressBar from "./QuizProgressBar";

const QuestionScreen = ({
    question,
    currentQuestion,
    totalQuestions,
    onAnswerSelect,
    selectedAnswer,
}) => {
    return (
        <motion.div
            className="w-full h-full flex flex-col px-4 pt-6 pb-6 max-w-md mx-auto"
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -40 }}
            transition={{ duration: 0.35 }}
        >
            {/* Progress Bar */}
            <div className="mb-6">
                <QuizProgressBar
                    currentQuestion={currentQuestion}
                    totalQuestions={totalQuestions}
                />
            </div>

            {/* Question + Options Container */}
            <div className="flex flex-col space-y-6">
                {/* Question */}
                <div className="bg-white border-l-8 border-brand-orange py-5 px-5">
                    <h2 className="text-lg sm:text-xl font-black text-brand-blue leading-snug uppercase">
                        {question.question}
                    </h2>
                </div>

                {/* Options */}
                <div className="space-y-4">
                    {question.options.map((option, index) => (
                        <motion.button
                            key={index}
                            initial={{ opacity: 0, x: -15 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.08 }}
                            onClick={() => onAnswerSelect(index)}
                            disabled={selectedAnswer !== null}
                            className={`w-full flex items-center h-[88px] px-4 bg-brand-blue border-2 border-brand-blue transition-all duration-200
                ${selectedAnswer === index
                                    ? "ring-4 ring-white/40 ring-offset-2 ring-offset-brand-blue shadow-[5px_5px_0px_0px_rgba(0,0,0,0.2)]"
                                    : "shadow-[3px_3px_0px_0px_rgba(0,0,0,0.15)] active:translate-y-[1px]"
                                }`}
                        >
                            {/* Option Letter */}
                            <span className="flex items-center justify-center w-11 h-11 mr-4 font-black border-2 text-lg bg-white text-brand-blue border-white flex-shrink-0">
                                {String.fromCharCode(65 + index)}
                            </span>

                            {/* Option Text */}
                            <span className="flex-1 text-left font-bold text-sm sm:text-base uppercase tracking-tight text-white leading-snug">
                                {option}
                            </span>
                        </motion.button>
                    ))}
                </div>
            </div>

            {/* Footer */}
            <div className="mt-8 flex items-center justify-center">
                <p className="text-[10px] text-white/60 font-bold uppercase tracking-widest text-center">
                    BAJAJ LIFE INSURANCE
                </p>
            </div>
        </motion.div>
    );
};

export default QuestionScreen;

import { motion } from 'framer-motion';
import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
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
            {/* Question Stepper */}
            <QuestionStepper currentQuestion={currentQuestion} totalQuestions={totalQuestions} />

            <Card className="shadow-md border-0 bg-white">
                <CardContent className="p-3 sm:p-6">
                    <h2 className="text-base sm:text-xl font-bold text-gray-800 mb-3 sm:mb-6 leading-relaxed">
                        {question.question}
                    </h2>

                    <div className="space-y-2 sm:space-y-3">
                        {question.options.map((option, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: index * 0.1 }}
                            >
                                <Button
                                    variant={selectedAnswer === index ? "brand" : "outline"}
                                    className={`w-full justify-start text-left h-auto py-2.5 sm:py-4 px-3 sm:px-6 text-sm sm:text-base whitespace-normal ${selectedAnswer === index
                                        ? "ring-2 ring-bajaj-blue ring-offset-2"
                                        : "hover:border-bajaj-blue hover:text-bajaj-blue hover:bg-blue-50"
                                        }`}
                                    onClick={() => onAnswerSelect(index)}
                                >
                                    <span className="mr-2 sm:mr-3 font-bold opacity-70">{index + 1}.</span>
                                    {option}
                                </Button>
                            </motion.div>
                        ))}
                    </div>
                </CardContent>
            </Card>
        </motion.div>
    );
};

export default QuestionScreen;

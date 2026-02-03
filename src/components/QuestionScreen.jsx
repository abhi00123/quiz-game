import { motion } from 'framer-motion';
import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
import { Progress } from "./ui/progress";

const QuestionScreen = ({ question, currentQuestion, totalQuestions, onAnswerSelect, selectedAnswer }) => {
    const progressPercentage = ((currentQuestion - 1) / totalQuestions) * 100;

    return (
        <motion.div
            className="w-full max-w-lg mx-auto"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.4 }}
        >
            <div className="mb-6 space-y-2">
                <div className="flex justify-between text-sm font-semibold text-gray-500">
                    <span>Question {currentQuestion}/{totalQuestions}</span>
                    <span>{Math.round(progressPercentage)}%</span>
                </div>
                <Progress value={progressPercentage} className="h-2 bg-gray-200" />
            </div>

            <Card className="shadow-md border-0 bg-white">
                <CardContent className="p-6">
                    <h2 className="text-xl font-bold text-gray-800 mb-6 leading-relaxed">
                        {question.question}
                    </h2>

                    <div className="space-y-3">
                        {question.options.map((option, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: index * 0.1 }}
                            >
                                <Button
                                    variant={selectedAnswer === index ? "brand" : "outline"}
                                    className={`w-full justify-start text-left h-auto py-4 px-6 text-base whitespace-normal ${selectedAnswer === index
                                        ? "ring-2 ring-brand-blue ring-offset-2"
                                        : "hover:border-brand-blue hover:text-brand-blue hover:bg-blue-50"
                                        }`}
                                    onClick={() => onAnswerSelect(index)}
                                >
                                    <span className="mr-3 font-bold opacity-70">{index + 1}.</span>
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

import { Check } from 'lucide-react';

const QuestionStepper = ({ currentQuestion, totalQuestions }) => {
    return (
        <div className="flex items-center justify-center w-full max-w-2xl mx-auto mb-3 sm:mb-6 overflow-x-auto px-2 py-2">
            <div className="flex items-center min-w-max">
                {Array.from({ length: totalQuestions }).map((_, index) => {
                    const stepNumber = index + 1;
                    const isCompleted = stepNumber < currentQuestion;
                    const isCurrent = stepNumber === currentQuestion;
                    const isUpcoming = stepNumber > currentQuestion;

                    return (
                        <div key={stepNumber} className="flex items-center">
                            {/* Step Circle */}
                            <div
                                className={`
                                    flex items-center justify-center w-7 h-7 sm:w-10 sm:h-10 font-bold text-xs sm:text-sm border-2
                                    transition-all duration-300
                                    ${isCompleted ? 'bg-brand-blue text-white border-brand-blue' : ''}
                                    ${isCurrent ? 'bg-brand-blue text-white border-brand-orange ring-2 ring-brand-orange ring-offset-2 ring-offset-white' : ''}
                                    ${isUpcoming ? 'bg-white text-gray-400 border-gray-300' : ''}
                                `}
                            >
                                {isCompleted ? (
                                    <Check className="w-3.5 h-3.5 sm:w-5 sm:h-5" strokeWidth={3} />
                                ) : (
                                    stepNumber
                                )}
                            </div>

                            {/* Connecting Line */}
                            {stepNumber < totalQuestions && (
                                <div
                                    className={`
                                        h-0.5 w-6 sm:w-12 md:w-16 mx-0.5 sm:mx-1 transition-all duration-300
                                        ${stepNumber < currentQuestion ? 'bg-bajaj-blue' : 'bg-gray-600'}
                                    `}
                                />
                            )}
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default QuestionStepper;

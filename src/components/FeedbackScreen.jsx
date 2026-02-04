import { motion } from 'framer-motion';
import { CheckCircle2, XCircle, AlertTriangle } from "lucide-react";
import { useEffect } from 'react';

const FeedbackScreen = ({ isCorrect, explanation, onNext, shieldBroken = false }) => {
    useEffect(() => {
        // Longer delay if shield just broke to let user read the hint
        const delay = shieldBroken ? 3000 : 1000;
        const timer = setTimeout(() => {
            onNext();
        }, delay);
        return () => clearTimeout(timer);
    }, [onNext, shieldBroken]);

    return (
        <div className="absolute inset-0 z-50 flex items-end justify-center sm:items-center p-4 bg-brand-blue/80 backdrop-blur-sm">
            <motion.div
                className="w-full max-w-md"
                initial={{ y: 100, opacity: 0, scale: 0.9 }}
                animate={{ y: 0, opacity: 1, scale: 1 }}
                exit={{ y: 100, opacity: 0, scale: 0.9 }}
                transition={{ type: "spring", damping: 25, stiffness: 300 }}
            >
                <div className={`game-board border-l-8 ${isCorrect ? 'border-l-brand-blue bg-white' : 'border-l-brand-orange bg-white'
                    } shadow-[0.5rem_0.5rem_0_0_rgba(0,0,0,0.25)]`}>

                    <div className="p-6 text-center">
                        {/* Icon */}
                        <motion.div
                            initial={{ scale: 0, rotate: -180 }}
                            animate={{ scale: 1, rotate: 0 }}
                            transition={{ type: "spring", damping: 15, stiffness: 200 }}
                            className="mb-4 inline-block p-4 border-4 border-current shadow-[0.25rem_0.25rem_0_0_rgba(0,0,0,0.1)]"
                            style={{ color: isCorrect ? 'var(--brand-blue)' : 'var(--brand-orange)' }}
                        >
                            {isCorrect ? (
                                <CheckCircle2 className="w-16 h-16" strokeWidth={2.5} />
                            ) : (
                                <XCircle className="w-16 h-16" strokeWidth={2.5} />
                            )}
                        </motion.div>

                        {/* Title */}
                        <motion.h3
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                            className={`text-2xl font-black uppercase tracking-wide mb-3 ${isCorrect ? 'text-brand-blue' : 'text-brand-orange'
                                }`}
                        >
                            {isCorrect ? 'Correct!' : "Incorrect!"}
                        </motion.h3>

                        {/* Explanation */}
                        <motion.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.3 }}
                            className="text-gray-800 text-base font-medium leading-relaxed mb-4 bg-gray-50 p-4 border-2 border-gray-100"
                        >
                            {explanation}
                        </motion.p>

                        {/* Shield Broken Hint */}
                        {shieldBroken && (
                            <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.5 }}
                                className="bg-amber-50 border-2 border-amber-400 p-4 mb-4 flex items-start gap-3"
                            >
                                <AlertTriangle className="w-6 h-6 text-amber-500 flex-shrink-0 mt-0.5" />
                                <div className="text-left">
                                    <p className="font-bold text-amber-700 mb-1">Your shield is broken!</p>
                                    <p className="text-sm text-amber-600">
                                        Don't worry! Complete the quiz and talk to our expert to learn more about Life Insurance & GST.
                                    </p>
                                </div>
                            </motion.div>
                        )}

                        {/* Progress Bar (Sharp) */}
                        <div className="w-full bg-gray-200 h-2 overflow-hidden">
                            <motion.div
                                className={`h-full ${isCorrect ? 'bg-brand-blue' : 'bg-brand-orange'}`}
                                initial={{ width: "0%" }}
                                animate={{ width: "100%" }}
                                transition={{ duration: shieldBroken ? 3 : 1, ease: "linear" }}
                            />
                        </div>
                    </div>
                </div>
            </motion.div>
        </div>
    );
};

export default FeedbackScreen;

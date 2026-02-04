import { motion } from 'framer-motion';
import { Trophy, MessageCircle, RotateCcw, AlertTriangle } from "lucide-react";
import ScoreCard from './ScoreCard';
import Confetti from './Confetti';

const ResultsScreen = ({ score, total, onRestart, onTalkToExpert, shieldBroken = false }) => {
    const percentage = (score / total) * 100;

    // Custom title based on score
    const getResultTitle = (currentScore, broken) => {
        if (broken) return "Shield Broken!";
        if (currentScore === 5) return "YOU ARE A GST EXPERT";
        if (currentScore === 4) return "Almost There!";
        if (currentScore === 3) return "Good Progress!";
        if (currentScore === 2) return "Getting Started!";
        if (currentScore === 1) return "LEARNING BEGINS";
        return "Don't Give Up!";
    };

    // Custom motivational message based on score
    const getMotivationalMessage = (currentScore, broken) => {
        if (broken) return "Your shield broke, but don't give up!";
        if (currentScore === 5) return "Outstanding! Perfect score! You know everything about GST!";
        if (currentScore === 4) return "Almost perfect! You're nearly an expert.";
        if (currentScore === 3) return "Halfway there! Good understanding of the basics.";
        if (currentScore === 2) return "Getting started! Time to dive deeper into GST.";
        if (currentScore === 1) return "No Worries Lets help you";
        return "Don't give up! Every expert was once a beginner.";
    };

    return (
        <motion.div
            className="w-full max-w-lg mx-auto text-center"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
        >
            {percentage >= 40 && !shieldBroken && <Confetti />}

            <div className="game-board py-4 px-6">
                {/* Broken Shield Display */}
                {shieldBroken ? (
                    <div className="mb-4 flex justify-center">
                        <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ type: "spring", stiffness: 200, damping: 15 }}
                            className="relative w-20 h-20"
                        >
                            {/* Shield Image */}
                            <img
                                src="/assets/shield-blue.png"
                                alt="Shield"
                                className="w-20 h-20 object-contain opacity-60"
                            />
                            {/* Zig-zag Crack Overlay */}
                            <motion.svg
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ duration: 0.3, delay: 0.3 }}
                                className="absolute inset-0 w-20 h-20"
                                viewBox="0 0 80 80"
                                fill="none"
                            >
                                <motion.path
                                    d="M40 5 L36 20 L44 30 L34 45 L44 55 L38 75"
                                    stroke="#dc2626"
                                    strokeWidth="4"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    initial={{ pathLength: 0 }}
                                    animate={{ pathLength: 1 }}
                                    transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
                                />
                            </motion.svg>
                        </motion.div>
                    </div>
                ) : (
                    <div className="mb-4 flex justify-center">
                        <motion.div
                            animate={{ rotate: [0, -5, 5, -5, 5, 0] }}
                            transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
                            className="p-3 bg-blue-50 border-4 border-brand-orange shadow-[0.25rem_0.25rem_0_0_rgba(245,130,32,0.3)]"
                        >
                            <Trophy className="w-12 h-12 text-brand-orange" strokeWidth={1.5} />
                        </motion.div>
                    </div>
                )}

                <h2 className="text-2xl font-black text-brand-blue mb-1 uppercase tracking-tight">
                    {getResultTitle(score, shieldBroken)}
                </h2>
                <div className={`${shieldBroken ? 'bg-amber-500' : 'bg-brand-orange'} text-white text-xs font-bold py-1 px-3 inline-block mb-4 uppercase tracking-wider`}>
                    {getMotivationalMessage(score, shieldBroken)}
                </div>

                <ScoreCard score={score} total={total} percentage={percentage} />

                {/* Expert Contact Section - Emphasized when shield is broken */}
                <div className={`${shieldBroken ? 'bg-amber-50 border-amber-400' : 'bg-blue-50 border-brand-blue'} border-2 p-3 mb-4 text-left relative`}>
                    <div className={`absolute -top-3 -right-3 ${shieldBroken ? 'bg-amber-500' : 'bg-brand-orange'} text-white text-[0.625rem] font-bold px-2 py-0.5 rotate-3`}>
                        {shieldBroken ? 'RECOMMENDED' : 'EXPERT HELP'}
                    </div>
                    <div className="flex items-center gap-3">
                        <div className={`p-2 bg-white border-2 ${shieldBroken ? 'border-amber-400' : 'border-brand-blue'} flex-shrink-0`}>
                            {shieldBroken ? (
                                <AlertTriangle className="w-5 h-5 text-amber-500" />
                            ) : (
                                <MessageCircle className="w-5 h-5 text-brand-blue" />
                            )}
                        </div>
                        <div>
                            <h4 className="font-bold text-gray-900 uppercase tracking-wide text-xs">
                                {shieldBroken ? 'Get Expert Guidance!' : 'Have GST Questions?'}
                            </h4>
                            <p className="text-xs text-gray-600 font-medium">
                                {shieldBroken ? 'Learn more about Life Insurance & GST.' : 'Clarify doubts instantly.'}
                            </p>
                        </div>
                    </div>
                </div>

                <div className="space-y-3">
                    <motion.button
                        onClick={onTalkToExpert}
                        className={`w-full ${shieldBroken ? 'game-btn bg-amber-500 text-white border-amber-600 hover:bg-amber-600' : 'game-btn-orange'} text-lg shadow-[0.25rem_0.25rem_0_0_rgba(194,65,12,1)] hover:translate-y-[-0.125rem] hover:shadow-[0.375rem_0.375rem_0_0_rgba(194,65,12,1)] active:translate-y-[0.125rem] active:shadow-none transition-all`}
                        animate={shieldBroken ? { scale: [1, 1.02, 1] } : {}}
                        transition={{ duration: 1.5, repeat: Infinity }}
                    >
                        Talk to Expert
                    </motion.button>

                    <button
                        onClick={onRestart}
                        className="w-full game-btn bg-white text-brand-blue border-brand-blue hover:bg-blue-50 shadow-[0.25rem_0.25rem_0_0_rgba(0,94,184,0.2)]"
                    >
                        <div className="flex items-center justify-center gap-2">
                            <RotateCcw className="w-5 h-5" />
                            <span>Play Again</span>
                        </div>
                    </button>
                </div>
            </div>
        </motion.div>
    );
};

export default ResultsScreen;

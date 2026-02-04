import { motion } from 'framer-motion';
import { Trophy, MessageCircle, RotateCcw } from "lucide-react";
import ScoreCard from './ScoreCard';
import Confetti from './Confetti';

const ResultsScreen = ({ score, total, onRestart, onTalkToExpert }) => {
    const percentage = (score / total) * 100;

    const getMotivationalMessage = (pct) => {
        if (pct === 100) return "Outstanding! You're a GST Expert!";
        if (pct >= 80) return "Great job! You know your stuff!";
        if (pct >= 60) return "Good effort! You're getting there!";
        return "Keep learning! Knowledge is power!";
    };

    return (
        <motion.div
            className="w-full max-w-lg mx-auto text-center"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
        >
            {percentage >= 40 && <Confetti />}

            <div className="game-board">
                <div className="mb-6 flex justify-center">
                    <motion.div
                        animate={{ rotate: [0, -5, 5, -5, 5, 0] }}
                        transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
                        className="p-4 bg-blue-50 border-4 border-brand-orange shadow-[4px_4px_0px_0px_rgba(245,130,32,0.3)]"
                    >
                        <Trophy className="w-16 h-16 text-brand-orange" strokeWidth={1.5} />
                    </motion.div>
                </div>

                <h2 className="text-3xl font-black text-brand-blue mb-2 uppercase tracking-tight">
                    Game Over!
                </h2>
                <div className="bg-brand-orange text-white text-sm font-bold py-1 px-3 inline-block mb-6 uppercase tracking-wider">
                    {getMotivationalMessage(percentage)}
                </div>

                <ScoreCard score={score} total={total} percentage={percentage} />

                {/* Expert Contact Section */}
                <div className="bg-blue-50 border-2 border-brand-blue p-4 mb-6 text-left relative">
                    <div className="absolute -top-3 -right-3 bg-brand-orange text-white text-xs font-bold px-2 py-1 rotate-3">
                        EXPERT HELP
                    </div>
                    <div className="flex items-center gap-4">
                        <div className="p-3 bg-white border-2 border-brand-blue flex-shrink-0">
                            <MessageCircle className="w-6 h-6 text-brand-blue" />
                        </div>
                        <div>
                            <h4 className="font-bold text-gray-900 uppercase tracking-wide">Have GST Questions?</h4>
                            <p className="text-sm text-gray-600 font-medium">Our experts can clarify doubts instantly.</p>
                        </div>
                    </div>
                </div>

                <div className="space-y-3">
                    <button
                        onClick={onTalkToExpert}
                        className="w-full game-btn-orange text-lg shadow-[4px_4px_0px_0px_rgba(194,65,12,1)] hover:translate-y-[-2px] hover:shadow-[6px_6px_0px_0px_rgba(194,65,12,1)] active:translate-y-[2px] active:shadow-none transition-all"
                    >
                        Talk to Expert 💬
                    </button>

                    <button
                        onClick={onRestart}
                        className="w-full game-btn bg-white text-brand-blue border-brand-blue hover:bg-blue-50 shadow-[4px_4px_0px_0px_rgba(0,94,184,0.2)]"
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

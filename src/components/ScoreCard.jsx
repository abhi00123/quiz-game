import { motion } from 'framer-motion';
import { Card, CardContent } from "./ui/card";
import { Progress } from "./ui/progress";

const ScoreCard = ({ score, total, percentage }) => {
    return (
        <div className="bg-brand-blue text-white border-4 border-blue-900 shadow-lg mb-6">
            <CardContent className="p-5">
                <div className="text-4xl font-bold mb-1 leading-none">
                    {score}<span className="text-xl opacity-60">/{total}</span>
                </div>
                <div className="uppercase tracking-widest text-xs font-medium opacity-80 mb-3">
                    Your Score
                </div>

                <div className="space-y-1.5">
                    <div className="flex justify-between text-xs font-semibold uppercase tracking-wider opacity-90">
                        <span>Accuracy</span>
                        <span>{Math.round(percentage)}%</span>
                    </div>
                    {/* Custom progress specifically for the dark card context */}
                    <div className="h-4 w-full bg-blue-900/50 overflow-hidden border border-blue-400/30">
                        <motion.div
                            className="h-full bg-brand-orange"
                            initial={{ width: 0 }}
                            animate={{ width: `${percentage}%` }}
                            transition={{ duration: 1, ease: "easeOut" }}
                        />
                    </div>
                </div>
            </CardContent>
        </div>
    );
};

export default ScoreCard;

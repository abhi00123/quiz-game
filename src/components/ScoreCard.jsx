import { motion } from 'framer-motion';
import { Card, CardContent } from "./ui/card";
import { Progress } from "./ui/progress";

const ScoreCard = ({ score, total, percentage }) => {
    return (
        <div className="bg-brand-blue text-white border-2 border-blue-900 shadow-sm mb-2 mx-2">
            <CardContent className="p-4">
                <div className="flex flex-col items-center justify-center mb-4">
                    <div className="text-5xl font-black leading-none mb-1">
                        {score}<span className="text-xl opacity-50">/{total}</span>
                    </div>
                    <div className="uppercase tracking-[0.2em] text-[10px] font-black opacity-60">
                        Your Score
                    </div>
                </div>

                <div className="space-y-1.5">
                    <div className="flex justify-between text-[10px] font-black uppercase tracking-widest">
                        <span>Accuracy</span>
                        <span>{Math.round(percentage)}%</span>
                    </div>
                    {/* Custom progress specifically for the dark card context */}
                    <div className="h-4 w-full bg-blue-900/50 overflow-hidden border border-blue-800">
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

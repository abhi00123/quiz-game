import { motion } from 'framer-motion';
import { Card, CardContent } from "./ui/card";
import { Progress } from "./ui/progress";

const ScoreCard = ({ score, total, percentage }) => {
    return (
        <Card className="bg-gradient-to-br from-brand-blue to-blue-700 text-white border-0 shadow-xl mb-4">
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
                    <div className="h-2 w-full bg-black/20 rounded-full overflow-hidden">
                        <motion.div
                            className="h-full bg-brand-orange rounded-full"
                            initial={{ width: 0 }}
                            animate={{ width: `${percentage}%` }}
                            transition={{ duration: 1, ease: "easeOut" }}
                        />
                    </div>
                </div>
            </CardContent>
        </Card>
    );
};

export default ScoreCard;

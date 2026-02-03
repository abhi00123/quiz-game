import { motion } from 'framer-motion';
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "./ui/card";

const WelcomeScreen = ({ onStart }) => {
    return (
        <motion.div
            className="w-full max-w-md mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
        >
            <Card className="text-center shadow-lg border-t-4 border-t-brand-blue">
                <CardHeader>
                    {/* Rotating Badge */}
                    <div className="flex justify-center mb-4">
                        <motion.div
                            initial={{ scale: 0, rotate: -180 }}
                            animate={{ scale: 1, rotate: 0 }}
                            transition={{ type: "spring", stiffness: 200, damping: 15, delay: 0.3 }}
                            className="relative"
                        >
                            <motion.img
                                src="/bajaj-badge.png"
                                alt="100% Bajaj - Made in India"
                                className="w-28 h-28 object-contain"
                                animate={{ rotate: 360 }}
                                transition={{
                                    duration: 20,
                                    repeat: Infinity,
                                    ease: "linear"
                                }}
                            />
                        </motion.div>
                    </div>
                    <CardTitle className="text-3xl font-bold text-gray-900 mb-2">
                        Life Insurance GST Quiz
                    </CardTitle>
                    <CardDescription className="text-lg text-brand-blue font-medium">
                        Did you know life insurance is 0% GST?
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <p className="text-gray-600 mb-8">
                        Test your knowledge with 5 quick questions and become a GST expert in just 2 minutes!
                    </p>
                    <Button
                        variant="cta"
                        size="xl"
                        className="w-full text-lg font-bold shadow-xl hover:shadow-2xl transition-all"
                        onClick={onStart}
                    >
                        Start Quiz
                    </Button>
                </CardContent>
            </Card>
        </motion.div>
    );
};

export default WelcomeScreen;

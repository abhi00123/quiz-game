import { motion } from 'framer-motion';
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "./ui/card";
import { ClipboardList } from "lucide-react";
import CircularText from './CircularText';

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
                    <div className="flex justify-center mb-4 relative">
                        <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ type: "spring", stiffness: 260, damping: 20, delay: 0.3 }}
                            className="relative w-[200px] h-[200px]"
                        >
                            {/* Blue Circle Background with Icon */}
                            <div className="absolute inset-0 flex items-center justify-center">
                                <div className="w-24 h-24 bg-bajaj-blue rounded-full flex items-center justify-center shadow-lg">
                                    <ClipboardList className="w-12 h-12 text-white" />
                                </div>
                            </div>

                            {/* Circular Rotating Text */}
                            <CircularText
                                text="BAJAJ LIFE • INSURANCE • "
                                onHover="speedUp"
                                spinDuration={15}
                                className="w-full h-full text-bajaj-blue"
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
                        Start Quiz 📝
                    </Button>
                </CardContent>
            </Card>
        </motion.div>
    );
};

export default WelcomeScreen;

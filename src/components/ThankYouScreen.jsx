import { motion } from 'framer-motion';
import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
import { CheckCircle2, Phone } from "lucide-react";
import RotatingText from './RotatingText';

const ThankYouScreen = ({ userName, onRestart }) => {
    return (
        <motion.div
            className="w-full max-w-md mx-auto"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.5 }}
        >
            <Card className="text-center shadow-2xl border-t-4 border-t-bajaj-blue overflow-hidden">
                <CardContent className="p-4 sm:p-6">
                    {/* Success Icon */}
                    <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: "spring", stiffness: 200, damping: 15, delay: 0.2 }}
                        className="flex justify-center mb-3 sm:mb-4"
                    >
                        <div className="relative">
                            <div className="absolute inset-0 bg-green-100 rounded-full blur-xl opacity-50"></div>
                            <div className="relative bg-gradient-to-br from-green-400 to-green-600 rounded-full p-3">
                                <CheckCircle2 className="w-10 h-10 sm:w-12 sm:h-12 text-white" strokeWidth={2.5} />
                            </div>
                        </div>
                    </motion.div>

                    {/* Thank You Message */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                    >
                        <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-1 sm:mb-2">
                            Thank You{userName ? `, ${userName}` : ''}! 🎉
                        </h2>
                        <p className="text-sm sm:text-base text-gray-600 mb-3 sm:mb-4">
                            Your details have been submitted successfully
                        </p>
                    </motion.div>

                    {/* Single Info Card */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 }}
                        className="mb-3 sm:mb-4"
                    >
                        <div className="bg-blue-50 border border-bajaj-blue/20 rounded-lg p-3 flex items-start gap-3 text-left">
                            <div className="p-2 bg-bajaj-blue rounded-lg flex-shrink-0">
                                <Phone className="w-4 h-4 text-white" />
                            </div>
                            <div>
                                <h4 className="font-semibold text-sm text-gray-900">Our Expert Will Contact You</h4>
                                <p className="text-xs text-gray-600">We'll reach out within 24 hours to discuss your insurance needs</p>
                            </div>
                        </div>
                    </motion.div>

                    {/* Rotating Insurance Text */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5 }}
                        className="mb-3 sm:mb-4"
                    >
                        <div className="text-center">
                            <div className="flex items-center justify-center gap-1 text-base sm:text-lg font-semibold mb-1">
                                <span className="text-gray-700">Buy our</span>
                                <RotatingText
                                    texts={['Term', 'ULIP', 'Savings']}
                                    mainClassName="inline-flex px-2 bg-bajaj-blue text-white overflow-hidden py-1 rounded-md font-bold min-w-[80px] justify-center"
                                    staggerFrom="last"
                                    initial={{ y: "100%" }}
                                    animate={{ y: 0 }}
                                    exit={{ y: "-120%" }}
                                    staggerDuration={0.025}
                                    splitLevelClassName="overflow-hidden"
                                    transition={{ type: "spring", damping: 30, stiffness: 400 }}
                                    rotationInterval={2000}
                                />
                                <span className="text-gray-700">Insurance</span>
                            </div>
                            <p className="text-xs sm:text-sm text-gray-600 italic">For a secure and better future</p>
                        </div>
                    </motion.div>

                    {/* Action Button */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.6 }}
                    >
                        <Button
                            variant="cta"
                            size="lg"
                            className="w-full shadow-lg text-sm sm:text-base"
                            onClick={onRestart}
                        >
                            Take Quiz Again
                        </Button>
                        <p className="text-xs text-gray-500 mt-2">
                            Want to learn more? Retake the quiz to test your knowledge!
                        </p>
                    </motion.div>
                </CardContent>
            </Card>
        </motion.div>
    );
};

export default ThankYouScreen;

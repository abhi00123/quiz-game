import { motion } from 'framer-motion';
import { CheckCircle2, Phone, RotateCcw } from "lucide-react";
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
            <div className="game-board py-4 px-6 text-center">
                {/* Success Icon */}
                <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 200, damping: 15, delay: 0.2 }}
                    className="flex justify-center mb-3 sm:mb-4"
                >
                    <div className="relative">
                        <div className="bg-green-500 p-3 border-4 border-green-700 shadow-[4px_4px_0px_0px_rgba(21,128,61,0.3)]">
                            <CheckCircle2 className="w-10 h-10 sm:w-12 sm:h-12 text-white" strokeWidth={2.5} />
                        </div>
                    </div>
                </motion.div>

                {/* Thank You Message */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="mb-4"
                >
                    <h2 className="text-xl sm:text-2xl font-black text-brand-blue mb-1 uppercase tracking-tight">
                        Thank You{userName ? `, ${userName}` : ''}!
                    </h2>
                    <div className="bg-brand-orange text-white text-[10px] font-bold py-0.5 px-2 inline-block mb-4 uppercase tracking-wider">
                        Submission Successful
                    </div>
                </motion.div>

                {/* Expert Contact Info */}
                <div className="bg-blue-50 border-2 border-brand-blue p-3 mb-4 text-left relative">
                    <div className="absolute -top-3 -right-3 bg-brand-orange text-white text-[10px] font-bold px-2 py-0.5 rotate-3">
                        24 HOURS
                    </div>
                    <div className="flex items-start gap-3">
                        <div className="p-2 bg-white border-2 border-brand-blue flex-shrink-0">
                            <Phone className="w-5 h-5 text-brand-blue" />
                        </div>
                        <div>
                            <h4 className="font-bold text-gray-900 uppercase tracking-wide text-xs mb-0.5">Contact Coming Soon</h4>
                            <p className="text-xs text-gray-600 font-medium leading-tight">We'll reach out soon.</p>
                        </div>
                    </div>
                </div>

                {/* Rotating Insurance Text */}
                <div className="bg-white border-2 border-brand-blue p-3 mb-3">
                    <div className="flex items-center justify-center gap-1.5 text-base sm:text-lg font-bold mb-1">
                        <span className="text-gray-700">Buy our</span>
                        <RotatingText
                            texts={['Term', 'ULIP', 'Savings']}
                            mainClassName="inline-flex px-2 bg-brand-blue text-white overflow-hidden py-0.5 font-black min-w-[75px] justify-center uppercase text-sm"
                            staggerFrom="last"
                            initial={{ y: "100%" }}
                            animate={{ y: 0 }}
                            exit={{ y: "-120%" }}
                            staggerDuration={0.025}
                            splitLevelClassName="overflow-hidden"
                            transition={{ type: "spring", damping: 30, stiffness: 400 }}
                            rotationInterval={2000}
                        />
                        <span className="text-gray-700 text-sm">Insurance</span>
                    </div>
                </div>

                {/* Action Button */}
                <button
                    onClick={onRestart}
                    className="w-full game-btn-orange py-2 text-base shadow-[4px_4px_0px_0px_rgba(194,65,12,1)] hover:translate-y-[-2px] hover:shadow-[6px_6px_0px_0px_rgba(194,65,12,1)] active:translate-y-[2px] active:shadow-none transition-all"
                >
                    <div className="flex items-center justify-center gap-2">
                        <RotateCcw className="w-4 h-4" />
                        <span>Take Quiz Again</span>
                    </div>
                </button>
                <p className="text-xs text-gray-600 mt-3 bg-gray-50 p-2 border border-gray-200">
                    Want to learn more? Retake the quiz to test your knowledge!
                </p>
            </div>
        </motion.div>
    );
};

export default ThankYouScreen;

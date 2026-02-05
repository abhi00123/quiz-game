import { motion } from 'framer-motion';
import { CheckCircle2, Phone, RotateCcw } from "lucide-react";
import RotatingText from './RotatingText';

const ThankYouScreen = ({ userName, onRestart }) => {
    return (
        <motion.div
            className="w-full h-full flex flex-col justify-between py-6 px-2 text-center"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.5 }}
        >
            <div className="flex-1 flex flex-col justify-center space-y-8">
                {/* Success Icon */}
                <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 200, damping: 15, delay: 0.2 }}
                    className="flex justify-center"
                >
                    <div className="bg-green-500 p-6 border-4 border-green-700 shadow-[6px_6px_0px_0px_rgba(21,128,61,0.2)]">
                        <CheckCircle2 className="w-16 h-16 text-white" strokeWidth={2.5} />
                    </div>
                </motion.div>

                {/* Thank You Message */}
                <div className="space-y-2">
                    <h2 className="text-3xl font-black text-brand-blue uppercase tracking-tight leading-none">
                        Thank You{userName ? `, ${userName}` : ''}!
                    </h2>
                    <div className="bg-brand-orange text-white text-[10px] font-black py-1 px-4 inline-block uppercase tracking-widest">
                        Submission Successful
                    </div>
                </div>

                {/* Expert Contact Info */}
                <div className="bg-blue-50 border-2 border-brand-blue p-4 text-left relative mx-auto max-w-sm">
                    <div className="absolute -top-3 -right-3 bg-brand-orange text-white text-[10px] font-black px-3 py-1 rotate-3 shadow-md">
                        24 HOURS
                    </div>
                    <div className="flex items-start gap-4">
                        <div className="p-3 bg-white border-2 border-brand-blue flex-shrink-0">
                            <Phone className="w-6 h-6 text-brand-blue" />
                        </div>
                        <div>
                            <h4 className="font-black text-brand-blue uppercase tracking-wide text-sm mb-1">Our expert will call you</h4>
                            <p className="text-xs text-brand-blue/70 font-bold leading-tight uppercase">Get personalized guidance for your life goals.</p>
                        </div>
                    </div>
                </div>

                {/* Rotating Insurance Text */}
                <div className="py-2">
                    <div className="flex items-center justify-center gap-2 text-xl font-black">
                        <span className="text-gray-400 uppercase text-xs tracking-widest">Buy</span>
                        <RotatingText
                            texts={['Term', 'ULIP', 'Savings']}
                            mainClassName="inline-flex px-3 bg-brand-blue text-white py-1 font-black min-w-[90px] justify-center uppercase text-base"
                            staggerFrom="last"
                            initial={{ y: "100%" }}
                            animate={{ y: 0 }}
                            exit={{ y: "-120%" }}
                            staggerDuration={0.025}
                            splitLevelClassName="overflow-hidden"
                            transition={{ type: "spring", damping: 30, stiffness: 400 }}
                            rotationInterval={2000}
                        />
                        <span className="text-gray-400 uppercase text-xs tracking-widest">Insurance</span>
                    </div>
                </div>
            </div>

            {/* Action Section */}
            <div className="space-y-4">
                <button
                    onClick={onRestart}
                    className="w-full game-btn-orange text-xl py-4 shadow-[0px_6px_0px_0px_rgba(194,65,12,1)]"
                >
                    <div className="flex items-center justify-center gap-3">
                        <RotateCcw className="w-6 h-6" />
                        <span>REPLAY QUIZ</span>
                    </div>
                </button>
                <p className="text-[10px] text-gray-400 font-black text-center uppercase tracking-widest">
                    BAJAJ ALLIANZ LIFE INSURANCE
                </p>
            </div>
        </motion.div>
    );
};

export default ThankYouScreen;

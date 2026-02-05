import { motion } from 'framer-motion';

const WelcomeScreen = ({ onStart }) => {
    return (
        <motion.div
            className="w-full h-full flex flex-col justify-between py-4"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.3 }}
        >
            {/* Logo Section */}
            <div className="flex justify-center">
                <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 260, damping: 20, delay: 0.3 }}
                    className="w-[180px] p-4 bg-white border-2 border-gray-100 shadow-sm"
                >
                    <img
                        src="/assets/bajaj-life-logo.png"
                        alt="Bajaj Life - Life Goals. Done."
                        className="w-full h-auto object-contain"
                    />
                </motion.div>
            </div>

            {/* Title Section */}
            <div className="text-center space-y-4">
                <h1 className="text-4xl font-black text-brand-blue uppercase tracking-tight">
                    Life Insurance<br />GST Quiz
                </h1>

                <div className="bg-blue-50 border-2 border-brand-blue p-4 mx-2 text-left">
                    <p className="text-lg text-brand-orange font-black mb-1 uppercase">
                        Did you know?
                    </p>
                    <p className="text-sm text-gray-700 font-bold leading-tight uppercase">
                        Life insurance attracts 0% GST! Test your knowledge now.
                    </p>
                </div>
            </div>

            {/* Action Section */}
            <div className="space-y-4">
                <button
                    onClick={onStart}
                    className="w-full game-btn-orange text-2xl py-4 shadow-[0px_6px_0px_0px_rgba(194,65,12,1)]"
                >
                    START GAME
                </button>
                <p className="text-[10px] text-gray-400 font-black text-center uppercase tracking-widest">
                    QUEST DATA IS SECURED & PRIVATE
                </p>
            </div>
        </motion.div>
    );
};

export default WelcomeScreen;

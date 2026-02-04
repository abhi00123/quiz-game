import { motion } from 'framer-motion';

const WelcomeScreen = ({ onStart }) => {
    return (
        <motion.div
            className="w-full h-full sm:max-w-md sm:h-auto mx-auto"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.3 }}
        >
            <div className="game-board text-center">
                <div className="flex justify-center mb-3 relative">
                    <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: "spring", stiffness: 260, damping: 20, delay: 0.3 }}
                        className="w-[180px]"
                    >
                        {/* Static Brand Logo */}
                        <img
                            src="/assets/bajaj-life-logo.png"
                            alt="Bajaj Life - Life Goals. Done."
                            className="w-full h-auto object-contain"
                        />
                    </motion.div>
                </div>

                <h1 className="text-3xl font-black text-brand-blue mb-2 uppercase tracking-tight">
                    Life Insurance<br />GST Quiz
                </h1>

                <div className="bg-blue-50 border-2 border-brand-blue p-3 mb-6">
                    <p className="text-base text-brand-orange font-bold mb-1">
                        Did you know?
                    </p>
                    <p className="text-sm text-gray-700 font-medium leading-tight">
                        Life insurance attracts 0% GST! Test your knowledge now.
                    </p>
                </div>

                <button
                    onClick={onStart}
                    className="w-full game-btn-orange text-xl shadow-[4px_4px_0px_0px_rgba(194,65,12,1)] hover:translate-y-[-2px] hover:shadow-[6px_6px_0px_0px_rgba(194,65,12,1)] active:translate-y-[2px] active:shadow-none transition-all"
                >
                    Start Game
                </button>
            </div>
        </motion.div>
    );
};

export default WelcomeScreen;

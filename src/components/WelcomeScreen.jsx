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
            {/* Character Section */}
            <div className="flex justify-center mb-6">
                <motion.div
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ type: "spring", stiffness: 200, damping: 15, delay: 0.5 }}
                    className="w-[70vw] h-[35vh] sm:w-[317px] sm:h-[300px]"
                >
                    <img
                        src="/assets/gst.png"
                        alt="GST Quiz Character"
                        className="w-full h-full object-contain"
                    />
                </motion.div>
            </div>

            {/* Title Section */}
            <div className="text-center space-y-4">
                <h1 className="text-4xl font-black text-white uppercase tracking-tight">
                    Life Insurance<br />GST Quiz
                </h1>

                <div className="bg-white/10 border-2 border-white/30 p-4 mx-2 text-left backdrop-blur-sm">
                    <p className="text-lg text-brand-orange font-black mb-1 uppercase">
                        Did you know?
                    </p>
                    <p className="text-sm text-white font-bold leading-tight uppercase">
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
                <p className="text-[10px] text-white/60 font-black text-center uppercase tracking-widest">
                    QUEST DATA IS SECURED & PRIVATE
                </p>
            </div>
        </motion.div>
    );
};

export default WelcomeScreen;

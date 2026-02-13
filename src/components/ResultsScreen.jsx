import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Trophy, RotateCcw, Phone, Calendar, Clock, X, CheckCircle2, ChevronDown, Share2 } from "lucide-react";
import ScoreCard from './ScoreCard';
import Confetti from './Confetti';
import * as Dialog from '@radix-ui/react-dialog';
import { useQuiz } from '../context/QuizContext';

const ResultsScreen = ({ score, total, onRestart }) => {
    const { leadName, leadPhone, handleBookingSubmit } = useQuiz();
    const percentage = (score / total) * 100;
    const [isBookingOpen, setIsBookingOpen] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [bookingData, setBookingData] = useState({
        name: leadName || '',
        mobile_no: leadPhone || '',
        date: '',
        timeSlot: ''
    });
    const [error, setError] = useState('');

    const timeSlots = [
        "10:00 AM - 12:00 PM",
        "12:00 PM - 02:00 PM",
        "02:00 PM - 04:00 PM",
        "04:00 PM - 06:00 PM"
    ];

    const handleShare = async () => {
        const shareMessage = `I scored ${score}/${total} on the GST Quiz! 🏆 Check your GST knowledge here:`;
        const shareUrl = window.location.href;

        if (navigator.share) {
            try {
                await navigator.share({
                    title: 'GST Quiz',
                    text: shareMessage,
                    url: shareUrl,
                });
            } catch (error) {
                console.log('Error sharing:', error);
            }
        } else {
            // Fallback: Copy to clipboard
            try {
                const fullText = `${shareMessage} ${shareUrl}`;
                await navigator.clipboard.writeText(fullText);
                alert('Score and link copied to clipboard!');
            } catch (err) {
                console.error('Failed to copy text: ', err);
            }
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        const selectedDate = new Date(bookingData.date);
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        if (!bookingData.date || selectedDate < today) {
            setError('Please select a valid future date');
            return;
        }
        if (!bookingData.timeSlot) {
            setError('Please select a time slot');
            return;
        }

        setIsSubmitting(true);
        const result = await handleBookingSubmit({
            ...bookingData,
            booking_timestamp: new Date().toISOString()
        });
        setIsSubmitting(false);

        if (result.success) {
            setIsBookingOpen(false);
        } else {
            setError(result.error || 'Failed to book slot. Please try again.');
        }
    };

    // Custom title based on score
    const getResultTitle = (currentScore) => {
        return currentScore >= 3 ? "CONGRATULATIONS!" : "LEARNING BEGINS";
    };

    // Custom motivational message based on score
    const getMotivationalMessage = (currentScore) => {
        return currentScore >= 3
            ? "YOU'VE JUST ACED THE QUIZ!"
            : "No worries, let's help you";
    };

    return (
        <motion.div
            className="w-full h-full flex flex-col justify-between py-4 px-2 text-center relative"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
        >
            {/* Top Right Share Icon */}
            <button
                onClick={handleShare}
                className="absolute top-4 right-4 p-2 bg-white/10 hover:bg-white/20 rounded-full text-white transition-colors z-10"
                aria-label="Share results"
            >
                <Share2 className="w-5 h-5" />
            </button>
            {percentage >= 60 && <Confetti />}

            <div className="flex-1 flex flex-col justify-center space-y-4">
                <div className="flex justify-center pt-0">
                    <motion.div
                        animate={{ rotate: [0, -5, 5, -5, 5, 0] }}
                        transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
                        className="p-2 bg-white border-4 border-brand-orange shadow-sm"
                    >
                        <Trophy className="w-10 h-10 text-brand-orange" strokeWidth={1.5} />
                    </motion.div>
                </div>

                <div className="space-y-2">
                    <h2 className="text-3xl font-black text-white uppercase tracking-tight leading-none">
                        {getResultTitle(score)}
                    </h2>
                    <div className="bg-brand-orange text-white text-[10px] font-black py-1.5 px-4 inline-block uppercase tracking-widest shadow-sm">
                        {getMotivationalMessage(score)}
                    </div>
                </div>

                <div className="py-1">
                    <ScoreCard score={score} total={total} percentage={percentage} />
                </div>

                {/* Dashed Separator and CTA Message */}
                <div className="px-4 py-1">
                    <div className="border-t-2 border-dashed border-gray-300 mb-2 mx-auto max-w-[280px]"></div>
                    <p className="text-[10px] sm:text-xs text-white/90 font-medium leading-tight max-w-[300px] mx-auto">
                        To learn more about our Products,
                        <br />
                        Our <span className='font-bold text-brand-orange'>Relationship Manager</span> will connect with you shortly.
                    </p>
                </div>
            </div>

            <div className="space-y-2 mt-2">
                {/* Book Slot Button */}
                <button
                    onClick={() => setIsBookingOpen(true)}
                    className="w-full game-btn-orange text-lg py-3 flex items-center justify-center gap-2 shadow-[0px_4px_0px_0px_rgba(194,65,12,1)]"
                >
                    <Calendar className="w-5 h-5 flex-shrink-0" />
                    <span>BOOK A CONVENIENT SLOT</span>
                </button>

                {/* Call Button */}
                <a
                    href="tel:18002097272"
                    className="w-full game-btn text-lg py-3 flex items-center justify-center gap-2 shadow-[0px_4px_0px_0px_rgba(30,58,138,1)]"
                >
                    <Phone className="w-4 h-4 flex-shrink-0" />
                    <span>CALL US NOW</span>
                </a>

                {/* Share Button */}
                <button
                    onClick={handleShare}
                    className="w-full game-btn-orange text-lg py-3 flex items-center justify-center gap-2 shadow-[0px_4px_0px_0px_rgba(194,65,12,1)] brightness-110"
                >
                    <Share2 className="w-5 h-5 flex-shrink-0" />
                    <span>SHARE YOUR SCORE</span>
                </button>

                <button
                    onClick={onRestart}
                    className="w-full py-2.5 text-white font-black border-2 border-white hover:bg-white/10 transition-colors flex items-center justify-center gap-2 uppercase tracking-widest text-[10px]"
                >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>PLAY AGAIN</span>
                </button>
            </div>

            {/* Booking Modal */}
            <Dialog.Root open={isBookingOpen} onOpenChange={setIsBookingOpen}>
                <Dialog.Portal>
                    <Dialog.Overlay className="fixed inset-0 bg-black/70 backdrop-blur-md z-50" />
                    <Dialog.Content asChild>
                        <div className="fixed inset-0 z-50 grid place-items-center p-4">
                            <motion.div
                                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                                animate={{ opacity: 1, scale: 1, y: 0 }}
                                className="bg-white/10 border-2 border-white/20 backdrop-blur-2xl rounded-[2rem] p-8 w-full max-w-md shadow-2xl relative overflow-hidden"
                            >
                                <button
                                    onClick={() => setIsBookingOpen(false)}
                                    className="absolute top-4 right-4 text-white/50 hover:text-white transition-colors"
                                >
                                    <X className="w-6 h-6" />
                                </button>

                                <Dialog.Title className="text-2xl font-black text-white text-center mb-1 uppercase tracking-tight">
                                    Book a Slot
                                </Dialog.Title>
                                <p className="text-center text-white/60 text-[10px] font-black uppercase tracking-widest mb-8">
                                    Pick your preferred time
                                </p>

                                <form onSubmit={handleSubmit} className="space-y-6">
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="space-y-1.5">
                                            <label className="text-[10px] font-black text-white/70 uppercase tracking-widest ml-1">Name</label>
                                            <input
                                                type="text"
                                                value={bookingData.name}
                                                onChange={(e) => setBookingData(prev => ({ ...prev, name: e.target.value.replace(/[^a-zA-Z\s]/g, '') }))}
                                                placeholder="Your name"
                                                className="w-full bg-white/5 border-2 border-white/10 rounded-xl px-4 py-3 text-white font-bold focus:outline-none focus:border-brand-orange/50 transition-colors"
                                            />
                                        </div>
                                        <div className="space-y-1.5">
                                            <label className="text-[10px] font-black text-white/70 uppercase tracking-widest ml-1">Phone</label>
                                            <input
                                                type="text"
                                                value={bookingData.mobile_no}
                                                onChange={(e) => setBookingData(prev => ({ ...prev, mobile_no: e.target.value.replace(/\D/g, '').slice(0, 10) }))}
                                                placeholder="10-digit number"
                                                className="w-full bg-white/5 border-2 border-white/10 rounded-xl px-4 py-3 text-white font-bold focus:outline-none focus:border-brand-orange/50 transition-colors"
                                            />
                                        </div>
                                    </div>

                                    <div className="space-y-1.5">
                                        <label className="text-[10px] font-black text-white/70 uppercase tracking-widest ml-1">Select Date</label>
                                        <div className="relative">
                                            <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-brand-orange" />
                                            <input
                                                type="date"
                                                value={bookingData.date}
                                                min={new Date().toISOString().split('T')[0]}
                                                onChange={(e) => setBookingData(prev => ({ ...prev, date: e.target.value }))}
                                                className="w-full bg-white/10 border-2 border-white/20 rounded-xl pl-11 pr-4 py-3 text-white font-bold focus:outline-none focus:border-brand-orange/50 transition-colors [color-scheme:dark]"
                                            />
                                        </div>
                                    </div>

                                    <div className="space-y-1.5">
                                        <label className="text-[10px] font-black text-white/70 uppercase tracking-widest ml-1">Select Time Slot</label>
                                        <div className="relative">
                                            <Clock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-brand-orange" />
                                            <select
                                                value={bookingData.timeSlot}
                                                onChange={(e) => setBookingData(prev => ({ ...prev, timeSlot: e.target.value }))}
                                                className="w-full bg-white/10 border-2 border-white/20 rounded-xl pl-11 pr-10 py-3 text-white font-bold focus:outline-none focus:border-brand-orange/50 transition-colors appearance-none"
                                            >
                                                <option value="" className="bg-zinc-900">Choose a slot</option>
                                                {timeSlots.map(slot => (
                                                    <option key={slot} value={slot} className="bg-zinc-900">{slot}</option>
                                                ))}
                                            </select>
                                            <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40 pointer-events-none" />
                                        </div>
                                    </div>

                                    {error && (
                                        <p className="text-red-400 text-xs font-black text-center uppercase">{error}</p>
                                    )}

                                    <button
                                        type="submit"
                                        disabled={isSubmitting}
                                        className="w-full game-btn-orange text-xl py-4 shadow-[0px_6px_0px_0px_rgba(194,65,12,1)] disabled:opacity-50 disabled:translate-y-1 disabled:shadow-none transition-all"
                                    >
                                        {isSubmitting ? 'BOOKING...' : 'CONFIRM BOOKING'}
                                    </button>
                                </form>
                            </motion.div>
                        </div>
                    </Dialog.Content>
                </Dialog.Portal>
            </Dialog.Root>
        </motion.div>
    );
};

export default ResultsScreen;

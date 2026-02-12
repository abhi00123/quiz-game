import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Trophy, MessageCircle, RotateCcw, AlertTriangle, Phone, ChevronDown, ChevronUp, CheckCircle2 } from "lucide-react";
import ScoreCard from './ScoreCard';
import Confetti from './Confetti';
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { isValidPhone } from '../utils/helpers';

// API function to submit to Bajaj LMS
const submitToLMS = async (data) => {
    const apiUrl = "https://webpartner.bajajallianz.com/EurekaWSNew/service/pushData";
    const fullPayload = {
        name: data.name,
        mobile_no: data.mobile_no,
        email_id: "",
        p_user_eml: "",
        age: "",
        goal_name: "",
        param1: "",
        param2: "",
        param3: "",
        param4: "",
        param5: "",
        param13: "",
        param18: "",
        param19: "",
        param20: "",
        param23: "",
        param24: "",
        param25: "",
        param26: "",
        param28: "",
        param29: "",
        param30: "",
        param36: "ONLINE_SALES",
        summary_dtls: "",
        p_data_source: "WS_BUY_GAME1",
        p_curr_page_path: "",
        p_ip_addsr: "",
        p_remark_url: "",
        prodId: "",
        medium: "",
        contact_number: "",
        content: "",
        campaign: "",
        source: "",
        keyword: "",
        flag: "",
        parameter: "",
        name1: ""
    };

    try {
        const response = await fetch(apiUrl, {
            method: "POST",
            headers: {
                "Accept": "application/json, text/plain, */*",
                "Content-Type": "application/json",
                "Origin": "https://www.bajajlifeinsurance.com",
                "Referer": "https://www.bajajlifeinsurance.com/"
            },
            body: JSON.stringify(fullPayload)
        });
        return await response.json();
    } catch (error) {
        console.error('❌ API Error:', error);
        throw error;
    }
};

const ResultsScreen = ({ score, total, onRestart, onFormSubmit }) => {
    const percentage = (score / total) * 100;
    const [isExpanded, setIsExpanded] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [formData, setFormData] = useState({ name: '', mobile: '' });
    const [errors, setErrors] = useState({});

    const handleInputChange = (field, value) => {
        setFormData(prev => ({ ...prev, [field]: value }));
        if (errors[field]) setErrors(prev => ({ ...prev, [field]: '' }));
    };

    const validateForm = () => {
        const newErrors = {};
        if (!formData.name.trim()) newErrors.name = 'Name is required';
        if (!formData.mobile.trim()) {
            newErrors.mobile = 'Mobile is required';
        } else if (!isValidPhone(formData.mobile)) {
            newErrors.mobile = 'Enter valid 10-digit number';
        }
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        if (!validateForm()) return;
        setIsLoading(true);
        try {
            await submitToLMS({
                name: formData.name.trim(),
                mobile_no: formData.mobile.trim()
            });
            if (onFormSubmit) {
                onFormSubmit(formData.name.trim());
            }
        } catch (error) {
            setErrors({ submit: 'Failed to submit. Try again.' });
        } finally {
            setIsLoading(false);
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
            className="w-full h-full flex flex-col justify-between py-6 px-2 text-center overflow-y-auto scrollbar-hide"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
        >
            {percentage >= 60 && <Confetti />}

            <div className="flex-1 flex flex-col justify-center space-y-4">
                <div className="flex justify-center pt-2">
                    <motion.div
                        animate={{ rotate: [0, -5, 5, -5, 5, 0] }}
                        transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
                        className="p-3 bg-white border-4 border-brand-orange shadow-sm"
                    >
                        <Trophy className="w-12 h-12 text-brand-orange" strokeWidth={1.5} />
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
                <div className="px-4 py-2">
                    <div className="border-t-2 border-dashed border-gray-300 mb-3 mx-auto max-w-[280px]"></div>
                    <p className="text-xs sm:text-sm text-white/90 font-medium leading-relaxed max-w-[300px] mx-auto">
                        To learn more about our Products,
                        <br className="sm:hidden" />
                        <span className="hidden sm:inline"> </span>
                        Our <span className='font-bold text-brand-orange'>Relationship Manager</span> will connect with you shortly.
                    </p>
                </div>
            </div>

            <div className="space-y-2 mt-4">
                {/* Call Button */}
                <a
                    href="tel:18002097272"
                    className="w-full game-btn-orange text-xl py-3.5 flex items-center justify-center gap-3 shadow-[0px_4px_0px_0px_rgba(194,65,12,1)]"
                >
                    <Phone className="w-5 h-5 flex-shrink-0" />
                    <span>CALL US NOW</span>
                </a>

                {/* OR Separator */}
                <div className="flex items-center gap-2 py-0.5">
                    <div className="h-[1px] flex-1 bg-white/20"></div>
                    <span className="text-[10px] font-black text-white/40 tracking-widest">OR</span>
                    <div className="h-[1px] flex-1 bg-white/20"></div>
                </div>

                {/* Talk to Expert Collapsible */}
                <div className="overflow-hidden">
                    <button
                        onClick={() => setIsExpanded(!isExpanded)}
                        className="w-full game-btn text-lg py-3 flex items-center justify-center gap-2 shadow-[0px_4px_0px_0px_rgba(30,58,138,1)]"
                    >
                        <MessageCircle className="w-5 h-5 flex-shrink-0" />
                        <span>TALK TO EXPERT</span>
                        {isExpanded ? <ChevronUp className="w-5 h-5 ml-1" /> : <ChevronDown className="w-5 h-5 ml-1" />}
                    </button>

                    <AnimatePresence>
                        {isExpanded && (
                            <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: 'auto', opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                className="px-4 pb-4 mt-[-4px] bg-white border-x-2 border-b-2 border-brand-blue relative z-10"
                            >
                                <form onSubmit={handleFormSubmit} className="pt-4 space-y-3 text-left">
                                    <div>
                                        <Label htmlFor="name" className="text-[10px] uppercase font-bold text-brand-orange">Full Name *</Label>
                                        <Input
                                            id="name"
                                            placeholder="As per Govt ID"
                                            value={formData.name}
                                            onChange={(e) => handleInputChange('name', e.target.value)}
                                            className={`rounded-none border-2 h-9 text-sm bg-white ${errors.name ? 'border-brand-orange bg-red-50' : 'border-brand-blue'}`}
                                        />
                                    </div>
                                    <div>
                                        <Label htmlFor="mobile" className="text-[10px] uppercase font-bold text-brand-blue">Mobile Number *</Label>
                                        <div className="flex gap-2">
                                            <div className="w-12 h-9 flex items-center justify-center bg-white border-2 border-brand-blue text-xs font-bold">+91</div>
                                            <Input
                                                id="mobile"
                                                placeholder="9876543210"
                                                value={formData.mobile}
                                                onChange={(e) => handleInputChange('mobile', e.target.value.replace(/\D/g, '').slice(0, 10))}
                                                className={`flex-1 rounded-none border-2 h-9 text-sm bg-white ${errors.mobile ? 'border-brand-orange bg-red-50' : 'border-brand-blue'}`}
                                            />
                                        </div>
                                        {errors.mobile && <p className="text-[10px] text-brand-orange mt-1 font-bold italic">{errors.mobile}</p>}
                                    </div>
                                    <button
                                        type="submit"
                                        disabled={isLoading}
                                        className="w-full game-btn-orange text-sm shadow-[4px_4px_0px_0px_rgba(194,65,12,1)]"
                                    >
                                        {isLoading ? 'Processing...' : 'Proceed'}
                                    </button>
                                </form>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

                <button
                    onClick={onRestart}
                    className="w-full py-4 text-white font-black border-2 border-white hover:bg-white/10 transition-colors flex items-center justify-center gap-2 uppercase tracking-widest text-xs"
                >
                    <RotateCcw className="w-4 h-4" />
                    <span>PLAY AGAIN</span>
                </button>
            </div>
        </motion.div>
    );
};

export default ResultsScreen;
